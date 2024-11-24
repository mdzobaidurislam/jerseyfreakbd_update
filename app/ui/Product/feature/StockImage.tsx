"use client"
import { BASE_URL } from '@/app/config/api'
import { productStore } from '@/lib/hooks/useProductStore'
import Image from 'next/image'
import React from 'react'

export default function StockImage({ image, id }: any) {
    const { productImageChange, setProductImageChange } = productStore()
    return (
        <>
            <Image
                onMouseEnter={() => setProductImageChange(id, image)}
                src={`${BASE_URL}/public/${image}`}
                width={30}
                height={30}
                className={`w-full h-full object-contain ${productImageChange?.image === image ? 'border-[2px]' : ''}  `}
                alt={id}
            />
        </>
    )
}
