"use client"
import { Button } from '@/app/ui/button'
import React, { useState } from 'react'
import AddReview from '../../AddReview/AddReview'

export default function WriteReviewSection({ id, translate }: any) {
  const [openShow, setOpenShow] = useState(false)

  return (
    <>
      <div className="review_header flex items-center justify-between ">
        <h3 className='text-[20px] text-neutral-black font-semibold ' >{translate?.customer_reviews}</h3>
        <div className="outer button_area !m-1 ">

          <Button className=' justify-center  ' onClick={() => setOpenShow(!openShow)}  ><div className='text_shadow'>{translate?.write_a_review}</div> </Button>

          <span></span>
          <span></span>
        </div>

      </div>
      {
        openShow &&
        <AddReview id={id} />
      }
    </>

  )
}
