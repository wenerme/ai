---
description: Wrangler commands for managing Workers VPC services.
title: VPC
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# VPC

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/wrangler/commands/vpc/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Manage [Workers VPC](https://developers.cloudflare.com/workers-vpc/) services using Wrangler. VPC services allow your Workers to connect to private services on your network through Cloudflare Tunnels.

## `vpc service create`

Create a new VPC service

npmyarnpnpm

```
npx wrangler vpc service create [NAME]
```

```
yarn wrangler vpc service create [NAME]
```

```
pnpm wrangler vpc service create [NAME]
```

* `[NAME]` `string` required
The name of the VPC service
* `--type` `string` required
The type of the VPC service
* `--tcp-port` `number`
TCP port number
* `--app-protocol` `string`
Application protocol for the TCP service
* `--http-port` `number`
HTTP port (default: 80)
* `--https-port` `number`
HTTPS port number (default: 443)
* `--ipv4` `string`
IPv4 address for the host \[conflicts with --ipv6\]
* `--ipv6` `string`
IPv6 address for the host \[conflicts with --ipv4\]
* `--hostname` `string`
Hostname for the host
* `--resolver-ips` `string`
Comma-separated list of resolver IPs
* `--tunnel-id` `string` required
UUID of the Cloudflare tunnel
* `--cert-verification-mode` `string`
TLS certificate verification mode for the connection to the origin

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

## `vpc service delete`

Delete a VPC service

npmyarnpnpm

```
npx wrangler vpc service delete [SERVICE-ID]
```

```
yarn wrangler vpc service delete [SERVICE-ID]
```

```
pnpm wrangler vpc service delete [SERVICE-ID]
```

* `[SERVICE-ID]` `string` required
The ID of the service to delete

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

## `vpc service get`

Get a VPC service

npmyarnpnpm

```
npx wrangler vpc service get [SERVICE-ID]
```

```
yarn wrangler vpc service get [SERVICE-ID]
```

```
pnpm wrangler vpc service get [SERVICE-ID]
```

* `[SERVICE-ID]` `string` required
The ID of the VPC service

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

## `vpc service list`

List VPC services

npmyarnpnpm

```
npx wrangler vpc service list
```

```
yarn wrangler vpc service list
```

```
pnpm wrangler vpc service list
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

## `vpc service update`

Update a VPC service

npmyarnpnpm

```
npx wrangler vpc service update [SERVICE-ID]
```

```
yarn wrangler vpc service update [SERVICE-ID]
```

```
pnpm wrangler vpc service update [SERVICE-ID]
```

* `[SERVICE-ID]` `string` required
The ID of the VPC service to update
* `--name` `string` required
The name of the VPC service
* `--type` `string` required
The type of the VPC service
* `--tcp-port` `number`
TCP port number
* `--app-protocol` `string`
Application protocol for the TCP service
* `--http-port` `number`
HTTP port (default: 80)
* `--https-port` `number`
HTTPS port number (default: 443)
* `--ipv4` `string`
IPv4 address for the host \[conflicts with --ipv6\]
* `--ipv6` `string`
IPv6 address for the host \[conflicts with --ipv4\]
* `--hostname` `string`
Hostname for the host
* `--resolver-ips` `string`
Comma-separated list of resolver IPs
* `--tunnel-id` `string` required
UUID of the Cloudflare tunnel
* `--cert-verification-mode` `string`
TLS certificate verification mode for the connection to the origin

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/vpc/#page","headline":"VPC · Cloudflare Workers docs","description":"Wrangler commands for managing Workers VPC services.","url":"https://developers.cloudflare.com/workers/wrangler/commands/vpc/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
