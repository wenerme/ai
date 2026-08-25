---
description: Wrangler CLI commands for creating and managing Hyperdrive configurations.
title: Wrangler commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler commands

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/) apply to Hyperdrive.

## `hyperdrive create`

Create a Hyperdrive config

npmyarnpnpm

```
npx wrangler hyperdrive create [NAME]
```

```
yarn wrangler hyperdrive create [NAME]
```

```
pnpm wrangler hyperdrive create [NAME]
```

* `[NAME]` `string` required
The name of the Hyperdrive config
* `--connection-string` `string`
The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database
* `--service-id` `string`
The Workers VPC Service ID of the origin database
* `--origin-host` `string` alias: --host
The host of the origin database
* `--origin-port` `number` alias: --port
The port number of the origin database
* `--origin-scheme` `string` alias: --schemedefault: postgresql
The scheme used to connect to the origin database
* `--database` `string`
The name of the database within the origin database
* `--origin-user` `string` alias: --user
The username used to connect to the origin database
* `--origin-password` `string` alias: --password
The password used to connect to the origin database
* `--access-client-id` `string`
The Client ID of the Access token to use when connecting to the origin database
* `--access-client-secret` `string`
The Client Secret of the Access token to use when connecting to the origin database
* `--caching-disabled` `boolean`
Disables the caching of SQL responses
* `--max-age` `number`
Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled
* `--swr` `number`
Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled
* `--ca-certificate-id` `string` alias: --ca-certificate-uuid
Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate.
* `--mtls-certificate-id` `string` alias: --mtls-certificate-uuid
Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates.
* `--sslmode` `string`
Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY\_CA, VERIFY\_IDENTITY'.
* `--origin-connection-limit` `number`
The (soft) maximum number of connections that Hyperdrive may establish to the origin database
* `--binding` `string`
The binding name of this resource in your Worker
* `--update-config` `boolean`
Automatically update your config file with the newly added resource

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `hyperdrive delete`

Delete a Hyperdrive config

npmyarnpnpm

```
npx wrangler hyperdrive delete [ID]
```

```
yarn wrangler hyperdrive delete [ID]
```

```
pnpm wrangler hyperdrive delete [ID]
```

* `[ID]` `string` required
The ID of the Hyperdrive config

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `hyperdrive get`

Get a Hyperdrive config

npmyarnpnpm

```
npx wrangler hyperdrive get [ID]
```

```
yarn wrangler hyperdrive get [ID]
```

```
pnpm wrangler hyperdrive get [ID]
```

* `[ID]` `string` required
The ID of the Hyperdrive config

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `hyperdrive list`

List Hyperdrive configs

npmyarnpnpm

```
npx wrangler hyperdrive list
```

```
yarn wrangler hyperdrive list
```

```
pnpm wrangler hyperdrive list
```

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `hyperdrive update`

Update a Hyperdrive config

npmyarnpnpm

```
npx wrangler hyperdrive update [ID]
```

```
yarn wrangler hyperdrive update [ID]
```

```
pnpm wrangler hyperdrive update [ID]
```

* `[ID]` `string` required
The ID of the Hyperdrive config
* `--name` `string`
Give your config a new name
* `--connection-string` `string`
The connection string for the database you want Hyperdrive to connect to - ex: protocol://user:password@host:port/database
* `--service-id` `string`
The Workers VPC Service ID of the origin database
* `--origin-host` `string` alias: --host
The host of the origin database
* `--origin-port` `number` alias: --port
The port number of the origin database
* `--origin-scheme` `string` alias: --scheme
The scheme used to connect to the origin database
* `--database` `string`
The name of the database within the origin database
* `--origin-user` `string` alias: --user
The username used to connect to the origin database
* `--origin-password` `string` alias: --password
The password used to connect to the origin database
* `--access-client-id` `string`
The Client ID of the Access token to use when connecting to the origin database
* `--access-client-secret` `string`
The Client Secret of the Access token to use when connecting to the origin database
* `--caching-disabled` `boolean`
Disables the caching of SQL responses
* `--max-age` `number`
Specifies max duration for which items should persist in the cache, cannot be set when caching is disabled
* `--swr` `number`
Indicates the number of seconds cache may serve the response after it becomes stale, cannot be set when caching is disabled
* `--ca-certificate-id` `string` alias: --ca-certificate-uuid
Sets custom CA certificate when connecting to origin database. Must be valid UUID of already uploaded CA certificate.
* `--mtls-certificate-id` `string` alias: --mtls-certificate-uuid
Sets custom mTLS client certificates when connecting to origin database. Must be valid UUID of already uploaded public/private key certificates.
* `--sslmode` `string`
Sets sslmode for connecting to database. For PostgreSQL: 'require, verify-ca, verify-full'. For MySQL: 'REQUIRED, VERIFY\_CA, VERIFY\_IDENTITY'.
* `--origin-connection-limit` `number`
The (soft) maximum number of connections that Hyperdrive may establish to the origin database

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Hyperdrive docs","description":"Wrangler CLI commands for creating and managing Hyperdrive configurations.","url":"https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
