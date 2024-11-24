"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../Container/Container';
import StepProgressBar from './StepProgressBar';
import { get_setting } from '@/lib/utils';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import useCartStoreData from '@/lib/hooks/useCartStoreData'
import { useRouter } from 'next/navigation';
import AddressForm from './AddressForm';
import { ChevronLeft, Loader2, MinusIcon, PlusIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import YourDetails from './YourDetails';
import CustomInput from '../CustomInput';
import CustomImage from '../CustomImage/CustomImage';
import CartItem from '../SideCart/CartItem';
import { getCart } from '@/lib/cartApi';
import { Dialog, DialogClose, DialogContent, DialogOverlay } from '@/components/ui/dialog';

const CheckoutForm = ({ total_point, data, addressList }: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm() as any;
    const router = useRouter()
    const session = useSession() as any
    const [isSizeModal, setIsSizeModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [couponLoading, setCouponLoading] = useState<boolean>(false);
    const [pointLoading, setPointLoading] = useState<boolean>(false);
    const [couponError, setCouponError] = useState<string>('');
    const [shipping, setShipping] = useState<number>(0);

    const { setCartData, cartData, totalQuantity } = useCartStoreData();
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { settingValue } = cookieStore(state => ({
        settingValue: state.settingValue,
    }));

    const [summary, setSummary] = useState<any>({
        sub_total: 0,
        discount: 0,
        grand_total: 0,
        shipping_cost: 0,
        coupon_applied: false,
    });
    const [country, setCountry] = useState<any[]>([])
    const [state, setState] = useState<any[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [zone, setZone] = useState<any[]>([])
    const [area, setArea] = useState<any[]>([])

    const [citiesBil, setCitiesBil] = useState<any[]>([])
    const [stateBil, setStateBil] = useState<any[]>([])
    const [zoneBil, setZoneBil] = useState<any[]>([])
    const [areaBil, setAreaBil] = useState<any[]>([])


    const [payment_types, setPayment_types] = useState<[]>([])
    const [selectedPayment, setSelectedPayment] = useState<string>("cash_payment")
    const [coupon, setCoupon] = useState<string>("")
    const [openPromo, setOpenPromo] = useState<boolean>(false)
    const [formData, setFormData] = useState(data && data || {
        country: '',
        fullName: '',
        email: '',
        phone: '',
        cities: '',
        address: '',
        saveAddress: false,
        term: true,
        address_type: 1,
        shipping: shipping,
        fastDelivery: false,
    } as any);
    const [selectedAddress, setSelectedAddress] = useState<any>(data && data || null);

    const [billingAddress, setBillingAddress] = useState({
        country: '',
        fullName: '',
        email: '',
        phone: '',
        cities: '',
        address: '',
    } as any);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleShipping = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setShipping(Number(value))
    };


    useEffect(() => {
        if (data) {
            setValue('city_id', data?.city_id)
            setValue('zone_id', data?.zone_id)
            setValue('area_id', data?.area_id)
            setValue('address', data?.address)
            setValue('postal_code', data?.postal_code)
        }
    }, [data])
    useEffect(() => {
        if (session?.data?.user || data) {
            setFormData({
                ...formData,
                fullName: session?.data?.user?.name,
                email: session?.data?.user?.email,
                phone: session?.data?.user?.phone
            })
            setValue('fullName', session?.data?.user?.name)
            setValue('email', session?.data?.user?.email)
            setValue('phone', session?.data?.user?.phone || data?.phone || "")


        }
    }, [session?.data?.user, data])


    useEffect(() => {
        if (cookieValue) {

            getSummary()
        }
    }, [cookieValue])

    useEffect(() => {
        getCountry()
        getPayment_types()
    }, [])
    useEffect(() => {
        const fetchCities = async () => {
            const result = await getCities()
            setCities(result as any)
            setCitiesBil(result as any)
        };
        fetchCities()
    }, [])

    //  zone
    useEffect(() => {
        const fetchZone = async () => {
            if (formData?.city_id) {
                const result = await get_by_zone(formData?.city_id);
                setZone(result as any);
            }
        };

        fetchZone();
    }, [formData?.city_id]);
    // area 
    useEffect(() => {
        const fetchZone = async () => {
            if (formData?.zone_id) {
                const result = await get_by_area(formData?.zone_id);
                setArea(result as any);
            }
        };

        fetchZone();
    }, [formData?.zone_id]);



    // billing address form 
    // useEffect(() => {
    //     const fetchCities = async () => {
    //         if (billingAddress?.country_id) {
    //             const result = await getCities()
    //             setCitiesBil(result as any)
    //         }
    //     };
    //     fetchCities()
    // }, [billingAddress?.country_id])

    useEffect(() => {
        const fetchZone = async () => {
            if (billingAddress?.city_id) {
                const result = await get_by_zone(billingAddress?.city_id);
                setZoneBil(result as any);
            }
        };

        fetchZone();
    }, [billingAddress?.city_id]);

    useEffect(() => {
        const fetchArea = async () => {
            if (billingAddress?.zone_id) {
                const result = await get_by_area(billingAddress?.zone_id);
                setAreaBil(result as any);
            }
        };
        fetchArea();
    }, [billingAddress?.zone_id]);


    // address form 


    // pointApply 
    const pointApply = async () => {

        setPointLoading(true)
        try {
            const response: any = await axios.post(
                `/api/point/apply_point`,
                {
                    user_id: cookieValue?.user?.id,
                    shipping_price: shipping
                }
            );
            if (response?.data.result) {
                toast.success(response?.data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                getSummary()
                setPointLoading(false)

            } else {
                toast.error(response?.data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
            }
            setPointLoading(false)
            router.push('/checkout')

        } catch (error) {
            console.log(error)
            setPointLoading(false)

        }
    }
    // pointRemove
    const pointRemove = async () => {
        setPointLoading(true)
        try {
            const response: any = await axios.post(
                `/api/point/remove_point`,
                {
                    user_id: cookieValue?.user?.id,
                }
            );
            if (response?.data.result) {
                toast.success(response?.data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                getSummary()

            } else {
                toast.error(response?.data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
            }
            router.push('/checkout')
            setPointLoading(false)
        } catch (error) {
            console.log(error)
            setPointLoading(false)
        }
    }



    // couponApply 
    const couponApply = async () => {
        if (coupon == '') {
            setCouponError('Coupon is not empty')
            return false
        }
        setCouponLoading(true)
        try {
            const response: any = await axios.post(
                `/api/coupon/apply`,
                {
                    user_id: cookieValue?.user?.id,
                    coupon_code: coupon
                }
            );

            if (response?.data.result) {
                getSummary()

            }
            setCouponError(response?.data.message)
            setCouponLoading(false)


        } catch (error) {
            console.log(error)
            setCouponLoading(false)
        }
    }
    // couponRemove
    const couponRemove = async () => {
        if (coupon == '') {
            setCouponError('Coupon is not empty')
            return false
        }
        setCouponLoading(true)
        try {
            const response: any = await axios.post(
                `/api/coupon/remove`,
                {
                    user_id: cookieValue?.user?.id,
                }
            );
            if (response?.data.result) {
                getSummary()

            }
            setCouponError(response?.data.message)
            setCouponLoading(false)


        } catch (error) {
            console.log(error)
            setCouponLoading(false)
        }
    }

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
            setCoupon(response?.data?.data?.coupon_code || '')

        } catch (error) {
            console.log(error)
        }
    }
    // getCountry 
    const getCountry = async () => {
        try {
            const response: any = await axios.get(
                `/api/country`);
            setCountry(response.data.data)
            setFormData({
                ...formData,
                country_id: response.data.data[0].id,
                country_name: response.data.data[0].name
            });
            setValue('country_id', response.data.data[0].id, { shouldValidate: true });
        } catch (error) {
            console.log(error)
        }
    }
    // getCountry 
    const getCities = async () => {
        try {
            const response: any = await axios.post(
                `/api/pathao/cities`);
            return response.data.data;

        } catch (error) {
            console.log(error)
        }
    }
    // get_by_zone 
    const get_by_zone = async (id: any) => {
        try {
            const response: any = await axios.post(
                `/api/pathao/zone`, {
                id: id
            });
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
    // get_by_zone 
    const get_by_area = async (id: any) => {
        try {
            const response: any = await axios.post(
                `/api/pathao/area`, {
                id: id
            });
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }

    // getCountry 
    const getPayment_types = async () => {
        try {
            const response: any = await axios.get(
                `/api/payment-types`);

            setPayment_types(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    const handle_order = async () => {
        // setLoading(true);
        try {
            const orderData = {
                user_id: cookieValue?.user?.id,
                ...formData,
                billing_address: billingAddress,
                shipping,
                payment_type: selectedPayment
            }

            const response = await axios.post('/api/order', orderData);

            const data = response.data;

            if (data.result && selectedPayment == "sslcommerz_payment") {
                const paymentData = {
                    "payment_type": "cart_payment",
                    "combined_order_id": data.combined_order_id,
                    "amount": (Number(summary?.grand_total_value) + Number(shipping)),
                    "user_id": cookieValue?.user?.id
                }
                const paymentRes: any = await axios.post('/api/order/sslcommerz', paymentData);
                if (paymentRes.data.result) {
                    window.location.href = paymentRes.data.url;
                }
            }
            if (data.result && selectedPayment == "cash_payment") {
                router.push(`/order/success?order_id=${data.combined_order_id}`)
            }
            if (!data.result) {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }


    const inside_dhaka = get_setting(settingValue, 'flat_rate_shipping_cost')
    const outSide_dhaka = get_setting(settingValue, 'shipping_cost_admin')
    useEffect(() => {
        setShipping(Number(inside_dhaka?.value))
    }, [inside_dhaka])


    const onSubmitShipping = (data: any) => {
        console.log(data);
        setFormData({
            ...formData,
            ...data
        });
        nextStep()
    };
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 3) {

            setCurrentStep(currentStep + 1);
        }
    };


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
            const cartData: any = await getCart(cookieValue?.user?.id);

            setCartData(cartData.data, cartData.totalQuantity);
            getSummary()
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
            const cartData: any = await getCart(cookieValue?.user?.id);

            setCartData(cartData.data, cartData.totalQuantity);
            getSummary()
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

    return (
        <Container>

            <div className="grid grid-cols-12 gap-3  ">
                <div className='col-span-12 xl:col-span-7'>
                    <StepProgressBar currentStep={currentStep} />
                    {/* shipping area start */}
                    {
                        currentStep === 1 &&
                        <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-6">
                            <div className='p-6 bg-white c_shadow mt-3'>
                                <h2 className="text-2xl font-bold text-[#404040] ">Your details</h2>
                                <div className="space-y-4">
                                    <div className='flex flex-wrap lg:flex-nowrap items-center gap-2 '>
                                        <div className='w-full lg:w-1/2 xl:w-1/2'>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Full Name*
                                            </label>

                                            <input
                                                {...register('fullName', { required: 'Full Name is required' })}
                                                className={`mt-1 block w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                                                placeholder="Full Name"
                                            />
                                            {errors.fullName && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors?.fullName?.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='w-full lg:w-1/2 xl:w-1/2'>
                                            <label className="block text-sm font-medium text-gray-700">Email*</label>
                                            <input
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: 'Please enter a valid email',
                                                    },
                                                })}
                                                className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                                                placeholder="Email"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone*</label>
                                        <input
                                            {...register('phone', { required: 'Phone is required' })}
                                            className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                                            placeholder="Phone"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='p-6 bg-white c_shadow mt-2'>
                                <h2 className="text-2xl font-bold text-[#404040]">Shipping Address</h2>
                                <div className="space-y-4">
                                    <AddressForm
                                        setValue={setValue}
                                        register={register}
                                        errors={errors}
                                        formData={formData}
                                        setFormData={setFormData}
                                        country={country}
                                        state={state}
                                        cities={cities}
                                        zone={zone}
                                        area={area}
                                    />

                                </div>


                                {/* Save Address */}
                                <div className="mb-4 flex items-center">
                                    <label className="flex items-center space-x-2 text-base">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-primary"
                                            onChange={handleCheckboxChange}
                                            name="saveAddress"
                                        />
                                        <span>Save this address</span>
                                    </label>
                                </div>
                                <div className='flex justify-end w-full'>
                                    <div className="outer button_area !m-0 group !w-[230px] hover:!h-[40px] ">
                                        <Button className=" text-center !w-[228px] font-normal px-4 justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  ">
                                            <div className='text_shadow'>Continue to shipping</div>  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                        </Button>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                    {
                        (currentStep == 2 || currentStep === 3) && <div className='p-6 bg-white rounded-lg shadow-lg mt-2'><YourDetails title="Your details" data={formData} diff={
                            <button onClick={() => (setCurrentStep(1))} className="align-middle select-none font-sans text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none justify-center text-sm py-2 px-4 rounded-[16px] border-2 border-accent-lightPink text-accent-lightPink hover:bg-deep-purple-300 focus:border-accent-lightPink focus:text-accent-lightPink active:text-accent-lightPink bg-transparent w-fit h-fit font-normal" type="button">Edit</button>
                        } /> </div>

                    }

                    {/* shipping area start */}

                    <div className='p-6 bg-white c_shadow mt-3'>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-[#404040]">Shipping Method</h2>
                            {
                                (currentStep == 2 || currentStep === 3) &&

                                <YourDetails title="Shipping to" data={formData} diff={<button onClick={() => {

                                    // setCurrentStep(1)
                                    setIsSizeModal(true)

                                }
                                }

                                    className="  align-middle select-none font-sans text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none justify-center text-sm py-2 px-4 rounded-[16px] border-2 border-accent-lightPink text-accent-lightPink hover:bg-deep-purple-300 focus:border-accent-lightPink focus:text-accent-lightPink active:text-accent-lightPink bg-transparent w-max min-w-fit h-fit whitespace-nowrap font-normal" type="button">Use a different address</button>} />
                            }
                            {
                                currentStep === 3 && <p className="antialiased font-primary text-base leading-tighter tracking-tight font-normal text-gray-800 flex flex-col">
                                    {
                                        Number(inside_dhaka?.value) === shipping && <span>Inside Dhaka -<span className="ms-1">৳{Number(inside_dhaka?.value)}</span>
                                        </span>
                                    }
                                    {
                                        Number(outSide_dhaka?.value) === shipping && <span>Outside Dhaka -<span className="ms-1">৳{Number(outSide_dhaka?.value)}</span>
                                        </span>
                                    }

                                </p>
                            }
                            {
                                (currentStep === 2) && <>

                                    <div className="space-y-2">
                                        <label className={` ${Number(inside_dhaka?.value) === shipping ? 'border-accent-lightPink' : 'border-gray-200'}  flex items-center space-x-2 border-[2px] py-2 px-4 rounded-xl text-base`}>
                                            <input
                                                checked={Number(inside_dhaka?.value) === shipping}
                                                type="radio"
                                                name="shipping"
                                                value={Number(inside_dhaka?.value)}
                                                className="form-radio text-primary"
                                                onChange={handleShipping}
                                            />
                                            <span>Inside Dhaka - ৳{Number(inside_dhaka?.value)}</span>
                                        </label>
                                        <label className={` ${Number(outSide_dhaka?.value) === shipping ? 'border-accent-lightPink' : 'border-gray-200'}  flex items-center space-x-2 border-[2px] py-2 px-4 rounded-xl text-base`}>
                                            <input
                                                checked={Number(outSide_dhaka?.value) === shipping}
                                                type="radio"
                                                name="shipping"
                                                value={Number(outSide_dhaka?.value)}
                                                className="form-radio text-primary"
                                                onChange={handleShipping}
                                            />
                                            <span>Outside Dhaka - ৳{Number(outSide_dhaka?.value)}</span>
                                        </label>


                                    </div>

                                </>
                            }

                            {
                                currentStep == 2 && <div className='flex justify-end w-full'>
                                    <div className="outer button_area !m-0 group !w-[230px] hover:!h-[40px] ">
                                        <Button onClick={() => nextStep()} className=" text-center !w-[228px] font-normal px-4 justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  ">
                                            <div className='text_shadow'>Continue to payment</div>  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                        </Button>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>

                    {/* Payment  */}
                    <div className='p-6 bg-white c_shadow mt-3 mb-5'>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-[#404040]">Payment</h2>

                            {
                                currentStep == 3 && <> <div className="flex justify-start space-x-4 flex-wrap items-center ">
                                    {
                                        payment_types.map((item: any) => (
                                            <div onClick={() => setSelectedPayment(item.payment_type)} className={`w-[100px] cursor-pointer  rounded-lg border-[1px] p-2  ${selectedPayment === item.payment_type ? 'border-[2px] border-accent-lightPink ' : 'border-arival'}`} >
                                                <img src={item.image} alt={item.name} className="w-20 mb-2" />
                                                <span className="text-center">{item.name}</span>
                                            </div>
                                        ))
                                    }


                                </div>
                                    <h2 className="text-lg font-semibold mb-4 mt-4">Billing Address</h2>
                                    {/* Radio Group */}
                                    <div className="space-y-2">
                                        <div className='flex justify-between '>
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    id="same_address"
                                                    name="address_type"
                                                    value={1}
                                                    onChange={handleInputChange}
                                                    className="form-radio text-primary"
                                                    checked={Number(formData.address_type) === 1}
                                                />
                                                <label htmlFor="same_address" className="text-sm font-medium">
                                                    Same As Delivery Address
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    checked={Number(formData.address_type) === 2}
                                                    type="radio"
                                                    id="different_address"
                                                    name="address_type"
                                                    value={2}
                                                    onChange={handleInputChange}
                                                    className="form-radio text-primary"
                                                />
                                                <label htmlFor="different_address" className="text-sm font-medium">
                                                    Use Different Address
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            Number(formData.address_type) === 2 &&
                                            <AddressForm setValue={setValue} register={register} errors={errors}
                                                formData={billingAddress}
                                                setFormData={setBillingAddress}
                                                country={country}
                                                state={stateBil}
                                                cities={citiesBil}
                                                zone={zoneBil}
                                                area={areaBil}

                                            />
                                        }
                                    </div>
                                </>
                            }

                        </div>
                        {
                            currentStep == 3 &&

                            <div className="flex flex-wrap justify-center lg:justify-between mt-6 gap-6">
                                <button onClick={() => setCurrentStep(2)} className="align-middle select-none font-sans font-normal text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 rounded-[16px] text-accent-lightPink hover:underline active:text-accent-lightPink active:bg-transparent border-none focus:no-underline focus:text-accent-lightPink focus:bg-deep-purple-300 flex justify-center gap-0 w-full lg:w-2/5 lg:max-w-max whitespace-nowrap" type="button">
                                    <ChevronLeft className='text-sm' />Back to shipping</button>

                                <div className="outer button_area !m-0 group !w-[230px] hover:!h-[40px] ">
                                    <Button disabled={loading}
                                        onClick={handle_order} className=" text-center !w-[228px] font-normal px-4 justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  ">
                                        <div className='text_shadow'>PAY NOW</div>  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                                    </Button>
                                    <span></span>
                                    <span></span>
                                </div>


                            </div>
                        }
                    </div>


                </div>
                <div className='col-span-12 xl:col-span-5'>
                    <div className='flex flex-col justify-between  lg:p-5 sticky h-fit top-0'>


                        {/* content  */}
                        <div className='flex  flex-row h-full w-full mt-6 mb-6'>
                            <div className='flex flex-col w-full h-full c_shadow px-[13px] py-[22px] '>
                                <h2 className="antialiased  leading-tighter text-[#404040] text-2xl font-bold tracking-normal">In Your Cart</h2>
                                <div className="cart_items w-full flex flex-col  gap-6  h-full  ">
                                    {/* item  */}
                                    {
                                        cartData && cartData?.map((parentItem: any) => (
                                            parentItem.cart_items.map((item: any) => (
                                                <div className="single_item relative   border-[#6B6B6B]  flex flex-col gap-3 border-b py-4 ">
                                                    <div className='flex gap-1 relative overflow-hidden'>
                                                        <div className="cart_image  ">
                                                            <CustomImage alt="" src={item?.product_thumbnail_image} loading="lazy"
                                                                decoding="async" width={110} height={124} className="object-contain w-full h-full" />
                                                        </div>
                                                        <div className="product_info_cart flex flex-col flex-1 gap-1 ">

                                                            <h2 className='title  text-neutral-black font-medium text-sm ' >{item.product_name}</h2>
                                                            <div className="price_area flex items-center gap-2 justify-between  ">
                                                                <div className="price flex items-center gap-2 justify-center">


                                                                    <div className="regular_price text-primary text-sm font-bold">{item.currency_symbol}{item.price}</div>

                                                                    {
                                                                        item.discount_in_percent > 0 &&
                                                                        <div className="sale_price text-[#C2B9B9] relative  line-through text-sm ">
                                                                            {item.currency_symbol}{item.previous_price}
                                                                        </div>
                                                                    }
                                                                    {
                                                                        item.discount_in_percent > 0 &&

                                                                        <div className="offer font-bold text-accent-lightPink  text-sm ">
                                                                            <span>{item.discount_in_percent}% OFF </span>
                                                                        </div>
                                                                    }
                                                                </div>

                                                            </div>
                                                            <div className="variant">
                                                                <div className="flex flex-col tracking-normal">
                                                                    <div className="text-sm flex items-center gap-2 ">Size: <span className='size_item'> {item.variation}</span></div>
                                                                    {
                                                                        (item?.playerName || item?.playerNumber) &&

                                                                        <div className="mt-1">
                                                                            <span className="text-base font-semibold">Name &amp; Number</span>
                                                                            <div className="flex flex-col">
                                                                                <span className="text-sm">Name: {item?.playerName.split(", ").join("")}</span>
                                                                                <span className="text-sm">Number: {item?.playerNumber.split(", ").join("")}</span>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        item.patch_selected_price > 0 && <span className="text-sm">Patch Price: {item.patch_selected_price}</span>
                                                                    }
                                                                    {
                                                                        item.player_number_name_price > 0 && <span className="text-sm">Name & Number Price: {item.player_number_name_price}</span>
                                                                    }
                                                                </div>

                                                            </div>
                                                            {/* action  */}
                                                            <div className="action_area flex-wrap flex items-center justify-between gap-3 ">
                                                                <div className='flex  items-center w-full md:max-w-max gap-3 ' >
                                                                    <span className='text-base text-neutral-black' >Quantity  :</span>
                                                                    <div className="qty_input_area flex items-center  md:max-w-max flex-1 gap-3  ">
                                                                        <Button onClick={() => decreaseQty(item.id, item.quantity)} className='w-[30px] h-[30px] border-[1px] border-black   !bg-[#F4E9F2] hover:!bg-accent-lightPink  hover:text-neutral-black !p-0 flex items-center justify-center transition-all  duration-300 ease-in-out rounded-[50%] '  >
                                                                            <MinusIcon className="!text-neutral-black text-sm hover:!text-white  transition-all  duration-300 ease-in-out" />
                                                                        </Button>
                                                                        <div className='border-[1px] border-black flex items-center justify-center w-[30px] h-[30px] bg-accent-lightPink text-center text-white rounded-[50%] text-sm' >{item.quantity}</div>
                                                                        <Button onClick={() => increaseQty(item.id, item.quantity)} className='rounded-[50%] border-[1px] border-black w-[30px] h-[30px]    !bg-[#F4E9F2] hover:!bg-accent-lightPink  hover:!text-neutral-black !p-0 flex items-center justify-center transition-all  duration-300 ease-in-out '  >
                                                                            <PlusIcon className="!text-neutral-black text-sm hover:!text-white  transition-all  duration-300 ease-in-out" />
                                                                        </Button>

                                                                    </div>


                                                                </div>
                                                                <div className="item_close text-[10px] relative cursor-pointer remove_item font-bold text-accent-lightPink " onClick={() => handleDelete(item.id)} >
                                                                    <span>Remove</span>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            ))
                                        ))
                                    }

                                </div>


                            </div>
                        </div>
                        <div className="space-y-3 lg:pb-12 w-full flex-shrink-0 c_shadow z-10 p-5  "  >
                            <h2 className="text-lg font-semibold">Order Summary</h2>
                            <div className="space-y-1 flex flex-col gap-2 ">
                                {

                                    <div className="flex justify-between  text-base items-center font-bold rounded-md relative mb-3 ">
                                        <span>Club Point Balance :</span>
                                        <div className='relative'>
                                            <span>৳{total_point}</span>
                                            {
                                                summary?.point_applied ? <span onClick={pointRemove} className="text-sm left-[-15px] py-[1px] px-[6px] bottom-[-18px] absolute bg-red-600 cursor-pointer text-white font-semibold  rounded-lg shadow-md hover:bg-red-900 transition duration-300">
                                                    Remove
                                                </span> : <span onClick={pointApply} className=" text-sm left-[-15px] py-[1px] px-[6px] bottom-[-18px] absolute bg-accent-lightPink cursor-pointer text-white font-semibold  rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
                                                    Redeem
                                                </span>
                                            }

                                        </div>

                                    </div>
                                }
                                <div className="flex justify-between font-medium text-base items-center">
                                    <span>Subtotal :</span>
                                    <span>{summary && summary?.sub_total}</span>
                                </div>
                                <div className="flex justify-between font-medium text-base items-center">
                                    <span>Delivery Charge :</span>
                                    <span>{shipping}</span>
                                </div>
                                <div className="flex justify-between font-medium text-base items-center">
                                    <span>Discount :</span>
                                    <span> {summary && summary?.discount} </span>
                                </div>

                                <div className="flex flex-col font-medium text-base  border-b-[1px] pb-2 cursor-pointer ">
                                    <div className="flex items-center space-x-1  " onClick={() => setOpenPromo(!openPromo)} >
                                        <span>Promo Code</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.65 12.65C9.75 12.75 9.86667 12.8 10 12.8C10.1333 12.8 10.25 12.75 10.35 12.65L13.15 9.85C13.3167 9.68333 13.3583 9.5 13.275 9.3C13.1917 9.1 13.0333 9 12.8 9H7.2C6.96667 9 6.80833 9.1 6.725 9.3C6.64167 9.5 6.68333 9.68333 6.85 9.85L9.65 12.65ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#2B2B2B" />
                                        </svg>
                                    </div>
                                    {
                                        openPromo &&

                                        <div className="flex p-4 flex-col" >
                                            <div>
                                                <label className="group w-full flex items-center gap-x-2 border border-neutral-300 focus-within:border-black h-12 px-3 rounded-md pl-2 pr-1 " >
                                                    <div className='flex-1 flex-col'>
                                                        <CustomInput disabled={summary?.coupon_applied} type="text" value={coupon} onChange={(e) => {
                                                            setCoupon(e.target.value)
                                                            setCouponError('')
                                                        }} className=" flex-1 " placeholder="Enter coupon code" />

                                                    </div>

                                                    <div className="center">
                                                        {
                                                            summary?.coupon_applied ? <Button onClick={couponRemove} disabled={couponLoading} title="label" type="button" className="btn relative flex  !bg-red-500 rounded-md">
                                                                <div className="btn-label"> {couponLoading ? 'Remove...' : 'Remove'} </div>
                                                            </Button> : <Button onClick={couponApply} disabled={couponLoading} title="label" type="button" className="btn relative flex  bg-primary rounded-md">
                                                                <div className="btn-label"> {couponLoading ? 'Apply...' : 'Apply'} </div>
                                                            </Button>
                                                        }

                                                    </div>
                                                </label>
                                                {
                                                    couponError && <p className="text-red-500 text-sm mt-1">{couponError}</p>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>


                                </div>

                                {summary?.point_applied ?
                                    <div className="flex justify-between text-base items-center font-semibold text-accent-lightPink">
                                        <span>Total Point apply: </span>
                                        <span>-৳{summary && (Number(summary?.point_code))}</span>
                                    </div>
                                    : ''}

                                <div className="flex justify-between text-base items-center font-semibold text-accent-lightPink">
                                    <span>Total Amount: </span>
                                    <span>৳{summary && (Number(summary?.grand_total_value) + Number(shipping))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isSizeModal && (
                <Dialog open={isSizeModal} onOpenChange={setIsSizeModal}>
                    <DialogOverlay className='z-[9999999] backdrop-blur-4'>


                        <DialogClose className="hidden" />
                        <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center z-[99999999]" >
                            <div className='bg-white relative rounded-lg  '>
                                <div onClick={() => setIsSizeModal(false)} className=' cursor-pointer absolute top-2 right-3 ' >
                                    <X className='text-black' />
                                </div>
                                <div className=" bg-white pt-8 p-4 text-center rounded-lg overflow-x-auto w-full md:w-full ">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">


                                        {
                                            addressList?.map((item: any) => (


                                                <div className="col-span-1 lg:col-span-1  " key={item.id} >
                                                    <div onClick={() => {
                                                        setSelectedAddress(item)

                                                    }} className={` cursor-pointer border p-3 pr-5 rounded mb-3 relative text-left ${selectedAddress?.id === item.id ? 'border-accent-lightPink' : ''} `}>
                                                        <div>
                                                            <span className="w-1/2 font-semibold">Address:</span>
                                                            <span className="ml-2">{item?.address}</span>
                                                        </div>
                                                        <div>
                                                            <span className="w-1/2 font-semibold">Postal code:</span>
                                                            <span className="ml-2">{item?.postal_code}</span>
                                                        </div>
                                                        <div>
                                                            <span className="w-1/2 font-semibold">City:</span>
                                                            <span className="ml-2">{item?.city_name}</span>
                                                        </div>
                                                        <div>
                                                            <span className="w-1/2 font-semibold">State:</span>
                                                            <span className="ml-2">{item?.city_name}</span>
                                                        </div>
                                                        <div>
                                                            <span className="w-1/2 font-semibold">Country:</span>
                                                            <span className="ml-2">{item?.country_name}</span>
                                                        </div>
                                                        <div>
                                                            <span className="w-1/2 font-semibold">Phone:</span>
                                                            <span className="ml-2">{item?.phone}</span>
                                                        </div>
                                                        {
                                                            item?.set_default > 0 && <div className="absolute right-0 bottom-0 pr-2 pb-3">
                                                                <span className="text-white inline bg-primary rounded-sm py-1 px-2 ">Default</span>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='flex justify-end '>


                                        <div className="outer button_area !m-0 group !w-[230px] hover:!h-[40px] ">
                                            <Button disabled={loading}
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        ...selectedAddress
                                                    })
                                                    setIsSizeModal(false)
                                                }} className=" text-center !w-[228px] font-normal px-4 justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  ">
                                                <div className='text_shadow'>Select Address</div>
                                            </Button>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </DialogOverlay>
                </Dialog>
            )}

        </Container>
    );
};

export default CheckoutForm;
