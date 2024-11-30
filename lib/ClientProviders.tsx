"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import useLayoutService from "@/lib/hooks/useLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cookieStore } from "./hooks/useCookieStore";
import { useSession } from "next-auth/react";
import useCartStoreData from "./hooks/useCartStoreData";
import axios from "axios";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { theme } = useLayoutService();
  const [selectedTheme, setSelectedTheme] = useState("system");
  const { setCartData, temp_user_id, setWishlistArray } = useCartStoreData((state) => ({
    setCartData: state.setCartData,
    temp_user_id: state.temp_user_id,
    setWishlistArray: state.setWishlistArray,
  }));

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const pathname = usePathname(); // Get the current route
  const router = useRouter(); // For navigation
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;
  const { data: session } = useSession();
  const searchParams = useSearchParams();


  const getData = async () => {
    const userId = cookieValue?.user?.id;
    try {
      const response: any = await axios.post(
        `/api/product/wishlists/list`,
        {
          user_id: userId || null,
        }
      );
      const getIdes = response.data.data.map((item: any) => item.id)

      setWishlistArray(getIdes)

    } catch (error) {
      console.log(error)
    }
  }

  const getCart = async () => {
    const isLoggedIn = !!cookieValue?.user?.id;
    const userId = isLoggedIn ? cookieValue?.user?.id : temp_user_id;
    try {
      const response: any = await axios.post(
        `/api/cart/get`,
        {
          user_id: userId || null,
        }
      );

      setCartData(response.data.data, response.data.totalQuantity);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCart()
    getData()

  }, [cookieValue, temp_user_id, pathname])

  useEffect(() => {
    const headerTop = document.getElementById('headerTop');

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (headerTop) {
        const scrollPosition = window.scrollY;

        // Only trigger if scroll position changes significantly
        if (scrollPosition > 100 && lastScrollY <= 100) {
          headerTop.style.top = "0";
          headerTop.style.position = "fixed";
          headerTop.style.width = "100%";
          headerTop.style.zIndex = "999";
          headerTop.style.backgroundColor = "#fff";
          headerTop.style.boxShadow = " 0 0 8px 1px rgba(0, 0, 0, 0.2)";
          headerTop.style.animation = "900ms cubic-bezier(0.67, 0.43, 0.22, 1) 0s 1 normal none running fadeInDown";
        } else if (scrollPosition <= 100 && lastScrollY > 100) {
          headerTop.style.top = "inherit";
          headerTop.style.position = "inherit";
          headerTop.style.width = "inherit";
          headerTop.style.zIndex = "inherit";
          headerTop.style.backgroundColor = "inherit";
          headerTop.style.boxShadow = " inherit";
          headerTop.style.animation = "inherit";
        }

        lastScrollY = scrollPosition;
      }
    };

    // Adding a debounce to prevent excessive firing
    let timeoutId = null as any;
    const debounceScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50); // Adjust debounce time as needed
    };

    window.addEventListener('scroll', debounceScroll);

    return () => {
      window.removeEventListener('scroll', debounceScroll);
      clearTimeout(timeoutId);
    };
  }, []);


  useEffect(() => {
    const contentArea = document.getElementById('filter_product');
    const login_header = document.querySelector('.login_header') as HTMLElement | null;
    const header_section = document.querySelector('.header_section') as HTMLElement | null;
    const footer_area = document.querySelector('.footer_area') as HTMLElement | null;
    const bodyElement = document.body;
    if (contentArea) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    if (pathname === '/login' || pathname === '/register' || pathname === '/forget-password') {
      if (login_header) login_header.style.display = "none";
      if (header_section) header_section.style.display = "none";
      if (footer_area) footer_area.style.display = "none";
      bodyElement.style.background = 'radial-gradient(circle, rgba(101, 124, 189, 1) 0%, rgba(142, 37, 129, 1) 100%)';
    } else {
      if (login_header) login_header.style.display = "";
      if (header_section) header_section.style.display = "";
      if (footer_area) footer_area.style.display = "";
      bodyElement.style.background = '';
    }

  }, [searchParams, pathname]);





  return (
    <SWRConfig
      value={{
        onError: (error) => {
          toast.error(error.message);
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error("An error occurred while fetching the data.");
          }
          return res.json();
        },
      }}
    >
      <div data-theme={selectedTheme}>
        <Toaster containerStyle={{ zIndex: 9999999999999 }} toastOptions={{ className: "toaster-con z-[9999999999999] " }} />
        {children}
      </div>
    </SWRConfig>
  );
}
