import useSWR from "swr"
import { server } from './constants'

const fetcher = url => fetch(url).then(res => res.json())

//////////////////////////////////
// EXAMPLE OF USING useSWR --> it will be called continuously, so better for fetching data that needs to be
// updated constantly (in this case probably for the currency section)

// export function getSymbol(exchange) {
//     const { data, error } = useSWR(`/api/stock/symbol?exchange=${exchange}`, fetcher)
//     return {
//         data: data,
//         isLoading: !error && !data,
//         isError: error,
//       }
// }
//////////////////////////////////

export async function getStockList(exchange) {

  if (exchange.finnhub_code) {
    const { data, error } = await fetcher(`${server}/api/stock/symbol?exchange=${exchange.finnhub_code}`)

    return {
      data: data,
      isLoading: !error && !data,
      isError: error,
    }

  } else {
    return {
      data: [],
      isLoading: false,
      isError: false,
    }
  }
}

export async function getProfile(stock) {
  if (stock) {
    const { data, error } = await fetcher(`${server}/api/stock/profile?stock=${stock}`)
    return {
      data: data,
      isLoading: !error && !data,
      isError: error,
    }
  } else {
    return {
      data: {},
      isLoading: false,
      isError: false,
    }
  }
  
}

export async function getThumbnailData(security, stock) {
  if (stock) {
    const { data, type, error } = 
      await fetcher(`${server}/api/stock/thumbnail_data?security=${security.gfinance_code}&stock=${stock}`)
    
    return {
      data: data,
      type: type,
      isLoading: !error && !data,
      isError: error,
    }
  } else {

    return {
      data: "null",
      isLoading: false,
      isError: false,
    }
  }
}


export async function getCurrencyData(selectedCurrency) {
  const { data, error } = await fetcher(`${server}/api/stock/currency?curr_code=${selectedCurrency}`)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}