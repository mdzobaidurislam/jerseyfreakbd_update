import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import Breadcrumb from "@/app/ui/Breadcrumb/Breadcrumb";
import Container from "@/app/ui/Container/Container";
import CustomImage from "@/app/ui/CustomImage/CustomImage";
import FilterSidebar from "@/app/ui/FilterSection/FilterSection";
import SortByFilter from "@/app/ui/FilterSection/SortByFilter";
import { Metadata } from "next";


type Props = {
  params: { slug: string };
};

// all category 
async function getCategory(slug: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/category/${slug}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return null;
  }
  const data: any = await response.json();
  return data.data as any;
}

// all category 
async function getAllCategory(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/filter/categories`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

async function getAllBrand(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/filter/brands`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, banner } = await getCategory(params.slug);

  return {
    title: category.meta_title,
    description: category.meta_description,
    openGraph: {
      title: category.meta_title,
      description: category.meta_description,
      images: [
        {
          url: `${BASE_URL}/public/${banner}`,
          width: 800,
          height: 600,
          alt: `${category.meta_title} image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.meta_title,
      description: category.meta_description,
      images: [`${BASE_URL}/public/${banner}`],
    },
  };
}

// product search 
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    slug?: string
  }
}) {
  const { discount_data, category, banner, attributes, product_count, subcategories, minPrice, maxPrice, translate_data } = await getCategory(params.slug as string);
  const filter_categories = await getAllCategory();
  const filter_brand = await getAllBrand();

  return <Container>
    <div >


      <div className="category_header_wrap relative mt-5 ">
        <div className="category_wrapper bg-accent-lightPink">
          <Breadcrumb link={category.slug} name={category.name} className="py-[16px] text-white text-base pl-4 font-medium capitalize " />
        </div>
        {
          banner && <div className="banner">
            <CustomImage width={1060} height={340} alt={category?.name} src={banner} />
          </div>
        }
      </div>

      <div className="filter_header flex items-center justify-between  pt-8 pb-8 ">
        <div className="flex items-center">

          <h2 className="text-lg font-semibold"> {category?.name} ({product_count} {translate_data?.item})</h2>
        </div>
        <div>
          <SortByFilter translate_data={translate_data} />
        </div>
      </div>
      <div className="flex xl:gap-4 items-start " >

        <FilterSidebar
          discount_data={discount_data}
          translate_data={translate_data}
          category_id={category.id}
          minPrice={minPrice}
          maxPrice={maxPrice}
          subcategories={subcategories}
          filter_categories={filter_categories}
          filter_brand={filter_brand}
          attributes={attributes}
        />

        <div className="content  flex-1  "  >
          {children}
          <div className="category_description pb-8">
            <div
              dangerouslySetInnerHTML={{ __html: category.meta_description }}
            />
          </div>
        </div>

      </div>
    </div>
  </Container>
}