import { useEffect, useState, useRef } from "react";
import "./index.css";
import type { TFormValues, TOption, TEndpointName } from "./model/types";
import Form from "./components/Form";
import ResultArea from "./components/ResultArea";
import { fetchOptions } from "./api/fetchOptions";
import { useStream } from "./api/useStream";
import { RadioButtons } from "./components/RadioButtons";

function App() {
  const [options, setOptions] = useState<TOption[]>([]);
  const [endpoint, setEndpoint] = useState<TEndpointName>("generation");
  const [lastEndpoint, setLastEndpoint] = useState<TEndpointName>(endpoint);

  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOptions().then(setOptions);
  }, []);

  const { fetchData, output, error, isLoading } = useStream(endpoint);

  // TFormValues type must match the one in Form.tsx
  const handleSubmit = async (data: TFormValues) => {
    setLastEndpoint(endpoint);
    const document_ids = data.selectedOptions.map(({ value }) => value);
    await fetchData({
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
      <Form options={options} loading={isLoading} onSubmit={handleSubmit}>
        <RadioButtons
          selected={endpoint}
          setSelected={setEndpoint}
          variants={["context", "suggestDocs", "generation"]}
          disabled={isLoading}
        />
      </Form>
      <ResultArea
        results={output}
        error={error}
        endpointName={lastEndpoint}
        resultRef={outputRef}
      />
    </div>
  );
}

export default App;
