import axios from 'axios'
import { useRouter } from 'next/router'
import { getAllConstants } from '../../../lib/constants'
import { appendSpreadsheet } from '../../../lib/spreadsheet'

const pid_to_const = {"profile": "FINNHUB_PROFILE2_API_URL",
"symbol": "FINNHUB_SYMBOL_API_URL"}

export default async (req, res) => {
    const constants = getAllConstants()

    const {
        query: { pid, exchange, stock, security },
      } = req

    const param = pid_to_const[pid]
    let API_URL = ""

    if (pid === "symbol") {
      API_URL = constants[param] + exchange + "&token=" + process.env.FINNHUB_API_KEY
    } else if (pid === "profile"){
      API_URL = constants[param] + stock + "&token=" + process.env.FINNHUB_API_KEY
    } else if (pid === "thumbnail_data") {
      const ticker = stock.split(".")[0]

      const SPREADSHEET_ID = process.env.SPREADSHEET_ID
      const CLIENT_EMAIL = process.env.GOOGLE_SHEET_CLIENT_EMAIL
      const PRIVATE_KEY = process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n');

      try {
        const {data, type} = await appendSpreadsheet(security, ticker, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY);
        // console.log("data:", data)
        // console.log("type:", type)

        return res.status(200).json({ data, type })
      } catch (e) {
        if (e === "Error: Data Not Found") {
          console.log("not founddddd")
        }

        // return res.status(200).json()
      }

    } else {
      // const data = "null"
      // return res.status(200).json({ data })
    }
    
    return await axios
      .get(API_URL)
      .then(({ data }) => {
        // console.log(data)
        res.status(200).json({ data })
      })
      .catch(({ err }) => {
        res.status(400).json({ err })
      })
}