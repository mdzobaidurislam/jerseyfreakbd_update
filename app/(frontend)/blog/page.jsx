
import AllBlogList from '@/app/ui/Blog/AllBlogList';
import Container from '@/app/ui/Container/Container'
import { ProductSkeletonGrid } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'

export default async function Page({ searchParams }) {
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <Container>

            <div className="flashDeal_product  py-[40px] ">
                <Suspense key={JSON.stringify(currentPage)} fallback={<ProductSkeletonGrid count={5} />} >
                    <AllBlogList currentPage={currentPage} />
                </Suspense>
            </div>
        </Container>
    )
}
