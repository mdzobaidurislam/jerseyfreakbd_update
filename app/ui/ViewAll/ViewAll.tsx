
"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';

export default function ViewAll() {
  const { heading_title_value } = cookieStore();
  const view_all = heading_title_value?.view_all
  return (
    <div className="view_all flex justify-center items-center ">
      <div>{view_all || 'View ALl'}</div>
    </div>
  )
}
