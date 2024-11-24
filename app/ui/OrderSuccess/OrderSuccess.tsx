import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import { auth } from '@/auth';
import React from 'react'
import DeliveryTimeline from '../DeliveryTimeline/DeliveryTimeline';

async function getPurchaseHistoryDetails(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/purchase-history-details/${id}`, {
        cache: 'no-store',
    });


    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

async function getOrderStaus(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/pathao/callback/${id}`, {
        cache: 'no-store',
    });


    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}


export default async function OrderSuccess({ order_id }: any) {
    const token: any = await auth()
    const result = await getPurchaseHistoryDetails(order_id);
    const orderStatus = await getOrderStaus(order_id);
    const orderData = result?.data?.data[0]
    const orderItems = result?.order_items?.data

    return (
        <div>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl my-10 ">
                {
                    orderData?.payment_status !== 'unpaid' &&

                    <div className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="ml-4 text-2xl font-semibold">{result?.total_point_earn}</h2>
                        </div>
                    </div>
                }
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="ml-4 text-2xl font-semibold">Thank you,{token?.user?.name}!</h2>
                    </div>
                    <p className="text-gray-600">We've accepted your order, and we're getting it ready. Come back to this page for updates on your shipment status.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-bold text-lg">Order details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col gap-3">
                                    <p><span className="font-semibold">Order Code:</span> {orderData?.code}</p>
                                    <p><span className="font-semibold">Customer:</span>{orderData?.shipping_address?.name}</p>
                                    <p><span className="font-semibold">Email:</span> {orderData?.shipping_address?.email}</p>
                                    <p><span className="font-semibold">Shipping address:</span> {orderData?.shipping_address?.address},{orderData?.shipping_address?.city},{orderData?.shipping_address?.postal_code},{orderData?.shipping_address?.country}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p><span className="font-semibold">Order date:</span> {orderData?.date}</p>
                                    <p><span className="font-semibold">Order status:</span> {orderData?.delivery_status}</p>
                                    <p><span className="font-semibold">Total order amount:</span>{orderData?.grand_total}</p>
                                    <p><span className="font-semibold">Payment method:</span> {orderData?.payment_type}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        orderStatus?.data &&
                        <div className='col-span-2'>
                            <DeliveryTimeline data={orderStatus?.data} />
                        </div>
                    }

                    <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                        <h3 className="font-bold text-lg mb-4">Order summary</h3>
                        <div className="space-y-4">
                            {orderItems.map((item: any, index: any) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img src={`${BASE_URL}/public/${item.image}`} alt={item.name} className="w-12 h-12 rounded-lg mr-4" />
                                        <div>
                                            <p>{item?.product_name}</p>
                                            <p className="text-sm text-gray-500">Qty:{item?.quantity} {
                                                item?.variation && <span>Variation:{item?.variation}</span>
                                            }   </p>
                                            {
                                                (item?.playerName || item?.playerNumber) &&

                                                <div className="mt-1">
                                                    <span className="text-base font-semibold">Name &amp; Number</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm">Name: {item?.playerName.split(", ").join("")}</span>
                                                        <span className="text-sm">Number: {item?.playerNumber.split(", ").join("")}</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <p className="font-semibold">{item?.price}</p>
                                </div>
                            ))}


                            <div className="border-t pt-4 flex justify-end ">
                                <div className='w-[300px]'>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Subtotal</p>
                                        <p>{orderData?.subtotal}</p>
                                    </div>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Shipping</p>
                                        <p>{orderData?.shipping_cost}</p>
                                    </div>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Tax</p>
                                        <p>{orderData?.tax}</p>
                                    </div>
                                    <div className="flex justify-between text-sm gap-6">
                                        <p>Coupon</p>
                                        <p>{orderData?.coupon_discount}</p>
                                    </div>
                                    <hr />
                                    <div className=" border-t-1  flex justify-between text-lg font-semibold gap-6">
                                        <p>Club Point</p>
                                        <p>-{orderData?.club_point}</p>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold mt-2">
                                        <p>Total</p>
                                        <p>{orderData?.grand_total}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="text-center mt-8">
                    <p className="text-gray-500">Need help? <a href="#" className="text-blue-600">Contact us</a></p>
                </div> */}
            </div>
        </div>
    )
}
