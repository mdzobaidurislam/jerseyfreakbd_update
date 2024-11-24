"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import React, { useEffect } from 'react'

export default function Stock({ productDetails }: any) {
    const { qtyV, setQty } = productStore();

    useEffect(() => {
        setQty(productDetails.current_stock)
    }, [productDetails.current_stock])



    return (
        <>
            <div className="stock_area flex items-center gap-3 text-base text-neutral-black ">
                <span>In Stock :  </span> <span>({qtyV})</span>
            </div>
        </>
    )
}
