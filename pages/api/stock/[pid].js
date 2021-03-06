import axios from 'axios'
import { getAllConstants } from '../../../lib/constants'
import { appendSpreadsheet, currencySpreadsheet } from '../../../lib/spreadsheet'

const pid_to_const = {"profile": "FINNHUB_PROFILE2_API_URL",
"symbol": "FINNHUB_SYMBOL_API_URL"}

export default async (req, res) => {
  
    const constants = getAllConstants()

    const {
        query: { pid, exchange, stock, security, curr_code },
      } = req

    const param = pid_to_const[pid]

    const SPREADSHEET_ID = process.env.SPREADSHEET_ID
    const CLIENT_EMAIL = process.env.GOOGLE_SHEET_CLIENT_EMAIL
    
    let PRIVATE_KEY = ""
    if (process.env.NODE_ENV === "production") {
      // let PRIVATE_KEY = JSON.parse(process.env.GOOGLE_SHEET_PRIVATE_KEY)["PRIVATE_KEY"].replace(/\\n/g, '\n')
      PRIVATE_KEY = process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n')
    } else {
      PRIVATE_KEY = process.env.GOOGLE_SHEET_PRIVATE_KEY_DEV.replace(/\\n/g, '\n')
    }

    let API_URL = ""

    if (pid === "symbol") {
      API_URL = constants[param] + exchange + "&token=" + process.env.FINNHUB_API_KEY
    } else if (pid === "profile"){
      API_URL = constants[param] + stock + "&token=" + process.env.FINNHUB_API_KEY
    } else if (pid === "thumbnail_data") {
      const ticker = stock.split(".")[0]

      try {
        const {data, type} = await appendSpreadsheet(security, ticker, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY);

        return res.status(200).json({ data, type })
      } catch (e) {
        if (e.message.includes("Data Not Found")) {
          console.log("Stock Data Not Found")
        } else {
          console.log(e.message)
        }
        const data = {}
        return res.status(200).json({ data })
      }
    
    } else if (pid === "currency") {
      try {
        const { data } = await currencySpreadsheet(curr_code, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY);

        return res.status(200).json({ data })
      } catch (e) {
        if (e.message.includes("Data Not Found")) {
          console.log("Currency Data Not Found")
        } else {
          console.log(e.message)
        }
      }
    } else {
      const data = {}
      return res.status(200).json({ data })
    }
    
    return await axios
      .get(API_URL)
      .then(({ data }) => {
        res.status(200).json({ data })
      })
      .catch(({ err }) => {
        res.status(400).json({ err })
      })
}