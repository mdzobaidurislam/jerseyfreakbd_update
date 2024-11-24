import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BASE_URL } from '@/app/config/api'

export default function OfferImage({ offerImage }: any) {
    return (
        <div className={`flex   items-center justify-center gap-3 pt-[50px] pb-[30px] `}>
            {
                offerImage.map((item: any) => (
                    <div className='offer_image' key={item.id} >
                        <Link href={item?.link || ""}>
                            <Image
                                src={`${BASE_URL}/public/${item.image}`}
                                width={500}
                                height={500}
                                alt={item.id + ''}
                            />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
