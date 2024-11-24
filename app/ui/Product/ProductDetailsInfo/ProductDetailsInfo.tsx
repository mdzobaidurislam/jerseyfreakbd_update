"use client"
import React, { useState } from 'react'
import Price from '../Price/Price'
import { Rate } from 'antd'
import { ErrorIcon } from '../../Icons/Icons'
import PatchesSelector from './PatchesSelector'
import AddToCartAction from '../AddToCartAction/AddToCartAction'
import AddWishlist from '../WishAdd/AddWishlist'
import { Button } from '@/app/ui/button';
import { AlertCircle, CheckCircle, Forward, X } from 'lucide-react'
import Description from '../DeteilsPage/Description'
import { productStore } from '@/lib/hooks/useProductStore'
import axios from 'axios'
import { BASE_URL } from '@/app/config/api'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import ImageGallery from './GalleryImageSlide'
import SocialLink from '../DeteilsPage/SocialLink'
import useCartStoreData from '@/lib/hooks/useCartStoreData'
import RequestProduct from './RequestProduct'
import YouTubeEmbed from './YouTubeEmbed'
import ProductOptions from './ProductOptions'

export default function ProductDetailsInfo({ productDetails }: any) {
    const patchImageData = [
        {
            id: 1,
            type: 'patch_league',
            url: `${BASE_URL}/public/${productDetails?.patch_league_batch}`,

        },
        {
            id: 2,
            type: 'patch_serie',
            url: `${BASE_URL}/public/${productDetails?.patch_serie_batch}`,

        },
    ]
    const [isSizeModal, setIsSizeModal] = useState(false);
    const [isShareModal, setIsShareModal] = useState(false);
    const [isRequestModal, setIsRequestModal] = useState(false);
    const [requestVariation, setRequestVariation] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [successModal, setSuccessModal] = useState<boolean>(false);


    const [patch_image, setPatch_image] = useState('')
    const [patch_type, setPatch_type] = useState('patch_none')
    const [player_number_img, setPlayer_number_img] = useState([])
    const [player_name_img, setPlayer_name_img] = useState([])
    const [productError, setProductError] = useState<any>({
        sizeError: ''
    })
    const typeDefine = {
        none: 'none',
        custom: 'custom',
        patch_none: 'patch_none',
        patch_league: 'patch_league',
        patch_serie: 'patch_serie',
    }
    const { setResetProduct, resetProduct } = useCartStoreData();
    setResetProduct(productDetails.id)
    const { setPersonalize, personalize, setPatchPrice, setQty, setPriceValue, combinationName, setCombinationName, addToCartOption, setAddToCartOption } = productStore();
    const handlePersonalize = (id: any, type: any) => {

        if (type === typeDefine.none) {
            setPlayer_name_img([])
            setPlayer_number_img([])
            setAddToCartOption({
                ...addToCartOption,
                personalize_selected: type,
                player_number_name_price: 0,
                playerName: [],
                playerNumber: [],
            })


        } else {
            setAddToCartOption({
                ...addToCartOption,
                personalize_selected: type,
            })
        }
        setPersonalize(type)


        setProductError({
            ...productError,
            pError: ''
        })
    }
    // handlePatch 
    const handlePatch = async (priceP: number, type: any) => {
        setPatch_type(type)
        setPatchPrice(priceP)
        setAddToCartOption({
            ...addToCartOption,
            patch_selected: type,
            patch_selected_price: typeDefine.patch_none !== type ? priceP : 0
        })
        try {
            const exist = patchImageData.find((item) => item.type === type)

            if (exist) {
                setPatch_image(exist?.url)

            } else {
                setPatch_image('')
            }

        } catch (error) {
            console.log(error)
        }


    }

    //    get player number 
    const getPlayerNumber = async (data: any) => {
        try {
            const response: any = await axios.post(`/api/jersey/number`, {
                data: {
                    data: data,
                    jersey_color_id: productDetails?.jersey_color_id
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const getPlayerName = async (data: any) => {
        try {
            const response: any = await axios.post(`/api/jersey/name`, {
                data: {
                    data: data,
                    jersey_color_id: productDetails?.jersey_color_id
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handlePlayerNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.toUpperCase();
        const regex = /^[A-Za-z]*$/;
        if (!regex.test(input)) {
            return;
        }
        if (input === '') {
            setPlayer_name_img([]);
            return;
        }

        if (input.length <= 10) {
            const inputArray = input.split('');
            setAddToCartOption({
                ...addToCartOption,
                playerName: inputArray
            })
            try {
                const result = await getPlayerName(inputArray);
                setPlayer_name_img(result);
            } catch (error) {
                console.error('Error fetching player number:', error);
            }
            setAddToCartOption({
                ...addToCartOption,
                player_number_name_price: productDetails.player_number_name_price,
            })
        } else {
            setAddToCartOption({
                ...addToCartOption,
                player_number_name_price: 0,
            })
        }
    };

    const handleNumberChange = async (e: any) => {
        let input = e.target.value;
        if (input == '') {
            setPlayer_number_img([])
            return false
        }
        if (input.length <= 2 && /^[0-9]*$/.test(input)) {
            if (input.length === 1) {
                setAddToCartOption({
                    ...addToCartOption,
                    playerNumber: [input]
                })
                const result = await getPlayerNumber([input]);
                setPlayer_number_img(result)
            }
            if (input.length === 2) {
                const firstDigit = input.charAt(0);
                const secondDigit = input.charAt(1);
                setAddToCartOption({
                    ...addToCartOption,
                    playerNumber: [firstDigit, secondDigit]
                })
                try {
                    const result = await getPlayerNumber([firstDigit, secondDigit]);
                    setPlayer_number_img(result)
                } catch (error) {
                    console.error('Error fetching player number:', error);
                }
            }
            setAddToCartOption({
                ...addToCartOption,
                player_number_name_price: productDetails.player_number_name_price,
            })
        } else {
            setAddToCartOption({
                ...addToCartOption,
                player_number_name_price: 0,
            })
        }
    };
    const handleSize = async (item: any) => {
        if (item) {
            try {
                const response: any = await axios.post(
                    `/api/variant`, {
                    id: productDetails?.id,
                    variants: item.variant
                });
                if (response.data) {
                    setPriceValue(response.data.price);
                    setQty(response.data.stock);
                    setCombinationName(response.data.variant)
                }
                setProductError({
                    ...productError,
                    sizeError: ''
                })

                // return response.data.data;

            } catch (error) {
                console.log(error)
            }

            // const variantPrice = productDetails?.stocks.find((itemP: any) => itemP.id === item.id) as any
            // if (variantPrice) {
            //     setPriceValue(variantPrice.price);
            //     setQty(variantPrice.qty);
            //     setCombinationName(item.variant)
            // }
            // setProductError({
            //     ...productError,
            //     sizeError: ''
            // })
        }
    }
    // handleRequest 
    const handleRequest = (item: any) => {
        setRequestVariation(item.id)
        setIsRequestModal(true)
    }

    return (
        <div className='gap-4 lg:grid lg:grid-cols-2 flex flex-col  items-start  justify-center w-full max-w-full '>
            <div className="gallery--wrapper relative m-auto lg:m-0 ">
                <ul className="product--gallery justify-center ">
                    <li className={` !flex-1 !basis-full ${personalize?.type === typeDefine.custom || patch_type === typeDefine.patch_league || patch_type === typeDefine.patch_serie ? 'preview' : 'hide'}`}>
                        <figure>
                            {
                                productDetails?.jersey_preview && <img id="customization-base" alt={productDetails?.name} src={`${BASE_URL}/public/${productDetails?.jersey_preview}`} />
                            }

                            {/*player name  */}
                            <div className="output--custom -tn0">
                                {
                                    player_name_img?.map((item: any, index: number) => (
                                        <img key={index} src={`${BASE_URL}/public/${item.url}`} aria-hidden="true" />
                                    ))
                                }

                            </div>
                            {/* jersey number  */}
                            <div className="output--custom -tn1">
                                {
                                    player_number_img.length > 0 && player_number_img.map((item: any, index) => (
                                        <img src={`${BASE_URL}/public/${item.url}`} aria-hidden="true" key={index} />
                                    ))
                                }

                            </div>
                            {/* patch start */}
                            <div className="output--custom -p0">
                                {
                                    patch_image && <img src={patch_image} />
                                }

                            </div>
                            {/* patch end */}
                        </figure>
                    </li>
                    <ImageGallery productDetails={productDetails} />
                </ul>

                {/* youtube video link  */}
                <YouTubeEmbed videoLink={productDetails?.video_link} />
            </div>

            {/* product content info  */}
            <div className=" pl-3 customizer--options flex flex-col gap-4 sticky h-fit top-0 w-full lg:w-auto ">

                <h4 className="brand_name text-neutral-black text-base  ">{productDetails?.brand.name}</h4>
                <h2 className='title  text-neutral-black font-semibold text-2xl ' >{productDetails?.name}</h2>

                <div className="review  flex items-center justify-start">
                    <Rate allowHalf disabled defaultValue={productDetails.rating} className='text-accent-lightPink' />

                </div>
                <div className="code"> <strong>{productDetails?.translate?.product_code}:</strong> {productDetails?.stocks[0]?.sku} </div>
                {/* price section  */}
                <div className="price_area flex items-center gap-2 justify-between  ">
                    <div className="price flex items-center gap-2 justify-center">
                        <Price productDetails={productDetails} />
                        {
                            productDetails.has_discount && productDetails.discount > 0 &&
                            <div className="offer max-w-max  mx-auto rounded-[12px] px-[15px] py-[6px] text-[12px] ">
                                <span>{productDetails.discount}{productDetails?.discount_off_text} </span>
                            </div>
                        }
                    </div>

                </div>
                {/* stocks start  */}
                {
                    productDetails?.choice_options.length > 0 &&

                    <div className="choose_size flex flex-col gap-3">

                        <div className='flex justify-between items-center '>
                            <div className='text-neutral-black text-base' >{productDetails?.translate?.choose_ize}  : {combinationName} </div>
                            {
                                productDetails?.sizeChart &&
                                <div onClick={() => setIsSizeModal(true)} className=' cursor-pointer size_chart border-[1px] border-[#C2B9B9] px-[6px] lg:px-[10px] py-[6px] text-center text-sm lg:text-lg '>
                                    {productDetails?.translate?.size_chart}</div>
                            }
                        </div>
                        <ProductOptions id={productDetails?.id} choice_options={productDetails?.choice_options} colors={productDetails?.colors} />

                        {/* <div className="options flex flex-wrap gap-3 w-full ">
                        {
                            productDetails?.stocks && productDetails?.stocks.map((item: any) => (
                                <div onClick={() => {
                                    if (item?.available) {
                                        handleSize(item)
                                    } else {
                                        handleRequest(item)
                                    }
                                }
                                } key={item.id} className={` cursor-pointer basis-[20%] grow-0 shrink-0 flex flex-col h-[50px] py-[8px] px-[10px] items-center ${combinationName === item.variant ? '!border-[#E01F26] ' : ''}   justify-center border-[1px] ${!item?.available ? 'bg-[#d0fafa] cursor-not-allowed  ' : ' border-[#C2B9B9]'}  max-w-max `}>
                                    <span className={`font-bold text-sm  ${combinationName === item.variant ? '!text-[#E01F26]' : ''} text-neutral-black  `} >{item?.variant}</span>
                                    <span className={`${combinationName === item.variant ? '!text-[#E01F26]' : ''} text-accent-lightPink text-sm`} >{item?.available_text}</span>
                                </div>
                            ))
                        }

                    </div> */}
                        {
                            productError?.sizeError &&

                            <div className="error_msg flex items-center gap-2 ">
                                <ErrorIcon /> <span className='text-[#E01F26]' >{productError?.sizeError}</span>
                            </div>
                        }
                    </div>
                }
                {/* stocks end  */}
                {/* PERSONALIZE  */}
                {
                    productDetails?.custom_jersey_on_off && productDetails?.custom_jersey_on_off > 0 &&
                    <>
                        <div className="personal_product flex flex-col gap-4">
                            <div className='flex justify-between items-center '  >
                                <div className='text-neutral-black text-base' >{productDetails?.translate?.personalize_your_product}:  </div>
                            </div>
                            <div className='flex items-center gap-3 ' >
                                <div className={` cursor-pointer flex flex-col py-[8px] px-[24px] items-center justify-center border-[2px] ${typeDefine.none == personalize?.type ? 'border-[#ED1C24]' : 'border-[#C2B9B9]'} min-w-[170px]`} onClick={() => handlePersonalize(productDetails?.id, typeDefine.none)}>
                                    <span className='font-bold text-sm text-[#ED1C24]  ' >{productDetails?.translate?.none}</span>
                                </div>

                                <div className={`cursor-pointer flex flex-col py-[8px] px-[24px] items-center justify-center border-[2px] ${typeDefine.custom == personalize?.type ? 'border-[#ED1C24]' : 'border-[#C2B9B9]'}  min-w-[170px]`} onClick={() => handlePersonalize(productDetails?.id, typeDefine.custom)}>
                                    <span className='font-bold text-sm text-accent-lightPink  ' >{productDetails?.translate?.custom}</span>
                                </div>
                            </div>
                            {
                                personalize?.type === typeDefine.custom &&

                                <div className="flex space-x-4">
                                    {/* Name Field */}
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            onChange={handlePlayerNameChange}
                                            type="text"
                                            id="name"
                                            maxLength={10}
                                            placeholder="Max 10 chars"
                                            className=" uppercase mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Max 10 chars</p>
                                    </div>

                                    {/* Number Field */}
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="number">
                                            Number
                                        </label>
                                        <input
                                            onChange={handleNumberChange}
                                            type="text"
                                            id="number"
                                            maxLength={2}
                                            placeholder="Max 2 chars"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Max 2 chars</p>
                                    </div>
                                </div>
                            }
                            {
                                productError?.pError &&

                                <div className="error_msg flex items-center gap-2 ">
                                    <ErrorIcon /> <span className='text-[#E01F26]' >{productError?.pError}</span>
                                </div>
                            }

                        </div>

                        <PatchesSelector productDetails={productDetails} handlePatch={handlePatch} />
                    </>
                }
                {/* quantity  */}
                <AddToCartAction

                    setRequestVariation={setRequestVariation}
                    setIsRequestModal={setIsRequestModal}

                    {...productDetails} setMessage={setMessage} setSuccessModal={setSuccessModal} productError={productError} setProductError={setProductError} />
                <div className=" flex items-center gap-6 ">
                    <AddWishlist id={productDetails.id} />
                    <Button onClick={() => setIsShareModal(true)} className='group px-[20px] justify-center md:px-[30px] w-[50%] md:max-w-max bg-black border-black border-[2px] text-base !text-primary uppercase hover:bg-transparent'>
                        <div className="flex items-center space-x-2">
                            <Forward className='text-white font-bold w-[20px] group-hover:text-black' />
                            <span className='text-white text-sm font-bold group-hover:text-black  '>{productDetails?.translate?.share}</span>
                        </div>
                    </Button>
                </div>
                <Description data={productDetails} />

            </div>
            {/* modal  */}
            {/* size chart open model start  */}
            {isSizeModal && productDetails?.sizeChart && (
                <Dialog open={isSizeModal} onOpenChange={setIsSizeModal}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >
                        <div className='bg-white relative'>
                            <div onClick={() => setIsSizeModal(false)} className=' cursor-pointer absolute top-0 right-0 ' >
                                <X className='text-black' />
                            </div>
                            <div className=" bg-white pt-8 p-4 text-center rounded-lg overflow-x-auto max-w-[100vw] md:w-full">

                                <div className=' text-sm md:text-base text-neutral-black  ' dangerouslySetInnerHTML={{
                                    __html: productDetails?.sizeChart
                                }} />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            {/* size chart open model end  */}
            {/* size chart open model start  */}
            {isShareModal && (
                <Dialog open={isShareModal} onOpenChange={setIsShareModal}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >
                        <div className='bg-white relative'>
                            <div onClick={() => setIsShareModal(false)} className=' cursor-pointer absolute top-0 right-0 ' >
                                <X className='text-black' />
                            </div>
                            <SocialLink slug={productDetails.slug} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            {/* size chart open model end  */}

            {/* size chart open model start  */}
            {isRequestModal && (
                <Dialog open={isRequestModal} onOpenChange={setIsRequestModal}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >
                        <div className='bg-white relative'>
                            <div onClick={() => setIsRequestModal(false)} className=' cursor-pointer absolute top-0 right-0 ' >
                                <X className='text-black' />
                            </div>
                            <RequestProduct setSuccessModal={setSuccessModal} setMessage={setMessage} product_id={productDetails?.id} requestVariation={requestVariation} setRequestVariation={setRequestVariation} setIsRequestModal={setIsRequestModal} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            {/* size chart open model end  */}

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
    )
}
