"use client"
import Image from 'next/image'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'
import TranslateHeading from '@/app/ui/TranslateHeading'
import Autoplay from 'embla-carousel-autoplay'
import Container from '../Container/Container'
type PropType = {
    data: any,
    title: boolean,
    className?: string,
}
const Category: React.FC<PropType> = (props) => {
    const { data, title, className } = props
    const formattedData = data.data;
    return (
        <Container>
            {
                title && <TranslateHeading translateKey="trending_category" />
            }

            <div className='category_tranding   flex flex-col pt-6 lg:px-4 ' >

                <Carousel
                    opts={{
                        align: "center",
                        loop: true
                    }}

                    plugins={[
                        Autoplay({
                            delay: 3000,

                        }),
                    ]}
                    className="w-full "
                >
                    <CarouselContent>
                        {formattedData && formattedData.map((item: any) => (
                            <CarouselItem key={item.id} className=" basis-1/4 sm:basis-1/4 md:basis-1/5 xl:basis-[13.5%]  ">


                                <div className="tranding_item group pt-3 " >
                                    <Link href={`/category/${item.slug}`} >
                                        <div className="cat_logo flex flex-col items-center justify-center gap-3 md:pb-3  ">

                                            <div className=' overflow-hidden flex items-center justify-center w-[70px] h-[70px]  md:w-[125px] md:h-[125px]  lg:w-[150px] lg:h-[150px] xl:w-[140px] xl:h-[140px] rounded-[50%] bg-white shadow-[0_0_20.242px_0_rgba(0,0,0,0.09)] md:p-8  '>
                                                <div  >
                                                    <Image
                                                        loading="lazy"
                                                        src={`${BASE_URL}/public/${item?.icon}`}
                                                        width={130}
                                                        height={130}
                                                        alt={item.name}
                                                        className='object-contain w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto max-w-full '
                                                    />
                                                </div>
                                            </div>

                                            <h3 className=' text-[12px] md:text-base text-neutral-black  group-hover:text-accent-lightPink text-center font-bold uppercase duration-300 ease-in-out  line-clamp-1 ' >{item.name}</h3>
                                        </div>
                                    </Link>
                                </div>



                            </CarouselItem>
                        ))}
                    </CarouselContent>

                </Carousel>
            </div>
        </Container>
    )
}
export default Category