"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios"
import { useEffect, useState } from "react"
import useCartStoreData from "@/lib/hooks/useCartStoreData"
import { signIn } from "next-auth/react"
import { cookieStore } from "@/lib/hooks/useCookieStore"
import GradientBtn from "./GradientBtn"
import AddressFormSignUp from "./Checkout/AddressFormSignUp"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

const FormSchema = z.object({
    pin: z.string().min(4, {
        message: " Otp is required",
    }),
})

export function OtpForm({ forget = false, translate, useEmailOrPhone, formData, user_info }: any) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [cshowPassword, setCShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm() as any;

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { temp_user_id } = useCartStoreData();
    const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false);
    const [otpInfo, setOtpInfo] = useState<any>(null);
    const [otpResendCode, setResendCode] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);
    const [isPendingSignUp, setIsPendingSignUp] = useState<boolean>(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })
    const cookieValue = cookieStore((state) => state.cookieValue);
    const isLoggedIn = !!cookieValue?.user?.id;
    const [country, setCountry] = useState<any[]>([])
    const [cities, setCities] = useState<any[]>([])
    const [state, setState] = useState<any[]>([])
    const [zone, setZone] = useState<any[]>([])
    const [area, setArea] = useState<any[]>([])

    const [formDataSignUp, setFormData] = useState({
        name: '',
        email_or_phone: '',
        phone: formData?.phone,
        email: formData?.email,
        address: '',
        city: '',
        postal_code: '',
        country_name: '',
        country_id: '',
        city_id: '',
        state_id: '',
        zone_id: '',
        password: '',
        confirmPassword: ''
    });
    useEffect(() => {
        if (formData?.phone || formData?.email) {
            if (useEmailOrPhone) {
                setValue('phone', formData?.phone)

            } else {
                setValue('email', formData?.email)
            }
        }

    }, [useEmailOrPhone, formData])
    useEffect(() => {
        if (formDataSignUp) {
            setValue('state_id', formDataSignUp?.state_id)
            setValue('city_id', formDataSignUp?.city_id)
        }
    }, [formDataSignUp])


    useEffect(() => {
        getCountry()
    }, [])
    useEffect(() => {
        const fetchCities = async () => {
            const result = await getCities()
            setCities(result as any)
        };
        fetchCities()
    }, [])

        // getCountry 
        const getCountry = async () => {
            try {
                const response: any = await axios.get(
                    `/api/country`);
                setCountry(response.data.data)
                setFormData({
                    ...formDataSignUp,
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


   //  zone
    useEffect(() => {
        const fetchZone = async () => {
            if (formDataSignUp?.city_id) {
                const result = await get_by_zone(formDataSignUp?.city_id);
                setZone(result as any);
            }
        };

        fetchZone();
    }, [formDataSignUp?.city_id]);
    // area 
    useEffect(() => {
        const fetchZone = async () => {
            if (formDataSignUp?.zone_id) {
                const result = await get_by_area(formDataSignUp?.zone_id);
                setArea(result as any);
            }
        };

        fetchZone();
    }, [formDataSignUp?.zone_id]);




    // otp submit 
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsPending(true)
        setResendCode(null)
        try {
            const response: any = await axios.post(
                `/api/auth/confirmOtp`, {
                phone: useEmailOrPhone ? formData.phone : formData.email,
                otp_code: data.pin,
            });

            if (response?.data?.result) {
                toast.success(response?.data?.message, {
                    style: { color: "#404042", fontWeight: 600 },
                    iconTheme: { primary: "#A020F0", secondary: "#fff" },
                });
                setOtpInfo(response.data)
                setShowSignUpForm(true)
            } else {
                toast.error(response?.data?.message, {
                    style: { color: "#404042", fontWeight: 600 },
                    iconTheme: { primary: "#A020F0", secondary: "#fff" },
                });
                setResendCode(response?.data)
                setShowSignUpForm(false)
                setIsPending(false)
            }
        } catch (error) {
            console.log(error)
            setIsPending(false)
            setShowSignUpForm(false)
        }
    }

    // resend otp  
    async function onResendCode() {
        setResendCode(null)
        try {
            const response: any = await axios.post(
                `/api/auth/send_otp`, {
                phone: useEmailOrPhone ? formData.phone : formData.email,
                verify: useEmailOrPhone ? 'phone' : 'email'
            });
            setResendCode(response.data)
        } catch (error) {
            console.log(error)
        }

    }

 
    const handleSubmitSignUp = async (data: any) => {

        setIsPendingSignUp(true);
        if (forget) {
            try {
                const response: any = await axios.post(
                    `/api/confirmResetPassword`, {
                        ...formDataSignUp,
                        ...data,
                    email: useEmailOrPhone ? formData?.phone : formData?.email,
                    register_by: useEmailOrPhone ? 'phone' : 'email'
                });

                if (response?.data.result) {
                    setIsPendingSignUp(false);
                    await signIn('credentials', {
                        email: useEmailOrPhone ? formData?.phone : formData?.email,
                        password: data.password,
                        temp_user_id: temp_user_id
                    });

                } else {
                    setIsPendingSignUp(false);
                }
            } catch (error) {
                setErrorMessage('An error occurred. Please try again later.');
                setIsPendingSignUp(false);
            }
        } else {
            try {
                const response: any = await axios.post(
                    `/api/auth/signup`, {
                        ...formDataSignUp,
                    ...data,
                    email_or_phone: useEmailOrPhone ? formData?.phone : formData?.email,
                    register_by: useEmailOrPhone ? 'phone' : 'email'
                });

                if (response?.data.result) {
                    setIsPendingSignUp(false);
                    await signIn('credentials', {
                        email: useEmailOrPhone ? formData?.phone : formData?.email,
                        password: data.password,
                        temp_user_id: temp_user_id
                    });

                } else {
                    setErrorMessage(response?.data.message || 'Login failed. Please try again.');
                    setIsPendingSignUp(false);
                }
            } catch (error) {
                setErrorMessage('An error occurred. Please try again later.');
                setIsPendingSignUp(false);
            } finally {
                setIsPendingSignUp(false);
            }
        }
    };
    return (
        <>
            {
                showSignUpForm ? <>
                    <form onSubmit={handleSubmit(handleSubmitSignUp)}>
                        <div className="flex flex-col gap-2">
                            {
                                !forget &&

                                <div className="relative">
                                    <label htmlFor="name" className="text-lg mb-2 block">Name *</label>
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        className={` ${errors.name ? 'border-red-500' : 'border-gray-300'}
                            w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm border 
                            focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink 
                            shadow-lg backdrop-blur-lg form_input`}
                                        id="name"
                                        type="text"
                                        placeholder="Full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                            }
                            <div className="flex gap-3 justify-between">
                                {useEmailOrPhone ? (
                                    <div className="relative w-full">
                                        <label htmlFor="phone" className="text-lg mb-2 block">Phone *</label>
                                        <input
                                            {...register('phone', { required: 'Name is required' })}
                                            disabled
                                            readOnly
                                            className={` ${errors.phone ? 'border-red-500' : 'border-gray-300'}
                                            w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm border 
                                            focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink 
                                            shadow-lg backdrop-blur-lg form_input`}
                                            id="phone"
                                            type="text"
                                            placeholder="Phone"
                                            value={formDataSignUp.phone}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full">
                                        <label htmlFor="email" className="text-lg mb-2 block">Email *</label>
                                        <input
                                            {...register('email', { required: 'Email is required' })}
                                            disabled
                                            readOnly
                                            className={` ${errors.email ? 'border-red-500' : 'border-gray-300'}
                            w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm border 
                            focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink 
                            shadow-lg backdrop-blur-lg form_input`}
                                            id="email"
                                            type="text"
                                            placeholder="Email"
                                            value={formDataSignUp.email}
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="text-lg mb-2 block">Password *</label>
                                <input
                                    {...register('password', { required: 'Password is required' })}
                                    className={` ${errors.password ? 'border-red-500' : 'border-gray-300'}
                            w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm 
                            border focus:outline-none focus:ring-1 focus:ring-accent-lightPink 
                            focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input`}
                                    id="password"
                                    type={`${showPassword ? "text" : "password"}`}
                                    placeholder="Enter password"

                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[70%] transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-gray-500 text-white" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-500 text-white" />
                                    )}
                                </button>
                            </div>

                            <div className="relative">
                                <label htmlFor="confirmPassword" className="text-lg mb-2 block">Confirm password *</label>
                                <input
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: (value: any) => value === watch('password') || "Passwords do not match"
                                    })}
                                    className={` ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
                            w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm 
                            border focus:outline-none focus:ring-1 focus:ring-accent-lightPink 
                            focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input`}
                                    id="confirmPassword"
                                    type={`${cshowPassword ? "text" : "password"}`}
                                    placeholder="Confirm password"

                                />
                                <button
                                    type="button"
                                    onClick={() => setCShowPassword(!cshowPassword)}
                                    className="absolute right-3 top-[70%] transform -translate-y-1/2"
                                >
                                    {cshowPassword ? (
                                        <Eye className="h-5 w-5 text-gray-500 text-white" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-gray-500 text-white" />
                                    )}
                                </button>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                            {
                                !forget &&

                                <div className="relative">
                                    <label htmlFor="address" className="text-lg mb-2 block">Address *</label>
                                    <Textarea
                                        name="address"
                                        placeholder="Address"
                                        className={` ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
                    w-full py-2 pl-4 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-sm 
                    border focus:outline-none focus:ring-1 focus:ring-accent-lightPink 
                    focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input`}
                                        {...register("address", { required: "Address is required" })}

                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                                    )}
                                </div>
                            }

                            {
                                !forget &&


                                <AddressFormSignUp setValue={setValue} register={register} errors={errors} formData={formDataSignUp} setFormData={setFormData} country={country} state={state} 
                                cities={cities}
                                zone={zone}
                                area={area}
                                
                                />

                            }

                            <div className="flex items-center justify-center mt-3">
                                <GradientBtn disabled={isPendingSignUp} className="cursor-pointer w-full" type="submit">
                                    {isPendingSignUp ? 'Submit...' : 'Submit'}
                                </GradientBtn>
                            </div>
                        </div>
                    </form>

                </> :

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-inherit">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>

                                        {
                                            otpInfo ? <div className=" text-neutral-black font-bold text-xl "><span>{otpInfo?.message}</span></div> : user_info?.message && <div className=" text-neutral-black text-xl "><span>{user_info?.message}-OTP-{user_info?.user?.verification_code}</span></div>
                                        }
                                        {
                                            otpInfo?.result !== true && <>
                                                <FormLabel className="text-neutral-black text-xl">Confirm the otp</FormLabel>
                                                <FormControl>
                                                    <InputOTP maxLength={6} {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                            <InputOTPSlot index={1} />
                                                            <InputOTPSlot index={2} />
                                                            <InputOTPSlot index={3} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>

                                                <FormMessage />
                                            </>
                                        }

                                    </FormItem>
                                )}
                            />
                            {
                                otpResendCode && otpResendCode?.message && <div className=" text-red-700 text-xl mt-2 "><span>{otpResendCode?.message}</span></div>
                            }
                            {
                                otpInfo?.result !== true &&
                                <div className="flex justify-center flex-col gap-2">
                                    <div onClick={onResendCode} className="flex justify-end text-neutral-black cursor-pointer ">
                                        <span>Send again the OTP code</span>
                                    </div>

                                    <GradientBtn type="submit" aria-disabled={isPending} >
                                        {isPending ? 'Submit...' : 'Submit'}
                                    </GradientBtn>

                                </div>
                            }

                        </form>
                    </Form>


            }
        </>
    )
}
