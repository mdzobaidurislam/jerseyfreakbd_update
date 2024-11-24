import React from 'react'
import Container from '../Container/Container'
import Link from 'next/link'
import { API_BASE_URL } from '@/app/config/api';

async function getPopular_right_now(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/popular_right_now`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function PopularRightNow() {
    const result = await getPopular_right_now();

    return (
        <Container className='pb-[0px]'>
            <div className='popularRightNow  rounded-[26px] flex flex-col gap-0  ' >
                <div className='flex'>
                    <h3 className=' text-[22px] md:text-[36px] text-neutral-black font-bold  '>{result?.title}</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full flex-row  gap-y-[20px] xl:gap-x-[200px]  '>
                    {
                        result?.data && result?.data.map((item: any) => (
                            <div className='col-span-1' key={item.id} >
                                <Link href={`/search?query=${item?.query}`}>
                                    <h3 className='text-[16px] md:text-[30px] xl:text-[40px] text-neutral-black pb-1 border-b-[1px] border-neutral-black  ' >{item?.query}</h3>
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>
        </Container >
    )
}
