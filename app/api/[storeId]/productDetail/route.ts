import prismaDb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { price, weight, quantityInStock } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!price) {
      return new NextResponse("Missing Price", { status: 400 });
    }
    if (!weight) {
      return new NextResponse("Missing Weight", { status: 400 });
    }
    if (!quantityInStock) {
      return new NextResponse("Missing QuantityInStock", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Missing ProductId...", { status: 400 });
    }

    const productDetailByUserId = await prismaDb.productDetail.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!productDetailByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const productDetail = await prismaDb.productDetail.create({
      data: {
        price,
        weight,
        quantityInStock,
        productId: params.productId,
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    console.log(`[PRODUCTDETAIL_POST]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Missing StoreId", { status: 400 });
    }

    const productDetail = await prismaDb.productDetail.findMany({
      where: {
        productId: params.productId,
      },
    });

    return NextResponse.json(productDetail);
  } catch (error) {
    console.log(`[PRODUCTDETAIL_GET]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
