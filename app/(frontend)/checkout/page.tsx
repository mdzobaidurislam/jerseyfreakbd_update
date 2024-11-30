
import { auth } from "@/auth";
import { API_BASE_URL } from "@/app/config/api";
import CheckoutForm from "@/app/ui/Checkout/CheckoutForm";


async function getAddressList(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/user/shipping/address/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

async function getTotalPoint(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/user_total_point/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}


export default async function Page() {
    const token: any = await auth();
    const result = await getAddressList(token?.user?.id);

    const data = result?.data
    const defaultAddress = result?.data?.find((item: any) => item.set_default === 1)
    const total_point = await getTotalPoint(token?.user?.id);
    return <CheckoutForm total_point={total_point?.total_points} data={defaultAddress} addressList={data} />

}
