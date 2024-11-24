import FilterProduct from "@/app/ui/FilterProduct/FilterProduct";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({ searchParams, params }) {
  const categories = searchParams?.categories || "";
  const subCategory = searchParams?.subCategory || "";
  const brands = searchParams?.brands || "";
  const discount = searchParams?.discount || "";
  const sort_by = searchParams?.sort_by || "";
  const currentPage = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.min_price);
  const maxPrice = Number(searchParams?.max_price);

  return (
    <>
      {/* {!brands ? (
        <ProductSkeletonGrid />
      ) : ( */}
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<ProductSkeletonGrid />}
      >
        <FilterProduct
          query={{
            categories: categories,
            subCategory: subCategory,
            brands: brands,
            discount: discount,
            sort_by: sort_by,
            currentPage: currentPage,
            minPrice: minPrice,
            maxPrice: maxPrice,
          }}
        />
      </Suspense>
      {/* )} */}
    </>
  );
}
