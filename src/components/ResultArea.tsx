import type { RefObject } from "react";

type TResultAreaProps = {
  results: string[];
  resultRef: RefObject<HTMLDivElement | null>;
  error: string | null;
};

const ResultArea = ({ results, error, resultRef }: TResultAreaProps) => (
  <div
    ref={resultRef}
    className="bg-white shadow-md px-8 pt-6 pb-8 w-full max-w-lg min-h-[120px] h-auto flex flex-col justify-start items-start border border-gray-300 overflow-y-auto  dark:bg-gray-800 dark:border-gray-700"
    style={{ minHeight: "120px", maxHeight: "400px" }}
  >
    {!error && (
      <div
        className="w-full text-gray-400 dark:text-gray-200 text-sm mb-2"
        style={{ minHeight: results.length === 0 ? "1.5em" : undefined }}
      >
        {results.length === 0 ? "No results yet." : null}
      </div>
    )}

    {!!error && <div className="text-red-500">{error}</div>}

    <div className="space-y-1 w-full">
      {results.map((chunk, idx) => (
        <span
          key={idx}
          className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
        >
          {chunk}
        </span>
      ))}
    </div>
  </div>
);

export default ResultArea;
