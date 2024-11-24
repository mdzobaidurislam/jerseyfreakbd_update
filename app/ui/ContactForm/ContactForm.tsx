"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function ContactForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm() as any;

    const onSubmitShipping = async (data: any) => {
        setLoading(true)
        try {
            const response: any = await axios.post(
                `/api/contact_post`,
                data
            );
            if (response?.data.result) {
                toast.success(response.data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#A020F0', secondary: '#fff' },
                });
                reset();
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    };

    return (
        <div className='mt-10'> <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-6 m-auto w-full md:w-[700px] ">
            <div className='p-6 bg-white c_shadow mt-3'>
                <h2 className="text-2xl font-bold text-[#404040] ">Contact information</h2>
                <div className="space-y-4">
                    <div className='flex flex-wrap lg:flex-nowrap items-center gap-2 '>
                        <div className='w-full lg:w-1/2 xl:w-1/2 relative'>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name*
                            </label>

                            <input
                                {...register('name', { required: 'Full Name is required' })}
                                className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                                placeholder="Full Name"
                            />

                            {/* <p className="text-red-500 text-xs absolute bottom-0 ">
                                {errors?.name?.message}
                            </p> */}

                        </div>

                        <div className='w-full lg:w-1/2 xl:w-1/2'>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
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

                            {/* <p className="text-red-500 text-xs mt-1"></p> */}

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
                        {/* {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )} */}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject*</label>
                        <input
                            {...register('subject', { required: 'Subject is required' })}
                            className={`mt-1 block w-full border ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                            placeholder="subject"
                        />
                        {/* {errors.subject && (
                            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                        )} */}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message*</label>
                        <textarea
                            {...register('message', { required: 'Message is required' })}
                            className={`mt-1 block w-full border ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-lightPink focus:border-accent-lightPink sm:text-sm`}
                            placeholder="Message"
                        />
                        {/* {errors.subject && (
                            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                        )} */}
                    </div>

                </div>
                <div className='flex justify-end w-full mt-3'>
                    <div className="outer button_area !m-0 group !w-[230px] hover:!h-[40px] ">
                        <Button className=" text-center !w-[228px] font-normal px-4 justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  ">
                            <div className='text_shadow'>Submit</div>  {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                        </Button>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </form></div>
    )
}
