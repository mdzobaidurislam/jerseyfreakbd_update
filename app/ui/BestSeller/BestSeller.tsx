
import { API_BASE_URL } from '@/app/config/api';
import ProductSlider from '@/app/ui/Product/ProductSlider';

async function getEssential(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/products/best-seller`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function BestSeller() {
    const result = await getEssential() as any;
    const products = result.data as any

    return (
        <ProductSlider
            bestSeller={true}
            products={products}
            view_link="/best-seller"
            title={result?.title}
            ContainerClassName='pb-[0px] pt-[60px]'

        />

    )
}
