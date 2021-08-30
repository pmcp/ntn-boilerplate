
if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config()
}
// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error('no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set')
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error('no GOOGLE_PRIVATE_KEY env var set')

const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = {
  getSheet: async (speadSheetId, sheetId) => {
    // Get doc based on id

    const doc = new GoogleSpreadsheet(speadSheetId)

    // Auth using service account (GOOGLE_SERVICE_ACCOUNT_EMAIL should be added to "share" in google sheets )
    // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })

    await doc.loadInfo() // loads document properties and worksheets

    let sheet;

    console.log(sheetId)
    if(isNaN(sheetId)){
      sheet = await doc.sheetsByTitle[sheetId]
    } else {
      sheet = await doc.sheetsByIndex[sheetId]
    }
    console.log('!!!!', sheet)
    return sheet

  },
  getRows: async (sheet) => {
    const rows = await sheet.getRows() // can pass in { limit, offset }
    return rows.map((row, i) => {
      let temp = {}
      sheet.headerValues.map(header => {
        temp[header] = row[header]
      })
      temp.rowId = i
      return temp
    })
  },
  // getRow: async rowId => {
  //   const rows = await sheet.getRows()
  //   const row = { ...rows[rowId], rowId: rowId }
  //   return row
  // },
  addRow: async (sheet, data) => {
    return await sheet.addRow(data)
  },
  addRows: async (sheet, data) => {
    return await sheet.addRows(data)
  },
  // updateRow: async data => {
  //   const rows = await sheet.getRows()
  //   const { rowId } = data
  //   const selectedRow = rows[rowId]
  //   Object.entries(data).forEach(([k, v]) => {
  //     selectedRow[k] = v
  //   })
  //   return await selectedRow.save()
  // },
  deleteRow: async (sheet, rowId) => {
    const rows = await sheet.getRows()
    await rows[rowId].delete()
    return `removed row with id ${rowId}`
  }
}

/*
 * utils
 */
// function serializeRow(row) {
//   let temp = {}
//   return temp
// }
