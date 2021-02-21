import axios from 'axios'
import Cors from 'cors'
import { getAllConstants, COUNTRY_TO_CURRENCY_CODE } from '../../../lib/constants'
import { appendSpreadsheet, currencySpreadsheet } from '../../../lib/spreadsheet'

const pid_to_const = {"profile": "FINNHUB_PROFILE2_API_URL",
"symbol": "FINNHUB_SYMBOL_API_URL"}

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async (req, res) => {
    // Run the middleware
    // await runMiddleware(req, res, cors)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
  
    const constants = getAllConstants()

    const {
        query: { pid, exchange, stock, security, curr_code },
      } = req

    const param = pid_to_const[pid]

    const SPREADSHEET_ID = process.env.SPREADSHEET_ID
    const CLIENT_EMAIL = process.env.GOOGLE_SHEET_CLIENT_EMAIL
    const PRIVATE_KEY = process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n');

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
        if (e === "Error: Data Not Found") {
          console.log("not founddddd")
        }
        const data = {}
        return res.status(200).json({ data })
      }
    
    } else if (pid === "currency") {
      try {
        const { data } = await currencySpreadsheet(curr_code, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY);

        return res.status(200).json({ data })
      } catch (e) {
        if (e === "Error: Data Not Found") {
          console.log("not founddddd")
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