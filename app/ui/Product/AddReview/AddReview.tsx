"use client"
import CustomInput from '@/app/ui/CustomInput'
import { Textarea } from '@/components/ui/textarea'
import { Rate } from 'antd';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { productStore } from '@/lib/hooks/useProductStore';
import ImageUploader from './ImageUploader';

export default function AddReview({ id }: any) {
    const { reviewEvent, setReviewEvent } = productStore();
    const { data: session, update } = useSession() as any
    const [loading, setLoading] = useState<boolean>(false);
    const [uploads, setUploads] = useState<any>([]);
    const [formData, setFormData] = useState<any>({
        title: '',
        fullName: session?.user?.name || '',
        email: session?.user?.email || '',
        product_id: id,
        user_id: session?.user?.id,
        comment: "",
        rating: 5,
        recommended: false,
        recommendedData: 0,
    })


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
            recommendedData: e.target.checked === true ? 1 : 0
        });
    };

    const handleRate = (value: any) => {
        setFormData({
            ...formData,
            rating: value
        });
    };
    const HandlerReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (formData.comment == '') {
            toast.error("Comment is required")
            setLoading(false)
            return false
        }
        try {
            const formDataImage = new FormData();
            formDataImage.append('fullName', formData.fullName);
            formDataImage.append('title', formData.title);
            formDataImage.append('recommended', formData.recommendedData);
            formDataImage.append('email', formData.email);
            formDataImage.append('product_id', formData.product_id.toString());
            formDataImage.append('user_id', formData.user_id.toString());
            formDataImage.append('comment', formData.comment);
            formDataImage.append('rating', formData.rating.toString());
            if (uploads.length > 0) {
                uploads.forEach((image: any) => {
                    formDataImage.append('images[]', image.file);
                });
            }
            const response: any = await axios.post('/api/add_review', formDataImage);

            if (response?.data.result) {
                toast.success(response?.data.message)
                setLoading(false)
                setReviewEvent(Math.random())
            } else {
                toast.error(response?.data.message)
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            console.error('Error updating profile:', error);
        }

    }



    return (
        <div className='flex flex-col gap-4 pb-[30px] '>
            <form onSubmit={HandlerReview} className='flex flex-col gap-4' >
                <div className='grid grid-cols-2 gap-4'>
                    {/* Full Name */}
                    <div className="col-span-1 ">
                        <label className="block text-sm font-medium mb-2">Your name</label>
                        <CustomInput
                            name="fullName"
                            type="text"
                            placeholder="ex *"
                            className="w-full"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    {/* E-Mail */}
                    <div className=" col-span-1">
                        <label className="block text-sm font-medium mb-2">E-Mail</label>
                        <CustomInput
                            name="email"
                            type="email"
                            placeholder="example@gmail.com *"
                            className="w-full"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled
                        />

                    </div>
                </div>
                {/* Address */}
                <div className='grid grid-cols-2'>
                    <div className=" col-span-2 flex flex-col gap-2  ">
                        <div >Rating</div>
                        <div className='mb-4'>
                            <Rate onChange={handleRate} value={formData?.rating} className='text-accent-lightPink' />
                        </div>
                    </div>
                    <div className="col-span-2 ">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <CustomInput
                            name="title"
                            type="text"
                            placeholder="Title"
                            className="w-full"
                            value={formData.title}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className=" col-span-2 mt-3 ">
                        <label className="block text-sm font-medium mb-2">Comment</label>
                        <Textarea
                            name="comment"
                            placeholder="Your review"
                            className="w-full"
                            value={formData.comment}
                            onChange={handleInputChange}
                        />
                        <div>
                        </div>
                    </div>
                    <div className=" col-span-2 flex items-center gap-1 mt-2   ">

                        <input
                            type="checkbox"
                            className="form-checkbox text-primary"
                            onChange={handleCheckboxChange}
                            name='recommended'
                            id='recommended'
                        />
                        <label htmlFor="recommended" className="block text-sm font-medium mt-1">Recommended  product</label>
                        <div>
                        </div>
                    </div>
                </div>
                <div>
                    <ImageUploader setUploads={setUploads} />
                </div>
                <div className='flex justify-end items-end ' >
                    <div>
                        <div className="outer button_area !m-0 ">
                            <Button type='submit' disabled={loading}  >
                                <div className='text_shadow'>Submit</div> {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}
                            </Button>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}
