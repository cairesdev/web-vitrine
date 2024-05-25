"use server";
import { isBackendError } from "@/lib/type-guard";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_PROD;

export async function backendFetch<T>({
  cache = "force-cache",
  route,
  method,
  tags,
  data,
}: {
  cache?: RequestCache;
  route: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      cache,
      ...(tags && { next: { tags } }),
    };

    if (data && ["POST", "PUT", "PATCH"].includes(method)) {
      options.body = JSON.stringify(data);
    }

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROD}${route}`,
      options
    );
    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return { status: result.status, body };
  } catch (error) {
    if (isBackendError(error)) {
      throw {
        cause: error.cause?.toString() || "unknown",
        status: error.status || 500,
        message: error.message || "unknown",
        route,
      };
    }
    throw {
      error,
      route,
    };
  }
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const tag = req.nextUrl.searchParams.get("tag");

  console.info("Revalidating", tag);

  if (!tag) {
    return NextResponse.json({ message: "Tag não informada" }, { status: 204 });
  }

  if (tag === "all") {
    revalidatePath("/");
  }

  if (tag) {
    revalidateTag(tag);
  }

  return NextResponse.json({ message: "Revalidado" }, { status: 205 });
}
