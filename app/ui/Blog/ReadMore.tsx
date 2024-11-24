"use client"
import React from 'react'
import CustomLink from '../CustomLink'
import { cookieStore } from '@/lib/hooks/useCookieStore';

export default function ReadMore({ link }: any) {
    const { heading_title_value } = cookieStore();
    const readMore = heading_title_value?.readMore
    return (
        <div>
            <CustomLink className=' bg-primary text-white  border-white uppercase hover:bg-primary-hover hover:border-primary-hover px-[25px] py-[10px] ' href={`/blog/${link}`}   >{readMore}</CustomLink>
        </div>
    )
}
