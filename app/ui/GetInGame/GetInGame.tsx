import React from 'react'
import clsx from 'clsx'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image';
import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import Link from 'next/link';
import Container from '../Container/Container';
type Props = {
    children?: React.ReactNode;
    title?: string;
    sub_title?: string;
    view_link?: string;
    className?: string;
    ContainerClassName?: string;
    translateKey?: string;
};
async function getSport_gameCategory(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/categories/sport_game`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function GetInGame({
    view_link = "/",
    className,
    ContainerClassName,
}: Props) {
    const result = await getSport_gameCategory();
    return (
        <Container>
            <div className={clsx('arrival_section  flex flex-col gap-[10px]  pt-[70px] pb-[10px] px-[0px] sm:px-0 rounded-[26px]', className)}>
                <div>
                    <h3 className=' font-bold text-[22px] xl:text-[36px] text-neutral-black  '> {result?.title} </h3>
                </div>
                <Carousel
                    opts={{
                        align: 'center',
                    }}
                    className="w-full"
                >
                    <CarouselContent className=''>
                        {result?.data && result?.data.map((item: any, index: any) => (
                            <CarouselItem key={index} className={`ml-2 pl-4   lg:pl-2 basis-[70%] sm:basis-1/3 md:basis-1/3 xl:basis-[22%] `}>

                                <div className="get_in_game">
                                    <Link href={`/category/${item.slug}`}>
                                        <div className="img_get_in relative">
                                            <Image
                                                src={`${item.icon && BASE_URL + '/public/' + item.icon}`}
                                                width={300}
                                                height={300}
                                                alt={item.name}
                                                className="object-contain w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto "
                                            />
                                            <h4 className='absolute uppercase font-bold text-[18px] xl:text-[40px] text-white left-4 bottom-5 ' >{item.name}</h4>
                                        </div>
                                    </Link>
                                </div>

                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[0px] sm:left-[-0px]" />
                    <CarouselNext className="right-[-0px] sm:right-[-0px]" />
                </Carousel>
            </div>
        </Container>
    )
}
