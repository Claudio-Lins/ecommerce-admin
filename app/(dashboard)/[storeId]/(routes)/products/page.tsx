import React from "react";
import { ProductClient } from "./components/ProductClient";
import prismaDb from "@/lib/prismaDb";
import { ProductColumn } from "./components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const products = await prismaDb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.name,
    ingredients: item.ingredients,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
