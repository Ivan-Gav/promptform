import React from "react";
import type { RefObject } from "react";

interface ResultAreaProps {
  results: string[];
  resultRef: RefObject<HTMLDivElement>;
}

const ResultArea: React.FC<ResultAreaProps> = ({ results, resultRef }) => (
  <div
    ref={resultRef}
    className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-lg min-h-[120px] h-auto flex flex-col justify-start items-start border border-gray-300 overflow-y-scroll"
    style={{ minHeight: "120px", maxHeight: "400px" }}
  >
    <div
      className="w-full text-gray-400 text-sm mb-2"
      style={{ minHeight: results.length === 0 ? "1.5em" : undefined }}
    >
      {results.length === 0 ? "No results yet." : null}
    </div>
    <div className="space-y-1 w-full">
      {results.map((line, idx) => (
        <div
          key={idx}
          className="font-mono text-sm text-gray-800 whitespace-pre-wrap"
        >
          {line}
        </div>
      ))}
    </div>
  </div>
);

export default ResultArea;
