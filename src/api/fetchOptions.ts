import type { OptionType } from "../model/types";
import { docsURL } from "./constants";

export async function fetchOptions(): Promise<OptionType[]> {
  const res = await fetch(docsURL);
  // console.log(res);
  const data = await res.json();
  console.log(data);
  return data.map((doc: any) => ({ value: doc.id, label: doc.title }));
}
