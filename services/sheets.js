const { google } = require("googleapis");
const auth = require("../config/auth");

const SPREADSHEET_ID = "1lB4avRp81v1DB0XqfNpAjOuhAqALSzS7gyeiiMrjEZA";

async function readSheet(range) {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
    });

    return res.data.values || [];
}

async function writeSheet(range, values) {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: "RAW",
        resource: { values: [values] },
    });

    console.log("✅ Datos escritos correctamente.");
}

module.exports = { readSheet, writeSheet };
