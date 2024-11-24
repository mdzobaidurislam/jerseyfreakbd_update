import FilterProduct from "@/app/ui/FilterProduct/FilterProduct";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({ searchParams, params }) {
  const categories = searchParams?.categories || "";
  const attribute_values = searchParams?.attribute_values || "";
  const subCategory = searchParams?.subCategory || "";
  const brands = searchParams?.brands || "";
  const discount = searchParams?.discount || "";
  const sort_by = searchParams?.sort_by || "";
  const currentPage = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.min_price);
  const maxPrice = Number(searchParams?.max_price);

  // Pass categories and page to getProducts
  const data = {
    slug: params.slug,
    attribute_values: attribute_values,
    categories: categories,
    subCategory: subCategory,
    brands: brands,
    discount: discount,
    sort_by: sort_by,
    currentPage: currentPage,
    minPrice: minPrice,
    maxPrice: maxPrice,
  };
  return (
    <>
      {/* {!categories ? (
        <ProductSkeletonGrid />
      ) : ( */}
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<ProductSkeletonGrid />}
      >
        <FilterProduct query={data} />
      </Suspense>
      {/* )} */}
    </>
  );
}
