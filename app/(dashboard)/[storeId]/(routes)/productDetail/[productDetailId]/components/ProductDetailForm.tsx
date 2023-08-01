"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Billboard, Product, ProductDetail, Size, Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import { ImageUpload } from "@/components/ui/ImageUpload";

const formSchema = z.object({
  weight: z.string().min(1),
  price: z.coerce.number().min(1),
  quantityInStock: z.coerce.number().min(1),
});

type ProductDetailFormValues = z.infer<typeof formSchema>;

interface ProductDetailFormProps {
  initialData: ProductDetail | null;
  productId: string;
}

export function ProductDetailForm({
  initialData,
  productId,
}: ProductDetailFormProps) {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit productDetail" : "Create productDetail";
  const description = initialData
    ? "Edit a productDetail."
    : "Add a new productDetail";
  const toastMessage = initialData
    ? "ProductDetail updated."
    : "ProductDetail created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        price: 0,
        weight: "",
        quantityInStock: 0,
      };

  const form = useForm<ProductDetailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductDetailFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(
          `/api/${params.storeId}/productDetail/${initialData.id}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/productDetail`, data, {
          params: {
            productId: productId,
          },
        });
      }
      toast.success(toastMessage);
      router.push(`/${params.storeId}/productDetail`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/productDetail/${params.sizeId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/productDetail`);
      toast.success("ProductDetail deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso gr</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Peso gramas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price €</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Price value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantityInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity in stock</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Quantity in stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
