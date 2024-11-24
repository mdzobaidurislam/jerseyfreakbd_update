
import * as React from "react"
import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import CollectionSection from "./data"
import { API_BASE_URL } from "@/app/config/api"
import { fetchData } from "@/lib/dataFetching"
import MobileNav from "./MobileNav"

export async function getMenu(): Promise<any> {
    const response = await fetchData<any>(`${API_BASE_URL}/categories/menu`, { revalidate: 10 });
    return response.data as any;
}

export default async function Navbar({ setting }: any) {
    const menus = await getMenu();

    return (
        <div id="headerTop" className="sticky h-fit top-0 z-50">
            <div className="bg-p_light hidden lg:block login_header  " >
                <div className="container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8  flex justify-center items-center gap-4 md:gap-[35px] xl:gap-[37px] flex-wrap  ">

                    <div className="flex items-center justify-center flex-wrap gap-4">
                        {
                            menus && menus?.map((item: any) => (
                                <HoverCard key={item.id} openDelay={0}>
                                    <HoverCardTrigger asChild>
                                        <div className="cursor-pointer  py-[1.2rem] transition-all relative   nav_menu_item   duration-300 ease-in-out group" >
                                            <div className="flex flex-col  transition-all  hover:translate-y-[-3px]   text-accent-lightPink text-base  uppercase font-medium  hover:font-bold   ">
                                                <Link href={`/category/${item.slug}`} legacyBehavior passHref className="  "   >{item.name}</Link>
                                            </div>
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="HoverCardContent relative -top-1 z-10  "  >
                                        {
                                            item.children.length > 0 &&

                                            <CollectionSection children={item.children} item={item} />
                                        }
                                    </HoverCardContent>
                                </HoverCard>
                            ))
                        }
                    </div>

                </div>

            </div>
            <MobileNav menus={menus} setting={setting} />
        </div>
    )
}


