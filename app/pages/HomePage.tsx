import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import type { ApiResponse } from "~/types/api";
import type { UserDTO } from "~/types/user";

export default function HomePage() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [orderBy, setOrderBy] = useState<"name" | "email" | "createdAt">("createdAt");
  const [orderDir, setOrderDir] = useState<"asc" | "desc">("desc");
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / limit);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    setLimit(150);
    setOrderBy("createdAt");
    setOrderDir("desc");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams({
      search,
      page: String(page),
      limit: String(limit),
      orderBy,
      orderDir,
    });

    fetch(`/api/users?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data: ApiResponse<{ users: UserDTO[]; totalCount: number }>) => {
        if (data.success && data.data) {
          setUsers(data.data.users);
          setTotalCount(data.data.totalCount);
        }
      });
  }, [search, page, limit, orderBy, orderDir]);

  return (
    <main className="p-8 max-w-6xl mx-auto bg-white text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#ED1C24]">REDX Frontend Test</h1>

      <SearchBar
        search={search}
        onSearchChange={handleSearchChange}
        limit={limit}
        onLimitChange={setLimit}
        orderBy={orderBy}
        orderDir={orderDir}
        onOrderByChange={(value) => {
          setOrderBy(value);
          setPage(1);
        }}
        onToggleOrder={() => {
          setOrderDir((prev) => (prev === "asc" ? "desc" : "asc"));
          setPage(1);
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No users found with this search.
          </p>
        ) : (
          users.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
