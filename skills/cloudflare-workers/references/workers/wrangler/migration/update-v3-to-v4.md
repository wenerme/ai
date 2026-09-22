---
description: Upgrade Wrangler from v3 to v4, including breaking changes, updated Node.js requirements, and new defaults.
title: Migrate from Wrangler v3 to v4
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from Wrangler v3 to v4

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Wrangler v4 is a major release focused on updates to underlying systems and dependencies, along with improvements to keep Wrangler commands consistent and clear. Unlike previous major versions of Wrangler, which were [foundational rewrites ↗](https://blog.cloudflare.com/wrangler-v2-beta/) and [rearchitectures ↗](https://blog.cloudflare.com/wrangler3/) — Version 4 of Wrangler includes a much smaller set of changes. If you use Wrangler today, your workflow is very unlikely to change.

While many users should expect a no-op upgrade, the following sections outline the more significant changes and steps for migrating where necessary.

## Upgrade to Wrangler v4

To upgrade to the latest version of Wrangler v4 within your Worker project, run:

npmyarnpnpmbun

```
npm i -D wrangler@4
```

```
yarn add -D wrangler@4
```

```
pnpm add -D wrangler@4
```

```
bun add -d wrangler@4
```

After upgrading, you can verify the installation:

npmyarnpnpm

```
npx wrangler --version
```

```
yarn wrangler --version
```

```
pnpm wrangler --version
```

### Summary of changes

- **Updated Node.js support policy:** Node.js v16, which reached End-of-Life in 2022, is no longer supported in Wrangler v4. Wrangler now follows Node.js's [official support lifecycle ↗](https://nodejs.org/en/about/previous-releases).
- **Upgraded esbuild version**: Wrangler uses [esbuild ↗](https://esbuild.github.io/) to bundle Worker code before deploying it, and was previously pinned to esbuild v0.17.19. Wrangler v4 uses esbuild v0.24, which could impact dynamic wildcard imports. Going forward, Wrangler will be periodically updating the `esbuild` version included with Wrangler, and since `esbuild` is a pre-1.0.0 tool, this may sometimes include breaking changes to how bundling works. In particular, we may bump the `esbuild` version in a Wrangler minor version.
- **Commands default to local mode**: All commands that can run in either local or remote mode now default to local, requiring a `--remote` flag for API queries.
- **Deprecated commands and configurations removed:** Legacy commands, flags, and configurations are removed.

## Detailed Changes

### Updated Node.js support policy

Wrangler now supports only Node.js versions that align with [Node.js's official lifecycle ↗](https://nodejs.org/en/about/previous-releases):

- **Supported**: Current, Active LTS, Maintenance LTS
- **No longer supported:** Node.js v16 (EOL in 2022)

Wrangler tests no longer run on v16, and users still on this version may encounter unsupported behavior. Users still using Node.js v16 must upgrade to a supported version to continue receiving support and compatibility with Wrangler.

<details>

<summary>

Am I affected?

</summary>

Run the following command to check your Node.js version:

```sh
node --version
```

**You need to take action if** your version starts with <code>v16</code> or <code>v18</code> (for example, <code>v16.20.0</code> or <code>v18.20.0</code>).

**To upgrade Node.js**, refer to the <a href="https://developers.cloudflare.com/workers/wrangler/install-and-update/">Wrangler system requirements</a>. Cloudflare recommends using the latest LTS version of Node.js.

</details>

### Upgraded esbuild version

Wrangler v4 upgrades esbuild from **v0.17.19** to **v0.24**, bringing improvements (such as the ability to use the `using` keyword with RPC) and changes to bundling behavior:

- **Dynamic imports:** Wildcard imports (for example, `import('./data/' + kind + '.json')`) now automatically include all matching files in the bundle.

Users relying on wildcard dynamic imports may see unwanted files bundled. Prior to esbuild v0.19, `import` statements with dynamic paths (like `import('./data/' + kind + '.json')`) did not bundle all files matching the glob pattern (`*.json`). Only files explicitly referenced or included using `find_additional_modules` were bundled. With esbuild v0.19, wildcard imports now automatically bundle all files matching the glob pattern. This could result in unwanted files being bundled, so users might want to avoid wildcard dynamic imports and use explicit imports instead.

### Commands default to local mode

All commands now run in **local mode by default.** Wrangler has many commands for accessing resources like KV and R2, but the commands were previously inconsistent in whether they ran in a local or remote environment. For example, D1 defaulted to querying a local datastore, and required the `--remote` flag to query via the API. KV, on the other hand, previously defaulted to querying via the API (implicitly using the `--remote` flag) and required a `--local` flag to query a local datastore. In order to make the behavior consistent across Wrangler, each command now uses the `--local` flag by default, and requires an explicit `--remote` flag to query via the API.

For example:

- **Previous Behavior (Wrangler v3):** `wrangler kv key get` queried remotely by default.
- **New Behavior (Wrangler v4):** `wrangler kv key get` queries locally unless `--remote` is specified.

Those using `wrangler kv key` and/or `wrangler r2 object` commands to query or write to their data store will need to add the `--remote` flag in order to replicate previous behavior.

<details>

<summary>

Am I affected?

</summary>

Check if you use any of these commands in scripts, CI/CD pipelines, or manual workflows:

**KV commands:**

- <code>wrangler kv key get</code>
- <code>wrangler kv key put</code>
- <code>wrangler kv key delete</code>
- <code>wrangler kv key list</code>
- <code>wrangler kv bulk put</code>
- <code>wrangler kv bulk delete</code>

**R2 commands:**

- <code>wrangler r2 object get</code>
- <code>wrangler r2 object put</code>
- <code>wrangler r2 object delete</code>

**You need to take action if:**

- You run these commands expecting them to interact with your remote/production data.
- You have scripts or CI/CD pipelines that use these commands without the <code>--local</code> or <code>--remote</code> flag.

Search your codebase and CI/CD configs:

```sh
grep -rE "wrangler (kv|r2)" --include="*.sh" --include="*.yml" --include="*.yaml" --include="Makefile" --include="package.json" .
```

**What to do:**

Add <code>--remote</code> to commands that should interact with your Cloudflare account:

```sh
# Before (Wrangler v3 - queried remote by default)
wrangler kv key get --binding MY_KV "my-key"

# After (Wrangler v4 - must specify --remote)
wrangler kv key get --binding MY_KV "my-key" --remote
```

</details>

### Deprecated commands and configurations removed

All previously deprecated features in [Wrangler v2](https://developers.cloudflare.com/workers/wrangler/deprecations/#wrangler-v2) and in [Wrangler v3](https://developers.cloudflare.com/workers/wrangler/deprecations/#wrangler-v3) are now removed. Additionally, the following features that were deprecated during the Wrangler v3 release are also now removed:

- Legacy Assets (using `wrangler dev/deploy --legacy-assets` or the `legacy_assets` config file property). Instead, we recommend you [migrate to Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
- Legacy Node.js compatibility (using `wrangler dev/deploy --node-compat` or the `node_compat` config file property). Instead, use the [`nodejs_compat` compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/). This includes the functionality from legacy `node_compat` polyfills and natively implemented Node.js APIs.
- `wrangler version`. Instead, use `wrangler --version` to check the current version of Wrangler.
- `getBindingsProxy()` (via `import { getBindingsProxy } from "wrangler"`). Instead, use the [`getPlatformProxy()` API](https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy), which takes exactly the same arguments.
- `usage_model`. This no longer has any effect, after the [rollout of Workers Standard Pricing ↗](https://blog.cloudflare.com/workers-pricing-scale-to-zero/).

<details>

<summary>

Am I affected?

</summary>

**Check your Wrangler configuration file** (<code>wrangler.toml</code>, <code>wrangler.json</code>, or <code>wrangler.jsonc</code>) for deprecated settings:

```sh
# For TOML files
grep -E "(legacy_assets|node_compat|usage_model)\s*=" wrangler.toml

# For JSON files
grep -E "\"(legacy_assets|node_compat|usage_model)\"" wrangler.json wrangler.jsonc
```

**Check your commands and scripts** for deprecated flags:

```sh
grep -rE "wrangler.*(--legacy-assets|--node-compat)" --include="*.sh" --include="*.yml" --include="*.yaml" --include="Makefile" --include="package.json" .
```

**Check for deprecated API usage** in your code:

```sh
grep -rE "getBindingsProxy" --include="*.js" --include="*.ts" --include="*.mjs" .
```

**You need to take action if you find any of the following:**

| Deprecated | Replacement |
| --- | --- |
| <code>legacy_assets</code> config or <code>--legacy-assets</code> flag | <a href="https://developers.cloudflare.com/workers/static-assets/">Migrate to Workers Static Assets</a> |
| <code>node_compat</code> config or <code>--node-compat</code> flag | Use the <a href="https://developers.cloudflare.com/workers/runtime-apis/nodejs/"><code>nodejs_compat</code> compatibility flag</a> |
| <code>usage_model</code> config | Remove it (no longer has any effect) |
| <code>wrangler version</code> command | Use <code>wrangler --version</code> |
| <code>getBindingsProxy()</code> import | Use <a href="https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy"><code>getPlatformProxy()</code></a> (same arguments) |
| <code>wrangler publish</code> command | Use <code>wrangler deploy</code> |
| <code>wrangler generate</code> command | Use <code>npm create cloudflare@latest</code> |
| <code>wrangler pages publish</code> command | Use <code>wrangler pages deploy</code> |

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/#page","headline":"Migrate from Wrangler v3 to v4","description":"Upgrade Wrangler from v3 to v4, including breaking changes, updated Node.js requirements, and new defaults.","url":"https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
