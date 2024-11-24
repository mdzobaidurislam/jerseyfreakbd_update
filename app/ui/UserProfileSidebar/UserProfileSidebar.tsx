"use client"
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, Navigation, DollarSign, SquarePen } from 'lucide-react';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import SignOutFormSide from '../SignOutFormSide';
import axios from 'axios';
import Image from 'next/image';
import { BASE_URL } from '@/app/config/api';

const UserProfileSidebar = ({ session, customer }: any) => {
  const { translateValue } = cookieStore();
  const sign_out = translateValue?.sign_out;
  const [avatar, setAvatar] = useState<any>(customer?.avatar);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('images', file);
      formData.append('id', session?.user?.id);

      const { data } = await axios.post('/api/upload-avatar', formData);

      if (data.result) {
        setAvatar(data?.upload?.file_name);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col items-center mb-6 relative ">
        <SquarePen onClick={handleIconClick} className="cursor-pointer absolute z-40 top-0 right-0 text-primary " />
        <div
          className={` overflow-hidden border border-primary relative w-[150px] h-[150px] rounded-full flex items-center justify-center mb-2  cursor-pointer ${isUploading ? 'opacity-50' : ''
            }`}
          onClick={handleIconClick}
        >

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )}
          <img
            src={`${BASE_URL}/public/${avatar}`}
            width={140}
            height={140}
            alt='Profile'
            className="!w-w-[140px] !h-w-[140px] rounded-[50%] "
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
        <p className="text-sm text-gray-600">{session?.user?.phone}</p>

      </div>

      <nav>
        <ul className="space-y-2">
          <NavItem href="/user/dashboard" icon={<Home size={18} />} label="Dashboard" />
          <NavItem href="/user/purchase_history" icon={<ShoppingBag size={18} />} label="Purchase History" isNew />
          <NavItem href="/user/wish_list" icon={<Heart size={18} />} label="Wishlist" />
          <NavItem href="/user/earning-points" icon={<DollarSign size={18} />} label="Earning points" />
          <NavItem href="/user/profile" icon={<User size={18} />} label="Manage Profile" />
          <NavItem href="/user/address" icon={<Navigation size={18} />} label="Address" />
          <li>
            <SignOutFormSide sign_out={sign_out} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ href, icon, label, isNew = false }: any) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '';
  const isActive = pathname === href || callbackUrl === href;

  return (
    <li>
      <Link href={href || ""} className={`flex items-center space-x-3 rounded-md p-2 cursor-pointer transition-colors duration-200 hover:bg-arival hover:text-black
        ${isActive
          ? 'bg-primary text-white'
          : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {icon}
        <span>{label}</span>

      </Link>
    </li>
  );
};

export default UserProfileSidebar;