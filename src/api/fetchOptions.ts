import type { OptionType } from "../model/types";
import { docsURL } from "./constants";

export async function fetchOptions(): Promise<OptionType[]> {
  const res = await fetch(docsURL);
  const data = await res.json();
  console.log(data);
  return data
    .slice(0, 50) // временный костыль т.к. список очень большой
    .map((doc: any) => ({ value: doc.id, label: doc.title }));
}
