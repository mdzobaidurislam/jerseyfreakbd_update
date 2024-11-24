'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import axios from 'axios';
import { Search, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ListProductSkeleton } from '../skeletons';
import { useRouter } from 'next/navigation';

export default function SearchContainer() {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchSuggestion, setSuggestion] = useState([])
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
        } else {
            setSuggestion([])

        }
    }, [searchInput])



    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
            <DialogTrigger>
                <SearchIcon className="text-sm w-[18px]" />
            </DialogTrigger>
            <DialogContent className=" translate-x-0-inherit translate-y-inherit  border-0  max-w-full flex grow flex-col repeat-1 duration-300 animate-in slide-in-from-top fixed items-center  bg-white top-0 right-0 left-0 z-[999999] max-h-full search_content">
                <div className="flex flex-col  container pt-[45px] p-[38px] md:p-[80px] " >
                    <div className="search_input flex items-center relative w-full md:w-[750px]   ">
                        <input
                            type="text"
                            placeholder="Search the item"
                            className="w-[730px] border-[1px] p-[10px] border-gray rounded-r-[0] rounded-lg shadow-none focus:shadow-none focus:outline-none ring-0"
                            onChange={(e: any) => setSearchInput(e.target.value)}
                        />

                        <Button onClick={() => {
                            if (searchInput !== '') {

                                router.push(`/search?query=${searchInput}`)
                                setIsDialogOpen(!isDialogOpen)
                            }
                        }} className="search_icon absolute right-[-30px] top-0 h-[46px] w-[50px] bg-primary  rounded-lg rounded-l-[0]">
                            <Search className="text-white" />
                        </Button>
                    </div>
                    <div className="quick_link pt-[30px] flex gap-[30px] flex-col">
                        <h3 className="text-base font-bold text-neutral-black " >Quick Links</h3>
                        <ul className="flex gap-[10px] flex-col pb-10">
                            {
                                loading ? <ListProductSkeleton /> :
                                    searchSuggestion && searchSuggestion.length > 0 && searchSuggestion.map((item: any) => (
                                        <li key={item.id} className='h-[40px] overflow-hidden line-clamp-2' >
                                            <Link className="text-base border-primary border-b pb-[7px]   " onClick={() => setIsDialogOpen(!isDialogOpen)} href={`/search?query=${item.query}`} >{item?.query}</Link>
                                        </li>
                                    ))
                            }

                            <li className='h-[40px] overflow-hidden line-clamp-2' ></li>

                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
