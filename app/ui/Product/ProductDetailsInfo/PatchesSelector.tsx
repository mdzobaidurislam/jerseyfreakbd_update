"use client"
import { BASE_URL } from "@/app/config/api";
import React, { useState } from "react";

const PatchesSelector = ({ handlePatch, productDetails }: any) => {
    const patchImageData = productDetails?.patchData
    const [selectedPatch, setSelectedPatch] = useState("patch_none");
    const handlePatchChange = (price: number, type: any) => {
        setSelectedPatch(type);
        handlePatch(price, type)
    };

    return (
        <div className="patches flex flex-col gap-2">
            <div className='text-neutral-black text-base' >{productDetails?.translate?.patch}  :  </div>
            <ul className="selectable-list gap-4 md:gap-0 flex flex-col md:flex-row flex-wrap ">
                <li className={`max-w-max cursor-pointer flex mr-[10px] border-b-[2px] ${selectedPatch == 'patch_none' ? 'border-[#ff2850]' : 'border-[#C2B9B9]'} `} onClick={() => handlePatchChange(productDetails?.patch_none_price, 'patch_none')} >

                    <div >{productDetails?.translate?.none}</div>
                </li>

                {
                    patchImageData.map((item: any) => (


                        <li key={item.id} className={` max-w-max flex mr-[10px] border-b-[2px] ${selectedPatch == item?.type ? 'border-[#ff2850]' : 'border-[#C2B9B9]'} `} onClick={() => handlePatchChange(item?.price, item?.type)}>

                            <div className="flex cursor-pointer ">
                                <span className="patch--preview mr-[10px]">
                                    <img
                                        className="w-auto h-[50px] "
                                        src={`${BASE_URL}/public/${item?.url}`}
                                        alt=""
                                    />
                                </span>
                                <span className="flex flex-col items-start">
                                    <span className="">{item?.title}</span>
                                    <span className=" text-accent-lightPink text-[12px] mt-[5px] ">+ ৳{item?.price}</span>
                                </span>
                            </div>
                        </li>
                    ))
                }

            </ul>
        </div>
    );
};

export default PatchesSelector;
