import Rates from "@/components/store/product/rates";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import React from "react";
import {Product} from "@/model/product/Product";

interface Props {
    product: Product;
}

export const ProductSpecification = ({product}: Props) => {
    return (
        <div
            className="flex flex-col-reverse lg:flex-row space-x-0 lg:space-x-2 space-y-2 lg:space-y-0 justify-between">
            <div className="lg:w-4/6 w-full p-4 pt-0 pl-0">
                <div className="mt-4 lg:mt-0 rounded-lg ">
                    <h2 className="text-primaryred font-bold text-2xl mb-4">
                        Detailed review {product.name}
                    </h2>
                    <div dangerouslySetInnerHTML={{__html: product.description}}/>
                </div>

                <div className="py-2 my-4 border-b-[1px] border-b-primaryred2"></div>

                <Rates productId={product.id!} productName={product.name}/>
            </div>
            <div className="lg:w-2/6 w-full rounded-lg py-4">
                <h2 className=" font-bold text-lg">Specifications</h2>
                <Table>
                    <TableBody>
                        {product.specifications.map((spec, index) => (
                            <TableRow
                                key={spec.id}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                            >
                                <TableCell className="w-2/6">{spec.name}</TableCell>
                                <TableCell className="w-4/6 text-left">{spec.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}