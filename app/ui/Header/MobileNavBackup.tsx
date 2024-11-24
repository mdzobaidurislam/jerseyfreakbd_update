import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
interface MobileNavProps {
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}


const MobileNavBackup: React.FC<MobileNavProps> = () => {
    const menu_data = [
        {
            id: 1,
            slug: 'new',
            name: 'New & Bestsellers',
            children: [
                {
                    id: 1,
                    slug: 'Shop all',
                    name: 'Shop all',
                },
                {
                    id: 2,
                    slug: 'bestsellers',
                    name: 'Bestsellers',
                    children: [
                        {
                            id: 1,
                            slug: 'Offers',
                            name: 'Offers',
                        },
                        {
                            id: 2,
                            slug: 'Routines & Kits',
                            name: 'Routines & Kits',
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            slug: 'Offers',
            name: 'Offers',
            children: [
                {
                    id: 1,
                    slug: 'Build Your Skincare Routine',
                    name: 'Build Your Skincare Routine',
                },
                {
                    id: 2,
                    slug: 'Liz Earle Beauty Rewards',
                    name: 'Liz Earle Beauty Rewards',

                },
                {
                    id: 3,
                    slug: 'Offers',
                    name: 'Offers',
                },
                {
                    id: 4,
                    slug: 'Routines & Kits',
                    name: 'Routines & Kits',
                },
            ],
        },
        {
            id: 3,
            slug: 'skincare',
            name: 'Skincare',

        },
        {
            id: 4,
            slug: 'bath-body',
            name: 'Bath & Body',

        },
        {
            id: 4,
            slug: 'gifting',
            name: 'Gifting',

        },
    ];

    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [labelMenu, setLabelMenu] = useState<number>(1)
    const handCloseMenu = () => {
        setOpenMenu(false)
        setLabelMenu(1)
    }
    const handleBackMenu = (val: any) => {
        setLabelMenu(val)
        return true
    }
    return (
        <>

            <div className="block md:hidden">
                <div className="flex items-center justify-center px-3">
                    <div className="logo w-[50%]">
                        <Image src="/logo.svg" width={320} height={25} alt="Logo" />
                    </div>
                    <Button className="w-[50%] items-center justify-end border-0" variant="outline" onClick={() => setOpenMenu(!openMenu)}>
                        <Menu />
                    </Button>

                </div>
            </div>

            <div id="main-navigation" className={`b-menu_panel ${openMenu ? 'm-active' : ''} `}>
                <div className={`b-menu_panel-inner ${openMenu ? 'm-opened' : 'm-closed'} `}>
                    <div className={`b-menu_subpanel m-active_level_${labelMenu}`}>
                        {/* label 1 start  */}
                        <div className="b-menu_subpanel-container m-level_1">
                            <div className="b-menu_panel-head">

                                <button className="b-menu_panel-close" title="Close" type="button"
                                    onClick={handCloseMenu}
                                >
                                    <X />
                                </button>
                            </div>
                            <div className="b-menu_bar">
                                <nav className='b-menu_bar-container'>
                                    <ul id="main-menu" className="b-menu_bar-inner">
                                        <li className="b-menu_bar-item">
                                            <a href="#" onClick={() => setLabelMenu(2)} className="b-menu_bar-link m-regular ">
                                                Routines & Kits
                                                <span className="b-menu_item-link_icon">
                                                    <ChevronRight />
                                                </span>
                                            </a>
                                        </li>

                                        <li className="b-menu_bar-item">
                                            <a href="/" className="b-menu_bar-link m-regular ">
                                                Cleanse Polish™
                                                <span className="b-menu_item-link_icon">
                                                    <ChevronRight />
                                                </span>
                                            </a>

                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {/* label 2  */}
                        <div className="b-menu_subpanel-container m-level_2">
                            <div className="b-menu_panel-head ">

                                <ChevronLeft className='b-menu_panel-back' />
                                <button className="b-menu_panel-title" title="Close" type="button"
                                    onClick={() => handleBackMenu(1)}
                                >
                                    Back to main menu
                                </button>

                                <button className="b-menu_panel-close" title="Close" type="button"
                                    onClick={handCloseMenu}
                                >
                                    <X />
                                </button>
                            </div>
                            <div className="b-menu_bar">
                                <nav className='b-menu_bar-container'>
                                    <ul id="main-menu" className="b-menu_bar-inner">
                                        <li className="b-menu_bar-item">
                                            <a href="#" onClick={() => setLabelMenu(3)} className="b-menu_bar-link m-regular ">
                                                Routines & Kits 2
                                                <span className="b-menu_item-link_icon">
                                                    <ChevronRight />
                                                </span>
                                            </a>
                                        </li>

                                        <li className="b-menu_bar-item">
                                            <a href="/" className="b-menu_bar-link m-regular ">
                                                Cleanse Polish™ 2
                                                <span className="b-menu_item-link_icon">
                                                    <ChevronRight />
                                                </span>
                                            </a>

                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="b-menu_subpanel-container m-level_3">
                            <div className="b-menu_panel-head ">

                                <ChevronLeft className='b-menu_panel-back' />
                                <button className="b-menu_panel-title" title="Close" type="button"
                                    onClick={() => handleBackMenu(2)}
                                >
                                    Back to label 2
                                </button>

                                <button className="b-menu_panel-close" title="Close" type="button"
                                    onClick={handCloseMenu}
                                >
                                    <X />
                                </button>
                            </div>
                            <div className="b-menu_bar">
                                <nav className='b-menu_bar-container'>
                                    <ul id="main-menu" className="b-menu_bar-inner">
                                        <li className="b-menu_bar-item">
                                            <a href="#" className="b-menu_bar-link m-regular ">
                                                Routines & Kits 3
                                                <span className="b-menu_item-link_icon">
                                                    <ChevronRight />
                                                </span>
                                            </a>
                                        </li>

                                        <li className="b-menu_bar-item">
                                            <a href="/" className="b-menu_bar-link m-regular ">
                                                Cleanse Polish™ 3
                                                <span className="b-menu_item-link_icon">
                                                    <ChevronRight />
                                                </span>
                                            </a>

                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
export default MobileNavBackup;