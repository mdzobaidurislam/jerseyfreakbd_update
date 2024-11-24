"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { productStore } from '@/lib/hooks/useProductStore';
import { useSession } from 'next-auth/react';


export default function AccountNav() {
  const session: any = useSession()
  const { translateValue } = cookieStore();
  const { totalQuantity, wishlist } = useCartStoreData();
  const [mounted, setMounted] = useState(false)
  const { openCart, setOpenCart } = productStore()
  const cart = translateValue?.cart
  const login = translateValue?.login
  const favorite = translateValue?.favorite

  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <>

      {
        session?.data?.user ? <div className="flex items-center gap-1 text-base capitalize">
          <Link className="flex  items-center justify-center flex-col gap-1 text-base capitalize" href='/user/dashboard'>
            <img src="/icons/user.svg" alt="user" /> <span>{session?.data?.user?.name}</span>
          </Link>
        </div> : <div className="flex items-center gap-1 text-base capitalize">
          <Link className="flex flex-col items-center gap-1 text-base capitalize" href='/login'>
            <img src="/icons/user.svg" alt="user" /> <span>{login}</span>
          </Link>
        </div>
      }



      <div className="flex items-center gap-1 text-base capitalize shoppingCart relative" onClick={() => setOpenCart(!openCart)}>

        <div className="flex  items-center gap-1 text-base capitalize cursor-pointer justify-center flex-col "  >
          <img src="/icons/cart.svg" alt="user" /> <span className='pl-2 inline-block'> {cart} </span>
        </div>
        <span className="mini_cart__qty !left-[27px] " >{mounted && totalQuantity || 0}</span>

      </div>
      <div className="flex flex-col items-center gap-1 text-base capitalize shoppingCart relative">
        <Link className="flex items-center justify-center flex-col gap-1 text-base capitalize" href='/wishlist'>
          <img src="/icons/wish.svg" alt="user" /> <span className='pl-2 inline-block'> {favorite}</span>
        </Link>
        <span className="mini_cart__qty !left-[40px]" >{mounted && wishlist.length || 0}</span>
      </div>

    </>
  );
}
