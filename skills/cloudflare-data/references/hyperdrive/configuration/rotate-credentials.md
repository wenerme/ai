---
description: Update or rotate database credentials for an existing Hyperdrive configuration.
title: Rotating database credentials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

#  Rotating database credentials

Last updated Jul 3, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can change the connection information and credentials of your Hyperdrive configuration in one of two ways:

1. Create a new Hyperdrive configuration with the new connection information, and update your Worker to use the new Hyperdrive configuration.
2. Update the existing Hyperdrive configuration with the new connection information and credentials.

## Use a new Hyperdrive configuration

Creating a new Hyperdrive configuration to update your database credentials allows you to keep your existing Hyperdrive configuration unchanged, gradually migrate your Worker to the new Hyperdrive configuration, and easily roll back to the previous configuration if needed.

To create a Hyperdrive configuration that connects to an existing PostgreSQL or MySQL database, use the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive).

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive create my-updated-hyperdrive --connection-string="<YOUR_CONNECTION_STRING>"
```

The command above will output the ID of your Hyperdrive. Set this ID in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Workers project:

```jsonc
{
	// required for database drivers to function
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-07-21",
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
compatibility_date = "2026-07-21"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<your-hyperdrive-id-here>"
```

To update your Worker to use the new Hyperdrive configuration, redeploy your Worker or use [gradual deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/).

## Update the existing Hyperdrive configuration

You can update the configuration of an existing Hyperdrive configuration using the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

```sh
# wrangler v3.11 and above required
npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --origin-host <YOUR_ORIGIN_HOST> --origin-password <YOUR_ORIGIN_PASSWORD> --origin-user <YOUR_ORIGIN_USERNAME> --database <YOUR_DATABASE> --origin-port <YOUR_ORIGIN_PORT>
```

Note

Updating the settings of an existing Hyperdrive configuration does not purge Hyperdrive's cache and does not tear down the existing database connection pool. New connections will be established using the new connection information.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/#page","headline":"Rotating database credentials · Cloudflare Hyperdrive docs","description":"Update or rotate database credentials for an existing Hyperdrive configuration.","url":"https://developers.cloudflare.com/hyperdrive/configuration/rotate-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
