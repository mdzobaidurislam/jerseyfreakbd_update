import React from 'react'
import ProductItem from '../Product/ProductItem'
import PaginationFilter from './PaginationFilter'
import { API_BASE_URL } from '@/app/config/api';
import ProductNotFound from '../Product/ProductNotFound/ProductNotFound';

async function getProducts(attribute_values: string = "", slug: string = '', name: string = '', categories: string = '', subCategory: string = '', brands: string = '', discount: any, sort_by: any, minPrice: any, maxPrice: any, page: number = 1): Promise<any> {

    const url = new URL(`${API_BASE_URL}/products/search`);
    if (slug) {
        url.searchParams.append('slug', slug);
    }
    if (attribute_values) {
        url.searchParams.append('attribute_values', attribute_values);
    }
    if (name) {
        url.searchParams.append('name', name);
    }
    if (categories) {
        url.searchParams.append('categories', categories);
    }
    if (subCategory) {
        url.searchParams.append('subCategory', subCategory);
    }
    if (brands) {
        url.searchParams.append('brands', brands);

    }
    if (discount) {
        url.searchParams.append('discount', discount);
    }
    if (sort_by) {
        url.searchParams.append('sort_key', sort_by);
    }

    if (minPrice) {
        url.searchParams.append('min', minPrice);
    }
    if (maxPrice) {
        url.searchParams.append('max', maxPrice);
    }
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


export default async function FilterProduct({ query }: any) {
    const { attribute_values, slug, name, categories, subCategory, brands, discount, sort_by, minPrice, maxPrice, currentPage } = query
    if (!slug) {
        return <ProductNotFound />;
    }
    const result = await getProducts(attribute_values, slug, name, categories, subCategory, brands, discount, sort_by, minPrice, maxPrice, currentPage);


    return (
        <>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-4 gap-3' >

                {
                    result?.data && result.data.length > 0 && result.data.map((item: any) => (
                        <ProductItem {...item} key={item.id} />
                    ))
                }

            </div>
            {
                result?.data && result.data.length === 0 && <div className="product_not_found">
                    <ProductNotFound />
                </div>
            }

            {
                result?.data && result.data.length > 0 && <PaginationFilter meta={result.meta} />
            }

        </>
    )
}
