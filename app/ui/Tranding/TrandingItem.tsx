import Image from 'next/image'
import React from 'react'

export default function TrandingItem({ desk }: any) {
    return (
        <div className={`col-span-1`}  >
            <div className={`w-[350px] h-[369px] `} >
                <Image
                    src={`http://jerseyfreak.test/public/uploads/all/6zqH42OY9wptazm3xr6E4sRZZpyHh4eoHDKdFBzL.png`}
                    width={desk ? 375 : 375}
                    height={desk ? 394 : 394}
                    alt="offer"
                    className="col-span-1 object-contain transition-transform duration-300 ease-in-out transform"
                />
            </div>
            <div className='p-3 sm:p-0 flex flex-col items-center justify-center '>
                <h3 className='text-xl font-bold  pb-[10px]  pt-3 text-center w-full flex items-center justify-center gap-2 ' > <span>Real Madrid</span> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                    <path d="M-2.7197e-07 3.37523L-1.21433e-07 6.81911L6.56566 6.81911L6.56566 9.59717L13 5.09717L6.56566 0.597167L6.56566 3.37523L-2.7197e-07 3.37523Z" fill="black" />
                </svg> </h3>
            </div>
        </div>
    )
}
