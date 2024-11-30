"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { ProductDetails } from '@/types/api';
import { Loader2, MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import { productStore } from '@/lib/hooks/useProductStore';
import { Button } from '@/app/ui/button';

export default function AddToCartAction({
    id,
    setProductError, setMessage, setSuccessModal,
    productError,
    choice_options,
    custom_jersey_on_off,
    setIsRequestModal,
    setRequestVariation
}: any) {
    const { qtyV, combinationName, personalize, addToCartOption, setAddToCartOption, setOpenCart, combinationId } = productStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [qty, setQty] = useState<number>(1);
    const [temp_user, setTemp_user] = useState<any>(null);
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, setTempUserId, temp_user_id, cartData, totalQuantity } = useCartStoreData((state) => ({
        setCartData: state.setCartData,
        setTempUserId: state.setTempUserId,
        cartData: state.cartData,
        totalQuantity: state.totalQuantity,
        temp_user_id: state.temp_user_id,
    }));

    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    const increaseQty = () => {
        setQty(qty + 1);
    };

    const addToCartHandler = async () => {
        if (qtyV === 0) {
            setIsRequestModal(true),
            setRequestVariation(combinationId)
            return false;
        }
        if (!combinationName && choice_options.length > 0) {
            setProductError({
                ...productError,
                sizeError: 'Please select a size'
            })
            setMessage("Please select a size")
            setSuccessModal(true)
            return false
        }
        if (!personalize && custom_jersey_on_off) {
            setProductError({
                ...productError,
                pError: 'Please select a Product'
            })
            return false
        }
        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;
        let team_id = null;
        // Generate a temporary user ID if the user is not logged in and one doesn't exist
        if (!isLoggedIn && !temp_user_id) {
            team_id = setTempUserId();
            setTemp_user(team_id)
        }
        const userId = isLoggedIn ? cookieValue?.user?.id : team_id || temp_user_id;
        try {
            const cartDataPost = {
                id: id,
                quantity: qty,
                user_id: cookieValue?.user?.id || null,
                temp_user_id: userId || null,
                addToCartOption: addToCartOption
            } as any
            if (combinationName) {
                cartDataPost.variant = combinationName
            }
            const response = await axios.post('/api/cart/add', cartDataPost);

            console.log("response", response)
            const data = response.data;
            const cartData: any = await getCart(userId);
            setCartData(cartData.data, cartData.totalQuantity);
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                setOpenCart(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="action_area flex flex-col items-start gap-4 pt-4 pb-4 ">
            <div className='flex items-center w-full  md:w-1/2 md:max-w-max gap-3 ' >
                <span className='text-base text-neutral-black' >Quantity  :</span>
                <div className="qty_input_area flex items-center w-1/2 md:max-w-max flex-1 gap-3  ">
                    <Button title="Click" onClick={decreaseQty} className='w-[40px] h-[40px] border-[1px] border-black   !bg-[#F4E9F2] hover:!bg-accent-lightPink  hover:text-neutral-black !p-0 flex items-center justify-center transition-all  duration-300 ease-in-out rounded-[50%] '  >
                        <MinusIcon className="!text-neutral-black text-sm hover:!text-white  transition-all  duration-300 ease-in-out" />
                    </Button>
                    <div className='border-[1px] border-black flex items-center justify-center w-[40px] h-[40px] bg-accent-lightPink text-center text-white rounded-[50%] text-sm' ><span className=' relative top-[1px] ' >{qty}</span></div>
                    <Button title="Click" onClick={increaseQty} className='rounded-[50%] border-[1px] border-black w-[40px] h-[40px]    !bg-[#F4E9F2] hover:!bg-accent-lightPink  hover:!text-neutral-black !p-0 flex items-center justify-center transition-all  duration-300 ease-in-out '  >
                        <PlusIcon className="!text-neutral-black text-sm hover:!text-white  transition-all  duration-300 ease-in-out" />
                    </Button>


                </div>
            </div>
            <div className='w-1/2'>
                <div className="outer button_area">
                    <Button className='' disabled={loading} onClick={addToCartHandler} >
                        <ShoppingCart /><div className='text_shadow'>ADD TO CART</div>{loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                    </Button>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
