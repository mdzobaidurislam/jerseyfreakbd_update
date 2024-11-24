"use client"
import React from 'react';

const StepProgressBar = ({ currentStep }: any) => {
    return (
        <div className="w-full relative flex items-center justify-between mb-8 mt-8">
            {/* Background bar */}
            <div className="absolute left-0 top-2/4 h-3 w-full -translate-y-2/4 rounded bg-[#D9D9D9] "></div>
            {/* Progress bar */}
            <div
                className="absolute left-0 top-2/4 h-3 -translate-y-2/4 rounded transition-all duration-500 bg-accent-lightPink"
                style={{
                    width: `${currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'}`,
                }}
            ></div>

            {/* Step 1: Your details */}
            <div
                className={`relative z-10 place-items-center w-[32%] lg:w-[25%]  py-[14px] items-center rounded-full font-normal transition-all duration-300 px-1 text-sm flex text-center justify-center 
        ${currentStep >= 1 ? 'bg-white border-accent-lightPink text-accent-lightPink' : 'bg-white border-gray-300 text-gray-500'} 
        border`}
            >
                <span className="w-fit leading-4 font-bold text-sm md:text-2xl ">Your details</span>
            </div>

            {/* Step 2: Shipping */}
            <div
                className={`relative z-10 place-items-center w-[32%] lg:w-[25%] py-[14px] items-center rounded-full font-normal transition-all duration-300 px-1 text-sm flex text-center justify-center 
        ${currentStep >= 2 ? 'bg-white border-accent-lightPink text-accent-lightPink' : 'bg-white border-deep-purple-300 text-gray-500'} 
        border`}
            >
                <span className="w-fit leading-4 font-bold text-sm md:text-2xl">Shipping</span>
            </div>

            {/* Step 3: Payment */}
            <div
                className={`relative z-10 place-items-center w-[32%] lg:w-[25%] py-[14px] items-center rounded-full font-normal transition-all duration-300 px-1 text-sm flex text-center justify-center 
        ${currentStep >= 3 ? 'bg-white border-accent-lightPink text-accent-lightPink' : 'bg-white border-deep-purple-300 text-gray-500'} 
        border`}
            >
                <span className="w-fit leading-4 font-bold text-sm md:text-2xl">Payment</span>
            </div>
        </div>
    );
};

export default StepProgressBar;
