import { useState } from "react";
import type {
  TDocSuggestion,
  TEndpointName,
  TRequestData,
  TStreamChunk,
} from "../model/types";
import { ENDPOINTS } from "../model/constants";

export const useStream = (endpoint: TEndpointName) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const url = ENDPOINTS[endpoint];

  const fetchStreamData = async (requestData: TRequestData) => {
    setIsLoading(true);
    setError(null);
    setOutput([]);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });

          try {
            // Обрабатываем случай, когда несколько JSON объектов приходят в одном чанке
            const jsonObjects = chunk.split("\n").filter(Boolean);

            for (const jsonStr of jsonObjects) {
              const data: TStreamChunk = JSON.parse(jsonStr);

              if (data.done) {
                console.log(data);
                setOutput((prev) => [
                  ...prev,
                  `\n \nПередача завершена, статистика: ${JSON.stringify(
                    data.stats
                  )}`,
                ]);
                done = true;
                break;
              } else if (data.content) {
                console.log(data);
                setOutput((prev) => [...prev, data.content]);
              }
            }
          } catch (e) {
            console.error("Error parsing JSON:", e);
            setError("Ошибка обработки данных");
          }
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSimpleData = async (requestData: TRequestData) => {
    setIsLoading(true);
    setError(null);
    setOutput([]);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (endpoint === "context") {
        const data = await response.text();
        const output = data || "Нет контекста";
        setOutput([output]);
      } else if (endpoint === "suggestDocs") {
        const data = (await response.json()) as TDocSuggestion[];
        if (Array.isArray(data) && data.length) {
          for (const doc of data) {
            setOutput((prev) => [
              ...prev,
              `${doc.Type} ${doc.Number}: ${doc.Title} \n \n`,
            ]);
          }
        } else {
          const output =
            JSON.stringify(data, null, 2) || "Нет предложенных документов";
          setOutput([output]);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData: endpoint === "generation" ? fetchStreamData : fetchSimpleData,
    isLoading,
    error,
    output,
  };
};
