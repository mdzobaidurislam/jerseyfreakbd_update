import clsx from 'clsx'
import React from 'react';
type Props = {
  title?: string;
  sub_title?: string;
  className1?: string;
  className?: string;
  rest?: any;
};
const Heading: React.FC<Props> = ({ title = "", sub_title = "", className1, className, ...rest }) => {
  return (
    <div className="section_heading text-center flex items-center justify-center ">
      <h2 className={clsx(' heading_border  relative text-[20px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max  uppercase font-medium gap-1 flex items-center justify-center flex-wrap ', className1)} > <div className={clsx(' text-neutral-black  relative  ', className)}>{title}</div></h2>
    </div>
  )
}
export default Heading