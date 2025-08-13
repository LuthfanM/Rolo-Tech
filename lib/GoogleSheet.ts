import { google } from "googleapis";

export async function getSheets() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  await auth.authorize();
  return google.sheets({ version: "v4", auth });
}

export async function appendOrderRow(values: (string | number)[]) {
  const sheets = await getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID!;

  const rawTab = process.env.GOOGLE_SHEETS_TAB || "Orders";
  const safeTab = /[\s'!"]/u.test(rawTab)
    ? `'${rawTab.replace(/'/g, "''")}'`
    : rawTab;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${safeTab}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}
