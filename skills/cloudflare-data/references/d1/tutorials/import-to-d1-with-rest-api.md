---
description: This tutorial uses the REST API to import a database into D1.
title: Bulk import to D1 using REST API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt
> Use this file to discover all available pages before exploring further.

# Bulk import to D1 using REST API

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/d1/tutorials/import-to-d1-with-rest-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this tutorial, you will learn how to import a database into D1 using the [REST API](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/import/).

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a D1 API token

To use REST APIs, you need to generate an API token to authenticate your API requests. You can do this through the Cloudflare dashboard.

1. In the Cloudflare dashboard, go to the **API Tokens** page.
[Go to **Account API tokens** ↗](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Under **API Tokens**, select **Create Token**.
3. Scroll to **Custom token** \> **Create custom token**, then select **Get started**.
4. Under **Token name**, enter a descriptive token name. For example, `Name-D1-Import-API-Token`.
5. Under **Permissions**:

  * Select **Account**.
  * Select **D1**.
  * Select **Edit**.
6. Select **Continue to summary**.
7. Select **Create token**.
8. Copy the API token and save it in a secure file.

* Refer to [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) for more information on creating API tokens through the Cloudflare dashboard.
* Refer to [Create tokens via API](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/) for more information on creating API tokens through API.

## 2\. Create the target table

You must have an existing D1 table which matches the schema of the data you wish to import.

This tutorial uses the following:

* A database called `d1-import-tutorial`.
* A table called `TargetD1Table`
* Within `TargetD1Table`, three columns called `id`, `text`, and `date_added`.

To create the table, follow these steps:

1. In the Cloudflare dashboard, go to the **D1** page.
[Go to **D1 SQL database** ↗](https://dash.cloudflare.com/?to=/:account/workers/d1)
2. Select **Create database**.
3. Name your database. For this tutorial, name your D1 database `d1-import-tutorial`.
4. (Optional) Provide a location hint. Location hint is an optional parameter you can provide to indicate your desired geographical location for your database. Refer to [Provide a location hint](https://developers.cloudflare.com/d1/configuration/data-location/#provide-a-location-hint) for more information.
5. Select **Create**.
6. Go to **Console**, then paste the following SQL snippet. This creates a table named `TargetD1Table`.
```sql
DROP TABLE IF EXISTS TargetD1Table;
CREATE TABLE IF NOT EXISTS TargetD1Table (id INTEGER PRIMARY KEY, text TEXT, date_added TEXT);
```
Alternatively, you can use the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
```bash
# Create a D1 database
npx wrangler d1 create d1-import-tutorial
# Create a D1 table
npx wrangler d1 execute d1-import-tutorial --command="DROP TABLE IF EXISTS TargetD1Table; CREATE TABLE IF NOT EXISTS TargetD1Table (id INTEGER PRIMARY KEY, text TEXT, date_added TEXT);" --remote
```

## 3\. Create an `index.js` file

1. Create a new directory and initialize a new Node.js project.
```bash
mkdir d1-import-tutorial
cd d1-import-tutorial
npm init -y
```
2. In this repository, create a new file called `index.js`. This file will contain the code which uses REST API to import your data to your D1 database.
3. In your `index.js` file, define the following variables:

  * `TARGET_TABLE`: The target table name
  * `ACCOUNT_ID`: The account ID. Refer to **Account Details** in **Workers & Pages**.
  * `DATABASE_ID`: The D1 database ID. Go to your data base to see your database ID.
  * `D1_API_KEY`: The D1 API token generated in [step 1](https://developers.cloudflare.com/d1/tutorials/import-to-d1-with-rest-api#1-create-a-d1-api-token)
Caution
In production, you should use environment variables to store sensitive information.
```js
const TARGET_TABLE = " "; // for the tutorial, `TargetD1Table`
const ACCOUNT_ID = " ";
const DATABASE_ID = " ";
const D1_API_KEY = " ";
const D1_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/import`;
const filename = crypto.randomUUID(); // create a random filename
const uploadSize = 500;
const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${D1_API_KEY}`,
};
```

## 4\. Generate example data (optional)

In practice, you may already have the data you wish to import to a D1 database.

This tutorial generates example data to demonstrate the import process.

1. Install the `@faker-js/faker` module.
npmyarnpnpmbun
```
npm i @faker-js/faker
```
```
yarn add @faker-js/faker
```
```
pnpm add @faker-js/faker
```
```
bun add @faker-js/faker
```
2. Add the following code at the beginning of the `index.js` file. This code creates an array called `data` with 2500 (`uploadSize`) array elements, where each array element contains an object with `id`, `text`, and `date_added`. Each array element corresponds to a table row.
```js
import crypto from "crypto";
import { faker } from "@faker-js/faker";
// Generate Fake data
const data = Array.from({ length: uploadSize }, () => ({
	id: Math.floor(Math.random() * 1000000),
	text: faker.lorem.paragraph(),
	date_added: new Date().toISOString().slice(0, 19).replace("T", " "),
}));
```

## 5\. Generate the SQL command

1. Create a function that will generate the SQL command to insert the data into the target table. This function uses the `data` array generated in the previous step.
```js
function makeSqlInsert(data, tableName, skipCols = []) {
	const columns = Object.keys(data[0]).join(",");
	const values = data
		.map((row) => {
			return (
				"(" +
				Object.values(row)
					.map((val) => {
						if (skipCols.includes(val) || val === null || val === "") {
							return "NULL";
						}
						return `'${String(val).replace(/'/g, "").replace(/"/g, "'")}'`;
					})
					.join(",") +
				")"
			);
		})
		.join(",");
	return `INSERT INTO ${tableName} (${columns}) VALUES ${values};`;
}
```

## 6\. Import the data to D1

The import process consists of four steps:

1. **Init upload**: This step initializes the upload process. It sends the hash of the SQL command to the D1 API and receives an upload URL.
2. **Upload to R2**: This step uploads the SQL command to the upload URL.
3. **Start ingestion**: This step starts the ingestion process.
4. **Polling**: This step polls the import process until it completes.

1. Create a function called `uploadToD1` which executes the four steps of the import process.
```js
async function uploadToD1() {
	// 1. Init upload
	const hashStr = crypto.createHash("md5").update(sqlInsert).digest("hex");
	try {
		const initResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify({
				action: "init",
				etag: hashStr,
			}),
		});
		const uploadData = await initResponse.json();
		const uploadUrl = uploadData.result.upload_url;
		const filename = uploadData.result.filename;
		// 2. Upload to R2
		const r2Response = await fetch(uploadUrl, {
			method: "PUT",
			body: sqlInsert,
		});
		const r2Etag = r2Response.headers.get("ETag").replace(/"/g, "");
		// Verify etag
		if (r2Etag !== hashStr) {
			throw new Error("ETag mismatch");
		}
		// 3. Start ingestion
		const ingestResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify({
				action: "ingest",
				etag: hashStr,
				filename,
			}),
		});
		const ingestData = await ingestResponse.json();
		console.log("Ingestion Response:", ingestData);
		// 4. Polling
		await pollImport(ingestData.result.at_bookmark);
		return "Import completed successfully";
	} catch (e) {
		console.error("Error:", e);
		return "Import failed";
	}
}
```
In the above code:

  * An `md5` hash of the SQL command is generated.
  * `initResponse` initializes the upload process and receives the upload URL.
  * `r2Response` uploads the SQL command to the upload URL.
  * Before starting ingestion, the ETag is verified.
  * `ingestResponse` starts the ingestion process.
  * `pollImport` polls the import process until it completes.
2. Add the `pollImport` function to the `index.js` file.
```js
async function pollImport(bookmark) {
	const payload = {
		action: "poll",
		current_bookmark: bookmark,
	};
	while (true) {
		const pollResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		});
		const result = await pollResponse.json();
		console.log("Poll Response:", result.result);
		const { success, error } = result.result;
		if (
			success ||
			(!success && error === "Not currently importing anything.")
		) {
			break;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
}
```
The code above does the following:

  * Sends a `poll` action to the D1 API.
  * Polls the import process until it completes.
3. Finally, add the `runImport` function to the `index.js` file to run the import process.
```js
async function runImport() {
	const result = await uploadToD1();
	console.log(result);
}
runImport();
```

## 7\. Write the final code

In the previous steps, you have created functions to execute various processes involved in importing data into D1\. The final code executes those functions to import the example data into the target D1 table.

1. Copy the final code of your `index.js` file as shown below, with your variables defined at the top of the code.
```js
import crypto from "crypto";
import { faker } from "@faker-js/faker";
const TARGET_TABLE = "";
const ACCOUNT_ID = "";
const DATABASE_ID = "";
const D1_API_KEY = "";
const D1_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/import`;
const uploadSize = 500;
const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${D1_API_KEY}`,
};
// Generate Fake data
const data = Array.from({ length: uploadSize }, () => ({
	id: Math.floor(Math.random() * 1000000),
	text: faker.lorem.paragraph(),
	date_added: new Date().toISOString().slice(0, 19).replace("T", " "),
}));
// Make SQL insert statements
function makeSqlInsert(data, tableName, skipCols = []) {
	const columns = Object.keys(data[0]).join(",");
	const values = data
		.map((row) => {
			return (
				"(" +
				Object.values(row)
					.map((val) => {
						if (skipCols.includes(val) || val === null || val === "") {
							return "NULL";
						}
						return `'${String(val).replace(/'/g, "").replace(/"/g, "'")}'`;
					})
					.join(",") +
				")"
			);
		})
		.join(",");
	return `INSERT INTO ${tableName} (${columns}) VALUES ${values};`;
}
const sqlInsert = makeSqlInsert(data, TARGET_TABLE);
async function pollImport(bookmark) {
	const payload = {
		action: "poll",
		current_bookmark: bookmark,
	};
	while (true) {
		const pollResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify(payload),
		});
		const result = await pollResponse.json();
		console.log("Poll Response:", result.result);
		const { success, error } = result.result;
		if (
			success ||
			(!success && error === "Not currently importing anything.")
		) {
			break;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
}
// Upload to D1
async function uploadToD1() {
	// 1. Init upload
	const hashStr = crypto.createHash("md5").update(sqlInsert).digest("hex");
	try {
		const initResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify({
				action: "init",
				etag: hashStr,
			}),
		});
		const uploadData = await initResponse.json();
		const uploadUrl = uploadData.result.upload_url;
		const filename = uploadData.result.filename;
		// 2. Upload to R2
		const r2Response = await fetch(uploadUrl, {
			method: "PUT",
			body: sqlInsert,
		});
		const r2Etag = r2Response.headers.get("ETag").replace(/"/g, "");
		// Verify etag
		if (r2Etag !== hashStr) {
			throw new Error("ETag mismatch");
		}
		// 3. Start ingestion
		const ingestResponse = await fetch(D1_URL, {
			method: "POST",
			headers,
			body: JSON.stringify({
				action: "ingest",
				etag: hashStr,
				filename,
			}),
		});
		const ingestData = await ingestResponse.json();
		console.log("Ingestion Response:", ingestData);
		// 4. Polling
		await pollImport(ingestData.result.at_bookmark);
		return "Import completed successfully";
	} catch (e) {
		console.error("Error:", e);
		return "Import failed";
	}
}
async function runImport() {
	const result = await uploadToD1();
	console.log(result);
}
runImport();
```

## 8\. Run the code

1. Run your code.
```sh
node index.js
```

You will now see your target D1 table populated with the example data.

Note

If you encounter the `statement too long` error, you would need to break your SQL command into smaller chunks and upload them in batches. You can learn more about this error in the [D1 documentation](https://developers.cloudflare.com/d1/best-practices/import-export-data/#resolve-statement-too-long-error).

## Summary

By completing this tutorial, you have

1. Created an API token.
2. Created a target database and table.
3. Generated example data.
4. Created SQL command for the example data.
5. Imported your example data into the D1 target table using REST API.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/tutorials/import-to-d1-with-rest-api/#page","headline":"Bulk import to D1 using REST API · Cloudflare D1 docs","description":"This tutorial uses the REST API to import a database into D1.","url":"https://developers.cloudflare.com/d1/tutorials/import-to-d1-with-rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","SQL"]}
```
