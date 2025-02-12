import { NextRequest } from "next/server";
import { SQL, SQLWrapper, and, eq, ilike, or } from "drizzle-orm";
import { message, user, classTable, classEnrollment } from "@/app/db/schema";

export type PaginationParams = {
  page: number;
  limit: number;
  offset: number;
};

export type SearchParams = {
  query?: string | null;
  search?: string | null;
};

export function getPaginationParams(
  searchParams: URLSearchParams,
  defaultLimit: number = 4
): PaginationParams {
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : defaultLimit;
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
}

export function getSearchParams(
  searchParams: URLSearchParams,
  paramKeys: string[]
): Record<string, string | null> {
  const params: Record<string, string | null> = {};

  paramKeys.forEach((key) => {
    params[key] = searchParams.get(key);
  });

  return params;
}
