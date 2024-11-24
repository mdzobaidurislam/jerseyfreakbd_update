"use client";
import { Button } from '@/app/ui/button';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { Loader2, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { getCart } from '@/lib/cartApi';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import ProductOptions from '../ProductOptions';
import CustomImage from '../../CustomImage/CustomImage';
import { productStore } from '@/lib/hooks/useProductStore';

export default function SingleAddToCart({
    id,
    stocks,
    choice_options,
    colors,
    thumbnail_image,
    name, stroked_price, main_price, totalRating, brand, discount, has_discount, discount_off_text
}: any) {

    const { heading_title_value } = cookieStore();
    const addToCart = heading_title_value?.addToCart
    const { combinationName, variantImage, addToCartOption, setOpenCart } = productStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [qty, setQty] = useState<number>(1);
    const [temp_user, setTemp_user] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to control the dialog
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { setCartData, setTempUserId, temp_user_id, cartData, totalQuantity } = useCartStoreData((state) => ({
        setCartData: state.setCartData,
        setTempUserId: state.setTempUserId,
        cartData: state.cartData,
        totalQuantity: state.totalQuantity,
        temp_user_id: state.temp_user_id,
    }));
    const { price, setPriceValue, patchPrice } = productStore();

    useEffect(() => {
        if (main_price) {

            setPriceValue(main_price)
        }
    }, [main_price])


    const addToCartHandler = async () => {
        setLoading(true);
        const isLoggedIn = !!cookieValue?.user?.id;
        let team_id = null;
        if (!isLoggedIn && !temp_user_id) {
            team_id = setTempUserId();
            setTemp_user(team_id);
        }
        const userId = isLoggedIn ? cookieValue?.user?.id : team_id || temp_user_id;

        try {
            const cartDataPost = {
                id: id,
                quantity: qty,
                user_id: cookieValue?.user?.id || null,
                temp_user_id: userId || null,
                addToCartOption: addToCartOption
            } as any;
            if (combinationName) {
                const exist = stocks.find((item: any) => item.variant == combinationName)
                if (exist) {
                    cartDataPost.variant = combinationName
                }
            }

            const response = await axios.post('/api/cart/add', cartDataPost);

            const data = response.data;
            const cartData: any = await getCart(userId);
            setCartData(cartData.data, cartData.totalQuantity);

            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                setOpenCart(true)
            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="addToCart text-center flex items-center justify-center relative">
                <div className="outer button_area">
                    {
                        stocks && stocks.length > 1 ? <Button className="w-full text-center font-normal justify-center rounded-[25px] py-[6px] text-[10px] sm:text-[12px] md:!text-base uppercase   "
                            disabled={loading}
                            onClick={() => setIsDialogOpen(!isDialogOpen)}>
                            <ShoppingCart /> <div className='text_shadow'>{addToCart}</div>  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                        </Button> :
                            <Button className="w-full text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  "
                                disabled={loading}
                                onClick={addToCartHandler}>
                                <ShoppingCart /> <div className='text_shadow'>{addToCart}</div>  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                            </Button>
                    }
                    <span></span>
                    <span></span>
                </div>

            </div>

            {/* Dialog for variant selection */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className=" bottom-0 transition-all left-0 bg-transparent flex items-center justify-center " >

                    <div className=' w-full sm:max-w-[470px] bg-white  p-4 relative rounded-lg '>
                        <div onClick={() => setIsDialogOpen(false)} className=' cursor-pointer absolute top-2 right-2 ' >
                            <X className='text-black' />
                        </div>
                        <div className="flex items-center justify-start gap-4 mb-4">
                            <div className="w-[100px] h-[100px] overflow-hidden" >
                                <CustomImage width={80} height={80} src={variantImage || thumbnail_image} alt="Product" className="w-full object-cover rounded-md mr-4" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{brand}</h2>
                                <p className="text-sm text-gray-600">{name}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-accent-lightPink text-lg font-semibold">{price}
                                        {/* {main_price} */}
                                    </span>
                                    <span className="text-gray-400 text-sm ml-2 line-through">{stroked_price}</span>
                                    {
                                        has_discount &&
                                        <span className="text-green-500 text-sm ml-2">{discount}{discount_off_text}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <ProductOptions id={id} choice_options={choice_options as []} colors={colors} stocks={stocks} />

                        <DialogFooter>
                            <div className='flex item justify-center w-full mt-3 '>
                                <div className="outer button_area">
                                    <Button className='' disabled={loading} onClick={addToCartHandler} >
                                        <ShoppingCart /><div className='text_shadow'>ADD TO CART</div>{loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                    </Button>
                                    <span></span>
                                    <span></span>
                                </div>

                            </div>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    );
}
