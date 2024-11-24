
import ProductSlider from '@/app/ui/Product/ProductSlider';
import { getFeaturedProduct } from '@/lib/apiData';

export default async function FeaturedCollection() {
    const result = await getFeaturedProduct() as any;
    const products = result.data as any

    return (
        <ProductSlider
            products={products}
            view_link="/featured-collection"
            translateKey={'featuredCollection'}
            ContainerClassName='pt-[0px] pb-[10px]'
            translateTitle='featured_collection_season'
            className='!pb-[20px] !pt-2'
        />

    )
}
