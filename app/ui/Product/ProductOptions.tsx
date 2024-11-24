"use client"
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { productStore } from '@/lib/hooks/useProductStore';
import axios from 'axios';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import RequestProduct from './ProductDetailsInfo/RequestProduct';

interface ChoiceOption {
    name: string;
    title: string;
    options: string[];
}

interface ProductOptionsProps {
    choice_options?: ChoiceOption[];
    stocks?: any[];
    colors?: any[];
    id?: number;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ id, colors, choice_options, stocks }) => {
    const { setQty, setPriceValue, combinationName, setCombinationName, variantImage, setVariantImage } = productStore();
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [selectedColor, setSelectedColor] = useState('');
    const [isRequestModal, setIsRequestModal] = useState(false);
    const [requestVariation, setRequestVariation] = useState<any>(null);

    const [productError, setProductError] = useState<any>({
        sizeError: ''
    })
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const [message, setMessage] = useState<any>(null);
    const [selectedColorId, setSelectedColorId] = useState('');

    useEffect(() => {
        if (colors && colors.length > 0) {
            setSelectedColor(colors[0].name);
            setSelectedColorId(colors[0].id)
        }
        if (choice_options && choice_options.length > 0) {
            const defaultSelected: { [key: string]: string } = {};
            choice_options.forEach((option: any) => {
                if (option.options.length > 0) {
                    defaultSelected[option.title] = option.options[0];
                }
            });
            setSelectedOptions(defaultSelected);
        }

    }, [choice_options, colors]);

    useEffect(() => {
        const optionCombination = choice_options && choice_options.map((option: ChoiceOption) => selectedOptions[option.title]).filter(Boolean).join('-');
        if (optionCombination) {
            handleSize(`${selectedColor ? selectedColor + '-' : ''}${optionCombination}`)
        } else {
            handleSize(`${selectedColor ? selectedColor : ''}${optionCombination}`)
        }
    }, [selectedOptions, selectedColor]);

    const handleOptionChange = (title: string, option: string) => {
        setSelectedOptions((prevSelected) => ({
            ...prevSelected,
            [title]: option,
        }));
    };
    const handleColorChange = (color: any) => {
        setSelectedColor(color?.name);
    };


    const handleSize = async (value: string) => {
        if (value) {
            try {
                const response: any = await axios.post(
                    `/api/variant`, {
                    id: id,
                    variants: value
                });
                if (response.data) {
                    setPriceValue(response.data.price_string);
                    setQty(response.data.stock);
                    setCombinationName(response.data.variant)
                    setVariantImage(response.data.image)
                }

            } catch (error) {
                console.log(error)
            }


        }
    }

    // handleRequest 
    const handleRequest = (item: any) => {
        console.log(item)
        setRequestVariation(item.id)
        setIsRequestModal(true)
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className="options flex flex-wrap gap-3 w-full ">
                {/* {
                    stocks && stocks.map((item: any) => (
                        <div onClick={() => {
                            if (item?.available) {
                                handleSize(item)
                            } else {
                                handleRequest(item)
                            }
                        }
                        } key={item.id} className={` cursor-pointer basis-[30%] grow-0 shrink-0 flex flex-col h-[50px] py-[8px] px-[10px] items-center ${combinationName === item.variant ? '!border-[#E01F26] ' : ''}   justify-center border-[1px] ${!item?.available ? 'bg-[#d0fafa] cursor-not-allowed  ' : ' border-[#C2B9B9]'}  max-w-max `}>
                            <span className={`font-bold text-sm  ${combinationName === item.variant ? '!text-[#E01F26]' : ''} text-neutral-black  `} >{item?.variant}</span>
                            <span className={`${combinationName === item.variant ? '!text-[#E01F26]' : ''} text-accent-lightPink text-[12px]`} >{item?.available_text}</span>
                        </div>
                    ))
                } */}

            </div>

            {choice_options && choice_options.length > 0 && choice_options.map((option: any) => (
                <div key={option.name} className=' flex items-center justify-start gap-2 flex-wrap lg:flex-nowrap ' >
                    <h4>{option.title}:</h4>
                    <div className='flex gap-2 flex-wrap'>
                        {option.options.map((item: any, index: any) => (
                            <div
                                key={index}
                                onClick={() => {
                                    handleOptionChange(option.title, item)
                                    // if (item?.available) {
                                    //     handleSize(item)
                                    // } else {
                                    //     handleRequest(item)
                                    // }
                                }
                                } className={` cursor-pointer  grow-0 shrink-0 flex flex-col h-[30px] lg:h-[50px] py-1 md:py-[8px] px-2 md:px-[20px] items-center ${selectedOptions[option.title] === item ? '!border-[#E01F26] ' : ''}   justify-center border-[1px] 
                            
                              max-w-max `}

                            >
                                <span className={`font-bold text-sm  ${selectedOptions[option.title] === item ? '!text-[#E01F26]' : ''} text-neutral-black  `} >{item}</span>
                                <span className={`${selectedOptions[option.title] === item ? '!text-[#E01F26]' : ''} text-accent-lightPink text-sm`} >{item?.available_text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {colors && colors.length > 0 && (
                <div className='flex items-center justify-start  gap-3'>
                    <h4 className='uppercase'>Color:</h4>
                    <div className='flex gap-2 flex-wrap'>
                        {colors.map((color: any, index: any) => (
                            <div key={index} onClick={() => {
                                setSelectedColorId(color.id)
                                handleColorChange(color)
                            }} className='cursor-pointer' >

                                <div className={`flex gap-1  rounded-full items-center w-full ${selectedColorId === color.id
                                    ? 'border-2 border-[#E01F26]'
                                    : 'border border-gray-300'
                                    } `}>
                                    <div className="border rounded-full m-1"><div className="rounded-full overflow-hidden w-[16px] h-[16px]" style={{ backgroundColor: color.code }}></div>
                                    </div>
                                    {
                                        selectedColorId === color.id &&
                                        <div className="addToCart text-center flex items-center justify-center">
                                            <div className="flex grow pr-1.5 items-center justify-center">
                                                <p className="text-sm font-semibold line-clamp-1">{color?.name}</p>
                                            </div>
                                        </div>
                                    }

                                </div>



                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isRequestModal && (
                <Dialog open={isRequestModal} onOpenChange={setIsRequestModal}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >
                        <div className='bg-white relative'>
                            <div onClick={() => setIsRequestModal(false)} className=' cursor-pointer absolute top-0 right-0 ' >
                                <X className='text-black' />
                            </div>
                            <RequestProduct setSuccessModal={setSuccessModal} setMessage={setMessage} product_id={id} requestVariation={requestVariation} setRequestVariation={setRequestVariation} setIsRequestModal={setIsRequestModal} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {successModal && (
                <Dialog open={successModal} onOpenChange={setSuccessModal}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >
                        <div className='bg-white relative p-5 rounded-lg '>
                            <div onClick={() => setSuccessModal(false)} className=' cursor-pointer absolute top-1 right-2 ' >
                                <X className='text-black' />
                            </div>
                            <div className="flex justify-center items-center mb-4">

                                {productError?.sizeError ? (
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                ) : (
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                )}

                                <h2 className={`ml-4 text-xl font-semibold ${productError?.sizeError ? 'text-red-600' : 'text-green-500'} `}>{message}!</h2>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default ProductOptions;

