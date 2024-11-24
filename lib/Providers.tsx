import { SessionProvider } from 'next-auth/react'
import ClientProviders from './ClientProviders'
import { auth } from '@/auth'
import { cookies } from 'next/headers'
import CookieProvider from './CookieProvider'
import { setSetting } from '@/app/lib/actions'
import { get_setting } from './utils'

export default async function Providers({
  children,
  setting,
  translate
}: {
  children: React.ReactNode,
  setting: any,
  translate: any,
}) {
  const session = await auth()
  const cookieStore = cookies();
  const exist = cookieStore.has('auth');
  const cookieData = exist && cookieStore.get('auth')?.value ? JSON.parse(cookieStore.get('auth')!.value) : null;


  const heading_title = {
    trending_category: translate.trending_category,
    new_arrivals: translate.new_arrivals,
    special_offers: translate.special_offers,
    trending_produts: translate.trending_produts,
    view_all: translate.view_all,
    readMore: translate?.readMore,
    addToCart: translate?.addToCart,
    bought_together: translate?.bought_together,
    similarProduct: translate?.similarProduct,
    recently_view_product: translate?.recently_view_product,
    featuredCollection: translate?.featuredCollection,
    tranding: translate?.tranding,
    everydayEssential: translate?.everydayEssential,
    popular_right_now: translate?.popular_right_now,
    new_arrival_season: translate?.new_arrival_season,
    featured_collection_season: translate?.featured_collection_season,
    help: translate?.help,
    track_order: translate?.track_order,
    bangladesh: translate?.bangladesh,
    fcb_marquee: get_setting(setting, 'fcb_marquee')?.value || "",
    pop_up_text: get_setting(setting, 'pop_up_text')?.value || "",
    pop_up_image_link: get_setting(setting, 'pop_up_image_link')?.value || ""
  }



  return (
    <SessionProvider session={session}>
      <CookieProvider cookieData={cookieData} heading_title={heading_title} settingData={setting} translate={translate}>
        <ClientProviders>{children}</ClientProviders>
      </CookieProvider>
    </SessionProvider>
  )
}
