export type QueryParams = {
    search: string;
    page: number;
    limit: number;
    offset: number;
    orderBy: "name" | "email" | "createdAt";
    orderDir: "asc" | "desc";
  };
  