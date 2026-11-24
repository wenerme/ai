---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Manage Workers KV namespaces, keys, and bulk operations using the Cloudflare CLI (cf) or Wrangler.
title: KV CLI commands
image: https://developers.cloudflare.com/kv/reference/kv-commands/og.png?v=df5b102eac86ef4e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# KV CLI commands

Note

In `cf`, `cf kv` commands act on your remote Cloudflare KV namespaces by default and identify namespaces by `--namespace-id` (there is no `--binding` shortcut). Pass `--local` on key and metadata commands to target local development state instead. Refer to the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/) to get started.

## `kv namespaces`

Manage Workers KV namespaces.

### `kv namespaces create`

Creates a Workers KV namespace in the specified account with the given title. Returns `400` if the account already owns a namespace with that title; an existing namespace must be explicitly deleted before it can be replaced. An optional jurisdiction restricts where data is durably stored and can only be set at creation time.

```sh
cf kv namespaces create [options]
```

- `--jurisdiction` `"eu" | "fedramp" | "us"` Specify the jurisdiction to restrict the KV namespace to durably store data within. Can only be set at namespace creation time.
- `--namespace-mode` `"instant"` The mode of the Workers KV namespace. Specify `instant` when creating a namespace to create a KV Instant namespace. Omit this field when creating a namespace to create a classic namespace. Currently, `instant` is the only supported explicit value.
- `--title` `string` required

  Human-readable string name for a Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--body` `string` Raw JSON request body (bypasses individual flags)

To restrict where a namespace durably stores data, specify `--jurisdiction` when creating it. Refer to [Data location](https://developers.cloudflare.com/kv/reference/data-location/) for supported jurisdictions.

#### KV Instant namespaces

Note

Workers KV Instant is currently in private beta. To enroll, contact your Cloudflare account team or [sign up ↗︎](https://www.cloudflare.com/resource/workers-kv-instant-beta/) and tell us about your use case.

To create a Workers KV Instant namespace with `cf`, pass `--namespace-mode instant`. This example creates a namespace named `APP_CONFIG` for small, infrequently updated configuration:

```sh
cf kv namespaces create --title APP_CONFIG --namespace-mode instant
```

### `kv namespaces list`

Lists Workers KV namespaces owned by the specified account. Use `page` and `per_page` to select a page of results, and `order` and `direction` to control sorting.

```sh
cf kv namespaces list [options]
```

- `--page` `number` Page number of paginated results.
- `--per-page` `number` Maximum number of results per page.
- `--order` `"id" | "title"` Namespace field to sort by ( `id` or `title`).
- `--direction` `"asc" | "desc"` Sort namespaces in ascending ( `asc`) or descending ( `desc`) order.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing

### `kv namespaces get`

Returns the Workers KV namespace for the specified account and namespace ID.

```sh
cf kv namespaces get <namespace-id>
```

- `<NAMESPACE-ID>` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing

### `kv namespaces update`

Changes the title of the specified Workers KV namespace and returns the updated namespace. The namespace ID and stored key-value pairs are unchanged.

```sh
cf kv namespaces update <namespace-id> [options]
```

- `<NAMESPACE-ID>` `string` required

  ID of the Workers KV namespace.
- `--title` `string` required

  Human-readable string name for a Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--body` `string` Raw JSON request body (bypasses individual flags)

### `kv namespaces delete`

Deletes the specified Workers KV namespace and its stored key-value pairs from the account.

```sh
cf kv namespaces delete <namespace-id>
```

