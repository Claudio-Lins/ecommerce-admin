import React from "react";
import { CategoriesClient } from "./components/CategoryClient";
import prismaDb from "@/lib/prismaDb";
import { CategoryColumn } from "./components/Columns";
import { format } from "date-fns";

export default async function CategoriesPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
}
