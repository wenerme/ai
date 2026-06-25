---
title: "Google Sheets | Grafana Plugins documentation"
description: "Query Google Sheets data directly using the Infinity data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Google Sheets

Query data directly from Google Sheets spreadsheets without exporting to CSV. The Infinity data source connects to the Google Sheets API to retrieve live data.

> Note
>
> Google Sheets is a beta feature.

## Before you begin

- A Google Cloud project with the Google Sheets API enabled.
- A service account with access to your spreadsheet.
- The service account JSON key file.

## Create a Google Cloud service account

01. Go to the [Google Cloud Console](https://console.cloud.google.com/).
02. Create a new project or select an existing one.
03. Navigate to **APIs &amp; Services** &gt; **Library**.
04. Search for “Google Sheets API” and enable it.
05. Navigate to **APIs &amp; Services** &gt; **Credentials**.
06. Click **Create Credentials** &gt; **Service account**.
07. Enter a name and description for the service account.
08. Click **Create and Continue**, then **Done**.
09. Click on the newly created service account.
10. Go to the **Keys** tab and click **Add Key** &gt; **Create new key**.
11. Select **JSON** and click **Create**.
12. Save the downloaded JSON key file securely.

## Share your spreadsheet

The service account needs access to your spreadsheet:

1. Open your Google Sheet.
2. Click **Share**.
3. Add the service account email (found in the JSON key file as `client_email`).
4. Grant **Viewer** access (or **Editor** if you need write access).
5. Click **Send**.

## Configure the data source

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source** and select **Infinity**.
3. Expand the **Authentication** section.
4. Click **Guided auth config providers** and select **Google JWT**.
5. Paste the contents of your service account JSON key file.
6. Enter the required scope: `https://www.googleapis.com/auth/spreadsheets.readonly`
7. Click **Update OAuth2 settings**.
8. In **Allowed hosts**, add `https://sheets.googleapis.com`.
9. Click **Save &amp; test**.

Alternatively, configure OAuth2 manually:

1. Select **OAuth2** as the authentication method.
2. Select **JWT** as the OAuth2 type.
3. Enter the following from your JSON key file:

   - **Email**: The `client_email` value
   - **Private Key ID**: The `private_key_id` value
   - **Token URL**: The `token_uri` value (usually `https://oauth2.googleapis.com/token`)
   - **Private Key**: The `private_key` value
4. Add the scope: `https://www.googleapis.com/auth/spreadsheets.readonly`

## Query Google Sheets data

1. In the query editor, select **Google Sheets** as the **Type**.
2. Configure the query settings:

Expand table

| Setting        | Description                                   | Example                                      |
|----------------|-----------------------------------------------|----------------------------------------------|
| **Sheet ID**   | The spreadsheet ID from the URL               | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| **Sheet Name** | The name of the specific sheet tab (optional) | `Sheet1`                                     |
| **Range**      | The cell range to query                       | `A1:D100` or `A:D`                           |

### Find the Sheet ID

The Sheet ID is the long string in your Google Sheets URL:

sh [Copy code to clipboard] Copy

```sh
https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit
                                      └──────────────── Sheet ID ────────────────┘
```

### Configure columns

After specifying the Sheet ID and Range, configure the columns to extract:

1. Click **Add Columns**.
2. For each column:

   - **Selector**: The column header name from your spreadsheet
   - **Title**: Display name in Grafana
   - **Type**: Data type (String, Number, Time, etc.)

The first row of your range is used as column headers.

## Use template variables

You can use Grafana template variables in all Google Sheets query fields:

sh [Copy code to clipboard] Copy

```sh
Sheet ID: ${spreadsheet_id}
Sheet Name: ${sheet_name}
Range: A1:D${row_count}
```

## Example query

To query sales data from a spreadsheet:

1. **Sheet ID**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
2. **Sheet Name**: `Sales`
3. **Range**: `A1:E100`
4. **Columns**:

   - `Date` (Type: Time)
   - `Product` (Type: String)
   - `Quantity` (Type: Number)
   - `Revenue` (Type: Number)

## Limitations

- **Read-only**: The integration only supports reading data, not writing.
- **Rate limits**: Google Sheets API has [usage limits](https://developers.google.com/sheets/api/limits). For high-frequency queries, consider exporting to CSV.
- **Large spreadsheets**: Very large spreadsheets may experience performance issues. Use specific ranges instead of querying entire sheets.
- **No alerting**: Google Sheets queries run in the frontend and do not support Grafana Alerting.

## Troubleshoot Google Sheets issues

### 403 Forbidden error

**Cause**: The service account doesn’t have access to the spreadsheet.

**Solution**:

1. Share the spreadsheet with the service account email.
2. Verify the service account has at least Viewer access.

### 404 Not Found error

**Cause**: The Sheet ID is incorrect or the spreadsheet doesn’t exist.

**Solution**:

1. Verify the Sheet ID from the spreadsheet URL.
2. Ensure the spreadsheet hasn’t been deleted or moved.

### Empty results

**Cause**: The range doesn’t contain data or column selectors don’t match headers.

**Solution**:

1. Verify the range includes data (for example, `A1:D100`, not `A2:D100` if you need headers).
2. Ensure column selectors exactly match the header text in your spreadsheet.
