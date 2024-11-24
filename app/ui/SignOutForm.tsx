"use client"
import { PowerIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { logOut } from '../lib/actions';
import { usePathname, useRouter } from 'next/navigation';

export default function SignOutForm({ sign_out }: any) {

  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path

  const handleSignOut = async () => {
    const callbackUrl = encodeURIComponent(pathname);
    await logOut();
    await signOut({ redirect: false });
    router.push(`/login?callbackUrl=${callbackUrl}`);
  };

  return (
    <form
      action={handleSignOut}
    >
      <button className="flex flex-col w-full grow justify-center rounded-md bg-gray-50 p-3 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 items-center gap-1 text-base capitalize">
        <PowerIcon />
        <span className="hidden md:block">{sign_out}</span>
      </button>
    </form>
  );
}
