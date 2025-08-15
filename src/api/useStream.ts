import { useState } from "react";
import type { TRequestData, TStreamChunk } from "../model/types";
import { suggestionsURL } from "./constants";

export const useStream = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStreamData = async (requestData: TRequestData) => {
    setIsLoading(true);
    setError(null);
    setOutput([]);

    try {
      const response = await fetch(suggestionsURL, {
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

  return { fetchStreamData, isLoading, error, output };
};
