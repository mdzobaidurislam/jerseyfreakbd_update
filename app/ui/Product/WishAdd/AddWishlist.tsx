"use client"
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from '@/app/ui/button';
import { Heart, Loader2 } from 'lucide-react';

export default function AddWishlist({ id }: any) {
    const pathname = usePathname()

    const [loading, setLoading] = useState<boolean>(false);
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setWishlist, wishlist, setWishlistRemove } = useCartStoreData();
    const handlerWishlist = async () => {

        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;

        const userId = isLoggedIn ? cookieValue?.user?.id : null
        if (!userId) {
            toast.success("Please login", {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#8E2581', secondary: '#fff' },
            });
        }
        try {
            const DataPost = {
                product_id: id,
                user_id: userId,
            } as any

            if (pathname === '/wishlist') {
                const response = await axios.post('/api/product/wishlists/remove', DataPost);
                const data = response.data;
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                setWishlistRemove(id)
            } else {
                const response = await axios.post('/api/product/wishlists/add-product', DataPost);
                const data = response.data;

                if (data.is_in_wishlist) {
                    toast.success(data.message, {
                        style: { color: '#404042', fontWeight: 600 },
                        iconTheme: { primary: '#8E2581', secondary: '#fff' },
                    });
                    setWishlist(id)
                } else {
                    toast.error(data.message, {
                        style: { color: 'red', fontWeight: 600 },
                        iconTheme: { primary: 'red', secondary: '#fff' },
                    });
                }
            }

            setLoading(false);


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handlerWishlist} className='group py-[8px] lg:py-[10px] px-[20px] justify-center md:px-[30px] w-[50%] md:max-w-max bg-white border-accent-lightPink border-[2px] text-base !text-primary uppercase hover:bg-accent-lightPink'>
                <div className="flex items-center space-x-2">
                    <Heart className='text-neutral-black font-bold w-[20px] group-hover:text-white' />
                    <span className='text-neutral-black text-sm font-bold group-hover:text-white'>Favorite</span>
                    {loading && <Loader2 className="animate-spin text-sm  group-hover:text-white text-accent-lightPink" />}
                </div>
            </Button>

        </>


    )
}
