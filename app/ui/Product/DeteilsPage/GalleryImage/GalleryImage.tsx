"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { ImageButton } from './ImageButton'
import './Gallery.css'
import Image from 'next/image'
import { DotButton } from '@/app/ui/Banner/EmblaCarouselDotButton'
import CustomImage from '@/app/ui/CustomImage/CustomImage'

type Image = {
    variant?: string;
    path?: string;

}

type PropType = {
    images?: Image[]
    options?: EmblaOptionsType
}

const GalleryImage: React.FC<PropType> = (props) => {
    const { images, options } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        axis: 'y' // Vertical axis for thumbnail slider
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        const index = emblaMainApi.selectedScrollSnap();
        setSelectedIndex(index);

        // Center the selected thumbnail in the viewport
        const selectedThumb = emblaThumbsApi.slideNodes()[index] as HTMLElement;
        const thumbsViewport = emblaThumbsApi.rootNode() as HTMLElement;

        if (selectedThumb && thumbsViewport) {
            const thumbHeight = selectedThumb.offsetHeight;
            const viewportHeight = thumbsViewport.offsetHeight;
            const thumbOffsetTop = selectedThumb.offsetTop;

            // Calculate the scroll position to center the thumbnail
            const scrollPosition = thumbOffsetTop - viewportHeight / 2 + thumbHeight / 2;

            // Scroll to the calculated position
            emblaThumbsApi.scrollTo(index, false); // The second argument is a boolean

            // Adjust the scroll position manually
            emblaThumbsApi.containerNode().scrollTop = scrollPosition;
        }
    }, [emblaMainApi, emblaThumbsApi]);


    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()

        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="gallery relative  gap-[15px] flex h-[400px] lg:h-[550px] ">
            <div className="hidden md:block gallery-thumbs side_image w-[100px] lg:w-[135px] xl:w-[100px] h-[calc(100vh-3rem)]">
                <div className="gallery-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="gallery-thumbs__container !h-[395px] lg:w-[520px] ">
                        {(images ?? []).map((image, index) => (
                            <ImageButton
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                image={image}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="gallery__viewport main_image flex-1" ref={emblaMainRef}>
                <div className="gallery__container">
                    {(images ?? []).map((image, index) => (
                        <div className="gallery__slide" key={index + 122}>
                            <CustomImage
                                src={image.path}
                                width={520}
                                height={520}
                                alt={`Slide ${index}`}
                                className="!rounded-lg w-full aspect-square"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="block embla__controls bottom-[20px] lg:hidden ">
                <div className="embla__dots">
                    {(images ?? []).map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onThumbClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GalleryImage
