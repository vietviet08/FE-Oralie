import ProductCard from "@/components/store/product/product-card";
import React from "react";
import {Product} from "@/model/product/Product";

const MainPageTemplate = ({data}: { data: Product[] }) => {
    return (
        <>
            {/* List products */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-2">
                {data.map((product: Product) => (
                    <ProductCard product={product} key={product.id}/>
                ))}
            </div>
        </>
    )
}

export default MainPageTemplate;