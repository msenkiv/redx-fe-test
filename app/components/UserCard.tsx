import type { UserDTO } from "~/types/user";

export default function UserCard({ user }: { user: UserDTO }) {
  return (
    <div className="border border-gray-200 rounded p-4 shadow-sm hover:shadow-md transition bg-white">
      <p className="font-semibold text-lg text-gray-900">{user.name}</p>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <p className="text-xs text-gray-500 mt-1">
        Created on: {new Date(user.createdAt).toLocaleDateString("en-US")}
      </p>
    </div>
  );
}
