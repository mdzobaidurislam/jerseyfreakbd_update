
import React from 'react'
import Container from '../Container/Container'
import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import Heading from '../Section/Heading';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

async function getTrandingCategory(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/categories/tranding`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function Tranding() {
    const result = await getTrandingCategory();
    return (
        <Container className='pb-[82px]'>
            <div className='tranding   flex flex-col gap-6   ' >
                <div className='flex justify-center items-center '>
                    <Heading title={result?.title} />
                </div>
                <Carousel
                    opts={{
                        align: 'center',
                    }}
                    className="w-full"
                >
                    <CarouselContent className=''>
                        {result?.data && result?.data.map((item: any, index: any) => (
                            <CarouselItem key={index} className={`ml-2 pl-4 lg:pl-2 basis-[80%] sm:basis-1/3 md:basis-1/3 xl:basis-[22%] `}>
                                <div className={``} key={item.id}  >
                                    <Link href={`/category/${item?.slug}`} >
                                        {/* <div className={`w-[350px] h-[369px] `} > */}
                                        <Image
                                            src={`${BASE_URL}/public/${item.icon}`}
                                            width={375}
                                            height={394}
                                            alt="offer"
                                            className="col-span-1 object-contain transition-transform duration-300 ease-in-out transform"
                                        />
                                        {/* </div> */}
                                        <div className=' sm:p-0 flex flex-col items-center justify-center '>
                                            <h3 className='text-xl font-bold  pt-3 text-center w-full flex items-center justify-center gap-2 ' > <span>{item?.name}</span> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                                                <path d="M-2.7197e-07 3.37523L-1.21433e-07 6.81911L6.56566 6.81911L6.56566 9.59717L13 5.09717L6.56566 0.597167L6.56566 3.37523L-2.7197e-07 3.37523Z" fill="black" />
                                            </svg> </h3>
                                        </div>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[0px] sm:left-[-0px]" />
                    <CarouselNext className="right-[-0px] sm:right-[-0px]" />
                </Carousel>

            </div>
        </Container >
    )
}
