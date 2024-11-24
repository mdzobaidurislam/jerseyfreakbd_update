import { API_BASE_URL, BASE_URL } from '@/app/config/api';
import { ApiResponse, ProductDetails } from '@/types/api';
import Breadcrumb from '@/app/ui/Breadcrumb/Breadcrumb';
import Container from '@/app/ui/Container/Container';
import RatingSection from '@/app/ui/Product/DeteilsPage/CustomerReview/RatingSection';
import OfferImage from '@/app/ui/OfferImage/OfferImage';
import ProductDetailsInfo from '@/app/ui/Product/ProductDetailsInfo/ProductDetailsInfo';
import RelativeProduct from '@/app/ui/Product/RelativeProduct';
import TopSellingProduct from '@/app/ui/Product/TopSellingProduct';
import Script from 'next/script';

async function getProductDetails(slug) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.error('Product fetch failed:', response.status);
            return [];
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return [];
    }
}

function generateProductSchema(product) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product?.name || "",
        description: product?.meta_description || "",
        sku: product?.stocks.length > 0 ? product.stocks[0]?.sku || product?.stocks[0]?.variant : "",
        mpn: product?.stocks.length > 0 ? product.stocks[0]?.sku || product?.stocks[0]?.variant : "",
        image: product?.photos?.map(img => `${BASE_URL}/public/${img?.path}`) || 
              [`${BASE_URL}/public/${product?.thumbnail}`],
        brand: {
            '@type': 'Brand',
            name: product?.brand?.name || ''
        },
        offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/product/${product?.slug}`,
            priceCurrency: 'USD',
            price: product?.calculable_price,
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            itemCondition: 'https://schema.org/NewCondition',
            availability: product?.current_stock > 0 ? 
                'https://schema.org/InStock' : 
                'https://schema.org/OutOfStock'
        },
        aggregateRating: product?.rating_count > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: product?.rating,
            reviewCount: product?.rating_count,
            bestRating: '5',
            worstRating: '1'
        } : undefined
    };
}

export async function generateMetadata({ params }) {
    const product = await getProductDetails(params.slug);
    const productDetails = product[0];
    
    if (!productDetails) {
        return {
            title: 'Product Not Found',
            description: 'The requested product could not be found.'
        };
    }

    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(productDetails?.calculable_price || 0);

    return {
        title: productDetails?.meta_title || productDetails?.name,
        description: productDetails?.meta_description || 
                    `Buy ${productDetails?.name} for ${price}. ${productDetails?.meta_description?.substring(0, 150)}...`,
        keywords: productDetails?.meta_keywords || 
                 `${productDetails?.name}, ${productDetails?.brand?.name || ''}, ${productDetails?.category?.name || ''}`,
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
        alternates: {
            canonical: `${BASE_URL}/product/${productDetails?.slug}`,
        },
        openGraph: {
            title: productDetails?.meta_title || productDetails?.name,
            description: productDetails?.meta_description || productDetails?.meta_description,
            url: `${BASE_URL}/product/${productDetails?.slug}`,
            type: 'website',  // Changed from 'product' to 'website'
            images: [
                {
                    url: `${BASE_URL}/public/${productDetails?.meta_img || productDetails?.thumbnail}`,
                    width: 800,
                    height: 600,
                    alt: productDetails?.name,
                },
            ],
            siteName: 'Jersey freak',
            // Moved product-specific metadata to a custom namespace
            custom: {
                product: {
                    price: productDetails?.calculable_price,
                    currency: 'USD',
                    availability: productDetails?.current_stock > 0 ? 'instock' : 'outofstock',
                    retailer_item_id: productDetails?.stocks.length > 0 ? productDetails.stocks[0]?.sku || productDetails?.stocks[0]?.variant : "",
                    condition: 'new'
                }
            }
        },
        twitter: {
            card: 'summary_large_image',
            title: productDetails?.meta_title || productDetails?.name,
            description: productDetails?.meta_description || productDetails?.meta_description?.substring(0, 200),
            images: [`${BASE_URL}/public/${productDetails?.meta_img || productDetails?.thumbnail}`],
            creator: '@yourstorehandle',
            site: '@yourstorehandle'
        }
    };
}

const Page = async ({ params }) => {
    const { slug } = params;
    const product = await getProductDetails(slug);
    
    if (!product || product.length === 0) {
        return (
            <Container>
                <div className="py-10 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
                    <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
                </div>
            </Container>
        );
    }
    
    const productDetails = product[0];
    const productSchema = generateProductSchema(productDetails);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            
            <section className="product_details">
                <Container>
                    <Breadcrumb 
                        link={`/product/${productDetails?.slug}`} 
                        name={productDetails?.name} 
                    />

                    <ProductDetailsInfo 
                        productDetails={productDetails} 
                    />

                    <RatingSection 
                        {...productDetails} 
                        slugData={slug} 
                    />

                    {productDetails?.offerImage?.length > 0 && (
                        <OfferImage 
                            offerImage={productDetails.offerImage}
                            grid_count={productDetails.grid_count}
                        />
                    )}
                </Container>

                <TopSellingProduct id={productDetails.id} />
                <RelativeProduct id={productDetails.id} />
            </section>
        </>
    );
};

export default Page;