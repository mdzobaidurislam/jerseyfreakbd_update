
import Container from "@/app/ui/Container/Container";
import ViewProduct from "@/app/ui/FilterProduct/ViewProduct";
import { ProductSkeletonGrid } from "@/app/ui/skeletons";
import { Suspense } from "react";



export default async function Page({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  return <>
    <Container>
      <div className="flex gap-4 items-start">
        <div className="content flex-1 bg-arival lg:p-4 mt-3 mb-3 ">
          <Suspense key={JSON.stringify('everyday-essential' + searchParams)} fallback={<ProductSkeletonGrid count={5} />} >
            <ViewProduct query={{
              currentPage: currentPage,
              apiUrl: 'products/essential'
            }} />
          </Suspense>
        </div>
      </div>
    </Container>
  </>
}
