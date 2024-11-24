import Image from 'next/image';
import React from 'react';

export default function SocialLink({ slug }: any) {
    const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    const social_link = [
        {
            id: 1,
            name: 'Facebook',
            link: `https://www.facebook.com/sharer/sharer.php?u=${NEXTAUTH_URL}/product/${slug}`,
            icon: '/social/fb.png',
        },
        {
            id: 2,
            name: 'Telegram',
            link: `https://t.me/share/url?url=${NEXTAUTH_URL}/product/${slug}&text=Check%20out%20this%20product!`,
            icon: '/social/telegram.webp',
        },
        {
            id: 4,
            name: 'WhatsApp',
            link: `https://wa.me/?text=Check%20out%20this%20product%20${NEXTAUTH_URL}/product/${slug}`,
            icon: '/social/wp.png',
        },
        {
            id: 5,
            name: 'X', // Formerly Twitter
            link: `https://twitter.com/share?url=${NEXTAUTH_URL}/product/${slug}&text=Check%20out%20this%20product!`,
            icon: '/social/tw.png',
        },

    ];


    return (
        <div className="share_area flex items-center gap-3 text-base text-neutral-black p-6">
            <span className='text-neutral-black font-medium'>Share :</span>
            <div className="share_icon flex gap-3 flex-wrap items-center">
                {social_link.map((item) => (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" key={item.id}>
                        <img
                            src={item.icon}
                            width={30}
                            height={30}
                            alt={item.name}
                            className="object-contain transition-transform duration-300 ease-in-out transform mx-auto"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}
