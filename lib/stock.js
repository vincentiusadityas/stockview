import useSWR from "swr"
import { server } from './constants'

const fetcher = url => fetch(url).then(res => res.json())

//////////////////////////////////
// EXAMPLE OF USING useSWR --> it will be called continuously, so better for fetching data that needs to be
// updated constantly (in this case probably for the currency section)

// export function getSymbol(exchange) {
//     const { data, error } = useSWR(`/api/stock/symbol?exchange=${exchange}`, fetcher)
//     // console.log(data)
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
    // console.log("DATA", data)
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
  // console.log(data)
}

export async function getProfile(stock) {
  if (stock) {
    const { data, error } = await fetcher(`${server}/api/stock/profile?stock=${stock}`)
    // console.log(data)
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
    // const { data, error } = useSWR(`/api/stock/thumbnail_data`, fetcher)
    const { data, type, error } = 
      await fetcher(`${server}/api/stock/thumbnail_data?security=${security.gfinance_code}&stock=${stock}`)
    
      // console.log(data)
    return {
      data: data,
      type: type,
      isLoading: !error && !data,
      isError: error,
    }
  } else {
    //TODO: Should still useSWR coz if not will cause rendered more hooks than during the previous render
    // the useSWR can call smt like `/api/stock/null` and return nulls?

    //TODO: Does this need to be called continuously? or just let user refresh?
    // --> I think give a refresh button on the card to refresh the data taken from the spreadsheet

    // const { data, error } = useSWR(`/api/stock/null`, fetcher)
    // const { data, error } = fetcher(`${server}/api/stock/null`)

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