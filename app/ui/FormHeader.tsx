import React from 'react'

export default function FormHeader({ setActiveForm, activeForm }: any) {
    return (
        <div className=" flex items-center justify-center mb-3 w-full ">

            <button onClick={() => setActiveForm(0)} className={` ${activeForm === 0 ? 'relative bg-gradient-to-tr from-[#657CBD] to-[#8E2581]  z-50 border-[#8E2581]' : 'bg-transparent border-white'}   text-white text-[18px] xl:text-[18px] py-[10px] xl:py-[14px] px-[50px] xl:px-[50px] rounded-[15px]  focus:outline-none  mr-[-20px] border-[1px]  `}>
                Login
            </button>

            <button onClick={() => setActiveForm(1)} className={`relative  ${activeForm === 0 ? 'bg-transparent border-white ' : 'bg-gradient-to-tr from-[#657CBD] to-[#8E2581]  z-50 border-[#8E2581]'}   text-white border-[1px]  text-[18px] xl:text-[18px] py-[10px] xl:py-[14px] px-[40px] xl:px-[40px] rounded-[15px] hover:bg-transparent focus:outline-none`}>
                Sign Up
            </button>
        </div>
    )
}
