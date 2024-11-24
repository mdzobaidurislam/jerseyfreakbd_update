import { create } from 'zustand';

type StoreProps = {
  price: any;
  qtyV: any;
  combinationName: any;
  setPriceValue: (value: any) => void;
  setQty: (value: any) => void;
  setCombinationName: (value: any) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (data: boolean) => void;
  openCart: boolean;
  setOpenCart: (data: boolean) => void;
  productImageChange: any;
  setProductImageChange: (id: number, data: string) => void;
  // product functional 
  personalize: any,
  setPersonalize: (data: string) => void;
  patchPrice: any,
  setPatchPrice: (value: number) => void;
  reviewEvent: any,
  setReviewEvent: (value: number) => void;
  variantImage: any,
  setVariantImage: (value: string) => void;
  addToCartOption: any,
  setAddToCartOption: (value: any) => void;
  showSocial: boolean,
  setShowSocial: (value: boolean) => void;
  showOrder: null,
  setShowOrder: (value: any) => void;
  combinationId: null,
  setCombinationId: (value: any) => void;
};

export const productStore = create<StoreProps>((set, get) => ({
  price: 0,
  qtyV: 0,
  combinationId: null,
  setCombinationId: (value) => set({ combinationId: value }),
  combinationName: null,
  setPriceValue: (value) => set({ price: value }),
  setQty: (value) => set({ qtyV: value }),
  setCombinationName: (value) => set((state) => {
    console.log("value", value)
    return {
      combinationName: value
    }
  }),
  isSidebarOpen: false,
  setSidebarOpen: (data) => set((state) => ({ isSidebarOpen: data })),
  openCart: false,
  setOpenCart: (data) => set((state) => ({ openCart: data })),
  productImageChange: null,
  setProductImageChange: (id, image) => set((state) => ({
    productImageChange: {
      id: id,
      image: image
    }
  })),
  personalize: {
    type: 'none'
  },
  setPersonalize: (type) => set((state) => ({
    personalize: {
      type: type
    }
  })),
  patchPrice: 0,
  setPatchPrice: (value) => set({ patchPrice: value }),
  reviewEvent: null,
  setReviewEvent: (value) => set({ reviewEvent: value }),
  variantImage: null,
  setVariantImage: (value) => set({ variantImage: value }),
  addToCartOption: {
    patch_selected: "patch_none",
    personalize_selected: "none",
    patch_selected_price: 0,
    player_number_name_price: 0,
    playerName: [],
    playerNumber: [],
  },
  setAddToCartOption: (value) => set({ addToCartOption: value }),
  showSocial: false,
  setShowSocial: (value) => set({ showSocial: value }),
  showOrder: null,
  setShowOrder: (value) => set({ showOrder: value }),

}));
