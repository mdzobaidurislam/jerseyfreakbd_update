"use client"
import { productStore } from '@/lib/hooks/useProductStore';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface ChoiceOption {
    name: string;
    title: string;
    options: string[];
}

interface ColorOption {
    id: number;
    name: string;
    code: string;
}

interface ProductOptionsProps {
    id: number;
    choice_options?: ChoiceOption[];
    colors?: ColorOption[];
    stocks?: [];
}
interface ChoiceOption {
    title: string;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({ id, choice_options, colors,stocks }: any) => {
    const { setQty, setPriceValue, combinationName, setCombinationName, setCombinationId } = productStore();
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [selectedColor, setSelectedColor] = useState('');
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
                console.log(response.data)
                // return false
                if (response.data) {
                    setPriceValue(response.data.price_string);
                    setQty(response.data.stock);
                    setCombinationName(response.data.variant)
                    setCombinationId(response.data.id)
                }

            } catch (error) {
                console.log(error)
            }


        }
    }

    return (
        <div className='flex-col flex gap-4'>
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
                                } className={` cursor-pointer max-w-max grow-0 shrink-0 flex flex-col h-[50px] py-[8px] px-[20px] items-center ${selectedOptions[option.title] === item ? '!border-[#E01F26] ' : ''}   justify-center border-[1px] 
                            
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
        </div>
    );
};

export default ProductOptions;

