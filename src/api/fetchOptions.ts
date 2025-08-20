import type { TOption } from "../model/types";
import { docsURL } from "./constants";

export async function fetchOptions(): Promise<TOption[]> {
  const res = await fetch(docsURL);
  const data = await res.json();
  console.log(data);
  return data.map((doc: any) => ({ value: doc.id, label: doc.title }));
}
