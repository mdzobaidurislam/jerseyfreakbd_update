export type Slider = {
  photo: string;
  link: string;
};
export type Menu = [];
export interface LoginResponse {
  result: boolean;
  message: string;
  access_token: string;
  token_type: string;
  expires_at: string | null;
  user: {
    id: number;
    type: string;
    name: string;
    email: string;
    avatar: string | null;
    avatar_original: string;
    phone: string;
  };
}
export type Order = {
  _id: string
  user?: { name: string }
  items: [OrderItem]
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  paymentResult?: { id: string; status: string; email_address: string }
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  paidAt?: string
  deliveredAt?: string
  createdAt: string
}

export type OrderItem = {
  id: number
  name: string
  qty?: number
  image?: string
  price: number
  color?: string
  variant?: string
}

export type ShippingAddress = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type ApiResponse<T = any> = {
  data?: T[];
  links?: Links;
  meta?: Meta;
  success: boolean;
  status: number;
};

// New Category types
export type CategoryFeatured = {
  id: number;
  slug: string;
  name: string;
  banner: string;
  icon: string;
  number_of_children: number;
  links: {
    products: string;
    sub_categories: string;
  };
};
export type Offer = {
  id: number;
  title: string;
  slug: string;
  date: number;
  banner: string;
};
export type Blog = {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  banner: string;
};

type RatingProgress = {
  stars: number;
  count: number;
  percentage: number;
};

type RatingStats = {
  total_reviews: number;
  average_rating: number;
  rating_progress: RatingProgress[];
};

export interface CartItem {
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

export interface CartData {
  name: string;
  owner_id: number;
  cart_items: CartItem[];
  totalQuantity?: number; // Optional or remove if not needed
}


export type ProductDetails = {
  id: number;
  name: string;
  slug: string;
  stocks: [];
  slugData: string;
  added_by: string;
  seller_id: number;
  shop_id: number;
  shop_name: string;
  shop_logo: string;
  photos?: Array<{
    variant?: string;
    path?: string;
  }>;
  thumbnail_image: string;
  tags: string[];
  price_high_low: string;
  choice_options: any[];
  colors: any[];
  has_discount: boolean;
  discount: string;
  stroked_price: string;
  main_price: string;
  calculable_price: number;
  currency_symbol: string;
  current_stock: number;
  unit: string;
  rating: number;
  rating_count: number;
  rating_stats: RatingStats;
  earn_point: number;
  description: string;
  short_description: string;
  ingredient: string;
  video_link: string;
  brand: {
    id: number;
    name: string;
    logo: string;
  };
  link: string;
  meta_title: string;
  meta_description: string;
  meta_img: string;
  offerImage?: any;
  grid_count?: number;
}
export type Brand = {
  id: number;
  name: string;
  logo: string;
  discount: number;
  links: {
    products: string;
  };
};

export type Product = {
  id: number;
  bestSeller: boolean;
  name: string;
  stocks: [];
  colors: [];
  choice_options: [];
  best_seller_text: string;
  discount_off_text: string;
  slug: string;
  brand: string;
  totalRating: number;
  discount: number;
  discount_type: string;
  thumbnail_image: string;
  has_discount: boolean;
  stroked_price: string;
  main_price: string;
  rating: number;
  sales: number;
  links: {
    details: string;
  };
};
export interface Review {
  id: number;
  user_id: number;
  user_name: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  status: number;
  recommended: number;
  review_like: number;
  review_dislike: number;
  images: string[]; // Array of image URLs
  time: string;
  created_at: string;
}

// Define the type for the links object
export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

// Define the type for the pagination link item
export interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Define the type for the meta information
export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[]; // Array of MetaLink items
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export type NumberType = {
  id: number;
}


export default function ApiTypes() {
  return null;
}
