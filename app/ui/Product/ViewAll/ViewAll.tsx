"use client"

import { cookieStore } from "@/lib/hooks/useCookieStore";
export default function ViewAll() {

    const { heading_title_value } = cookieStore();
    const view_all = heading_title_value?.view_all
    return (
        <div>{view_all}</div>
    )
}
