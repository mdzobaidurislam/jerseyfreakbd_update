"use client"
import React from 'react'
import CustomLink from '../CustomLink'
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { cn, get_translate } from '@/lib/utils';
import ViewAll from '../ViewAll/ViewAll';

export default function HeadingSection({ view_show, titleHas, translateTitle, translateKey, className = "", link = "/" }: any) {
    const { heading_title_value } = cookieStore();
    const trending_category = heading_title_value?.[translateKey];
    const sectionTitle = heading_title_value?.[translateTitle];
    const { title, subtitle } = get_translate(trending_category);
    return (
        <div>
            {
                sectionTitle &&

                <div className="short_heading text-center pb-5 lg:pb-0">
                    <h4 className={cn(`text-accent-lightPink  text-[20px] sm:text-[30px] font-bold `, className)} >{sectionTitle}</h4>
                </div>
            }


            <div className='flex items-center justify-between'>
                <h3 className=' text-[18px] xl:text-[36px] uppercase text-neutral-black font-adihausDIN relative heading_border ' >{titleHas || title}</h3>
                {
                    view_show &&
                    <div className="view_all">
                        <CustomLink href={`${link}`} className='text-sm px-[15px] py-[5px] ' >
                            <ViewAll />
                        </CustomLink>
                    </div>
                }
            </div>


        </div>
    )
}
