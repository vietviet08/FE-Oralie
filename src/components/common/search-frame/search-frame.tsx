
import {Product} from "@/model/product/Product";
import Link from "next/link";
import Image from "next/image";

export default function SearchFrame({
                                        data,
                                        closeSearchFrame, 
                                    }: {
    data: Product[];
    closeSearchFrame: () => void;
}) {
    return (
        <div
            className="w-full h-72 py-2 flex flex-col rounded-xl overflow-y-auto bg-white shadow"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#ff0000 #f0f0f0' }}
        >
            {data.map((product: Product) => (
                <div
                    key={product.id}
                    className="w-full h-[calc(4rem+)10px] p-2 border-b border-gray-200"
                >
                    <Link href={`/${product.slug}`} onClick={closeSearchFrame}> {/* Call closeSearchFrame on click */}
                        <div className="flex gap-2 justify-between items-center w-full">
                            <div className="w-2/12">
                                <Image
                                    src={product.images[0].url}
                                    alt={product.name}
                                    width={120}
                                    height={120}
                                    className="w-full object-contain"
                                />
                            </div>
                            <div className="w-10/12">
                                <div className="flex flex-col gap-1 w-full">
                               <span
                                   className="text-sm font-semibold hover:text-primaryred line-clamp-2"
                               >{product.name}</span>
                                    <div className="flex justify-between gap-2 items-center w-1/5">
                                   <span
                                       className="text-md font-bold text-primaryred"
                                   >${product.price - product.discount}</span>
                                        {product.discount > 0 && (
                                            <span
                                                className="text-sm text-gray line-through text-gray-400"
                                            >${product.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}