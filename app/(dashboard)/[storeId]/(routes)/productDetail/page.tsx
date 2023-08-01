import React from "react";
import { ProductDetailClient } from "./components/ProductDetailClient";
import prismaDb from "@/lib/prismaDb";
import { ProductDetailColumn } from "./components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const productDetail = await prismaDb.productDetail.findMany({
    where: {
      id: params.productId,
    },
  });

  const formattedProductDetail: ProductDetailColumn[] = productDetail.map(
    (item) => ({
      id: item.id,
      weight: item.weight,
      price: formatter.format(item.price.toNumber()),
      quantityInStock: item.quantityInStock,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductDetailClient data={formattedProductDetail} />
      </div>
    </div>
  );
}
