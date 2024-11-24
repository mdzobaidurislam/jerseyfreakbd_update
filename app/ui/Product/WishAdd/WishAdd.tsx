"use client"
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import axios from 'axios';
import { Heart, X } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function WishAdd({ id }: any) {
    const pathname = usePathname()
    const params = useSearchParams()
    const searchPath = params.get('redirect')

    const [loading, setLoading] = useState<boolean>(false);
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setWishlist, wishlist, setWishlistRemove } = useCartStoreData();
    const handlerWishlist = async () => {

        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;

        const userId = isLoggedIn ? cookieValue?.user?.id : null
        try {
            if (!userId) {
                toast.error("Please first login", {
                    style: { color: 'red', fontWeight: 600 },
                    iconTheme: { primary: 'red', secondary: '#fff' },
                });
                return false
            }
            const DataPost = {
                product_id: id,
                user_id: userId,
            } as any

            if (pathname === '/wishlist') {
                const response = await axios.post('/api/product/wishlists/remove', DataPost);
                const data = response.data;
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                setWishlistRemove(id)
            } else {
                const response = await axios.post('/api/product/wishlists/add-product', DataPost);
                const data = response.data;

                if (data.is_in_wishlist) {
                    toast.success(data.message, {
                        style: { color: '#404042', fontWeight: 600 },
                        iconTheme: { primary: '#A020F0', secondary: '#fff' },
                    });
                    setWishlist(id)
                } else {
                    toast.error(data.message, {
                        style: { color: 'red', fontWeight: 600 },
                        iconTheme: { primary: 'red', secondary: '#fff' },
                    });
                }
            }




        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div onClick={handlerWishlist} className={`${wishlist.includes(id) ? pathname === '/wishlist' ? 'bg-red-600 group-hover:!text-white' : 'bg-neutral-black group:text-white' : ' group-hover:bg-neutral-black group-hover:text-white'} wishlist absolute top-6 right-6 w-max-max bg-accent-lightPink rounded-2xl cursor-pointer transition duration-300 ease-in-out  w-[25px] h-[25px] flex items-center justify-center z-10`}>
            {
                pathname === '/wishlist' ? <X className={`text-white w-[12px] ${wishlist.includes(id) ? 'text-white' : 'text-white'}`} /> : <Heart className={`group-hover:text-white w-[12px] ${wishlist.includes(id) ? 'text-white' : 'text-white'}`} />
            }

        </div>
    )
}
