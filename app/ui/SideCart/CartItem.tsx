"use client"
import React from 'react';
import CustomImage from '../CustomImage/CustomImage';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { productStore } from '@/lib/hooks/useProductStore';

export default function CartItem({ handle, item, increaseQty, decreaseQty, handleDelete }: any) {
    const { openCart, setOpenCart } = productStore()
    return (
        <div className="bg-gray-50 border border-arival rounded-3xl h-fit">
            <div className="border-[1px] border-arival rounded-3xl">

                <div className="bg-white flex min-h-44 rounded-3xl">
                    <div className="w-2/5 p-4 text-center">
                        <div className="relative h-full">
                            <Link href={`/product/${item?.product_slug}`} onClick={() => setOpenCart(false)} >
                                <CustomImage alt="" src={item?.product_thumbnail_image} loading="lazy"
                                    decoding="async" width={138} height={191} className="object-contain w-full h-full" />
                            </Link>
                        </div>
                    </div>
                    <div className="w-3/5 py-4 pr-4">
                        <div className="space-y-2">
                            <div className="tracking-normal">
                                <Link href={`/product/${item?.product_slug}`}
                                    className="mb-1"
                                >
                                    <span className="text-base font-bold hover:underline">
                                        {item.product_name}
                                    </span>
                                </Link>
                            </div>
                            <div>
                                <div className="flex flex-col tracking-normal">
                                    <span className="text-sm">Quantity: {item.quantity}</span>
                                    {
                                        item.variation && <span className="text-sm">Size: {item.variation}</span>
                                    }

                                    {
                                        (item?.playerName || item?.playerNumber) &&

                                        <div className="mt-1">
                                            <span className="text-base font-semibold">Name &amp; Number</span>
                                            <div className="flex flex-col">
                                                <span className="text-sm">Name: {item?.playerName.split(", ").join("")}</span>
                                                <span className="text-sm">Number: {item?.playerNumber.split(", ").join("")}</span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        item.patch_selected_price > 0 && <span className="text-sm">Patch Price: {item.patch_selected_price}</span>
                                    }
                                    {
                                        item.player_number_name_price > 0 && <span className="text-sm">Name & Number Price: {item.player_number_name_price}</span>
                                    }
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="opacity-100">
                                <span className="flex flex-wrap items-center w-fit gap-2 normal-case tracking-tight md:tracking-normal">
                                    <span className="font-bold text-gray-950 text-base tracking-normal">{item.currency_symbol}{item.quantity * item.price}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-between p-4">
                <div className="flex flex-row items-center gap-1">
                    <button
                        onClick={() => decreaseQty(item.id, item.quantity)}
                        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all max-w-[32px] max-h-[32px] text-xs text-neutral-black hover:opacity-75 focus:ring focus:ring-arival active:opacity-[0.85] border rounded-full border-arival bg-white w-7 h-7 hover:bg-arival hover:border-gray"
                        type="button"
                    >
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="inherit" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                    </button>
                    <label className="font-primary text-base font-normal leading-normal tracking-normal h-full">
                        <input
                            name="quantity"
                            className="border focus:border-2 rounded border-transparent bg-transparent text-center font-semibold outline-none w-8 focus:border-gray"
                            min="0"
                            max="15"
                            placeholder="0"
                            value={item.quantity}
                            readOnly
                        />
                    </label>
                    <button
                        onClick={() => increaseQty(item.id, item.quantity)}
                        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all max-w-[32px] max-h-[32px] text-xs  text-neutral-black hover:opacity-75 focus:ring focus:ring-arival active:opacity-[0.85] border rounded-full border-arival bg-white w-7 h-7 hover:bg-arival hover:border-gray"
                        type="button"
                    >
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19" stroke="currentColor" strokeWidth="inherit" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="inherit" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                    </button>
                </div>
                <button onClick={() => handleDelete(item.id)} className="flex items-center justify-center text-primary space-x-2" >
                    <p className="antialiased  leading-tighter tracking-tight text-deep-purple-700 text-sm font-semibold mt-1">Remove</p>
                    <span className="ml-1">
                        <Trash2 />
                    </span>
                </button>
            </div>

        </div>
    );
}
