"use client"
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Slider } from '@/types/api'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'

type PropType = {
  banners: Slider[]
  options?: EmblaOptionsType
}

const BannerSlider: React.FC<PropType> = (props) => {
  const { banners, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop
    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )
  // pb-8 md:pb-[65px]
  return (
    <section className="embla pb-[30px]  md:pb-[10px]    ">
      <div className="embla__viewport w-full aspect-[2.64/1]   overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {banners && banners.map((banner, index) => (
            <div className="embla__slide" key={index}>
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center p-0 w-full h-full">
                  <AspectRatio ratio={2}>
                    <Link href={banner?.link || ""}>
                      <Image
                        src={`${banner.photo !== "" ? BASE_URL + '/public/' + banner.photo : '/slider/1.webp'}`}
                        alt={`Banner ${index + 1}`}
                        width={1770}
                        height={600}
                        style={{ objectFit: 'cover' }}
                        className='w-full'
                        loading="lazy"
                      />
                    </Link>
                  </AspectRatio>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BannerSlider