import React from "react";
import { ColorClient } from "./components/ColorClient";
import prismaDb from "@/lib/prismaDb";
import { ColorColumn } from "./components/Columns";
import { format } from "date-fns";

export default async function SizesPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const colors = await prismaDb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
