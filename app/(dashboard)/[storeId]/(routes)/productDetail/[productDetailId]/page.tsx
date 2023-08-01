import prismaDb from "@/lib/prismaDb";
import React from "react";
import { ProductDetailForm } from "./components/ProductDetailForm";

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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductDetailForm initialData={productDetail} />
      </div>
    </div>
  );
}
