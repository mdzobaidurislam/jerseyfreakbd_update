import { BASE_URL } from '@/app/config/api'
import Image from 'next/image'
import React from 'react'

export default function CustomImage({ src, ...rest }: any) {

    return (
        <Image
            src={`${BASE_URL}/public/${src}`}
            {...rest}
            className="w-full object-contain transition-transform duration-300 ease-in-out transform"
        />
    )
}
