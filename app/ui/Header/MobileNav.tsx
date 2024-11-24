"use client"
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart, Languages, Menu, ShoppingCart, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SearchContainer from './SearchContainer';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog';
import { CartIcon, LoveIcon, ProfileIcon } from '../Icons/Icons';
import SideCart from '../SideCart/SideCart';
import useCartStoreData from '@/lib/hooks/useCartStoreData';
import { get_setting } from '@/lib/utils';
import CustomImage from '../CustomImage/CustomImage';
import Link from 'next/link';
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { useSession } from 'next-auth/react';
import SignOutForm from '../SignOutForm';
import { productStore } from '@/lib/hooks/useProductStore';
import { BASE_URL } from '@/app/config/api';


interface MenuItem {
    id: number;
    slug: string;
    name: string;
    children?: MenuItem[]; // Optional property for nested menu items
}

const MobileNav = ({ menus, setting }: any) => {
    const { totalQuantity, wishlist } = useCartStoreData();
    const [mounted, setMounted] = useState(false)
    const { openCart, setOpenCart } = productStore()
    const cookieValue = cookieStore((state) => state.cookieValue);
    const { translateValue } = cookieStore();
    const session: any = useSession()
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const menu_data: any[] = menus
    const user_data = [
        {
            id: 1,
            name: 'Sign In',
            slug: '/login',
            children: [
                {
                    id: 1,
                    slug: 'login',
                    name: 'Sign In',
                },
                {
                    id: 3,
                    name: 'Track Order',
                    slug: 'track-order',
                },
            ]
        },

    ]
    const profile_data = [
        {
            id: 1,
            name: 'Account',
            slug: '/user/dashboard',
            children: [
                {
                    id: 1,
                    name: 'Purchase history',
                    slug: 'user/purchase_history',
                },
                {
                    id: 2,
                    name: 'Wish list',
                    slug: 'user/wish_list',
                },
                {
                    id: 3,
                    name: 'Profile',
                    slug: 'user/profile',
                },
                {
                    id: 3,
                    name: 'Address',
                    slug: 'user/address',
                },
            ]
        },

    ]
    const lang_data: any[] = []
    // const lang_data = [

    //     {
    //         id: 1,
    //         name: 'Language',
    //         slug: '/language',
    //         children: [
    //             {
    //                 id: 1,
    //                 slug: 'bn',
    //                 name: 'Bangla',
    //             },
    //             {
    //                 id: 2,
    //                 name: 'English',
    //                 slug: '/english',
    //             },

    //         ]
    //     },
    // ]
    useEffect(() => {
        setMounted(true)
    }, [])


    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [labelMenu, setLabelMenu] = useState<number>(1);
    const [labelMenuData2, setLabelMenuData2] = useState<MenuItem[]>([]);
    const [labelMenuData3, setLabelMenuData3] = useState<MenuItem[]>([]);
    const [label1, setLabel1] = useState<MenuItem | null>(null);
    const [label2, setLabel2] = useState<MenuItem | null>(null);
    const header_logo = get_setting(setting, 'header_logo')
    const handCloseMenu = () => {
        setOpenMenu(false);
        setLabelMenu(1);
    };

    const handleBackMenu = (val: number) => {
        setLabelMenu(val);
    };



    useEffect(() => {
        const handleScroll = () => {
            const stickyThreshold = 50;
            if (window.scrollY > stickyThreshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <div className={`block md:hidden  bg-white py-2   shadow-md`}>
                <div className="flex items-center justify-between px-3">
                    <div className="flex items-center gap-[10px] ">
                        <Button className=" items-center justify-end border-0 p-0" variant="outline" onClick={() => setOpenMenu(!openMenu)}>
                            <Menu className="text-sm w-[18px] " />
                        </Button>
                        <div className="search  flex items-center">
                            <SearchContainer />
                        </div>
                    </div>

                    <div className="logo w-[50px]  flex items-center justify-center ">
                        <Link href='/' >
                            {/* <img src={`${BASE_URL}/public/${header_logo?.value}`}

                                className="w-full object-contain transition-transform duration-300 ease-in-out transform" alt="" /> */}
                            <CustomImage
                                src={header_logo?.value}
                                width={50}
                                height={50}
                                alt={`Logo`}
                            />
                        </Link>
                    </div>
                    <div className='flex items-center gap-[20px]'>
                        <div className="star relative">
                            <Link className="flex items-center gap-1 text-base capitalize" href='/wishlist'>
                                <LoveIcon />
                                <span className="mini_cart__qty" >{mounted && wishlist.length || 0}</span>
                            </Link>
                        </div>
                        <div className="shoppingCart relative pr-3 " onClick={() => setOpenCart(!openCart)}>
                            <div className="flex  items-center gap-1 text-base capitalize cursor-pointer justify-center flex-col "  >
                                <CartIcon />
                            </div>
                            <span className="mini_cart__qty " >{mounted && totalQuantity || 0}</span>





                        </div>
                    </div>

                </div>
            </div>

            <div id="main-navigation" className={`b-menu_panel ${openMenu ? 'm-active' : ''}`}>
                <div className={`b-menu_panel-inner ${openMenu ? 'm-opened' : 'm-closed'}`}>
                    <div className={`b-menu_subpanel m-active_level_${labelMenu}`}>
                        {/* label 1 start  */}
                        <div className="b-menu_subpanel-container m-level_1">
                            <div className="b-menu_panel-head">
                                <button className="b-menu_panel-close" title="Close" type="button" onClick={handCloseMenu}>
                                    <X />
                                </button>
                            </div>
                            <div className="b-menu_bar">
                                <nav className="b-menu_bar-container">
                                    <ul id="main-menu" className="b-menu_bar-inner">
                                        {menu_data.map((item) => (
                                            <li key={item.id} className="b-menu_bar-item">
                                                {item.children ? (
                                                    <a
                                                        href="#"
                                                        onClick={() => {
                                                            setLabel1(item);
                                                            setLabelMenu(2);
                                                            setLabelMenuData2(item.children!);
                                                        }}
                                                        className="b-menu_bar-link font-medium text-neutral-black"
                                                    >
                                                        {item.name}
                                                        <span className="b-menu_item-link_icon">
                                                            <ChevronRight />
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <a href={`/category/${item.slug}`} className="b-menu_bar-link font-medium text-neutral-black">
                                                        {item.name}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                        {/* user data  */}
                                        {
                                            cookieValue?.user ? <>

                                                {profile_data.map((item) => (
                                                    <li key={item.id} className="b-menu_panel-footer">
                                                        {item.children ? (
                                                            <Link
                                                                href="#"
                                                                onClick={() => {
                                                                    setLabel1(item);
                                                                    setLabelMenu(2);
                                                                    setLabelMenuData2(item.children!);
                                                                }}
                                                                className="b-menu_bar-link font-medium text-neutral-black"
                                                            >
                                                                <span className='pr-[10px] ' >
                                                                    <User className='text-sm' />
                                                                </span>
                                                                {item.name}
                                                                <span className="b-menu_item-link_icon">
                                                                    <ChevronRight />
                                                                </span>
                                                            </Link>
                                                        ) : (
                                                            <Link href={`/${item.slug || ""}`} className="b-menu_bar-link font-medium text-neutral-black">
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                                <li className="b-menu_panel-footer">

                                                    <SignOutForm sign_out={"Sign out"} />
                                                </li>
                                            </> : <>
                                                {user_data.map((item) => (
                                                    <li key={item.id} className="b-menu_panel-footer">
                                                        {item.children ? (
                                                            <a
                                                                href="#"
                                                                onClick={() => {
                                                                    setLabel1(item);
                                                                    setLabelMenu(2);
                                                                    setLabelMenuData2(item.children!);
                                                                }}
                                                                className="b-menu_bar-link font-medium text-neutral-black"
                                                            >
                                                                <span className='pr-[10px] ' >
                                                                    <User className='text-sm' />
                                                                </span>
                                                                {item.name}
                                                                <span className="b-menu_item-link_icon">
                                                                    <ChevronRight />
                                                                </span>
                                                            </a>
                                                        ) : (
                                                            <Link href={`/${item.slug || ""}`} className="b-menu_bar-link font-medium text-neutral-black">
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </>
                                        }

                                        {lang_data.map((item) => (
                                            <li key={item.id} className="b-menu_panel-footer">
                                                {item.children ? (
                                                    <a
                                                        href="#"
                                                        onClick={() => {
                                                            setLabel1(item);
                                                            setLabelMenu(2);
                                                            setLabelMenuData2(item.children!);
                                                        }}
                                                        className="b-menu_bar-link font-medium text-neutral-black"
                                                    >
                                                        <span className='pr-[10px] ' >
                                                            <Languages className='text-sm' />
                                                        </span>
                                                        {item.name}
                                                        <span className="b-menu_item-link_icon">
                                                            <ChevronRight />
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <a href={`/${item.slug}`} className="b-menu_bar-link font-medium text-neutral-black">
                                                        {item.name}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/* label 2  */}
                        <div className="b-menu_subpanel-container m-level_2">
                            <div className="b-menu_panel-head ">
                                <ChevronLeft className="b-menu_panel-back" />
                                <button
                                    className="b-menu_panel-title"
                                    title="Close"
                                    type="button"
                                    onClick={() => handleBackMenu(1)}
                                >
                                    Back to main menu
                                </button>
                                <button className="b-menu_panel-close" title="Close" type="button" onClick={handCloseMenu}>
                                    <X />
                                </button>
                            </div>
                            <div className="b-menu_bar">
                                <nav className="b-menu_bar-container">
                                    <div className="b-menu_item h-hidden-lg-up">
                                        <h2 className="b-menu_item-head">
                                            <a className='text-neutral-black font-semibold ' href={`/category/${label1?.slug}`}>{label1?.name}</a>
                                        </h2>
                                    </div>
                                    <ul id="main-menu" className="b-menu_bar-inner">
                                        {labelMenuData2.map((item) => (
                                            <li key={item.id} className="b-menu_bar-item">
                                                {item.children ? (
                                                    <a
                                                        href="#"
                                                        onClick={() => {
                                                            setLabel2(item);
                                                            setLabelMenu(3);
                                                            setLabelMenuData3(item.children!);
                                                        }}
                                                        className="b-menu_bar-link font-medium text-neutral-black"
                                                    >
                                                        {item.name}
                                                        <span className="b-menu_item-link_icon">
                                                            <ChevronRight />
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <a href={`/${item.slug}`} className="b-menu_bar-link font-medium text-neutral-black">
                                                        {item.name}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="b-menu_subpanel-container m-level_3">
                            <div className="b-menu_panel-head ">
                                <ChevronLeft className="b-menu_panel-back" />
                                <button
                                    className="b-menu_panel-title"
                                    title="Close"
                                    type="button"
                                    onClick={() => handleBackMenu(2)}
                                >
                                    Back to {label2?.name}
                                </button>
                                <button className="b-menu_panel-close" title="Close" type="button" onClick={handCloseMenu}>
                                    <X />
                                </button>
                            </div>
                            <div className="b-menu_bar">
                                <nav className="b-menu_bar-container">
                                    <div className="b-menu_item h-hidden-lg-up">
                                        <h2 className="b-menu_item-head">
                                            <a className='text-neutral-black font-semibold' href={`/category/${label2?.slug}`}>{label2?.name}</a>
                                        </h2>
                                    </div>
                                    <ul id="main-menu" className="b-menu_bar-inner">
                                        {labelMenuData3.map((item) => (
                                            <li key={item.id} className="b-menu_bar-item">
                                                <a href={`/${item.slug}`} className="b-menu_bar-link font-medium text-neutral-black">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={openCart} onOpenChange={setOpenCart}  >
                <DialogOverlay className='backdrop-blur-4'>
                    <DialogContent className="border-0 z-[99999999999] w-full max-w-[500px] flex grow flex-col repeat-1 duration-300 animate-in bottom-0 top-0 right-0 slide-in-from-right fixed cart_modal ">

                        <SideCart />

                    </DialogContent>
                </DialogOverlay>
            </Dialog>
        </>
    );
};

export default MobileNav;
