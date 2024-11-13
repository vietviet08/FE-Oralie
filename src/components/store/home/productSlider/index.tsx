import { ListResponse } from "@/model/ListData";
import { Product } from "@/model/product/Product";
import { List } from "postcss/lib/list";
import React from "react";

const ProductSlider: React.FC<ListResponse<Product>> = ({ data }) => {
  return <div>ProductSlider</div>;
};

export default ProductSlider;
