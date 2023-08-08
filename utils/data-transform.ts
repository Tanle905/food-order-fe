export function convertQueryParams(query: { [key: string]: any } | undefined) {
  return query
    ? "?" +
        Object.entries(query)
          .reduce(
            (prev, [param, value]) =>
              value ? [...prev, `${param}=${value}`] : (prev as any),
            []
          )
          .join("&")
    : "";
}
