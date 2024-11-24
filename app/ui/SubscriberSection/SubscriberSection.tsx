"use client"
import React, { useState } from 'react'
import Container from '../Container/Container'
import Subscriber from '../Footer/Subscriber'
import { cookieStore } from '@/lib/hooks/useCookieStore'
import { BASE_URL } from '@/app/config/api'


export default function SubscriberSection({ subscriber_section }: any) {

    const { translateValue } = cookieStore();
    const footer_newsletter = translateValue?.footer_newsletter;
    const footer_subscribe = translateValue?.footer_subscribe;

    return (
        <section
            style={{
                backgroundImage: `url('${BASE_URL}/public/${subscriber_section}')`,
                backgroundSize: 'cover', // To cover the entire section
                backgroundPosition: 'center', // To center the image
                backgroundRepeat: 'no-repeat', // Prevent the image from repeating
                padding: "100px 0px"
            }}
        >
            <Container className='h-full'>
                <div className='flex items-center justify-center flex-col w-full h-full '>
                    <h3 className='text-[18px] lg:text-[30px] text-white uppercase text-center ' >{footer_newsletter}</h3>
                    <Subscriber footer_subscribe={footer_subscribe || 'Subscribe'} />
                </div>

            </Container>



        </section>
    );
}
