const defaultError: string =
  "There was a network error, please try again later.";

export const makeReq = async <T = unknown>(url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return [res.statusText || defaultError, null] as const;
    }

    const data = await res.json();
    return [null, data as T] as const;
  } catch {
    return [defaultError, null] as const;
  }
};
