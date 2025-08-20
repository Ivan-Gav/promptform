import { useEffect, type RefObject } from "react";
import { ENDPOINT_HEADERS } from "../model/constants";
import type { TEndpointName } from "../model/types";

type TResultAreaProps = {
  results: string[];
  resultRef: RefObject<HTMLDivElement | null>;
  error: string | null;
  endpointName: TEndpointName;
};

const ResultArea = ({
  results,
  error,
  resultRef,
  endpointName,
}: TResultAreaProps) => {
  useEffect(() => {
    if (resultRef?.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [results, error, resultRef]);

  return (
    <div className="w-full max-w-lg">
      {results.length > 0 && (
        <div className="mb-2">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            {ENDPOINT_HEADERS[endpointName]}
          </span>
        </div>
      )}
      <div
        ref={resultRef}
        className="bg-white shadow-md px-8 pt-6 pb-8 w-full min-h-[120px] h-auto flex flex-col justify-start items-start border border-gray-300 overflow-y-auto dark:bg-gray-800 dark:border-gray-700"
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
    </div>
  );
};

export default ResultArea;
