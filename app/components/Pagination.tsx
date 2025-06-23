type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export default function Pagination({ page, totalPages, onPageChange }: Props) {
    return (
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Previous
        </button>
  
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    );
  }
  