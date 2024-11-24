
import Link from 'next/link'
import React, { Suspense } from 'react'
import { EmailIcon, FacebookIcon, InstagramIcon, LinkedinIcon, LocationIcon, PhoneIcon, TimeIcon, YouTubeIcon } from '@/app/ui/Icons/Icons'
import CustomImage from '../CustomImage/CustomImage'
import { get_setting } from '@/lib/utils'
import Container from '../Container/Container'
import SubscriberSection from '../SubscriberSection/SubscriberSection'
import FooterHeading from './FooterHeading'
import { API_BASE_URL } from '@/app/config/api'
import { FooterMenuSkelton } from '../skeletons'

async function getFooter(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/footer_menu`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}

export default async function Footer({ setting, translate }: any) {
    const result = await getFooter();

    const footer_logo = await get_setting(setting, 'footer_logo')
    const outlet_one = await get_setting(setting, 'outlet_one')
    const outlet_map_link_one = await get_setting(setting, 'outlet_map_link_one')
    const outlet_two = await get_setting(setting, 'outlet_two')
    const outlet_map_link_two = await get_setting(setting, 'outlet_map_link_two')
    const outlet_three = await get_setting(setting, 'outlet_three')
    const outlet_map_link_three = await get_setting(setting, 'outlet_map_link_three')


    const payment_method_images = await get_setting(setting, 'payment_method_images')
    const about_us_description = await get_setting(setting, 'about_us_description')
    const frontend_copyright_text = get_setting(setting, 'frontend_copyright_text')

    const contact_address = get_setting(setting, 'contact_address')?.value
    const contact_address_more = contact_address ? contact_address.split("//") : []

    const contact_email = get_setting(setting, 'contact_email')
    const contact_phone = get_setting(setting, 'contact_phone')
    // social link 
    const facebook_link = get_setting(setting, 'facebook_link')
    const instagram_link = get_setting(setting, 'instagram_link')
    const twitter_link = get_setting(setting, 'twitter_link')
    const linkedin_link = get_setting(setting, 'linkedin_link')
    // const youtube_link = get_setting(setting, 'youtube_link')
    const subscriber_section = get_setting(setting, 'subscriber_section')?.value

    // text start 

    const customer_care = translate?.customer_care
    const timings = translate?.timings

    return (
        <footer className='footer_area'>
            <SubscriberSection subscriber_section={subscriber_section} />
            <div className=' py-[66px] '>
                <div className="container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 flex flex-col  text-neutral-black  ">
                    <div className="widget_right grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-12 gap-8 sm:gap-3  items-start sm:items-start flex-wrap lg:justify-start ">
                        <div className="widget_one xl:col-span-2 ">
                            <FooterHeading title={result?.shopping} />
                            <div>
                                <Suspense fallback={<FooterMenuSkelton />} >
                                    <ul className='flex items-start xl:items-start  flex-col gap-[12px] sm:gap-[15px] pt-[8px] sm:pt-[15px] text-sm ' >
                                        {
                                            result?.data && result?.data.map((item: any) => (
                                                <li key={item.id} ><Link href={`/category/${item.slug}`} >{item.name}</Link></li>
                                            ))
                                        }

                                    </ul>
                                </Suspense>
                            </div>
                        </div>
                        <div className="widget_one xl:col-span-2 ">
                            <FooterHeading title={result?.help} />
                            <div>
                                <ul className='flex items-start xl:items-start  flex-col gap-[12px] sm:gap-[15px] pt-[8px] sm:pt-[15px] text-sm' >
                                    <li><Link href='/page/contact-us' >{result?.contact_us}</Link></li>
                                    <li><Link href='/register' >{result?.registration}</Link></li>
                                    <li><Link href='/page/faq' >{result?.faq}</Link></li>
                                    <li><Link href='/blog' >Blog</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="widget_one xl:col-span-2">
                            <FooterHeading title={result?.information} />
                            <div>
                                <ul className='flex items-start xl:items-start  flex-col gap-[12px] sm:gap-[15px] pt-[8px] sm:pt-[15px] text-sm' >
                                    <li><Link href='/page/about' >{result?.about_us}</Link></li>
                                    <li><Link href='/page/terms' >{result?.terms_and_conditions}</Link></li>
                                    <li><Link href='/page/privacypolicy' >{result?.privacy_policy}</Link></li>
                                    <li><Link href='/page/privacypolicen' >{result?.privacy_policy_en}</Link></li>
                                    <li><Link href='/page/payment-method' >{result?.payment_method}</Link></li>
                                    <li><Link href='/page/refundpolicy' >{result?.refundpolicy}</Link></li>
                                    <li><Link href='/page/deliverypolicy' >{result?.deliverypolicy}</Link></li>

                                </ul>
                            </div>
                        </div>
                        <div className="widget_four xl:col-span-3  ">
                            <FooterHeading title={result?.customer_care} />
                            <div className='flex items-start xl:items-start  flex-col gap-[12px] sm:gap-[15px] pt-[8px] sm:pt-[15px] text-sm'>
                                <div className='flex flex-col items-center gap-2'>
                                    <div className='flex items-center gap-3' ><LocationIcon /> <p>{contact_address_more[0]}</p></div>
                                    {/* <div>
                                        <span className='font-bold' >Outlet-</span> {
                                            contact_address_more.slice(1).map((item: any, i: any) => (
                                                <p key={i} >{item}</p>
                                            ))
                                        }
                                    </div> */}
                                </div>
                                <div className='flex items-center gap-3'>
                                    <TimeIcon /> <p>{timings}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <EmailIcon /> <p>{contact_email?.value}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <PhoneIcon /> <p>{contact_phone?.value}</p>
                                </div>
                            </div>
                        </div>

                        <div className="widget_five xl:col-span-3">
                            <div className="footer_header flex flex-col gap-3 justify-start items-start  text-white text-center ">
                                <div className="footer_logo w-[80px] m-auto ">

                                    <CustomImage
                                        src={footer_logo?.value}
                                        width={78}
                                        height={77}
                                        alt={`Logo`}
                                    />
                                </div>
                                <div className="footer_content">
                                    <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                                        __html: about_us_description?.value
                                    }} />
                                </div>
                            </div>
                            <div className="social_wrap mt-3 flex flex-col gap-3 ">
                                <h3 className='text-neutral-black text-lg font-bold ' >{result?.share_with}</h3>
                                <div className="social_link flex items-start xl:items-center gap-4   text-sm  justify-start sm:justify-start  ">
                                    <div className='social' >
                                        <Link target='_blank' href={facebook_link?.value} >
                                            <img src='/icons/fb.svg' />
                                        </Link></div>
                                    <div className='social' ><Link target='_blank' href={instagram_link?.value || ""} ><img src='/icons/ins.svg' /></Link></div>
                                    <div className='social' ><Link href={twitter_link?.value || ""} ><img src='/icons/x.svg' /></Link></div>
                                    <div className='social' >
                                        <Link target='_blank' href={linkedin_link?.value || ""} ><img className="w-[40px]" src='/icons/pi.png' /></Link></div>



                                </div>
                            </div>
                        </div>
                    </div>


                    {/* outlet start */}
                    <div className="grid  lg:grid-cols-3 pt-4 gap-4">
                        <div className="col-span-1 border-gray border rounded-2xl shadow-lg overflow-hidden ">
                            <a target='_blank' href={outlet_map_link_one?.value || '/'}>
                                <CustomImage
                                    src={outlet_one?.value}
                                    width={300}
                                    height={300}
                                    alt={`Outlet 1`}
                                />
                            </a>
                        </div>
                        <div className="col-span-1 border-gray border rounded-2xl shadow-lg overflow-hidden">
                            <a target='_blank' href={outlet_map_link_two?.value || '/'}>
                                <CustomImage
                                    src={outlet_two?.value}
                                    width={300}
                                    height={300}
                                    alt={`Outlet 2`}
                                />
                            </a>
                        </div>
                        <div className="col-span-1 border-gray border rounded-2xl shadow-lg overflow-hidden">
                            <a target='_blank' href={outlet_map_link_three?.value || '/'}>
                                <CustomImage
                                    src={outlet_three?.value}
                                    width={300}
                                    height={300}
                                    alt={`Outlet 3`}
                                />
                            </a>
                        </div>
                    </div>
                    {/* outlet end */}
                </div>

            </div>
            <div className="footer_bottom bg-accent-lightPink py-[14px]">
                <Container>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <div className="footer_title">
                                <h3 className='uppercase text-white text-lg font-bold  ' >{result?.pay_securely_with}</h3>
                            </div>
                            <div className="footer_payment pb-3 border-b border-white">
                                <CustomImage
                                    src={payment_method_images?.value}
                                    width={1436}
                                    height={54}
                                    alt={`Payment`}
                                />
                            </div>
                        </div>
                        <div className="copy_right text-center text-[12px]  ">
                            <div className=' text-[12px]  text-c_footer ' dangerouslySetInnerHTML={{
                                __html: frontend_copyright_text?.value
                            }} />

                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    )
}
