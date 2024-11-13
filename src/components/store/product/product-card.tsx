"use client";

import { Product } from "@/model/product/Product";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/icons";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productTemp = {
    name: "Premium Wireless Headphones ",
    price: 299.99,
    priceDiscount: 199.99,
    percentDiscount: 33,
    description: "Experience crystal-clear sound battery life.",
    image:
      "images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
    alt: "Premium Wireless Headphones with sleek design",
  };

  return (
    <motion.div
      className="max-w-sm h-96 bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label="Product card"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={`https://${productTemp.image}`}
          alt={productTemp.alt}
          className="w-full h-56 object-cover transition-transform duration-300"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3";
          }}
          loading="lazy"
        />
      </div>

      <div className="p-2 flex flex-col justify-between items-center space-y-8">
        <div>
          <motion.h2
            className="text-base text-center text-gray-800"
            animate={{ color: isHovered ? "#2563eb" : "#1f2937" }}
          >
            {productTemp.name}
          </motion.h2>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-base font-bold text-center text-primaryred ">
            ${productTemp.priceDiscount.toFixed(2)}
          </span>

          <div className="flex justify-between items-center">
            <span className="text-sm text-center text-gray-700 line-through mx-1">
              ${productTemp.price.toFixed(2)}
            </span>
            <span className="text-sm text-center text-primaryred mx-1">
              Discount {productTemp.percentDiscount.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
