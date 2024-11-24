import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ImageFile {
    file: File;
    preview: string;
}

interface ImageUploaderProps {
    setUploads: (uploads: ImageFile[]) => void; // Explicitly typing the setUploads function
}

export default function ImageUploader({ setUploads }: ImageUploaderProps): JSX.Element {
    const [images, setImages] = useState<ImageFile[]>([]);

    // Function to handle the image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const previewImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...previewImages];
            setUploads(updatedImages); // Update parent component with the selected images
            return updatedImages;
        });
    };

    // Function to remove an image
    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        setUploads(updatedImages); // Update parent component when an image is removed
    };
    return (
        <div className="image-uploader">
            <div className="flex items-center justify-start gap-4 flex-wrap ">
                {/* Render uploaded images */}
                {images.map((image, index) => (
                    <div key={index} className="relative w-[128px] h-[128px] border p-2 rounded">
                        <img
                            src={image.preview}
                            alt="upload preview"
                            className="object-cover w-full h-full"
                        />
                        <div
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 cursor-pointer bg-accent-lightPink text-white rounded-full w-6 h-6 text-xs"
                        >
                            <X className='text-xs' />
                        </div>
                    </div>
                ))}

                {/* Upload Button */}
                <label className="w-[128px] h-[128px] border border-dashed flex flex-col items-center justify-center cursor-pointer rounded">
                    <span className="text-gray-400">+</span>
                    <span className="text-gray-400">Upload</span>
                    <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </label>
            </div>
        </div>
    );
}
