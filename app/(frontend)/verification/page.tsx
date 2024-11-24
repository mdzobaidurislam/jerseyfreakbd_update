import TitleLoginHeading from '@/app/ui/LoginCoomponent/TitleLoginHeading'
import { OtpForm } from '@/app/ui/OtpForm'
import React from 'react'

export default function page() {
    return (
        <div className="relative mx-auto flex w-full flex-col space-y-2.5 lg:p-4 lg:w-[630px] ">
            <div className='grid grig-cols-1  w-full ' >
                <div className="flex-1  bg-gray-50 px-6 pb-8 pt-8  flex-col gap-6 flex form_area rounded-[30px]  ">
                    <TitleLoginHeading title="Sign Up with" />
                    <OtpForm />
                </div>
            </div>
        </div>
    )
}
