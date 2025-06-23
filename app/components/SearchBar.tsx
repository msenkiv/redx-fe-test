type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    limit: number;
    onLimitChange: (value: number) => void;
    orderBy: "name" | "email" | "createdAt";
    orderDir: "asc" | "desc";
    onOrderByChange: (value: "name" | "email" | "createdAt") => void;
    onToggleOrder: () => void;
  };
  
  export default function SearchBar({
    search,
    onSearchChange,
    limit,
    onLimitChange,
    orderBy,
    orderDir,
    onOrderByChange,
    onToggleOrder,
  }: Props) {
    return (
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Find by name or email"
          value={search}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
        />
  
        <div className="flex items-center gap-2">
          <select
            value={orderBy}
            onChange={(e) => onOrderByChange(e.target.value as any)}
            className="border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
          >
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
          </select>
  
          <button
            onClick={onToggleOrder}
            className={`border px-3 py-2 rounded text-sm hover:bg-gray-100 ${
              orderDir === "asc" ? "bg-gray-50" : "bg-white"
            }`}
          >
            {orderDir === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>
        </div>
  
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
        >
          {[10, 20, 50, 150].map((value) => (
            <option key={value} value={value}>
              {value} users by page
            </option>
          ))}
        </select>
      </div>
    );
  }
  