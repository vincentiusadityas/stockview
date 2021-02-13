import { GoogleSpreadsheet } from "google-spreadsheet";

export const appendSpreadsheet = async (data, SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY) => {
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

    data_headers.forEach((item, idx) => {
      console.log(item)
    })
    // data_rows[0].tradetime = '=GOOGLEFINANCE("ASII", "tradetime")'
    // await data_rows[0].save()

    // console.log

    // console.log(sheet.headerValues)
    
  } catch (e) {
    console.error('Error: ', e);
  }
};