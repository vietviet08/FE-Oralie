"use client";

import ProductSlider from "@/components/store/home/productSlider";
import SoloGan from "@/components/store/home/sologan";
import {FooterSologan} from "@/components/store/product/product-detail/footer-sologan";
import {useEffect, useState} from "react";
import {Product} from "@/model/product/Product";
import {getTop12ProductByCategorySlug} from "@/services/ProductService";

export default function Home() {

    const [laptops, setLaptop] = useState<Product[]>([]);
    const [macs, setMacs] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchLaptops() {
            try {
                const res = await getTop12ProductByCategorySlug("laptop");
                setLaptop(res);
            } catch (e) {
                console.log(e);
            }
        }

        fetchLaptops();

        async function fetchMacs() {
            try {
                const res = await getTop12ProductByCategorySlug("macbook");
                setMacs(res);
            } catch (e) {
                console.log(e);
            }
        }

        fetchMacs();
    }, []);

    return (
        <div className="sm:px-32 px-6 py-6">
            <div className="py-1 mt-14">
                <SoloGan/>
            </div>
            <div className="py-2 pb-4 h-full">
                <ProductSlider
                    data={laptops}
                    pageNo={0}
                    pageSize={0}
                    totalElements={0}
                    totalPages={0}
                    isLast={false}
                    title={"New Arrival"}
                />
            </div>
            <div className="py-2 pb-4 h-full">
                <ProductSlider
                    data={macs}
                    pageNo={0}
                    pageSize={0}
                    totalElements={0}
                    totalPages={0}
                    isLast={false}
                    title={"Best Seller"}
                />
            </div>
            <div className="py-2 pb-4 h-full">
                <ProductSlider
                    data={laptops}
                    pageNo={0}
                    pageSize={0}
                    totalElements={0}
                    totalPages={0}
                    isLast={false}
                    title={"Most Popular"}
                />
            </div>
            <FooterSologan/>
        </div>
    );
}
