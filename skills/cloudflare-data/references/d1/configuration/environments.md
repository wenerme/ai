---
description: Configure separate D1 databases for staging and production Wrangler environments.
title: Environments
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt
> Use this file to discover all available pages before exploring further.

# Environments

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/d1/configuration/environments/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Environments](https://developers.cloudflare.com/workers/wrangler/environments/) are different contexts that your code runs in. Cloudflare Developer Platform allows you to create and manage different environments. Through environments, you can deploy the same project to multiple places under multiple names.

To specify different D1 databases for different environments, use the following syntax in your Wrangler file:

```jsonc
{
	"env": {
		// This is a staging environment
		"staging": {
			"d1_databases": [
				{
					"binding": "<BINDING_NAME_1>",
					"database_name": "<DATABASE_NAME_1>",
					"database_id": "<UUID1>"
				}
			]
		},
		// This is a production environment
		"production": {
			"d1_databases": [
				{
					"binding": "<BINDING_NAME_2>",
					"database_name": "<DATABASE_NAME_2>",
					"database_id": "<UUID2>"
				}
			]
		}
	}
}
```

```toml
[[env.staging.d1_databases]]
binding = "<BINDING_NAME_1>"
database_name = "<DATABASE_NAME_1>"
database_id = "<UUID1>"

[[env.production.d1_databases]]
binding = "<BINDING_NAME_2>"
database_name = "<DATABASE_NAME_2>"
database_id = "<UUID2>"
```

In the code above, the `staging` environment is using a different database (`DATABASE_NAME_1`) than the `production` environment (`DATABASE_NAME_2`).

## Anatomy of Wrangler file

If you need to specify different D1 databases for different environments, your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) may contain bindings that resemble the following:

```jsonc
{
	"production": {
		"d1_databases": [
			{
				"binding": "DB",
				"database_name": "DATABASE_NAME",
				"database_id": "DATABASE_ID"
			}
		]
	}
}
```

```toml
[[production.d1_databases]]
binding = "DB"
database_name = "DATABASE_NAME"
database_id = "DATABASE_ID"
```

In the above configuration:

* `[[production.d1_databases]]` creates an object `production` with a property `d1_databases`, where `d1_databases` is an array of objects, since you can create multiple D1 bindings in case you have more than one database.
* Any property below the line in the form `<key> = <value>` is a property of an object within the `d1_databases` array.

Therefore, the above binding is equivalent to:

```json
{
  "production": {
    "d1_databases": [
      {
        "binding": "DB",
        "database_name": "DATABASE_NAME",
        "database_id": "DATABASE_ID"
      }
    ]
  }
}
```

### Example

```jsonc
{
	"env": {
		"staging": {
			"d1_databases": [
				{
					"binding": "BINDING_NAME_1",
					"database_name": "DATABASE_NAME_1",
					"database_id": "UUID_1"
				}
			]
		},
		"production": {
			"d1_databases": [
				{
					"binding": "BINDING_NAME_2",
					"database_name": "DATABASE_NAME_2",
					"database_id": "UUID_2"
				}
			]
		}
	}
}
```

```toml
[[env.staging.d1_databases]]
binding = "BINDING_NAME_1"
database_name = "DATABASE_NAME_1"
database_id = "UUID_1"

[[env.production.d1_databases]]
binding = "BINDING_NAME_2"
database_name = "DATABASE_NAME_2"
database_id = "UUID_2"
```

The above is equivalent to the following structure in JSON:

```json
{
  "env": {
    "production": {
      "d1_databases": [
        {
          "binding": "BINDING_NAME_2",
          "database_id": "UUID_2",
          "database_name": "DATABASE_NAME_2"
        }
      ]
    },
    "staging": {
      "d1_databases": [
        {
          "binding": "BINDING_NAME_1",
          "database_id": "UUID_1",
          "database_name": "DATABASE_NAME_1"
        }
      ]
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/configuration/environments/#page","headline":"Environments · Cloudflare D1 docs","description":"Configure separate D1 databases for staging and production Wrangler environments.","url":"https://developers.cloudflare.com/d1/configuration/environments/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
