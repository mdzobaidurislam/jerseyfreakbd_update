"use client"
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import { Button } from '@/app/ui/button';
import { Loader, Loader2, ShoppingCart, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function RequestProduct({ setMessage, setSuccessModal, product_id, requestVariation, setRequestVariation, setIsRequestModal }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm() as any;
    const { data: session, update } = useSession() as any

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (session?.user) {
            setValue('phone', session?.user?.phone)
            setValue('name', session?.user?.name)
            setValue('email', session?.user?.email)
        }
    }, [session?.user])

    const onSubmitShipping = async (data: any) => {
        const addData = {
            ...data,
            product_id: product_id,
            variation_id: requestVariation
        }
        try {
            const response = await axios.post('/api/request_product', addData);
            const data = response.data;
            if (data.result) {
                setMessage(data.message)

            }
            setLoading(false);
            setIsRequestModal(false);
            setRequestVariation(null);
            setSuccessModal(true)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }


    };
    return (
        <div className=' w-full sm:max-w-[470px] p-6 bg-white c_shadow'>

            <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-6">
                <div className=''>
                    <h2 className="text-2xl font-medium text-[#404040] mb-3 ">Product Request</h2>
                    <div className="space-y-4">
                        <div className='flex flex-wrap lg:flex-nowrap items-center gap-2 '>
                            <div className='w-full lg:w-1/2 xl:w-1/2'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name*
                                </label>

                                <input
                                    {...register('name', { required: 'Full Name is required' })}
                                    className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                                    placeholder="Full Name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors?.name?.message}
                                    </p>
                                )}
                            </div>

                            <div className='w-full lg:w-1/2 xl:w-1/2'>
                                <label className="block text-sm font-medium text-gray-700">Email*</label>
                                <input
                                    {...register('email', {
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

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <Textarea
                                name="address"
                                placeholder="Address"
                                className="w-full"
                                {...register("address")}

                            />

                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                        </div>

                    </div>
                </div>
                <div className='flex item justify-center w-full mt-1 '>
                    <div className="outer button_area">
                        <Button className='' disabled={loading} type='submit' >
                            <ShoppingCart /><div className='text_shadow'>Request product</div>
                        </Button>
                        <span></span>
                        <span></span>
                    </div>

                </div>


            </form>



        </div>
    )
}
