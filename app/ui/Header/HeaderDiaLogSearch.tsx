"use client"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import DesktopSearch from "./DesktopSearch";
export default function HeaderDiaLogSearch() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  >
            <div className="search_input flex relative  " onClick={() => setIsDialogOpen(!isDialogOpen)} >
                <div className="search_icon   text-base capitalize cursor-pointer flex flex-col items-center justify-center ">
                    <SearchIcon />
                    <span>Search</span>
                </div>
            </div>

            <DialogContent className=" translate-x-0-inherit translate-y-inherit  border-0  max-w-full flex grow flex-col repeat-1 duration-300 animate-in slide-in-from-top fixed items-center  bg-white top-0 right-0 left-0 z-[999999] max-h-full search_content">
                <DesktopSearch isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </DialogContent>
        </Dialog>
    )
}
