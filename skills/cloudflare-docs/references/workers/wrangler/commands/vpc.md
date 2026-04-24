---
title: VPC
description: Wrangler commands for managing Workers VPC services.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/wrangler/commands/vpc.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# VPC

Manage [Workers VPC](https://developers.cloudflare.com/workers-vpc/) services using Wrangler. VPC services allow your Workers to connect to private services on your network through Cloudflare Tunnels.

## `vpc service create`

Create a new VPC service

* [  npm ](#tab-panel-10800)
* [  pnpm ](#tab-panel-10801)
* [  yarn ](#tab-panel-10802)

Terminal window

```

npx wrangler vpc service create [NAME]


```

Terminal window

```

pnpm wrangler vpc service create [NAME]


```

Terminal window

```

yarn wrangler vpc service create [NAME]


```

* `[NAME]` ` string ` required  
The name of the VPC service
* `--type` ` string ` required  
The type of the VPC service
* `--tcp-port` ` number `  
TCP port number
* `--app-protocol` ` string `  
Application protocol for the TCP service
* `--http-port` ` number `  
HTTP port (default: 80)
* `--https-port` ` number `  
HTTPS port number (default: 443)
* `--ipv4` ` string `  
IPv4 address for the host \[conflicts with --ipv6\]
* `--ipv6` ` string `  
IPv6 address for the host \[conflicts with --ipv4\]
* `--hostname` ` string `  
Hostname for the host
* `--resolver-ips` ` string `  
Comma-separated list of resolver IPs
* `--tunnel-id` ` string ` required  
UUID of the Cloudflare tunnel
* `--cert-verification-mode` ` string `  
TLS certificate verification mode for the connection to the origin

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

## `vpc service delete`

Delete a VPC service

* [  npm ](#tab-panel-10803)
* [  pnpm ](#tab-panel-10804)
* [  yarn ](#tab-panel-10805)

Terminal window

```

npx wrangler vpc service delete [SERVICE-ID]


```

Terminal window

```

pnpm wrangler vpc service delete [SERVICE-ID]


```

Terminal window

```

yarn wrangler vpc service delete [SERVICE-ID]


```

* `[SERVICE-ID]` ` string ` required  
The ID of the service to delete

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

## `vpc service get`

Get a VPC service

* [  npm ](#tab-panel-10806)
* [  pnpm ](#tab-panel-10807)
* [  yarn ](#tab-panel-10808)

Terminal window

```

npx wrangler vpc service get [SERVICE-ID]


```

Terminal window

```

pnpm wrangler vpc service get [SERVICE-ID]


```

Terminal window

```

yarn wrangler vpc service get [SERVICE-ID]


```

* `[SERVICE-ID]` ` string ` required  
The ID of the VPC service

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

## `vpc service list`

List VPC services

* [  npm ](#tab-panel-10809)
* [  pnpm ](#tab-panel-10810)
* [  yarn ](#tab-panel-10811)

Terminal window

```

npx wrangler vpc service list


```

Terminal window

```

pnpm wrangler vpc service list


```

Terminal window

```

yarn wrangler vpc service list


```

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

## `vpc service update`

Update a VPC service

* [  npm ](#tab-panel-10812)
* [  pnpm ](#tab-panel-10813)
* [  yarn ](#tab-panel-10814)

Terminal window

```

npx wrangler vpc service update [SERVICE-ID]


```

Terminal window

```

pnpm wrangler vpc service update [SERVICE-ID]


```

Terminal window

```

yarn wrangler vpc service update [SERVICE-ID]


```

* `[SERVICE-ID]` ` string ` required  
The ID of the VPC service to update
* `--name` ` string ` required  
The name of the VPC service
* `--type` ` string ` required  
The type of the VPC service
* `--tcp-port` ` number `  
TCP port number
* `--app-protocol` ` string `  
Application protocol for the TCP service
* `--http-port` ` number `  
HTTP port (default: 80)
* `--https-port` ` number `  
HTTPS port number (default: 443)
* `--ipv4` ` string `  
IPv4 address for the host \[conflicts with --ipv6\]
* `--ipv6` ` string `  
IPv6 address for the host \[conflicts with --ipv4\]
* `--hostname` ` string `  
Hostname for the host
* `--resolver-ips` ` string `  
Comma-separated list of resolver IPs
* `--tunnel-id` ` string ` required  
UUID of the Cloudflare tunnel
* `--cert-verification-mode` ` string `  
TLS certificate verification mode for the connection to the origin

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/vpc/","name":"VPC"}}]}
```
