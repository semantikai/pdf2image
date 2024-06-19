import { onZoomIn, onZoomOut } from "@/signals/zoom";

export default function ZoomControls() {
  return (
    <div className="ml-auto">
      <button onClick={onZoomIn} type="button">
        <svg
          className="w-[25px] h-[25px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="0.7"
            d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>

        <span className="sr-only">Zoom in</span>
      </button>
      <button onClick={onZoomOut} type="button">
        <svg
          className="w-[25px] h-[25px] text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="0.7"
            d="m21 21-3.5-3.5M7 10h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>

        <span className="sr-only">Zoom out</span>
      </button>
    </div>
  );
}
