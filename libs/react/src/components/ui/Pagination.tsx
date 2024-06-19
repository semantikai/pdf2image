import {
  currentPageIndexRef,
  decrementPage,
  documentPages,
  incrementPage,
  onPageIndexChange,
} from "@/signals/documentPages";

export default function Pagination() {
  if (documentPages.value.length === 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={decrementPage}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: documentPages.value.length }).map((_, i) => (
          <li>
            <button
              key={i}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                i === currentPageIndexRef.value
                  ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
                  : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => onPageIndexChange(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={incrementPage}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
