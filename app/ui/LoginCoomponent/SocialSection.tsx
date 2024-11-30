import React from 'react'
import Image from 'next/image';
import ActionLoginSignUp from './ActionLoginSignUp';
import { CustomButton } from '../CustomLink';
import { signIn } from 'next-auth/react';
export default function SocialSection({ otherTitle, title = "", loginText = "", value, setActiveForm }: any) {

    return <div className="social_login flex-col flex items-center gap-[8px] justify-center">
        <h3 className='text-[#FFFCFC] text-base '>OR</h3>
        <h3 className='text-[#FFFCFC] text-base '> <span className=' font-bold '> {otherTitle}</span> with Others Account</h3>
        <div className='w-full grid grid-cols-1 lg:grid-cols-1 items-center gap-4 ' >
            <CustomButton onClick={() => signIn('facebook')} className="!hidden group button px-0 sm:px-0  items-center justify-center gap-2 hover:!text-white border-accent-lightPink border-[1px] rounded-[35px] transition duration-300 ease-in-out hover:bg-accent-lightPink ">
                <Image
                    src="/facebook.svg"
                    width={20}
                    height={20}
                    alt="email"
                    className="w-[20px] h-[20px] transition duration-300 ease-in-out "
                />
                <span className="hidden md:block text-[#FFFCFC] text-base capitalize group-hover:!text-white transition duration-300 ease-in-out">
                    Facebook
                </span>
            </CustomButton>

            <CustomButton onClick={() => signIn('google')} className="group   button flex flex-warp justify-center items-center gap-2 hover:!text-white border-accent-lightPink border-[1px] rounded-[35px] transition duration-300 ease-in-out !px-[0px] hover:bg-accent-lightPink">
                <Image
                    src="/google.svg"
                    width={20}
                    height={20}
                    alt="email"
                    className="w-[20px] h-[20px] transition duration-300 ease-in-out "
                />
                <span className=" text-[#FFFCFC] text-base capitalize group-hover:!text-white transition duration-300 ease-in-out">
                    Google
                </span>
            </CustomButton>


            <CustomButton onClick={() => signIn('apple')} className="!hidden   group w-full   button  flex-warp justify-center items-center gap-2 hover:!text-white border-accent-lightPink border-[1px] rounded-[35px] transition duration-300 ease-in-out !px-[0px] hover:bg-accent-lightPink">
                <Image
                    src="/apple.png"
                    width={20}
                    height={20}
                    alt="email"
                    className="w-[20px] h-[20px] transition duration-300 ease-in-out "
                />
                <span className="hidden md:block text-[#FFFCFC] text-base capitalize group-hover:!text-white transition duration-300 ease-in-out">
                    Apple
                </span>
            </CustomButton>

        </div>
        {/* <CustomButton onClick={() => signIn('apple')} className=" hidden  group w-full   button md:flex flex-warp justify-center items-center gap-2 hover:!text-white border-accent-lightPink border-[1px] rounded-[35px] transition duration-300 ease-in-out !px-[0px] hover:bg-accent-lightPink">
            <Image
                src="/apple.png"
                width={20}
                height={20}
                alt="email"
                className="w-[20px] h-[20px] transition duration-300 ease-in-out "
            />
            <span className="hidden md:block text-[#FFFCFC] text-base capitalize group-hover:!text-white transition duration-300 ease-in-out">
                Sign Up with Apple
            </span>
        </CustomButton> */}

        <ActionLoginSignUp title={title} loginText={loginText} value={value} setActiveForm={setActiveForm} />
    </div>

}
