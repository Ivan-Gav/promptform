export type OptionType = { value: string; label: string };

export async function fetchOptions(): Promise<OptionType[]> {
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.map((user: any) => ({ value: user.id, label: user.name }));
}

export async function streamResults(): Promise<
  AsyncGenerator<string, void, unknown>
> {
  const streamUrl = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(streamUrl);
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  if (!reader) return (async function* () {})();
  return (async function* () {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\n|(?<=\})/g);
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (line.trim()) yield line;
      }
    }
    if (buffer.trim()) yield buffer;
  })();
}
