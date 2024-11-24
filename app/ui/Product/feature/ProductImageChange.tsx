"use client";
import { BASE_URL } from '@/app/config/api';
import { productStore } from '@/lib/hooks/useProductStore';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ProductImageChange({ id, thumbnail_image, hoverImage = null, name }: any) {
  const { productImageChange } = productStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Default Image */}
      <Image
        src={`${productImageChange?.id === id && productImageChange.image
          ? (BASE_URL + '/public/' + productImageChange.image).trim()
          : (BASE_URL + '/public/' + thumbnail_image).trim()}`}
        width={300}
        height={300}
        alt={name}
        className={` object-contain w-full h-full transition-all duration-500 ease-in-out ${isHovered ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          }`}
      />

      {/* Hover Image */}
      <Image
        src={`${hoverImage ? (BASE_URL + '/public/' + hoverImage).trim() : ''}`}
        alt={name}
        className={`absolute object-contain w-full h-full top-0 left-0 transition-all duration-500 ease-in-out ${isHovered ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        width={300}
        height={400}
      />
    </div>
  );
}
