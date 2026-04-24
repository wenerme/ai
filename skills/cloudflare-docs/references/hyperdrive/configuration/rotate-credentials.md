---
title: Rotating database credentials
description: Update or rotate database credentials for an existing Hyperdrive configuration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/hyperdrive/configuration/rotate-credentials.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Rotating database credentials

You can change the connection information and credentials of your Hyperdrive configuration in one of two ways:

1. Create a new Hyperdrive configuration with the new connection information, and update your Worker to use the new Hyperdrive configuration.
2. Update the existing Hyperdrive configuration with the new connection information and credentials.

## Use a new Hyperdrive configuration

Creating a new Hyperdrive configuration to update your database credentials allows you to keep your existing Hyperdrive configuration unchanged, gradually migrate your Worker to the new Hyperdrive configuration, and easily roll back to the previous configuration if needed.

To create a Hyperdrive configuration that connects to an existing PostgreSQL or MySQL database, use the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive).

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive create my-updated-hyperdrive --connection-string="<YOUR_CONNECTION_STRING>"


```

The command above will output the ID of your Hyperdrive. Set this ID in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) for your Workers project:

* [  wrangler.jsonc ](#tab-panel-7172)
* [  wrangler.toml ](#tab-panel-7173)

JSONC

```

{

  // required for database drivers to function

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-04-24",

  "hyperdrive": [

    {

      "binding": "HYPERDRIVE",

      "id": "<your-hyperdrive-id-here>"

    }

  ]

}


```

Explain Code

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-04-24"


[[hyperdrive]]

binding = "HYPERDRIVE"

id = "<your-hyperdrive-id-here>"


```

To update your Worker to use the new Hyperdrive configuration, redeploy your Worker or use [gradual deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/).

## Update the existing Hyperdrive configuration

You can update the configuration of an existing Hyperdrive configuration using the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

Terminal window

```

# wrangler v3.11 and above required

npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --origin-host <YOUR_ORIGIN_HOST> --origin-password <YOUR_ORIGIN_PASSWORD> --origin-user <YOUR_ORIGIN_USERNAME> --database <YOUR_DATABASE> --origin-port <YOUR_ORIGIN_PORT>


```

Note

Updating the settings of an existing Hyperdrive configuration does not purge Hyperdrive's cache and does not tear down the existing database connection pool. New connections will be established using the new connection information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/configuration/rotate-credentials/","name":"Rotating database credentials"}}]}
```
