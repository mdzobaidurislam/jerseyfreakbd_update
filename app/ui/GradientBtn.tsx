import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

export default function GradientBtn({ children, className, className1, ...rest }: any) {
    return (
        <div className={cn("outer button_area !m-0 group !overflow-hidden !w-[160px] md:!w-[230px] hover:!h-[40px]", className)}>
            <Button {...rest} className={cn(" text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px]  text-[10px] sm:text-[12px] md:!text-base uppercase custom-btn  !m-0 group !w-[230px] hover:!h-[40px] ", className1)}>
                <div className='text_shadow'>{children}</div>
            </Button>

            <span></span>
            <span></span>
        </div>
    )
}
