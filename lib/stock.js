import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())

export function getSymbol(exchange) {
    const { data, error } = useSWR(`/api/stock/symbol?exchange=${exchange}`, fetcher)
    // console.log(data)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
      }
}

export function getProfile(symbol) {
  const { data, error } = useSWR(`/api/stock/profile?symbol=${symbol}`, fetcher)
  // console.log(data)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}