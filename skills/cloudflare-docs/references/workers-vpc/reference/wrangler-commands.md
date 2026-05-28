---
title: Wrangler commands
description: Wrangler CLI commands for creating and managing Workers VPC services.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

The following [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/) allow you to manage Workers VPC services.

## `vpc service create`

Create a new VPC service

* [  npm ](#tab-panel-9234)
* [  pnpm ](#tab-panel-9235)
* [  yarn ](#tab-panel-9236)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `vpc service delete`

Delete a VPC service

* [  npm ](#tab-panel-9237)
* [  pnpm ](#tab-panel-9238)
* [  yarn ](#tab-panel-9239)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `vpc service get`

Get a VPC service

* [  npm ](#tab-panel-9240)
* [  pnpm ](#tab-panel-9241)
* [  yarn ](#tab-panel-9242)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `vpc service list`

List VPC services

* [  npm ](#tab-panel-9243)
* [  pnpm ](#tab-panel-9244)
* [  yarn ](#tab-panel-9245)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `vpc service update`

Update a VPC service

* [  npm ](#tab-panel-9246)
* [  pnpm ](#tab-panel-9247)
* [  yarn ](#tab-panel-9248)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