- `<NAMESPACE-ID>` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--force` `boolean` default: false

  Skip confirmation (useful in scripts and CI)

## `kv keys`

Manage single and bulk key-value pairs within a Workers KV namespace. Pass `--local` to target local development state, or pass `@<FILE_PATH>` to `--body` to read a JSON file for bulk operations.

### `kv keys put`

Writes a value under the specified key in the Workers KV namespace, creating the key-value pair or replacing its existing value, expiration, and metadata. Send the value as an `application/octet-stream` request body, or use `multipart/form-data` with a `value` part and an optional JSON `metadata` part. Use URL-encoding for special characters (for example, `:`, `!`, `%`) in the key name when constructing the request URL. If neither `expiration` nor `expiration_ttl` is specified, the key-value pair will not expire. If both are set, `expiration_ttl` takes precedence.

```sh
cf kv keys put <key-name> [options]
```

- `<KEY-NAME>` `string` required

  A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.
- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--expiration` `number` Expires the key at a certain time, measured in number of seconds since the UNIX epoch.
- `--expiration-ttl` `number` Number of seconds until the key expires. Must be at least 60. Takes precedence over `expiration` when both are specified.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--body` `string` Raw JSON request body (bypasses individual flags)
- `--file` `string` Path to a file to upload as the request body
- `--metadata` `string` Associates arbitrary JSON data with a key/value pair.

### `kv keys list`

Lists key names in the specified Workers KV namespace, with expiration times and metadata when present. Use `prefix` to filter names and `cursor` to request the next page. Values are not included.

```sh
cf kv keys list [options]
```

- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--limit` `number` Maximum number of keys to return in one response. Pass `result_info.cursor` from the response as `cursor` to request the next page.
- `--prefix` `string` Filters returned keys by a name prefix. Exact matches and any key names that begin with the prefix will be returned.
- `--cursor` `string` Opaque pagination token from `result_info.cursor` in the previous response. Pass it unchanged to request the next page of keys.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing

### `kv keys get`

Returns the value stored under the specified key in the Workers KV namespace as raw bytes. Use URL-encoding for special characters (for example, `:`, `!`, `%`) in the key name when constructing the request URL. If the key-value pair expires, the `expiration` response header contains its expiration time in seconds since the UNIX epoch.

```sh
cf kv keys get <key-name> [options]
```

- `<KEY-NAME>` `string` required

  A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.
- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--text` `boolean` default: false

  Decode the response body as UTF-8 text instead of writing raw bytes

### `kv keys delete`

Deletes the specified key and its value from the Workers KV namespace. Use URL-encoding for special characters (for example, `:`, `!`, `%`) in the key name when constructing the request URL.

```sh
cf kv keys delete <key-name> [options]
```

- `<KEY-NAME>` `string` required

  A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.
- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--force` `boolean` default: false

  Skip confirmation (useful in scripts and CI)

### `kv keys bulk-get`

Retrieves the text-based values of up to 100 keys from the specified Workers KV namespace. The result maps each requested key to its value. Set `type` to `json` to parse JSON values instead of returning strings, and set `withMetadata` to `true` to include metadata with each value. Binary values are not supported by this operation.

```sh
cf kv keys bulk-get [options]
```

- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--keys` `string` required

  Array of keys to retrieve (maximum of 100).
- `--type` `"text" | "json"` default: text

  Return values as strings with `text`, or parse stored JSON values with `json`.
- `--with-metadata` `boolean` default: false

  Whether to include metadata in the response.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--body` `string` Raw JSON request body (bypasses individual flags)

### `kv keys bulk-put`

Writes up to 10,000 key-value pairs to the specified Workers KV namespace from a JSON array, with optional metadata and expiration settings for each pair. Existing values and expirations are overwritten. If neither `expiration` nor `expiration_ttl` is specified, the key-value pair will not expire. If both are set, `expiration_ttl` takes precedence. The entire request must be 100 megabytes or less. The result reports the number of successful writes and any keys that failed and should be retried.

```sh
cf kv keys bulk-put [options]
```

- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--body` `string` Raw JSON request body (bypasses individual flags)

### `kv keys bulk-delete`

Deletes up to 10,000 key-value pairs from the specified Workers KV namespace. Send a JSON array of the key names to delete. The result reports the number of successful deletions and any keys that failed and should be retried.

```sh
cf kv keys bulk-delete [options]
```

- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing
- `--force` `boolean` default: false

  Skip confirmation (useful in scripts and CI)
- `--body` `string` Raw JSON request body (bypasses individual flags)

## `kv metadata`

Read key metadata without fetching the key's value.

### `kv metadata get`

Returns the JSON metadata associated with the specified key in the Workers KV namespace, without retrieving its value. Use URL-encoding for special characters (for example, `:`, `!`, `%`) in the key name when constructing the request URL.

```sh
cf kv metadata get <key-name> [options]
```

- `<KEY-NAME>` `string` required

  A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.
- `--namespace-id` `string` required

  ID of the Workers KV namespace.
- `--dry-run` `boolean` default: false

  Validate and show what would happen without executing

## `kv namespace`

Manage Workers KV namespaces.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. For more information, refer to the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Caution

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. For more information on the `kv:...` syntax deprecation, refer to [KV CLI commands](https://developers.cloudflare.com/kv/reference/kv-commands/#deprecations).

### `kv namespace create`

Create a new namespace

npmyarnpnpm

```
npx wrangler kv namespace create <NAMESPACE>
```

```
yarn wrangler kv namespace create <NAMESPACE>
```

```
pnpm wrangler kv namespace create <NAMESPACE>
```

- `<NAMESPACE>` `string` required

  The name of the new namespace
- `--preview` `boolean` Interact with a preview namespace
- `--jurisdiction` `string` The jurisdiction where the new namespace will be created (e.g. "us", "eu", "fedramp")
- `--experimental-mode` `string` alias: --x-mode

  The storage mode for the new namespace. Instant mode offers lower-latency reads and faster global updates \[private beta]. Cannot be combined with --jurisdiction.
- `--use-remote` `boolean` Use a remote binding when adding the newly created resource to your config
- `--update-config` `boolean` Automatically update your config file with the newly added resource
- `--binding` `string` The binding name of this resource in your Worker

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

To restrict where a namespace durably stores data, specify `--jurisdiction` when creating it. Refer to [Data location](https://developers.cloudflare.com/kv/reference/data-location/) for supported jurisdictions.

#### KV Instant namespaces

Note

Workers KV Instant is currently in private beta. To enroll, contact your Cloudflare account team or [sign up ↗︎](https://www.cloudflare.com/resource/workers-kv-instant-beta/) and tell us about your use case.

To create a Workers KV Instant namespace, pass `--experimental-mode instant`. This example creates a namespace named `APP_CONFIG` for small, infrequently updated configuration:

npmyarnpnpm

```
npx wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

```
yarn wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

```
pnpm wrangler@latest kv namespace create APP_CONFIG --experimental-mode instant
```

You can also use the `--x-mode instant` alias.

### `kv namespace list`

Output a list of all KV namespaces associated with your account id

npmyarnpnpm

```
npx wrangler kv namespace list
```

```
yarn wrangler kv namespace list
```

```
pnpm wrangler kv namespace list
```

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv namespace delete`

Delete a given namespace.

npmyarnpnpm

```
npx wrangler kv namespace delete [NAMESPACE]
```

```
yarn wrangler kv namespace delete [NAMESPACE]
```

```
pnpm wrangler kv namespace delete [NAMESPACE]
```

- `[NAMESPACE]` `string` The name of the namespace to delete
- `--binding` `string` The binding name to the namespace to delete from
- `--namespace-id` `string` The id of the namespace to delete
- `--preview` `boolean` Interact with a preview namespace
- `--skip-confirmation` `boolean` alias: --ydefault: false

  Skip confirmation

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv namespace rename`

Rename a KV namespace

npmyarnpnpm

```
npx wrangler kv namespace rename [OLD-NAME] --new-name <NEW-NAME>
```

```
yarn wrangler kv namespace rename [OLD-NAME] --new-name <NEW-NAME>
```

```
pnpm wrangler kv namespace rename [OLD-NAME] --new-name <NEW-NAME>
```

- `[OLD-NAME]` `string` The current name of the namespace to rename
- `--namespace-id` `string` The id of the namespace to rename
- `--new-name` `string` required

  The new name for the namespace

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

## `kv key`

Manage key-value pairs within a Workers KV namespace.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. For more information, refer to the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Caution

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. For more information on the `kv:...` syntax deprecation, refer to [KV CLI commands](https://developers.cloudflare.com/kv/reference/kv-commands/#deprecations).

### `kv key put`

Write a single key/value pair to the given namespace

npmyarnpnpm

```
npx wrangler kv key put <KEY> [VALUE]
```

```
yarn wrangler kv key put <KEY> [VALUE]
```

```
pnpm wrangler kv key put <KEY> [VALUE]
```

- `<KEY>` `string` required

  The key to write to
- `[VALUE]` `string` The value to write
- `--path` `string` Read value from the file at a given path
- `--binding` `string` The binding name to the namespace to write to
- `--namespace-id` `string` The id of the namespace to write to
- `--preview` `boolean` Interact with a preview namespace
- `--ttl` `number` Time for which the entries should be visible
- `--expiration` `number` Time since the UNIX epoch after which the entry expires
- `--metadata` `string` Arbitrary JSON that is associated with a key
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv key list`

Output a list of all keys in a given namespace

npmyarnpnpm

```
npx wrangler kv key list
```

```
yarn wrangler kv key list
```

```
pnpm wrangler kv key list
```

