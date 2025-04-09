import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useQueryString() {
  const [queryString, setQueryString] = useState({})

  const searchParams = useSearchParams()

  useEffect(() => {
    const params: { [key: string]: string | null } = {}

    for (const key of searchParams.keys()) {
      params[key] = searchParams.get(key)
    }

    setQueryString(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return queryString
}

export function createRedirectUrl(
  url: string,
  key: string,
  queryParams: { [key: string]: string | null }
): string {
  if (queryParams && key in queryParams) {
    return queryParams[key]!
  }
  return url
}
