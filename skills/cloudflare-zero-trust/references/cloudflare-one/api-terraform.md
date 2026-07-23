---
description: How API and Terraform works in Cloudflare One.
title: API and Terraform
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# API and Terraform

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/api-terraform/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can manage your Cloudflare Zero Trust configuration using the API or Terraform. For more information, refer to the following links:

* [API reference](https://developers.cloudflare.com/api/)
* [Terraform provider reference ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs)
* [Terraform how-to documentation](https://developers.cloudflare.com/terraform/)

Detailed API and Terraform examples for Cloudflare Zero Trust are available in our [implementation guides](https://developers.cloudflare.com/cloudflare-one/implementation-guides/) and throughout the Cloudflare Zero Trust documentation.

## Set dashboard to read-only

Super Administrators can lock all settings as read-only in the Cloudflare One dashboard. Read-only mode ensures that all updates for the account are made through the API or Terraform.

To enable read-only mode:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Settings** \> **Admin controls**.
2. Enable **Set dashboard to read-only**.

All users, regardless of [user permissions](https://developers.cloudflare.com/cloudflare-one/roles-permissions/), will be prevented from making configuration changes through the UI.

## Scoped API tokens

The administrators managing policies and groups in Cloudflare Zero Trust might be different from those responsible for configuring WAF custom rules or other Cloudflare settings. You can configure scoped API tokens so that team members and automated systems can manage Cloudflare Zero Trust settings without having permission to modify other configurations in Cloudflare.

You can create a scoped API token [via the dashboard](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) or [via the API](https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/). For a list of available token permissions, refer to [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/api-terraform/#page","headline":"API and Terraform · Cloudflare One docs","description":"How API and Terraform works in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/api-terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform","REST API"]}
```
