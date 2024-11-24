import React from 'react'
import { CodIcon, DeliveryIcon, OriginalIcon } from '@/app/ui/Icons/Icons'

export default function Summary({ delivery_time, product_return, cod_text, original_text }: any) {
    const data = [
        {
            id: 1,
            desc: delivery_time || null,
            icon: <DeliveryIcon />
        },
        {
            id: 2,
            desc: original_text || null,
            icon: <OriginalIcon />
        },
        {
            id: 3,
            desc: cod_text || null,
            icon: <CodIcon />
        },
        {
            id: 4,
            desc: product_return || null,
            icon: <CodIcon />
        },
    ]
    return (
        <div className="summary flex  flex-col gap-[20px] ">
            {
                data.map((item) => (
                    item.desc &&
                    <div className='flex gap-4 items-center ' key={item.id} >
                        {item.icon} <div className='text-base text-neutral-black ' >
                            <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
