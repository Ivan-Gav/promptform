import React, { useEffect, useState, useRef } from "react";
import Form from "./components/Form";
import ResultArea from "./components/ResultArea";
import { fetchOptions, streamResults } from "./api/index";
import type { OptionType } from "./api/index";
import "./index.css";

function App() {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [textInput, setTextInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    fetchOptions().then(setOptions);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResults([]);
    setLoading(true);
    const stream = await streamResults();
    for await (const line of stream) {
      setResults((prev) => [...prev, line]);
      if (resultRef.current) {
        resultRef.current.scrollTop = resultRef.current.scrollHeight;
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8 md:p-16 gap-8">
      <Form
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        textInput={textInput}
        setTextInput={setTextInput}
        loading={loading}
        onSubmit={handleSubmit}
      />
      <ResultArea results={results} resultRef={resultRef} />
    </div>
  );
}

export default App;
