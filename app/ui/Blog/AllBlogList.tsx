import React from 'react'
import Container from '../Container/Container'
import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import PaginationFilter from '../FilterProduct/PaginationFilter';
import Link from 'next/link';
import CustomLink from '../CustomLink';
import Image from 'next/image';

async function getBlogs(page: any): Promise<any> {
    const url = new URL(`${API_BASE_URL}/blogs`);
    url.searchParams.append('page', page.toString());
    const response = await fetch(url.toString(), {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function AllBlogList({ currentPage }: any) {
    const result = await getBlogs(currentPage);
    return (
        <div className='py-5'>
            <Container>
                <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
                    {
                        result?.data.map((item: any, index: any) => (
                            <div key={index} className="blog_item mb-5 p-0 lg:p-4 flex flex-col flex-wrap gap-4 ">
                                <div className="thumbnail w-full h-[250px] overflow-hidden flex items-start justify-start ">
                                    <Image width={250} height={220} src={`${BASE_URL}/public/${item?.banner}`} alt={item.title} className=" img_fluid w-full h-auto rounded-lg object-contain " />
                                </div>
                                <h2 className=" text-lg text-neutral-black font-semibold mt-2">
                                    <Link href={`/blog/${item.slug}`} className="text-reset">
                                        {item.title}
                                    </Link>
                                </h2>
                                <div>
                                    <span className=" text-neutral-black font-medium text-lg"> {item.created_at}</span>
                                </div>
                                <div>
                                    <CustomLink href={`/blog/${item.slug}`} >Read more</CustomLink>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    result.data.length > 0 && <PaginationFilter meta={result.meta} />
                }
            </Container>
        </div>
    )
}
