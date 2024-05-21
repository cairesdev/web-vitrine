import { isBackendError } from "@/lib/type-guard";
import axios from "axios";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_PROD;

export async function backendFetch<T>({
  cache = "force-cache",
  route,
  method,
  data,
}: {
  cache?: RequestCache;
  route: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
}): Promise<{ status: number; body: T } | never> {
  try {
    const res = await axios.request({
      url: `${API_DOMAIN}${route}`,
      method: method,
      headers: {
        "Content-Type": "application/json",
        data: JSON.stringify({
          ...(data && { data }),
          cache,
        }),
      },
    });

    const body = res.data;

    if (body.errors) {
      throw body.errors[0];
    }
    return { status: res.status, body };
  } catch (error) {
    if (isBackendError(error)) {
      throw {
        cause: error.cause?.toString() || "unknow",
        status: error.status || 500,
        message: error.message || "unknow",
        route,
      };
    }
    throw {
      error: error,
      route,
    };
  }
}
