'use client';

import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import { authenticate, authenticateSignUp } from '@/app/lib/actions';
import { KeyRound, Loader2, Mail, Phone, User } from 'lucide-react';
import Image from 'next/image';
import { CustomButton } from './CustomLink';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import GradientBtn from './GradientBtn';
import TitleLoginHeading from './LoginCoomponent/TitleLoginHeading';
import SocialSection from './LoginCoomponent/SocialSection';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { OtpForm } from './OtpForm';
import { productStore } from '@/lib/hooks/useProductStore';
import toast from 'react-hot-toast';
export default function SigninUpForm({ translate, setActiveForm }: any) {
  const router = useRouter();
  const { showSocial, setShowSocial } = productStore();
  const { setTempUserId, temp_user_id } = useCartStoreData((state) => ({
    setTempUserId: state.setTempUserId,
    temp_user_id: state.temp_user_id,
  }));
  const { data: session } = useSession()
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // State for validation errors and submission status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [activeOtpForm, setActiveOtpForm] = useState(false);
  const [user_info, setUser_info] = useState<any>(null);
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;
  const [useEmailOrPhone, setUseEmailOrPhone] = useState(false)

  const params = useSearchParams()
  let callbackUrl = params.get('redirect') || '/user/dashboard'

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Basic form validation
  const validateForm = () => {
    const { email, phone } = formData;

    if (!email && !useEmailOrPhone) {
      setErrorMessage('Email are required.');
      return false;
    }
    if (!phone && useEmailOrPhone) {
      setErrorMessage('Phone are required.');
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (cookieValue && cookieValue.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session, cookieValue])

  // Handle form submission
  const handleOtpSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsPending(true);
    try {
      const response: any = await axios.post(
        `/api/auth/send_otp`, {
        phone: useEmailOrPhone ? formData.phone : formData.email,
        verify: useEmailOrPhone ? 'phone' : 'email'
      });

      if (response?.data.result) {
        toast.success(response?.data?.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#A020F0", secondary: "#fff" },
        });
        setActiveOtpForm(true)
        setIsPending(false);
        setShowSocial(true)
      } else {
        toast.error(response?.data?.message, {
          style: { color: "#404042", fontWeight: 600 },
          iconTheme: { primary: "#A020F0", secondary: "#fff" },
        });
        setIsPending(false);
        setActiveOtpForm(false);
        setShowSocial(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setIsPending(false);
      setActiveOtpForm(false);
      setShowSocial(false);
    }
  };



  return (

    <div className="flex-1   bg-gray-50 px-2 md:px-6 pb-8 pt-8  flex-col gap-6 flex form_area rounded-[30px]  ">
      <TitleLoginHeading title="Sign Up with" />
      {
        activeOtpForm ? <OtpForm translate={translate} useEmailOrPhone={useEmailOrPhone} formData={formData} user_info={user_info} /> :
          <div className="w-full flex flex-col gap-2">

            <div className="relative h-[42px]">
              {
                useEmailOrPhone ? <>
                  <input
                    onChange={handleInputChange}
                    name="phone"
                    type="number"
                    placeholder="Phone"
                    className="w-full py-3 pl-10 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
                    value={formData.phone}
                  />
                  <Phone className="text-white pointer-events-none absolute left-3 top-[60%] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </> : <>
                  <input
                    className="w-full py-3 pl-10 pr-4 text-[#391C1D] placeholder-[#391C1D] bg-transparent rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent-lightPink focus:border-accent-lightPink shadow-lg backdrop-blur-lg form_input"
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Mail className="text-white pointer-events-none absolute left-3 top-[60%] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </>
              }

            </div>
            {errorMessage && (
              <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                <ExclamationCircleIcon className="h-5 w-5 text-white" />
                <span className="text-sm text-white">{errorMessage}</span>
              </div>
            )}
            <div className={`flex items-center justify-between  mt-3  `}>
              <div className='cursor-pointer' onClick={() => {
                setUseEmailOrPhone(!useEmailOrPhone)
                setErrorMessage(null)
              }} >
                <span className='text-base font-bold text-white '>Use {useEmailOrPhone ? 'Email' : 'Phone'}  Instead</span>
              </div>
              <GradientBtn onClick={handleOtpSend} disabled={isPending} >
                {isPending ? 'Get Otp...' : 'Get Otp'}
              </GradientBtn>
            </div>
          </div>
      }
      {
        !showSocial && <SocialSection setActiveForm={setActiveForm} otherTitle="Sign Up" title="Already have an account?" loginText="Sign In" value={0} />
      }


    </div>

  );
}
