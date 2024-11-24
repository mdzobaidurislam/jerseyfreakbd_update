"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from 'next/link';
import axios from 'axios';
import CustomImage from '../CustomImage/CustomImage';
import { ListProductSkeleton, SearchProductSkeleton } from '../skeletons';
import { useRouter } from 'next/navigation';
export default function DesktopSearch({ isDialogOpen, setIsDialogOpen }: any) {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchSuggestion, setSuggestion] = useState([])
    const [searchItems, setSearchItems] = useState([])

    const getData = async () => {
        setLoading(true)
        try {
            const response: any = await axios.get(
                `/api/search?name=${searchInput}`,

            );

            console.log(response.data)
            setSearchItems(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const getSuggestion = async () => {
        setLoading(true)
        try {
            const response: any = await axios.get(
                `/api/search/suggestions?query_key=${searchInput}`,

            );
            setSuggestion(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (searchInput !== '') {
            getSuggestion()
            getData()
        } else {
            setSearchItems([])
            setSuggestion([])
        }
    }, [searchInput])

    return (
        <div className="flex flex-col  container pt-[45px] p-[38px] md:p-[80px] " >
            <div className="search_input flex items-center relative w-full md:w-[750px]   ">
                <input
                    onChange={(e: any) => setSearchInput(e.target.value)}
                    type="text"
                    placeholder="Search the item"
                    className="w-[730px] border-[1px] p-[10px] border-gray rounded-r-[0] rounded-lg shadow-none focus:shadow-none focus:outline-none ring-0"
                />
                <Button onClick={() => {
                    if (searchInput !== '') {

                        router.push(`/search?query=${searchInput}`)
                        setIsDialogOpen(!isDialogOpen)
                    }
                }} className="search_icon bg-accent-lightPink absolute right-[-30px] top-0 h-[46px] w-[50px] rounded-lg rounded-l-[0]">
                    <Search className="text-white" />
                </Button>
            </div>
            <div className='flex gap-6  overflow-y-auto 2xl:h-[540px] h-[330px] '>
                <div className="quick_link pt-[30px] flex gap-[10px] flex-col  w-[400px] ">
                    <h3 className="text-base font-bold text-neutral-black " >Quick Links</h3>
                    <ul className="flex gap-[10px] flex-col pb-10">
                        {
                            loading ? <ListProductSkeleton /> :
                                searchSuggestion.map((item: any) => (
                                    <li key={item.id} className='h-[40px] overflow-hidden line-clamp-2' >
                                        <Link className="text-base border-primary border-b pb-[7px]   " onClick={() => setIsDialogOpen(!isDialogOpen)} href={`/search?query=${item.query}`} >{item?.query}</Link>
                                    </li>
                                ))
                        }

                        <li className='h-[40px] overflow-hidden line-clamp-2' ></li>

                    </ul>
                </div>
                <div className="product_search pt-[30px]">
                    {/* ITEMS START  */}
                    {
                        loading ? <SearchProductSkeleton /> :
                            searchItems.map((item: any) => (
                                <Link href={`/product/${item.slug}`} onClick={() => setIsDialogOpen(!isDialogOpen)} >
                                    <div className="flex items-center justify-start gap-4 mb-4 border-b-[1px] pb-3">
                                        <div className="w-[50px] h-[50px]" >
                                            <CustomImage width={80} height={80} src={item.thumbnail_image} alt="Product" className="w-[80px] h-[80px] object-cover rounded-md mr-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">{item?.name}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-primary-500 text-lg font-semibold">{item?.main_price} </span>
                                                <span className="text-gray-400 text-sm ml-2 line-through">{item?.stroked_price}</span>
                                                <span className="text-green-500 text-sm ml-2">{item?.discount}% off</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                    }

                </div>
            </div>
        </div>
    )
}
