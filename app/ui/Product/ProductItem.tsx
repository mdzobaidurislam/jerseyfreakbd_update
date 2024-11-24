
import React from 'react';
import { Product } from '@/types/api';
import Link from 'next/link';
import SingleAddToCart from './AddToCartAction/SingleAddToCart';
import WishAdd from './WishAdd/WishAdd';
import ProductImageChange from './feature/ProductImageChange';
import StockImage from './feature/StockImage';

const ProductItem: React.FC<Product> = ({ has_discount, discount_off_text, best_seller_text, bestSeller, id, colors, choice_options, stocks, name, slug, brand, thumbnail_image, discount, rating, totalRating, stroked_price, main_price }: any) => {
  const productId = id;

  return (
    <div>
      <div className={`relative ${bestSeller && 'glow'}`}>
        <WishAdd id={id} />
        <div className='group_item z-[1] border border-orange_gray bg-white product_item relative group p-3'>
          <div className="product_thumb flex flex-col gap-[13px] sm:gap-3">
            <div className="tum_image  relative overflow-hidden">
              <Link href={`/product/${slug}`}>
                <ProductImageChange
                  hoverImage={stocks && stocks.length > 0 && stocks[0] ? stocks[0].image : null}
                  id={id}
                  thumbnail_image={thumbnail_image}
                  name={name}
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center gap-[12px]">
              {bestSeller && (
                <>
                  <h5 className="glow_text best_seller card ">{best_seller_text}</h5>
                </>
              )}

              <Link href={`/product/${slug}`}>
                <h3 className="text-[14px] sm:text-base text-neutral-black text-center font-medium line-clamp-2 ">{name}</h3>
              </Link>

              <div className="price flex items-start gap-2 justify-center flex-wrap">
                <div className="regular_price text-accent-lightPink text-sm font-bold">{main_price}</div>
                {
                  has_discount &&
                  <div className="sale_price text-orange_gray text-[12px] sm:text-sm relative line-through">
                    {stroked_price}
                  </div>
                }
                {
                  has_discount &&

                  <div className="offer max-w-max text-accent-lightPink font-bold text-[12px] sm:text-[12px]">
                    <span>{discount}{discount_off_text}</span>
                  </div>
                }
              </div>

              {stocks && stocks.length > 0 && (
                <div className="stock_image flex gap-1 justify-center overflow-scroll hide-scrollbar overflow-y-hidden">
                  {stocks.map(({ image, id }: any) => (
                    image &&
                    <div className="img_item_stock w-[25px] h-[25px] cursor-pointer overflow-hidden" key={id}>
                      <StockImage image={image} id={productId} />
                    </div>
                  ))}
                </div>
              )}
              <SingleAddToCart
                id={id}
                stocks={stocks}
                choice_options={choice_options}
                colors={colors}
                thumbnail_image={thumbnail_image}
                name={name}
                stroked_price={stroked_price}
                main_price={main_price}
                totalRating={totalRating}
                brand={brand}
                discount={discount}
                has_discount={has_discount}
                discount_off_text={discount_off_text}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
