import React from 'react'

export default function TitleLoginHeading({ title = "Login with" }: any) {

    return <div className='login_header flex items-center justify-center pb-3 border-b-[1px] border-[#FFFCFC] '>
        <h3 className='text-2xl  font-bold heading_title_login' >{title}</h3>
    </div>

}
