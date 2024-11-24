"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import React, { useEffect } from 'react'

export default function Price({ productDetails }: any) {
    const { price, setPriceValue, patchPrice, addToCartOption } = productStore();

    useEffect(() => {
        setPriceValue(productDetails.calculable_price)
    }, [productDetails.calculable_price])


    return (
        <>
            {
                productDetails.has_discount &&
                <div className="sale_price text-arival_var relative  line-through ">
                    {productDetails.stroked_price}
                </div>
            }
            <div className="regular_price text-accent-lightPink text-sm font-bold">

                {price == "NaN" ? '৳' + (Number(price) + Number(patchPrice) + Number(addToCartOption.player_number_name_price)) : productDetails?.main_price}

            </div>
        </>
    )
}
