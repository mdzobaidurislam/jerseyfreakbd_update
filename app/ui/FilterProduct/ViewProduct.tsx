import React from 'react'
import ProductItem from '../Product/ProductItem'
import PaginationFilter from './PaginationFilter'
import { API_BASE_URL } from '@/app/config/api';
import ProductNotFound from '../Product/ProductNotFound/ProductNotFound';
import { cn } from '@/lib/utils';

async function getProducts(apiUrl: string, page: number = 1): Promise<any> {
    const url = new URL(`${API_BASE_URL}/${apiUrl}`);
    url.searchParams.append('page', page.toString());
    const response = await fetch(url.toString(), {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const data: any = await response.json();
    return data as any;
}

export default async function ViewProduct({ query, bestSeller, className }: any) {
    const { apiUrl, currentPage } = query
    const result = await getProducts(apiUrl, currentPage);

    return (
        <>

            <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-4 gap-2 lg:gap-2', className)} >

                {
                    result?.data?.length > 0 && result.data.map((item: any) => (
                        <ProductItem {...item} key={item.id} bestSeller={bestSeller} />
                    ))
                }

            </div>
            {
                result?.data?.length === 0 && <div className="product_not_found">
                    <ProductNotFound />
                </div>
            }

            {
                result?.data?.length > 0 && <PaginationFilter meta={result.meta} />
            }

        </>
    )
}
