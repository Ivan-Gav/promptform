import { useEffect, useState, useRef } from "react";

import "./index.css";
import type { OptionType } from "./model/types";
import Form from "./components/Form";
import ResultArea from "./components/ResultArea";
import { fetchOptions } from "./api/fetchOptions";
import { useStream } from "./api/useStream";

function App() {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [query, setQuery] = useState("");
  // const [results, setResults] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const outputRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    fetchOptions().then(setOptions);
  }, []);

  const { fetchStreamData, output, error, isLoading } = useStream();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const document_ids = selectedOptions.map(({ value }) => value);
    await fetchStreamData({ document_ids, query });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start p-8 md:p-16 gap-8 bg-gray-100 dark:bg-gray-900">
      <Form
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        textInput={query}
        setTextInput={setQuery}
        loading={isLoading}
        onSubmit={handleSubmit}
      />
      <ResultArea results={output} error={error} resultRef={outputRef} />
    </div>
  );
}

export default App;
