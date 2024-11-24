"use client"
import Marquee from "react-fast-marquee";
import React, { useState } from 'react'
import './Marquee.css'
import { cookieStore } from "@/lib/hooks/useCookieStore";

export default function MarqueeCom() {

    const { heading_title_value } = cookieStore();
    const fcb_marquee = heading_title_value?.fcb_marquee
    return (
        <div className='pb-[27px]'>

            <div className="fcb-section-marquee  ">
                <Marquee>
                    <aside className="fcb-marquee" data-speed="10">
                        <span className="">
                            {fcb_marquee}
                        </span><span className="" aria-hidden="true">
                            {fcb_marquee}
                        </span><span className="" aria-hidden="true">
                            {fcb_marquee}
                        </span><span className="" aria-hidden="true">
                            {fcb_marquee}
                        </span></aside>
                </Marquee>
            </div>




        </div>
    )
}
