
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductItem from '@/app/ui/Product/ProductItem';
import clsx from 'clsx';
import { Product } from '@/types/api';
import HeadingSection from '../Section/HeadingSection';
import { cn } from '@/lib/utils';


type Props = {
    children?: React.ReactNode;
    products?: Product[];
    title?: string;
    sub_title?: string;
    view_link?: string;
    className?: string;
    ContainerClassName?: string;
    translateKey?: string;
    translateTitle?: string;
    view_show?: boolean;
    bestSeller?: boolean;
};

export default function ProductSlider({
    products = [],
    view_link = "/",
    title = "",
    sub_title = "",
    className,
    ContainerClassName,
    translateKey,
    translateTitle,
    view_show = true,
    bestSeller = false
}: Props) {

    return (
        <div className={cn("container pb-[66px] mx-auto px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8", ContainerClassName)}>
            <div className={cn(`  flex flex-col ${bestSeller ? '' : 'gap-[15px] sm:gap-6'}  lg:py-[30px] px-[0px] sm:px-0 rounded-[26px]`, className)}>
                {
                    title ? <HeadingSection view_show={view_show} titleHas={title} translateTitle={translateTitle} translateKey={translateKey} link={view_link} /> : <HeadingSection view_show={view_show} translateTitle={translateTitle} translateKey={translateKey} link={view_link} />
                }

                <Carousel
                    opts={{
                        align: 'center',
                    }}
                    className="w-full"
                >
                    <CarouselContent className={`${view_show && `py-[40px] ${bestSeller ? '!pt-[80px]' : ''} ]`}`}>
                        {products && products.map((product, index) => (
                            <CarouselItem key={index} className={`ml-2 pl-4 lg:pl-2 basis-[70%] sm:basis-1/3 md:basis-1/3 xl:basis-[22%] `}>
                                <ProductItem {...product} bestSeller={bestSeller} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[0px] sm:left-[-0px]" />
                    <CarouselNext className="right-[-0px] sm:right-[-0px]" />
                </Carousel>
            </div>
        </div>
    );
}
