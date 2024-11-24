
"use client"

import { productStore } from "@/lib/hooks/useProductStore";

const OrderDetails = ({ id, result }: any) => {
    const { showOrder, setShowOrder } = productStore();
    const orderData = result?.data?.data[0] || null
    const orderItems = result?.order_items?.data || null

    return (
        <>
            {
                showOrder == id &&

                <div className="  overflow-y-auto shadow-lg  ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">

                        <div className="w-full  transform overflow-hidden text-left align-middle  transition-all">
                            <div className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                                Order Id: {orderData?.code}

                            </div>
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Order Summary</h4>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                                    <div className="flex flex-col gap-3  flex-wrap">
                                        <p><span className="font-bold">Order Code:</span> {orderData?.code}</p>
                                        <p><span className="font-bold">Customer:</span>{orderData?.shipping_address?.name}</p>
                                        <p><span className="font-bold">Email:</span> {orderData?.shipping_address?.email}</p>
                                        <p><span className="font-bold">Shipping address:</span> {orderData?.shipping_address?.address},{orderData?.shipping_address?.city},{orderData?.shipping_address?.postal_code},{orderData?.shipping_address?.country}</p>
                                    </div>
                                    <div className="flex flex-col gap-3 flex-wrap ">
                                        <p><span className="font-bold">Order date:</span> {orderData?.date}</p>
                                        <p><span className="font-bold">Order status:</span> {orderData?.delivery_status}</p>
                                        <p><span className="font-bold">Total order amount:</span>{orderData?.grand_total}</p>
                                        {/* <p><span className="font-bold">Shipping method:</span> Flat shipping rate</p> */}
                                        <p><span className="font-bold">Payment method:</span> {orderData?.payment_type}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Order Details</h4>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 text-left">#</th>
                                            <th className="py-2 text-left">Product</th>
                                            <th className="py-2 text-left">Variation</th>
                                            <th className="py-2 text-left">Quantity</th>
                                            <th className="py-2 text-left">Price</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {orderItems.map((item: any, index: any) => (
                                            <tr className="border-b" key={item.id} >
                                                <td className="py-2">{index + 1}</td>
                                                <td className="py-2">	{item?.product_name}</td>
                                                <td className="py-2">
                                                    Size: {item?.variation}
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

                                                </td>
                                                <td className="py-2">{item?.quantity}</td>
                                                <td className="py-2">{item?.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 flex justify-center md:justify-end">
                                <div className=" w-full lg:w-1/4">
                                    <h4 className="font-semibold mb-2">Order Ammount</h4>
                                    <div className="text-sm">
                                        <p className="flex justify-between gap-2 "><span>Subtotal</span> <span>{orderData?.subtotal}</span></p>
                                        <p className="flex justify-between gap-2 "><span>Shipping</span> <span>{orderData?.shipping_cost}</span></p>
                                        <p className="flex justify-between gap-2 "><span>Tax</span> <span>{orderData?.tax}</span></p>
                                        <p className="flex justify-between gap-2 "><span>Coupon</span> <span>{orderData?.coupon_discount}</span></p>
                                        <p className="flex justify-between gap-2  font-semibold mt-2"><span>Total</span> <span>{orderData?.grand_total}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>


    );
};

export default OrderDetails;