- `--binding` `string` The binding name to the namespace to list
- `--namespace-id` `string` The id of the namespace to list
- `--preview` `boolean` default: false

  Interact with a preview namespace
- `--prefix` `string` A prefix to filter listed keys
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv key get`

Read a single value by key from the given namespace

npmyarnpnpm

```
npx wrangler kv key get <KEY>
```

```
yarn wrangler kv key get <KEY>
```

```
pnpm wrangler kv key get <KEY>
```

- `<KEY>` `string` required

  The key value to get.
- `--text` `boolean` default: false

  Decode the returned value as a utf8 string
- `--binding` `string` The binding name to the namespace to get from
- `--namespace-id` `string` The id of the namespace to get from
- `--preview` `boolean` default: false

  Interact with a preview namespace
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv key delete`

Remove a single key value pair from the given namespace

npmyarnpnpm

```
npx wrangler kv key delete <KEY>
```

```
yarn wrangler kv key delete <KEY>
```

```
pnpm wrangler kv key delete <KEY>
```

- `<KEY>` `string` required

  The key value to delete.
- `--binding` `string` The binding name to the namespace to delete from
- `--namespace-id` `string` The id of the namespace to delete from
- `--preview` `boolean` Interact with a preview namespace
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

## `kv bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

Note

The `kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network. For more information, refer to the [Workers KV guide](https://developers.cloudflare.com/kv/get-started/).

Caution

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. For more information on the `kv:...` syntax deprecation, refer to [KV CLI commands](https://developers.cloudflare.com/kv/reference/kv-commands/#deprecations).

### `kv bulk get`

Gets multiple key-value pairs from a namespace

npmyarnpnpm

```
npx wrangler kv bulk get <FILENAME>
```

```
yarn wrangler kv bulk get <FILENAME>
```

```
pnpm wrangler kv bulk get <FILENAME>
```

- `<FILENAME>` `string` required

  The file containing the keys to get
- `--binding` `string` The binding name to the namespace to get from
- `--namespace-id` `string` The id of the namespace to get from
- `--preview` `boolean` default: false

  Interact with a preview namespace
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv bulk put`

Upload multiple key-value pairs to a namespace

npmyarnpnpm

```
npx wrangler kv bulk put <FILENAME>
```

```
yarn wrangler kv bulk put <FILENAME>
```

```
pnpm wrangler kv bulk put <FILENAME>
```

- `<FILENAME>` `string` required

  The file containing the key/value pairs to write
- `--binding` `string` The binding name to the namespace to write to
- `--namespace-id` `string` The id of the namespace to write to
- `--preview` `boolean` Interact with a preview namespace
- `--ttl` `number` Time for which the entries should be visible
- `--expiration` `number` Time since the UNIX epoch after which the entry expires
- `--metadata` `string` Arbitrary JSON that is associated with a key
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

### `kv bulk delete`

Delete multiple key-value pairs from a namespace

npmyarnpnpm

```
npx wrangler kv bulk delete <FILENAME>
```

```
yarn wrangler kv bulk delete <FILENAME>
```

```
pnpm wrangler kv bulk delete <FILENAME>
```

- `<FILENAME>` `string` required

  The file containing the keys to delete
- `--force` `boolean` alias: --f

  Do not ask for confirmation before deleting
- `--binding` `string` The binding name to the namespace to delete from
- `--namespace-id` `string` The id of the namespace to delete from
- `--preview` `boolean` Interact with a preview namespace
- `--local` `boolean` Interact with local storage
- `--remote` `boolean` Interact with remote storage
- `--persist-to` `string` Directory for local persistence

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

## Deprecations

The following deprecations apply to Wrangler commands for Workers KV.

### `kv:...` syntax deprecation

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax.

The `kv:...` syntax is deprecated in versions 3.60.0 and beyond and will be removed in a future major version.

For example, commands using the `kv ...` syntax look as such:

```sh
wrangler kv namespace list
wrangler kv key get <KEY>
wrangler kv bulk put <FILENAME>
```

The same commands using the `kv:...` syntax look as such:

```sh
wrangler kv:namespace list
wrangler kv:key get <KEY>
wrangler kv:bulk put <FILENAME>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/reference/kv-commands/#page","headline":"KV CLI commands","description":"Manage Workers KV namespaces, keys, and bulk operations using the Cloudflare CLI (cf) or Wrangler.","url":"https://developers.cloudflare.com/kv/reference/kv-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/kv/reference/kv-commands/og.png?v=df5b102eac86ef4e","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
