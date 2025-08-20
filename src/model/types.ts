export type TOption = { value: string; label: string };

export type TStreamChunk =
  | {
      done: false;
      content: string;
    }
  | { done: true; stats: object };

export type TRequestData = {
  document_ids?: string[];
  query?: string;
  opts: {
    max_length: number;
    neighbours: number;
    top_chunks: number;
    top_documents: number;
  };
};

export type TFormValues = {
  selectedOptions: TOption[];
  textInput: string;
  maxLength: number;
  neighbours: number;
  topChunks: number;
  topDocuments: number;
};

export type TEndpointName = "context" | "suggestDocs" | "generation";

export type TDocSuggestion = {
  AllChunks: number;
  CreatedAt: string;
  ID: string;
  Number: string;
  Score: number;
  Source: string;
  Title: string;
  Type: string;
  UpdatedAt: string;
};
