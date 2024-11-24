import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Breadcrumb({ link = '/', name = '', className }: any) {
    const dataArray = [
        {
            link: '/',
            name: 'Home'
        },
        {
            link: link,
            name: ' / ' + name
        },
    ]
    return (
        <div

            className={cn(
                'breadcrumb py-[20px]',
                className,
            )}
        >
            {
                dataArray.map((item, index) => (<Link key={index} href={item?.link || ""}>{item.name}</Link>))
            }

        </div>
    )
}
