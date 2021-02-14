import { GoogleSpreadsheet } from "google-spreadsheet";

export const appendSpreadsheet = async (security, ticker, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY) => {
  // Config variables
  // console.log("ID:", SPREADSHEET_ID)
  // console.log("PRIVATE_KEY:", PRIVATE_KEY)

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  try {
    // await doc.useServiceAccountAuth(creds);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    // loads document properties and worksheets
    await doc.loadInfo();
  
    const sheet = doc.sheetsByIndex[0];

    await sheet.loadHeaderRow()

    // const data_cells = await sheet.loadCells('A1:J1')
    const data_rows = await sheet.getRows()
    const data_headers = sheet.headerValues
    
    // data_rows[0][data_headers[0]] = `=GOOGLEFINANCE("${security}:${ticker}", "tradetime")`
    // await data_rows[0].save()

    // Try to fetch stock data using the chosen security and the ticker
    data_headers.forEach((item, idx) => {
      data_rows[0][item] = `=GOOGLEFINANCE("${security}:${ticker}", "${item}")`
    })

    // data_rows[0].tradetime = '=GOOGLEFINANCE("awdaw", "tradetime")'
    await data_rows[0].save()
    let dataAvailable = data_rows[0].tradetime !== "#N/A"

    if (dataAvailable) {
      const data = {}

      data_headers.forEach((item, idx) => {
        data[item] = data_rows[0][item]
      })

      const type = 0

      return {data, type}
      
    } else {

      // Try to fetch stock data using only the ticker
      data_headers.forEach((item, idx) => {
        data_rows[0][item] = `=GOOGLEFINANCE("${security}:${ticker}", "${item}")`
      })
  
      // data_rows[0].tradetime = '=GOOGLEFINANCE("awdaw", "tradetime")'
      await data_rows[0].save()

      dataAvailable = data_rows[0].tradetime !== "#N/A"

      if (dataAvailable) {
        const data = {}

        data_headers.forEach((item, idx) => {
          data[item] = data_rows[0][item]
        })

        const type = 1
  
        return {
          data: data, 
          type: type
        }

      } else {
        throw new Error('Data Not Found')
      }
    }
    
  } catch (e) {
    throw new Error(e)

  }
};