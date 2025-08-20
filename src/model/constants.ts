import type { TEndpointName } from "./types";

export const ENDPOINTS: Record<TEndpointName, string> = {
  context: "http://192.168.3.24:4444/api/debug/context",
  suggestDocs: "http://192.168.3.24:4444/api/debug/suggested-documents",
  generation: "http://192.168.3.24:4444/api/suggestions/generate",
};

export const ENDPOINT_HEADERS: Record<TEndpointName, string> = {
  context: "Контекст",
  suggestDocs: "Предлагаемые документы",
  generation: "Сгенерированный ответ",
};
