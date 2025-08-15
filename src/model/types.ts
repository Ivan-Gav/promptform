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
};
