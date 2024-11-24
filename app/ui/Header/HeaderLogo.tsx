import Link from 'next/link'
import React from 'react'
import CustomImage from '../CustomImage/CustomImage'

export default function HeaderLogo({ header_logo }: any) {
    return (
        <Link href='/' >
            <CustomImage
                src={header_logo?.value}
                width={78}
                height={77}
                alt={`Logo`}
            />
        </Link>
    )
}
