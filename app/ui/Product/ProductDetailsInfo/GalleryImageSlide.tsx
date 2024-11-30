import React, { useState } from 'react';
import { BASE_URL } from '@/app/config/api';
import './GalleryImageSlide.css';
import { Image } from 'antd';

const ImageGallery = ({ productDetails }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(0); // Track the active image index
    const [limitShow, setLimitShow] = useState(4);
    const totalLength = productDetails?.photos.length;

    // Handle image click to preview
    const handleImageClick = (index: number) => {
        setCurrentIndex(index); // Set the clicked image as the active one
        setIsModalOpen(true);   // Open the modal preview
        setLimitShow(totalLength)
    };

    return (
        <>
            <Image.PreviewGroup
                preview={{
                    current: currentIndex || 0,  // Show the current active image
                    onChange: (current) => setCurrentIndex(current), // Track when preview changes
                }}
            >
                {productDetails?.photos.slice(0, limitShow).map((item: any, index: number) => (
                    <li className={`cover-image single-image ${currentIndex === index ? 'active' : ''}`} key={index}>
                        <Image
                            
                            src={`${BASE_URL}/public/${item.path}`}
                            onClick={() => handleImageClick(index)} // Click to preview the image
                        />
                    </li>
                ))}
            </Image.PreviewGroup>



            {/* Button to show all images */}
            {limitShow !== totalLength && (
                <div className='show_all_image' onClick={() => setLimitShow(totalLength)}>
                    Show all images
                </div>
            )}
        </>
    );
};

export default ImageGallery;
