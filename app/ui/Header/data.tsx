
const CollectionSection = ({ item, children }: any) => {

  return (
    <div className=" grid grid-cols-4  gap-6  p-6 justify-between flex-row container bg-white pt-10">
      {children.map((collection: any, index: any) => (
        <div className="flex flex-row flex-1" key={index}>
          <div className="flex flex-col flex-1">
            <div className="flex  px-4 flex-col">
              <a
                href={`/category/${collection.slug}`} className="text-base cursor-pointer font-bold text-black relative sub_child_after border-b border-accent-lightPink pb-2 ">
                {collection.name}
              </a>
            </div>
            <div className="flex flex-col mt-3">
              <div className="grid grid-cols-2 px-4">
                {collection.children.map((item: any, idx: any) => (
                  <div className=" col-span-1 flex flex-col max-w-max " key={idx}>
                    <a
                      href={`/category/${item.slug}`} className="  inline-block font-bold text-[#969696] hover:text-white transition-all duration-150 hover:bg-accent-lightPink  hover:px-3 py-1 rounded-full" >


                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};


export default CollectionSection;
