---
description: Use the mysql driver with Hyperdrive to query MySQL databases from Cloudflare Workers.
title: mysql
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# mysql

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The [mysql ↗](https://github.com/mysqljs/mysql) package is a MySQL driver for Node.js. This example demonstrates how to use it with Cloudflare Workers and Hyperdrive.

Install the [mysql ↗](https://github.com/mysqljs/mysql) driver:

npmyarnpnpmbun

```
npm i mysql
```

```
yarn add mysql
```

```
pnpm add mysql
```

```
bun add mysql
```

Add the required Node.js compatibility flags and Hyperdrive binding to your `wrangler.jsonc` file:

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-08-25",
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<your-hyperdrive-id-here>"
		}
	]
}
```

```toml
compatibility_flags = [ "nodejs_compat" ]
# Set this to today's date
compatibility_date = "2026-08-25"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<your-hyperdrive-id-here>"
```

Create a new connection and pass the Hyperdrive parameters:

```ts
import { createConnection } from "mysql";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const result = await new Promise<any>((resolve) => {
			// Create a connection using the mysql driver with the Hyperdrive credentials (only accessible from your Worker).
			const connection = createConnection({
				host: env.HYPERDRIVE.host,
				user: env.HYPERDRIVE.user,
				password: env.HYPERDRIVE.password,
				database: env.HYPERDRIVE.database,
				port: env.HYPERDRIVE.port,
			});

			connection.connect((error: { message: string }) => {
				if (error) {
					throw new Error(error.message);
				}

				// Sample query
				connection.query("SHOW tables;", [], (error, rows, fields) => {
					resolve({ fields, rows });
				});
			});
		});

		// Return result  as JSON
		return new Response(JSON.stringify(result), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
} satisfies ExportedHandler<Env>;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/#page","headline":"mysql · Cloudflare Hyperdrive docs","description":"Use the mysql driver with Hyperdrive to query MySQL databases from Cloudflare Workers.","url":"https://developers.cloudflare.com/hyperdrive/examples/connect-to-mysql/mysql-drivers-and-libraries/mysql/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
