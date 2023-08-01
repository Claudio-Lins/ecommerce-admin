"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";

export type ProductDetailColumn = {
  id: string;
  price: string;
  weight: string;
  quantityInStock: number;
  createdAt: string;
};

export const columns: ColumnDef<ProductDetailColumn>[] = [
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantityInStock",
    header: "QuantityInStock",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
