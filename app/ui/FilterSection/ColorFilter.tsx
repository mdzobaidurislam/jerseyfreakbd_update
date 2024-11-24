"use client";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function ColorFilter({ translate_data }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultSelectedColors =
    searchParams.get("colors")?.split(",") || [];

  const [colors, setSelectedColors] = useState<string[]>(
    defaultSelectedColors
  );

  const handleFilterChange = useDebouncedCallback(
    (filterType: string, selectedFilters: number[]) => {
      const params = new URLSearchParams(searchParams);
      if (filterType === "colors") {
        if (colors.length > 0) {
          params.set("colors", selectedFilters.join(","));
        } else {
          params.delete("colors");
        }
      }
      replace(`${pathname}?${params.toString()}`);
    },
    100
  );

  const onFilterChange = (e: any, value: string) => {
    const updated = colors.includes(value)
      ? colors.filter((id) => id !== value)
      : [...colors, value];
    setSelectedColors(updated);
    handleFilterChange("colors", updated as any);
  };


  const [expandedSections, setExpandedSections] = useState(true);
  const items = [
    {
      title: 'Xl',
      id: 1,
    },
    {
      title: 'M',
      id: 2,
    },
    {
      title: 'L',
      id: 3,
    },
  ]
  return (
    <div className="mb-4">
      <button
        className={`flex justify-between items-center w-full py-2 px-4 transition-colors duration-200 ${expandedSections ? ' bg-accent-lightPink text-white ' : 'bg-filter_light text-neutral-black'} `}
        onClick={() => setExpandedSections(!expandedSections)}
      >
        {/* <span className="font-medium">{translate_data.filter_by} {translate_data.price} </span> */}
        <span className="font-medium">{translate_data.filter_by} Colors </span>
        {expandedSections ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {expandedSections && (
        <div className="mt-2 pl-4">
          {items.map((item: any, index: any) => (
            <div key={index} className="flex flex-col  mb-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`${item.id}-${index}`}
                  className="mr-2"
                  checked={colors.includes(item.title)}
                  onChange={(e) => onFilterChange(e, item.title)}
                />
                <label htmlFor={`${item.id}-${index}`} className="text-sm">
                  {item.title}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
