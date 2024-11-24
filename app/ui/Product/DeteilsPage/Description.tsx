import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

export default function Description({ data }: any) {

    return (
        <div className='product_description w-full'>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="AccordionTrigger">{data?.translate?.description} </AccordionTrigger>
                    <AccordionContent>
                        <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                            __html: data.description
                        }} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>{data?.translate?.shipping__returns}</AccordionTrigger>
                    <AccordionContent>
                        <div className='text-neutral-black text-base '>
                            <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                                __html: data.product_return
                            }} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>{data?.translate?.faq}</AccordionTrigger>
                    <AccordionContent>

                        <div className=' text-sm md:text-base text-neutral-black ' dangerouslySetInnerHTML={{
                            __html: data?.faq
                        }} />

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
