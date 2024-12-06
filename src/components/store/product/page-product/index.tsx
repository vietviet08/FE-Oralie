import {ListResponse} from "@/model/ListData";
import {Product} from "@/model/product/Product";
import {Button} from "@/components/ui/button";
import React from "react";
import {Icons} from "@/components/icons";
import ProductCard from "@/components/store/product/product-card";

type Props = {
    listResponse: ListResponse<Product>,
    category: string,
    brand: string,
}

const PageProduct = ({listResponse, category, brand}: Props) => {

    const domainUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        <div className="sm:px-32 px-6 py-6 mt-14">
            <h1 className="text-2xl font-semibold">{category} ({listResponse.totalElements})</h1>
            {/*filter product*/}
            <div className=" my-4 flex flex-col gap-2">
                <div className="flex flex-col gap-2 justify-between items-start">
                    <h2 className="text-lg font-semibold">Price level</h2>
                    <div className="flex justify-start items-center gap-2">
                        <Button variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>Under $500</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>$500 - $700</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>$700 - $1000</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>$1000 - $1500</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>$1500 - $2000</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>Over $2000</a>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-between items-start">
                    <h2 className="text-lg font-semibold">Sort By</h2>
                    <div className="flex justify-start items-center gap-2">
                        <Button variant="outline" className="h-8 px-4">
                            <Icons.clock className={"text-gray-500"} width={16} height={16}/>
                            <a href={domainUrl}>Latest</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <Icons.arrowDownWideNarrow className={"text-gray-500"} width={16} height={16}/>
                            <a href={domainUrl}>Price decrease</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <Icons.arrowUpWideNarrow className={"text-gray-500"} width={16} height={16}/>
                            <a href={domainUrl}>Price increase</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <Icons.flame className={"text-gray-500"} width={16} height={16}/>
                            <a href={domainUrl}>Hot discount</a>
                        </Button>
                        <Button variant="outline" className="h-8 px-4">
                            <Icons.eye className={"text-gray-500"} width={16} height={16}/>
                            <a href={domainUrl}>Most viewed</a>
                        </Button>
                    </div>
                </div>
            </div>
            {/*list product*/}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3  lg:grid-cols-5 my-2">
                {listResponse.data.map((product, index) => (
                    <ProductCard product={product} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default PageProduct;