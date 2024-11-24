"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import CartItem from './CartItem';
import { useRouter } from 'next/navigation';
import { productStore } from '@/lib/hooks/useProductStore';

export default function SideCart() {
    const { openCart, setOpenCart } = productStore()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);
    // const [summary, setSummary] = useState<any>(null);
    const { setTempUserId, temp_user_id } = useCartStoreData((state) => ({
        setTempUserId: state.setTempUserId,
        temp_user_id: state.temp_user_id,
    }));
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, cartData, totalQuantity } = useCartStoreData();
    const isLoggedIn = !!cookieValue?.user?.id;
    const userId = isLoggedIn ? cookieValue?.user?.id : temp_user_id;

    const [summary, setSummary] = useState<any>({
        sub_total: 0,
        discount: 0,
        grand_total: 0,
    });

    useEffect(() => {
        calculateSummary();
    }, [cartData]);

    const calculateSummary = () => {
        let subTotal = 0;
        let totalDiscount = 0;
        cartData?.forEach((parentItem: any) => {
            parentItem.cart_items.forEach((item: any) => {
                const itemTotal = item.price * item.quantity;
                const discountForItem = (item.previous_price - item.price) * item.quantity;
                subTotal += itemTotal;
                totalDiscount += discountForItem;
            });
        });

        // Calculate the grand total
        const grandTotal = subTotal - totalDiscount;

        setSummary({
            sub_total: subTotal,
            discount: totalDiscount,
            grand_total: grandTotal,
        });
    };



    // useEffect(() => {
    //     if (cookieValue) {

    //         getSummary()
    //     }
    // }, [cookieValue])

    // summary 
    const getSummary = async () => {
        try {
            const response: any = await axios.post(
                `/api/cart/summary`,
                {
                    user_id: cookieValue?.user?.id,
                }
            );

            setSummary(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    const decreaseQty = (id: any, qty: any) => {
        if (qty > 1) {
            let qtyD = qty - 1
            changeQuantity(id, qtyD)
        }

    };

    const increaseQty = (id: any, qty: any) => {
        let qtyD = qty + 1
        changeQuantity(id, qtyD)
    };

    const handleDelete = async (id: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/cart/delete', {
                id: id,
            });
            const data = response.data;


            const responseData: any = await axios.post(
                `/api/cart/get`,
                {
                    user_id: userId || null,
                }
            );
            setCartData(responseData.data.data, responseData.data.totalQuantity);

            // getSummary()
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const changeQuantity = async (id: any, qty: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/cart/change-quantity', {

                quantity: qty,
                id: id,
            });
            const data = response.data;

            const responseData: any = await axios.post(
                `/api/cart/get`,
                {
                    user_id: userId || null,
                }
            );
            setCartData(responseData.data.data, responseData.data.totalQuantity);

            // getSummary()
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = () => {
        // window.location.href = '/checkout';
        setOpenCart(false)
        router.push('/checkout')
    }


    return (
        <div className='w-full lg:w-[500px]  bg-white h-full ' >
            <div className='h-full flex flex-col px-4 xl:px-8 overflow-auto'>
                <div className='flex flex-col flex-1 flex-shrink flex-basis-0  w-full '>
                    {/* header  */}

                    <div className="flex sticky top-0 justify-between items-center bg-white z-10 pb-2 pt-4 xs:pt-8 border-b-2">
                        <h2 className="antialiased font-primary leading-tighter text-inherit text-xl font-bold tracking-normal">Your bag {totalQuantity} Items</h2>
                    </div>

                    {/* content  */}
                    <div className='flex  flex-row h-full w-full mt-6 mb-6'>
                        <div className='flex flex-col w-full h-full '>
                            {/* hide-scrollbar */}

                            <div className="cart_items w-full flex flex-col  gap-6  h-full ">
                                {/* item  */}
                                {
                                    cartData && cartData?.map((parentItem: any) => (
                                        parentItem.cart_items.map((item: any) => (
                                            <>
                                                <CartItem item={item} decreaseQty={decreaseQty} increaseQty={increaseQty} handleDelete={handleDelete} />

                                            </>
                                        ))
                                    ))
                                }

                            </div>


                        </div>
                    </div>
                    {/* footer  */}

                    <div className="sticky bottom-0  bg-white pt-2 pb-3 xs:pb-6  z-10 " >

                        <h3 className='text-[18px] text-neutral-black font-semibold  px-4 mt-4 bg-white '>Cart Details</h3>
                        <div className="details_cart flex px-4 py-1.5 flex-col gap-2 bg-white">
                            <div className="cart_details_item flex justify-between ">
                                <div className=' text-neutral-black text-base' >Product Price:</div>
                                <div className=' text-neutral-black text-base'>৳{summary && summary?.sub_total}</div>
                            </div>

                            <div className="cart_details_item flex justify-between ">
                                <div className=' text-neutral-black text-base' >Quantity of product:</div>
                                <div className=' text-neutral-black text-base'>{totalQuantity}</div>
                            </div>
                            {/* <div className="cart_details_item flex justify-between ">
                                <div className=' text-neutral-black text-base' >Discount :</div>
                                <div className=' text-neutral-black text-base'>৳{summary && summary?.discount}</div>
                            </div> */}

                        </div>

                        <div className="cart_details_item flex justify-between pt-3 p-4 bg-white ">
                            <div className=' text-neutral-black text-lg font-semibold ' >Total amount :</div>
                            <div className=' text-primary text-lg font-semibold '>৳{summary && summary?.grand_total}</div>
                        </div>
                        <div className="flex flex-col flex-1 flex-shrink flex-basis-0" >


                            <div className="flex  xs:flex-row xs:space-x-6">
                                <button onClick={() => {
                                    setOpenCart(false)
                                    router.push('/')
                                }}

                                    className="align-middle select-none font-sans font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none justify-center text-lg py-3 md:px-6 rounded-[16px] text-deep-purple-700 hover:underline active:text-deep-purple-900 active:bg-transparent border-none focus:no-underline focus:text-deep-purple-900 focus:bg-deep-purple-300 basis-full" type="button" ><span className="antialiased leading-tighter tracking-tight text-inherit text-md font-primary font-semibold">Continue Shopping</span></button>
                                <button onClick={handleCheckout} className="
  align-middle select-none font-sans font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-lg py-3 md:px-6 rounded-[16px] text-white shadow-md shadow-deep-purple-500/20 hover:to-deep-purple-700 hover:shadow-lg hover:deep-purple-500/40 active:opacity-[0.85] active:ring-4 active:ring-gray-200/40 justify-center bg-gradient-to-t from-deep-purple-700 to-purple-700 focus:bg-gradient-to-t focus:from-deep-purple-900 focus:to-deep-purple-700 focus:shadow-lg focus:shadow-deep-purple-500/40 basis-full">
                                    <span className="antialiased leading-tighter tracking-tight text-inherit text-md font-primary font-semibold">
                                        Checkout
                                    </span>
                                </button>


                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
