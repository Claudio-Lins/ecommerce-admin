import React from "react";
import { SizeClient } from "./components/SizeClient";
import prismaDb from "@/lib/prismaDb";
import { SizeColumn } from "./components/Columns";
import { format } from "date-fns";

export default async function SizesPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}