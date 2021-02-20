import { GoogleSpreadsheet } from "google-spreadsheet";
import { CURRENCY_RATE } from './constants'

const compared_currency_rate = CURRENCY_RATE

export const appendSpreadsheet = async (security, ticker, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY) => {
  
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    // loads document properties and worksheets
    await doc.loadInfo();
  
    const sheet = doc.sheetsByIndex[0];

    await sheet.loadHeaderRow()

    const data_rows = await sheet.getRows()
    const data_headers = sheet.headerValues

    // Try to fetch stock data using the chosen security and the ticker
    data_headers.forEach((item, idx) => {
      data_rows[0][item] = `=GOOGLEFINANCE("${security}:${ticker}", "${item}")`
      // console.log(item + ": " + data_rows[0][item])
    })

    await data_rows[0].save()

    const data = {}

    let NACount = 0
    data_headers.forEach((item, idx) => {
      data[item] = data_rows[0][item]
      if (data_rows[0][item] === "#N/A") NACount++
    })

    let allDataAvailable = NACount === 0
    let someDataAvailable = (NACount > 0 && NACount < data_headers.length)
    let noDataAvailable = NACount === data_headers.length

    if (allDataAvailable) {
      const type = 0

      return {data, type}
    
    } else if (someDataAvailable) {
      const type = 1

      return {data, type}
      
    } else if (noDataAvailable) {

      throw new Error('Data Not Found')
    }
    
  } catch (e) {
    throw new Error(e)

  }
};

export const currencySpreadsheet = async (base, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    // loads document properties and worksheets
    await doc.loadInfo();
  
    const sheet = doc.sheetsByIndex[1]

    const data_rows = await sheet.getRows()

    if (base !== data_rows[0]["base_currency"]) {
      console.log("test")
      data_rows[0]["base_currency"] = base
      await data_rows[0].save()
    }

    for (let i=0; i<data_rows.length; i++) {
      compared_currency_rate[data_rows[i]["compared_currency"]] = data_rows[i]["rates"]
    }

    return {
      data: compared_currency_rate
    }

  } catch (e) {
    throw new Error(e)

  }
}