import React from 'react'

export default function YourDetails({ data, title, diff }: any) {
    return (
        <div className="flex">
            <div className="w-full flex flex-col gap-1"><p className="font-primary text-lg font-bold leading-normal tracking-normal">{title}</p><p
                className="antialiased font-primary text-base font-normal leading-tighter tracking-tight text-gray-800"><div>
                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.fullName}</p>
                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.address}</p>

                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.postal_code} {data?.city_name} </p>
                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.zone_name}</p>
                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.area_name}</p>
                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.country_name}</p>
                    <p
                        className="antialiased font-primary text-base leading-tighter tracking-tight text-inherit font-normal">{data?.phone}</p></div></p></div>
            {
                diff
            }

        </div>
    )
}
