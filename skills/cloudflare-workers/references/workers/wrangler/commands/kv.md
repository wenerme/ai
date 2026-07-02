---
title: KV
description: Wrangler commands for managing Workers KV namespaces and key-value pairs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# KV

Manage [Workers KV](https://developers.cloudflare.com/kv/) using Wrangler.

## `kv namespace`

Manage Workers KV namespaces.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. Learn more about using Workers KV with Wrangler in the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Warning

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/#deprecations) for KV page.

### `kv namespace create`

Create a new namespace

* [  npm ](#tab-panel-12717)
* [  pnpm ](#tab-panel-12718)
* [  yarn ](#tab-panel-12719)

```sh
npx wrangler kv namespace create [NAMESPACE]
```

```sh
pnpm wrangler kv namespace create [NAMESPACE]
```

```sh
yarn wrangler kv namespace create [NAMESPACE]
```

* `[NAMESPACE]` ` string ` required
The name of the new namespace
* `--preview` ` boolean `
Interact with a preview namespace
* `--use-remote` ` boolean `
Use a remote binding when adding the newly created resource to your config
* `--update-config` ` boolean `
Automatically update your config file with the newly added resource
* `--binding` ` string `
The binding name of this resource in your Worker

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

### `kv namespace list`

Output a list of all KV namespaces associated with your account id

* [  npm ](#tab-panel-12720)
* [  pnpm ](#tab-panel-12721)
* [  yarn ](#tab-panel-12722)

```sh
npx wrangler kv namespace list
```

```sh
pnpm wrangler kv namespace list
```

```sh
yarn wrangler kv namespace list
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

### `kv namespace delete`

Delete a given namespace.

* [  npm ](#tab-panel-12723)
* [  pnpm ](#tab-panel-12724)
* [  yarn ](#tab-panel-12725)

```sh
npx wrangler kv namespace delete [NAMESPACE]
```

```sh
pnpm wrangler kv namespace delete [NAMESPACE]
```

```sh
yarn wrangler kv namespace delete [NAMESPACE]
```

* `[NAMESPACE]` ` string `
The name of the namespace to delete
* `--binding` ` string `
The binding name to the namespace to delete from
* `--namespace-id` ` string `
The id of the namespace to delete
* `--preview` ` boolean `
Interact with a preview namespace
* `--skip-confirmation` ` boolean ` alias: --y default: false
Skip confirmation

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

### `kv namespace rename`

Rename a KV namespace

* [  npm ](#tab-panel-12726)
* [  pnpm ](#tab-panel-12727)
* [  yarn ](#tab-panel-12728)

```sh
npx wrangler kv namespace rename [OLD-NAME]
```

```sh
pnpm wrangler kv namespace rename [OLD-NAME]
```

```sh
yarn wrangler kv namespace rename [OLD-NAME]
```

* `[OLD-NAME]` ` string `
The current name of the namespace to rename
* `--namespace-id` ` string `
The id of the namespace to rename
* `--new-name` ` string ` required
The new name for the namespace

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

## `kv key`

Manage key-value pairs within a Workers KV namespace.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. Learn more about using Workers KV with Wrangler in the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Warning

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/) for KV page.

### `kv key put`

Write a single key/value pair to the given namespace

* [  npm ](#tab-panel-12729)
* [  pnpm ](#tab-panel-12730)
* [  yarn ](#tab-panel-12731)

```sh
npx wrangler kv key put [KEY] [VALUE]
```

```sh
pnpm wrangler kv key put [KEY] [VALUE]
```

```sh
yarn wrangler kv key put [KEY] [VALUE]
```

* `[KEY]` ` string ` required
The key to write to
* `[VALUE]` ` string `
The value to write
* `--path` ` string `
Read value from the file at a given path
* `--binding` ` string `
The binding name to the namespace to write to
* `--namespace-id` ` string `
The id of the namespace to write to
* `--preview` ` boolean `
Interact with a preview namespace
* `--ttl` ` number `
Time for which the entries should be visible
* `--expiration` ` number `
Time since the UNIX epoch after which the entry expires
* `--metadata` ` string `
Arbitrary JSON that is associated with a key
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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

### `kv key list`

Output a list of all keys in a given namespace

* [  npm ](#tab-panel-12732)
* [  pnpm ](#tab-panel-12733)
* [  yarn ](#tab-panel-12734)

```sh
npx wrangler kv key list
```

```sh
pnpm wrangler kv key list
```

```sh
yarn wrangler kv key list
```

* `--binding` ` string `
The binding name to the namespace to list
* `--namespace-id` ` string `
The id of the namespace to list
* `--preview` ` boolean ` default: false
Interact with a preview namespace
* `--prefix` ` string `
A prefix to filter listed keys
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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

### `kv key get`

Read a single value by key from the given namespace

* [  npm ](#tab-panel-12735)
* [  pnpm ](#tab-panel-12736)
* [  yarn ](#tab-panel-12737)

```sh
npx wrangler kv key get [KEY]
```

```sh
pnpm wrangler kv key get [KEY]
```

```sh
yarn wrangler kv key get [KEY]
```

* `[KEY]` ` string ` required
The key value to get.
* `--text` ` boolean ` default: false
Decode the returned value as a utf8 string
* `--binding` ` string `
The binding name to the namespace to get from
* `--namespace-id` ` string `
The id of the namespace to get from
* `--preview` ` boolean ` default: false
Interact with a preview namespace
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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

### `kv key delete`

Remove a single key value pair from the given namespace

* [  npm ](#tab-panel-12738)
* [  pnpm ](#tab-panel-12739)
* [  yarn ](#tab-panel-12740)

```sh
npx wrangler kv key delete [KEY]
```

```sh
pnpm wrangler kv key delete [KEY]
```

```sh
yarn wrangler kv key delete [KEY]
```

* `[KEY]` ` string ` required
The key value to delete.
* `--binding` ` string `
The binding name to the namespace to delete from
* `--namespace-id` ` string `
The id of the namespace to delete from
* `--preview` ` boolean `
Interact with a preview namespace
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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

## `kv bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. Learn more about using Workers KV with Wrangler in the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Warning

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/) for KV page.

### `kv bulk get`

Gets multiple key-value pairs from a namespace

* [  npm ](#tab-panel-12741)
* [  pnpm ](#tab-panel-12742)
* [  yarn ](#tab-panel-12743)

```sh
npx wrangler kv bulk get [FILENAME]
```

```sh
pnpm wrangler kv bulk get [FILENAME]
```

```sh
yarn wrangler kv bulk get [FILENAME]
```

* `[FILENAME]` ` string ` required
The file containing the keys to get
* `--binding` ` string `
The binding name to the namespace to get from
* `--namespace-id` ` string `
The id of the namespace to get from
* `--preview` ` boolean ` default: false
Interact with a preview namespace
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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

### `kv bulk put`

Upload multiple key-value pairs to a namespace

* [  npm ](#tab-panel-12744)
* [  pnpm ](#tab-panel-12745)
* [  yarn ](#tab-panel-12746)

```sh
npx wrangler kv bulk put [FILENAME]
```

```sh
pnpm wrangler kv bulk put [FILENAME]
```

```sh
yarn wrangler kv bulk put [FILENAME]
```

* `[FILENAME]` ` string ` required
The file containing the key/value pairs to write
* `--binding` ` string `
The binding name to the namespace to write to
* `--namespace-id` ` string `
The id of the namespace to write to
* `--preview` ` boolean `
Interact with a preview namespace
* `--ttl` ` number `
Time for which the entries should be visible
* `--expiration` ` number `
Time since the UNIX epoch after which the entry expires
* `--metadata` ` string `
Arbitrary JSON that is associated with a key
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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

### `kv bulk delete`

Delete multiple key-value pairs from a namespace

* [  npm ](#tab-panel-12747)
* [  pnpm ](#tab-panel-12748)
* [  yarn ](#tab-panel-12749)

```sh
npx wrangler kv bulk delete [FILENAME]
```

```sh
pnpm wrangler kv bulk delete [FILENAME]
```

```sh
yarn wrangler kv bulk delete [FILENAME]
```

* `[FILENAME]` ` string ` required
The file containing the keys to delete
* `--force` ` boolean ` alias: --f
Do not ask for confirmation before deleting
* `--binding` ` string `
The binding name to the namespace to delete from
* `--namespace-id` ` string `
The id of the namespace to delete from
* `--preview` ` boolean `
Interact with a preview namespace
* `--local` ` boolean `
Interact with local storage
* `--remote` ` boolean `
Interact with remote storage
* `--persist-to` ` string `
Directory for local persistence

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/kv/#page","headline":"KV · Cloudflare Workers docs","description":"Wrangler commands for managing Workers KV namespaces and key-value pairs.","url":"https://developers.cloudflare.com/workers/wrangler/commands/kv/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/kv/","name":"KV"}}]}
```
