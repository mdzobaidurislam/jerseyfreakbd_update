
import { API_BASE_URL } from '@/app/config/api';
import { ApiResponse, NumberType, Product } from '@/types/api';
import ProductSlider from '@/app/ui/Product/ProductSlider'
import { fetchData } from '@/lib/dataFetching';

async function getProductRelated(id: number | string | undefined): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/best-seller`, { revalidate: 10 });
    return response as any;
}
export default async function TopSellingProduct({ id }: NumberType) {
    const result = await getProductRelated(id) as any;
    return (
        <ProductSlider
            title={result?.title}
            sub_title='Product'
            products={result?.data}
            view_link="/relative"
            className='bg-transparent'
            ContainerClassName="!pb-[29px]"
            translateKey='similarProduct'
            view_show={false}
        />
    )
}
