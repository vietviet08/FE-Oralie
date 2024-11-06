import React from "react";
import PageContainer from "@/components/dash/page-container";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import ProductForm from "@/components/dash/product/ProductForm";
import { Product } from "@/model/product/Product";

type Props = {
  product: Product;
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "Products", link: "/admin/products" },
  { title: "Update", link: "" },
];

export default function ProductCreatePage({ product }: Props) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm product={product} />
      </div>
    </PageContainer>
  );
}
