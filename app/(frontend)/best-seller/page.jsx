
import Container from "@/app/ui/Container/Container";
import ViewProduct from "@/app/ui/FilterProduct/ViewProduct";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { Suspense } from "react";



export default async function Page({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  return <>
    <Container>
      <div className="flex gap-4 items-start">
        <div className="content flex-1 bg-arival p-4 mt-3 mb-3 py-[90px] lg:py-[70px] ">
          <Suspense key={JSON.stringify(searchParams)} fallback={<ProductSkeletonGrid count={5} />} >
            <ViewProduct query={{
              currentPage: currentPage,
              apiUrl: 'products/best-seller'


            }}
              bestSeller={true}
              className={'!gap-y-[70px]'}
            />
          </Suspense>
        </div>
      </div>
    </Container>
  </>
}
