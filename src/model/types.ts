export type OptionType = { value: string; label: string };

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

export type FormValues = {
  selectedOptions: OptionType[];
  textInput: string;
  maxLength: number;
  neighbours: number;
  topChunks: number;
  topDocuments: number;
};
