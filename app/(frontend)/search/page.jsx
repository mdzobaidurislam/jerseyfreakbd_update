
import { API_BASE_URL } from "@/app/config/api";
import Container from "@/app/ui/Container/Container";
import FilterProduct from "@/app/ui/FilterProduct/FilterProduct";
import FilterSidebar from "@/app/ui/FilterSection/FilterSection";
import SortByFilter from "@/app/ui/FilterSection/SortByFilter";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { Suspense } from "react";

// Fetch data functions
async function getSearch() {
  const response = await fetch(`${API_BASE_URL}/search_data/`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data.data ;
}

async function getAllCategory() {
  const response = await fetch(`${API_BASE_URL}/filter/categories`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data.data ;
}

async function getAllBrand() {
  const response = await fetch(`${API_BASE_URL}/filter/brands`);
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data.data ;
}


export default async function Page({ searchParams }) {
  const { discount_data, min_price, max_price, translate_data } = await getSearch();
  const filter_categories = await getAllCategory();
  const filter_brand = await getAllBrand();

  const query = searchParams?.query || '';
  const categories = searchParams?.categories || '';
  const subCategory = searchParams?.subCategory || '';
  const brands = searchParams?.brands || '';
  const discount = searchParams?.discount || '';
  const sort_by = searchParams?.sort_by || '';
  const currentPage = Number(searchParams?.page) || 1;
  const search_min_price = Number(searchParams?.min_price);
  const search_max_price = Number(searchParams?.max_price);

  return <>
    <Container>
      <div className="filter_header flex items-center justify-between pt-8 pb-8">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Search by : {searchParams?.query || 'No query'}</h2>
        </div>
        <div>
          <SortByFilter translate_data={translate_data} />
        </div>
      </div>
      <div className="flex xl:gap-4 items-start">

        <FilterSidebar
          discount_data={discount_data}
          translate_data={translate_data}
          minPrice={min_price}
          maxPrice={max_price}
          filter_categories={filter_categories}
          filter_brand={filter_brand}
        />
        <div className="content flex-1">
          <Suspense key={JSON.stringify(searchParams)} fallback={<ProductSkeletonGrid />} >
            <FilterProduct query={{
              name: query,
              categories: categories,
              subCategory: subCategory,
              brands: brands,
              discount: discount,
              sort_by: sort_by,
              currentPage: currentPage,
              minPrice: search_min_price,
              maxPrice: search_max_price,
            }} />
          </Suspense>
        </div>
      </div>
    </Container>


  </>
}
