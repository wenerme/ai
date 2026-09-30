---
description: Reference the environment variables that control Cloudflare CLI authentication, targeting, output, and telemetry.
title: Environment variables
image: https://developers.cloudflare.com/cf/environment-variables/og.png?v=c831fa19535da6e6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Environment variables

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/environment-variables/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Set these variables in the environment that runs `cf`. They configure the CLI, not the environment variables or secrets available to a deployed Worker. If a variable is unset, `cf` uses the behavior in the Default column.

## Supported variables

The following variables control `cf` behavior:

| Variable | Default | Effect |
| --- | --- | --- |
| `CF_FORCE_OSC_PROGRESS` | Unset; only recognized terminals show progress outside the terminal buffer. | Set to `1` to enable terminal progress in an unrecognized compatible terminal. Requires a terminal on standard error. |
| `CF_NO_OSC_PROGRESS` | Unset; supported terminals show progress. | Set to `1` to turn off progress in the terminal tab title or taskbar. |
| `CF_QUIET` | Unset; interactive progress is shown. | Set to `1` to suppress animated API progress and terminal progress. It does not suppress command results. |
| `CF_SEND_TELEMETRY` | Unset; a saved preference or the default applies. | Set to `true` or `1` to enable anonymous CLI usage telemetry, or `false` or `0` to disable it. Takes precedence over `WRANGLER_SEND_METRICS`, but not `DO_NOT_TRACK`. |
| `CI` | Unset; `cf` also detects CI providers and the absence of a terminal. | Set to `true` in CI to avoid interactive prompts. Prompts use defaults or fail when an answer is required. |
| `CLOUDFLARE_ACCESS_CLIENT_ID` | Unset; no Access service-token client ID is supplied. | Identifies the service token used to connect to Access-protected Workers. Set it with `CLOUDFLARE_ACCESS_CLIENT_SECRET`. |
| `CLOUDFLARE_ACCESS_CLIENT_SECRET` | Unset; no Access service-token secret is supplied. | Supplies the secret for the Access service token. Set it with `CLOUDFLARE_ACCESS_CLIENT_ID`. |
| `CLOUDFLARE_ACCOUNT_ID` | Unset; `cf` uses project configuration, a saved selection, or an accessible account. | Selects the account for account-scoped commands. Overrides `accountId` in `cloudflare.config.ts`. |
| `CLOUDFLARE_API_BASE_URL` | The Cloudflare API endpoint for the selected compliance region. | Overrides the API endpoint. Only point it at an endpoint you trust because API requests carry credentials. |
| `CLOUDFLARE_API_TOKEN` | Unset; `cf` uses the selected OAuth profile. | Authenticates API commands with this token instead of a saved profile. Use it for CI and other automation. |
| `CLOUDFLARE_COMPLIANCE_REGION` | `public`, unless set in `cloudflare.config.ts`. | Selects the API compliance region and overrides the project configuration. Accepts `public`, `fedramp_high`, or `fedramp-high`. |
| `CLOUDFLARE_REGISTRY_PATH` | The `registry` directory in the `cf` configuration directory. | Sets the local development registry path shared with Wrangler and Miniflare processes started by `cf`. |
| `CLOUDFLARE_ZONE_ID` | Unset; zone-scoped commands need a zone. | Supplies a default zone ID or domain name. The `--zone` or `-z` option takes precedence. |
| `DEBUG` | Unset; normal diagnostics are shown. | Set to a nonempty value to show additional diagnostics, including error stack traces and delegated command details. |
| `DO_NOT_TRACK` | Unset; telemetry follows the other settings. | Set to `1` to disable CLI telemetry, even if `CF_SEND_TELEMETRY` enables it. |
| `FORCE_COLOR` | Unset; color is used when standard output is a terminal. | Set to a value other than `0` to enable styled output without a terminal. `NO_COLOR` takes precedence. |
| `NO_COLOR` | Unset; color is used when standard output is a terminal. | Set to any value to disable styled output and animated API progress. |
| `TUNNEL_MANAGEMENT_TOKEN` | Unset; `cf tunnels tail` requests a token for the specified tunnel ID. | Supplies an existing management token to `cf tunnels tail`. Do not pass a tunnel ID when this is set. |
| `WRANGLER_SEND_METRICS` | Unset; `cf` uses its saved telemetry preference or enables telemetry. | Sets CLI telemetry when `CF_SEND_TELEMETRY` is not set. Accepts `true`, `false`, `1`, or `0`. |

`cf` loads only selected authentication and context variables from a project `.env` file. Other variables in this table must be set in the process environment. For the supported file variables, precedence, and security guidance, refer to [Load credentials from a .env file](https://developers.cloudflare.com/cf/get-started/#load-credentials-from-a-env-file).

For more on API tokens and account selection, refer to [Install and sign in](https://developers.cloudflare.com/cf/get-started/). For telemetry settings in CI, refer to [Use cf in CI](https://developers.cloudflare.com/cf/ci/#turn-off-telemetry).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/environment-variables/#page","headline":"Environment variables","description":"Reference the environment variables that control Cloudflare CLI authentication, targeting, output, and telemetry.","url":"https://developers.cloudflare.com/cf/environment-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/environment-variables/og.png?v=c831fa19535da6e6","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
