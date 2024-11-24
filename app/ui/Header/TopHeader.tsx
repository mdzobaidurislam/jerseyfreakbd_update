
"use client"
import { cookieStore } from "@/lib/hooks/useCookieStore";
import { get_setting } from "@/lib/utils";
import { Car, Headset } from "lucide-react";
import Link from "next/link";
import CustomImage from "../CustomImage/CustomImage";

export default function TopHeader({ setting }: any) {

  const { translateValue } = cookieStore();
  // const notice = translateValue?.notice
  const track_order = translateValue?.track_order
  const help = translateValue?.help
  const bangladesh = translateValue?.bangladesh
  const helpline_number = get_setting(setting, 'helpline_number')?.value || "";
  const flash_deal_off = get_setting(setting, 'flash_deal_off')?.value || "";
  const flash_deal_off_link = get_setting(setting, 'flash_deal_off_link')?.value || "";
  const flash_deal_off_mobile = get_setting(setting, 'flash_deal_off_mobile')?.value || "";
  return (
    <div className="" >
      {
        flash_deal_off &&
        <a href={flash_deal_off_mobile} target="_blank" className="block lg:hidden " >

          <CustomImage src={flash_deal_off_mobile} width={1000} height={80} alt="Flash" />
        </a>
      }

      <div className="bg-accent-lightPink py-[10px] flex  "  >
        <div className="container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 flex-col lg:flex-row md:flex-row xl:flex-row  flex justify-between items-center text-white flex-wrap gap-3 ">
          <div className="top_left_text  text-base font-bold flex-1">
            {/* <p>dddddddddd{notice}</p> */}
            {
              flash_deal_off &&
              <a href={flash_deal_off_link} target="_blank" className="hidden lg:block " >

                <CustomImage src={flash_deal_off} width={1000} height={80} alt="Flash" />
              </a>
            }
          </div>
          <div className="top_right_text flex-wrap justify-center items-center flex gap-3 text-sm ">
            <Link href='/track-order'>
              <div className="flex items-center gap-9 "  >

                <Car /> <span className=" uppercase " >{track_order}</span>
              </div>
            </Link>
            <div className="flex items-center gap-9">
              <Link href={`tel:${helpline_number || ""}`} className="flex items-center gap-9 ">
                <Headset /> <span className="relative top-0"  >  {help} </span>
              </Link>
            </div>
            <div className="flex items-center gap-9">
              <img src="/icons/flag.webp" alt="" /> <span className="relative top-0"  >  {bangladesh} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
