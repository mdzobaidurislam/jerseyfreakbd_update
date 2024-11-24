import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
// Define the types for the cart item and cart data
interface CartItem {
    id: number;
    owner_id: number;
    user_id: number;
    product_id: number;
    product_name: string;
    product_thumbnail_image: string;
    variation: string | null;
    price: number;
    currency_symbol: string;
    tax: number;
    shipping_cost: number;
    quantity: number;
    lower_limit: number;
    upper_limit: number;
}

interface CartData {
    name: string;
    owner_id: number;
    cart_items: CartItem[];
}

interface CartState {
    temp_user_id: string | null;
    cartData: CartData[] | null;
    totalQuantity: number;
    setCartData: (data: CartData[], totalQty?: number) => void;
    setTempUserId: () => void;
    setRemoveTempUserId: () => void;
    wishlist: any[];
    setWishlist: (id: any) => void;
    setWishlistArray: (data: any) => void;
    setWishlistRemove: (id: any) => void;
    setWishlistEmpty: () => void;
    resetProduct: number[]; // Specify the type for resetProduct
    setResetProduct: (productId: number) => void;

}

const useCartStoreData = create<CartState>()(
    persist(
        (set, get) => ({

            temp_user_id: null,
            cartData: null,
            totalQuantity: 0,
            setTempUserId: () => {
                const tempId = uuidv4();
                set({ temp_user_id: tempId });
                if (typeof window !== 'undefined') {
                    localStorage.setItem('temp_user_id', tempId);
                }
                return tempId;
            },
            setRemoveTempUserId: () => {
                set({ temp_user_id: null });
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('temp_user_id'); // Correct method to remove an item
                }
            },
            setCartData: (data, totalQty) => {
                set({
                    cartData: data,
                    totalQuantity: totalQty,
                });
            },
            wishlist: [],
            setWishlist: (id) => set((state) => ({ wishlist: [...state.wishlist, id] })),
            setWishlistRemove: (id) => set((state) => ({ wishlist: [...state.wishlist.filter((item) => item !== id)] })),
            setWishlistEmpty: () => set((state) => ({ wishlist: [] })),
            setWishlistArray: (data) => set((state) => ({ wishlist: data })),
            resetProduct: [],
            setResetProduct: (productId) => set((state) => {
                if (productId && !state.resetProduct.includes(productId)) {
                    return { resetProduct: [...state.resetProduct, productId] }; // Return new state
                }
                return state; // Return current state if no change
            }),

        }),
        {
            name: 'cart-storage', // Name of the storage item
        }
    )
);

export default useCartStoreData;
