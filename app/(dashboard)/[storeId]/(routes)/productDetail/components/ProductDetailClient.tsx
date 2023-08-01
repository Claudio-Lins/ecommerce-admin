"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductDetailColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ProductDetailClientProps {
  data: ProductDetailColumn[];
}

export function ProductDetailClient({ data }: ProductDetailClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`ProductDetail (${data.length})`}
          description="Manage ProductDetail for you store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/productDetail/new`)}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New!
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="weight" columns={columns} data={data} />
      <Heading title="API" description="API Calls for ProductDetails" />
      <Separator />
      <ApiList entityName="productDetail" entityIdName="productDetailId" />
    </>
  );
}
