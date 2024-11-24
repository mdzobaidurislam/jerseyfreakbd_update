"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cookieStore } from '@/lib/hooks/useCookieStore';
import { usePathname } from 'next/navigation';

export default function Subscriber({ footer_subscribe }: any) {
    const { heading_title_value } = cookieStore();
    const pop_up_text = heading_title_value?.pop_up_text
    const pop_up_image_link = heading_title_value?.pop_up_image_link
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<any>("");
    const pathname = usePathname()
    const HandlerNewsLatter = async () => {
        if (email == '') {
            toast.error("Please enter email", {
                style: { color: '#404042', fontWeight: 600 },
                iconTheme: { primary: '#8E2581', secondary: '#fff' },
            });
            return false
        }
        setLoading(true)
        try {
            const response = await axios.post('/api/subscribers', {
                email: email
            });

            const data = response.data;
            if (data.result) {
                toast.success(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                setEmail("")
                setIsDeleteDialogOpen(false)

            } else {
                toast.error(data.message, {
                    style: { color: '#404042', fontWeight: 600 },
                    iconTheme: { primary: '#8E2581', secondary: '#fff' },
                });
                setEmail("")
                setIsDeleteDialogOpen(false)
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        // Check localStorage for page load count
        const pageLoadCount = parseInt(localStorage.getItem("pageLoadCount") || "0", 30);

        if (pageLoadCount >= 40) {
            setIsDeleteDialogOpen(true);
            localStorage.setItem("pageLoadCount", "0");
            localStorage.setItem("showDialog", "no");
        } else {
            // Increment the page load count
            localStorage.setItem("pageLoadCount", (pageLoadCount + 1).toString());

        }
    }, []);

    useEffect(() => {

        const shouldShowDialog = localStorage.getItem("showDialog");
        if (shouldShowDialog === "yes") {
            setIsDeleteDialogOpen(false);
        } else {
            setIsDeleteDialogOpen(true);
        }
    }, []);

    const handleDialogClose = (saveChoice: boolean) => {
        if (saveChoice) {
            localStorage.setItem("showDialog", "no");
        } else {
            localStorage.setItem("showDialog", "yes");
        }
        setIsDeleteDialogOpen(false);
    };



    return (
        <>
            <div className="subscribe flex items-center mt-[20px] w-full md:w-auto justify-center sm:justify-start pb-3  ">
                <Input
                    type="email"
                    placeholder="ex.jerseyfreak.gmail.com"
                    className="h-[55px] w-[320px] text-neutral-black outline-none focus:outline-none rounded-r-[0] border-primary shadow-none focus:shadow-none focus:ring-0  focus-visible:ring-0 focus-visible:ring-offset-0 "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button disabled={loading} className='h-[55px] rounded-l-[0] bg-accent-lightPink hover:bg-accent-lightPink' onClick={HandlerNewsLatter} >{footer_subscribe} {loading && <Loader2 className="animate-spin h-5 w-5 text-white" />}</Button>
            </div>
            {isDeleteDialogOpen && pathname === '/' && (
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent className=" bottom-0 left-0 bg-transparent flex items-center justify-center " >

                        <div className="w-[320px] md:w-[420px] bg-white  rounded-lg relative ">
                            <X className='absolute bg-[#9f8e63] w-[30px] h-[30px] p-2 rounded-[50%]  -top-3 cursor-pointer right-[-12px] text-white ' onClick={() => handleDialogClose(false)} />
                            <div className='flex gap-3 flex-col  '>

                                <a href={pop_up_image_link}>
                                    {
                                        pop_up_text &&
                                        <img src={pop_up_text} alt="" />
                                    }
                                </a>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
