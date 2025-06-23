import { db } from "~/lib/db";
import type { LoaderFunction } from "@react-router/server";
import type { UserDTO } from "~/types/user";
import type { QueryParams } from "~/types/query";
import {
  ErrorCode,
  ErrorMessage,
  type ApiResponse,
} from "~/types/api";


export const loader: LoaderFunction = async ({ request }) => {
  try {
    const params = parseQueryParams(request);
    const result = await getFilteredUsers(params);

    const response: ApiResponse<{
      users: UserDTO[];
      totalCount: number;
    }> = {
      success: true,
      data: {
        users: mapUsersToDTO(result.users),
        totalCount: result.totalCount,
      },
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in loader:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: ErrorMessage.INTERNAL_ERROR,
      },
    };

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

function parseQueryParams(request: Request): QueryParams {
  const url = new URL(request.url);

  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const offset = (page - 1) * limit;

  const validOrderFields = ["name", "email", "createdAt"] as const;
  const validOrderDirs = ["asc", "desc"] as const;

  const orderBy = validOrderFields.includes(url.searchParams.get("orderBy") as any)
    ? (url.searchParams.get("orderBy") as QueryParams["orderBy"])
    : "createdAt";

  const orderDir = validOrderDirs.includes(url.searchParams.get("orderDir") as any)
    ? (url.searchParams.get("orderDir") as QueryParams["orderDir"])
    : "desc";

  return { search, page, limit, offset, orderBy, orderDir };
}

async function getFilteredUsers(params: QueryParams) {
  const where = params.search
    ? {
        OR: [
          { name: { contains: params.search, mode: "insensitive" } },
          { email: { contains: params.search, mode: "insensitive" } },
        ],
      }
    : {};

  const users = await db.user.findMany({
    where,
    skip: params.offset,
    take: params.limit,
    orderBy: { [params.orderBy]: params.orderDir },
  });

  const totalCount = await db.user.count({ where });

  return { users, totalCount };
}

function mapUsersToDTO(users: any[]): UserDTO[] {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  }));
}
