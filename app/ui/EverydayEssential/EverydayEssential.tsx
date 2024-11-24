
import { API_BASE_URL } from '@/app/config/api';
import ProductSlider from '@/app/ui/Product/ProductSlider';
import { getTrandingProduct } from '@/lib/apiData';

async function getEssential(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/products/essential`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function EverydayEssential() {
    const result = await getEssential() as any;
    const products = result.data as any

    return (
        <ProductSlider
            products={products}
            translateKey={'everydayEssential'}

            view_link="/everyday-essential"
            title={result?.title}
            ContainerClassName='pb-[10px] pt-[60px]'

        />

    )
}
