import React from 'react'
import Container from '../Container/Container'
import TranslateHeading from '../TranslateHeading'
import CustomImage from '../CustomImage/CustomImage'
import { API_BASE_URL } from '@/app/config/api';

async function getABout(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/about_page/homeabout`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function About() {
    const result = await getABout();
    return (
        <Container className='pb-[66px] '>
            <div className='About   flex flex-col gap-6 overflow-hidden  ' >
                {
                    result?.data && (
                        <div className="about_description lg:pt-0">
                            <div
                                className="text-[12px] lg:text-base  uppercase flex flex-col items-center justify-center "
                                dangerouslySetInnerHTML={{ __html: result?.data.content }}
                            />
                        </div>
                    )
                }
            </div>
        </Container >
    )
}
