import {
  currentPageIndexRef,
  decrementPage,
  documentPages,
  incrementPage,
  onPageIndexChange,
} from "@/signals/documentPages";

export default function Pagination() {
  return (
    <nav aria-label="Page navigation example">
      <ol className="flex justify-center gap-1 text-xs font-medium">
        <li>
          <button
            onClick={decrementPage}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            aria-label="Previous page"
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: documentPages.value.length }).map((_, i) => (
          <li key={i}>
            <button
              className={`block size-8 rounded border ${
                i === currentPageIndexRef.value
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-100 bg-white text-gray-900"
              } text-center leading-8`}
              onClick={() => onPageIndexChange(i)}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={incrementPage}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            aria-label="Next page"
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ol>
    </nav>
  );
}
