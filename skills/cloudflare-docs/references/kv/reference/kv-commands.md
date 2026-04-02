---
title: Wrangler KV commands
description: Manage Workers KV namespaces.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/kv/reference/kv-commands.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Wrangler KV commands

## `kv namespace`

Manage Workers KV namespaces.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. Learn more about using Workers KV with Wrangler in the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Warning

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/#deprecations) for KV page.

### `kv namespace create`

Create a new namespace

* [  npm ](#tab-panel-5009)
* [  pnpm ](#tab-panel-5010)
* [  yarn ](#tab-panel-5011)

Terminal window

```

npx wrangler kv namespace create [NAMESPACE]


```

Terminal window

```

pnpm wrangler kv namespace create [NAMESPACE]


```

Terminal window

```

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

### `kv namespace list`

Output a list of all KV namespaces associated with your account id

* [  npm ](#tab-panel-5012)
* [  pnpm ](#tab-panel-5013)
* [  yarn ](#tab-panel-5014)

Terminal window

```

npx wrangler kv namespace list


```

Terminal window

```

pnpm wrangler kv namespace list


```

Terminal window

```

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

### `kv namespace delete`

Delete a given namespace.

* [  npm ](#tab-panel-5015)
* [  pnpm ](#tab-panel-5016)
* [  yarn ](#tab-panel-5017)

Terminal window

```

npx wrangler kv namespace delete [NAMESPACE]


```

Terminal window

```

pnpm wrangler kv namespace delete [NAMESPACE]


```

Terminal window

```

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

### `kv namespace rename`

Rename a KV namespace

* [  npm ](#tab-panel-5018)
* [  pnpm ](#tab-panel-5019)
* [  yarn ](#tab-panel-5020)

Terminal window

```

npx wrangler kv namespace rename [OLD-NAME]


```

Terminal window

```

pnpm wrangler kv namespace rename [OLD-NAME]


```

Terminal window

```

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

## `kv key`

Manage key-value pairs within a Workers KV namespace.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. Learn more about using Workers KV with Wrangler in the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Warning

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/) for KV page.

### `kv key put`

Write a single key/value pair to the given namespace

* [  npm ](#tab-panel-5021)
* [  pnpm ](#tab-panel-5022)
* [  yarn ](#tab-panel-5023)

Terminal window

```

npx wrangler kv key put [KEY] [VALUE]


```

Terminal window

```

pnpm wrangler kv key put [KEY] [VALUE]


```

Terminal window

```

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

### `kv key list`

Output a list of all keys in a given namespace

* [  npm ](#tab-panel-5024)
* [  pnpm ](#tab-panel-5025)
* [  yarn ](#tab-panel-5026)

Terminal window

```

npx wrangler kv key list


```

Terminal window

```

pnpm wrangler kv key list


```

Terminal window

```

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

### `kv key get`

Read a single value by key from the given namespace

* [  npm ](#tab-panel-5027)
* [  pnpm ](#tab-panel-5028)
* [  yarn ](#tab-panel-5029)

Terminal window

```

npx wrangler kv key get [KEY]


```

Terminal window

```

pnpm wrangler kv key get [KEY]


```

Terminal window

```

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

### `kv key delete`

Remove a single key value pair from the given namespace

* [  npm ](#tab-panel-5030)
* [  pnpm ](#tab-panel-5031)
* [  yarn ](#tab-panel-5032)

Terminal window

```

npx wrangler kv key delete [KEY]


```

Terminal window

```

pnpm wrangler kv key delete [KEY]


```

Terminal window

```

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

## `kv bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. Learn more about using Workers KV with Wrangler in the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Warning

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [Wrangler commands](https://developers.cloudflare.com/kv/reference/kv-commands/) for KV page.

### `kv bulk get`

Gets multiple key-value pairs from a namespace

* [  npm ](#tab-panel-5033)
* [  pnpm ](#tab-panel-5034)
* [  yarn ](#tab-panel-5035)

Terminal window

```

npx wrangler kv bulk get [FILENAME]


```

Terminal window

```

pnpm wrangler kv bulk get [FILENAME]


```

Terminal window

```

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

### `kv bulk put`

Upload multiple key-value pairs to a namespace

* [  npm ](#tab-panel-5036)
* [  pnpm ](#tab-panel-5037)
* [  yarn ](#tab-panel-5038)

Terminal window

```

npx wrangler kv bulk put [FILENAME]


```

Terminal window

```

pnpm wrangler kv bulk put [FILENAME]


```

Terminal window

```

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

### `kv bulk delete`

Delete multiple key-value pairs from a namespace

* [  npm ](#tab-panel-5039)
* [  pnpm ](#tab-panel-5040)
* [  yarn ](#tab-panel-5041)

Terminal window

```

npx wrangler kv bulk delete [FILENAME]


```

Terminal window

```

pnpm wrangler kv bulk delete [FILENAME]


```

Terminal window

```

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

## Deprecations

Below are deprecations to Wrangler commands for Workers KV.

### `kv:...` syntax deprecation

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax.

The `kv:...` syntax is deprecated in versions 3.60.0 and beyond and will be removed in a future major version.

For example, commands using the `kv ...` syntax look as such:

Terminal window

```

wrangler kv namespace list

wrangler kv key get <KEY>

wrangler kv bulk put <FILENAME>


```

The same commands using the `kv:...` syntax look as such:

Terminal window

```

wrangler kv:namespace list

wrangler kv:key get <KEY>

wrangler kv:bulk put <FILENAME>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/reference/kv-commands/","name":"Wrangler KV commands"}}]}
```
