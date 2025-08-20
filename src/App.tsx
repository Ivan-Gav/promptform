import { useEffect, useState, useRef } from "react";
import "./index.css";
import type { FormValues, OptionType } from "./model/types";
import Form from "./components/Form";
import ResultArea from "./components/ResultArea";
import { fetchOptions } from "./api/fetchOptions";
import { useStream } from "./api/useStream";

function App() {
  const [options, setOptions] = useState<OptionType[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOptions().then(setOptions);
  }, []);

  const { fetchStreamData, output, error, isLoading } = useStream();

  // FormValues type must match the one in Form.tsx
  const handleSubmit = async (data: FormValues) => {
    const document_ids = data.selectedOptions.map(({ value }) => value);
    await fetchStreamData({
      document_ids,
      query: data.textInput,
      opts: {
        max_length: data.maxLength,
        neighbours: data.neighbours,
        top_chunks: data.topChunks,
        top_documents: data.topDocuments,
      },
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start p-8 md:p-16 gap-8 bg-gray-100 dark:bg-gray-900">
      <Form options={options} loading={isLoading} onSubmit={handleSubmit} />
      <ResultArea results={output} error={error} resultRef={outputRef} />
    </div>
  );
}

export default App;
