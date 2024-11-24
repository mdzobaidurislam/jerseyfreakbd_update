import React from 'react'
import GradientBtn from '../GradientBtn'

export default function ActionLoginSignUp({ title = "", loginText = "", value, setActiveForm }: any) {
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-4 ' >
            <div className='text-center' > {title} </div>
            <GradientBtn onClick={() => setActiveForm(value)}>
                {loginText}
            </GradientBtn>

        </div>
    )
}
