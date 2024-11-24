"use client"
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import SignOutForm from "../SignOutForm";
import AccountNav from "./AccountNav";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import axios from "axios";
import { useEffect, useState } from "react";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import CustomImage from "../CustomImage/CustomImage";
import { get_setting } from "@/lib/utils";
import { useSession } from "next-auth/react";
import DesktopSearch from "./DesktopSearch";

export default function MiddleNav({ setting }: any) {
  const cookieValue = cookieStore((state) => state.cookieValue);
  const { translateValue } = cookieStore();
  const session: any = useSession()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { setCartData, temp_user_id, setWishlistArray } = useCartStoreData((state) => ({
    setCartData: state.setCartData,
    temp_user_id: state.temp_user_id,
    setWishlistArray: state.setWishlistArray,
  }));


  const getData = async () => {
    const userId = cookieValue?.user?.id;
    try {
      const response: any = await axios.post(
        `/api/product/wishlists/list`,
        {
          user_id: userId || null,
        }
      );
      const getIdes = response.data.data.map((item: any) => item.id)

      setWishlistArray(getIdes)

    } catch (error) {
      console.log(error)
    }
  }

  const getCart = async () => {
    const isLoggedIn = !!cookieValue?.user?.id;
    const userId = isLoggedIn ? cookieValue?.user?.id : temp_user_id;
    try {
      const response: any = await axios.post(
        `/api/cart/get`,
        {
          user_id: userId || null,
        }
      );

      setCartData(response.data.data, response.data.totalQuantity);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCart()
    getData()

  }, [cookieValue, temp_user_id])
  // header logo 

  const header_logo = get_setting(setting, 'header_logo')
  const logo_title = get_setting(setting, 'logo_title')
  const logo_description = get_setting(setting, 'logo_description')
  const sign_out = translateValue?.sign_out

  return (
    <>

      <div className="hidden md:flex  items-center justify-between container flex-col   xl:flex-row gap-6 py-[10px] lg:py-[10px] flex-wrap   mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8">
        <div className="search  gap-3 items-center hidden md:flex ">
          <div className="logo hidden md:block ">
            <Link href='/' >
              <CustomImage
                src={header_logo?.value}
                width={78}
                height={77}
                alt={`Logo`}
              />
            </Link>
          </div>
        </div>
        <div className="middle_content flex flex-col justify-center items-center xl:pl-[140px] ">
          <h4 className="text-base uppercase font-bold " >{logo_title?.value}</h4>
          <p className="text-sm capitalize ">{logo_description?.value}</p>
        </div>

        <div className="account_nav   items-center gap-[25px] flex-wrap hidden md:flex">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  >
            <div className="search_input flex relative  " onClick={() => setIsDialogOpen(!isDialogOpen)} >
              <div className="search_icon   text-base capitalize cursor-pointer flex flex-col items-center justify-center ">
                <img src="/icons/search.svg" alt="user" />
                <span>Search</span>
              </div>
            </div>

            <DialogContent className=" translate-x-0-inherit translate-y-inherit  border-0  max-w-full flex grow flex-col repeat-1 duration-300 animate-in slide-in-from-top fixed items-center  bg-white top-0 right-0 left-0 z-[999999] max-h-full search_content">
              <DesktopSearch isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </DialogContent>
          </Dialog>
          <AccountNav />



          {/* <SignOutForm sign_out={sign_out} /> */}

        </div>


      </div>


    </>
  )
}