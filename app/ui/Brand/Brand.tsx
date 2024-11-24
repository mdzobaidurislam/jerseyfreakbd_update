
import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image';
import Link from 'next/link';
import Container from '../Container/Container';
import { Button } from '@/app/ui/button';
import HeadingSection from '../Section/HeadingSection';

async function getPromotionCategory(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/categories/promotion`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function Brand() {
    const result = await getPromotionCategory();
    return (
        <section className='brands_section  py-[45px] lg:pb-[100px]'>
            <Container className='pb-[0px]'>
                <div className='flex mb-5 relative'>
                    <h3 className='  text-[18px] xl:text-[36px] uppercase  font-adihausDIN relative heading_border !border-white brand_title '>{result?.title}</h3>
                </div>
                <div className='brand_section flex flex-col gap-6  xl:px-[0px]  ' >
                    <Carousel
                        opts={{
                            align: "center",
                        }}
                        className="w-full "
                    >
                        <CarouselContent className='flex items-center justify-between'>
                            {result?.data && result.data.map((item: any) => (
                                <CarouselItem key={item.id} className="ml-2 pl-4  lg:pl-2 basis-[70%] sm:basis-1/3 md:basis-1/3 lg:basis-1/3 xl:basis-[22%]">
                                    <Link href={`/category/${item.slug}`} >
                                        <div className="brand_item flex items-center justify-center flex-col gap-3 " key={item.id} >
                                            <div className=' overflow-hidden '>
                                                <Image
                                                    src={`${BASE_URL}/public/${item.icon}`}
                                                    width={400}
                                                    height={400}
                                                    alt={item.name}
                                                    className="transition-transform  duration-300 ease-in-out transform rounded-sm "
                                                />

                                            </div>
                                            <div className='flex  flex-col gap-[0px] sm:gap-[0px] text-center pt-0 sm:pt-0'>
                                                <h3 className=' text-[14px] sm:text-xl font-medium text-white  mb-2' >{item.name}</h3>
                                                <div className="outer button_area  ">
                                                    <Button className="w-full text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  ">

                                                        <div className='text_shadow'>Shop now</div>
                                                    </Button>
                                                    <span></span>
                                                    <span></span>
                                                </div>

                                            </div>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                </div>
            </Container>
        </section>
    )
}
