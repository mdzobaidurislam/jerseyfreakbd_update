
import { API_BASE_URL } from '@/app/config/api';
import { ApiResponse, NumberType, Product } from '@/types/api';
import ProductSlider from '@/app/ui/Product/ProductSlider'
import { fetchData } from '@/lib/dataFetching';



async function getProductRelativeView(id: number | string | undefined): Promise<Product[]> {
    const response = await fetchData<ApiResponse>(`${API_BASE_URL}/products/bought_together/${id}`, { revalidate: 10 });
    return response as any;
}
export default async function RelativeProduct({ id }: NumberType) {
    const result = await getProductRelativeView(id) as any;
    return (
        <ProductSlider
            title={result?.title}
            sub_title='Product'
            products={result?.data}
            view_link="/related"
            className='bg-transparent'
            ContainerClassName="!pb-[20px]"
            translateKey='recently_view_product'
            view_show={false}
        />
    )
}
