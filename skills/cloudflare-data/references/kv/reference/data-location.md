---
description: Learn how the location of data stored in Workers KV is determined, including how you can restrict a namespace to a specific jurisdiction.
title: Data location
image: https://developers.cloudflare.com/kv/reference/data-location/og.png?v=596d77ff0adae1cc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# Data location

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/kv/reference/data-location/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn how the location of data stored in Workers KV is determined, including how you can restrict a namespace to a specific jurisdiction.

## Standard (default)

By default, data written to a Workers KV namespace is stored in KV's central data stores with no jurisdictional restriction, and then cached globally across Cloudflare's network, allowing your data to be read with low latency from anywhere in the world. Refer to [How KV works](https://developers.cloudflare.com/kv/concepts/how-kv-works/) for more information.

## Restrict a namespace to a jurisdiction

Jurisdictions are used to create Workers KV namespaces that only durably store data within a region, to help comply with data locality regulations such as the [GDPR ↗︎](https://gdpr-info.eu/) or [FedRAMP ↗︎](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers may still access a namespace constrained to a jurisdiction from anywhere in the world, and KV data can be cached outside the jurisdiction location on Cloudflare's network. The jurisdiction constraint only controls where the namespace's data is durably stored. Consider using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

Note

Jurisdictions can only be set when a namespace is created and cannot be added or changed afterwards.

### Supported jurisdictions

| Parameter | Data Storage Location |
| --- | --- |
| eu | European Union |
| fedramp | FedRAMP-compliant data centers |
| us | United States of America |

### Use Wrangler

To create a namespace restricted to a jurisdiction, pass the `--jurisdiction` flag to [`wrangler kv namespace create`](https://developers.cloudflare.com/kv/reference/kv-commands/#kv-namespace-create):

```sh
npx wrangler@latest kv namespace create <NAMESPACE_NAME> --jurisdiction=eu
```

### Use REST API

To create a namespace restricted to a jurisdiction, include the `jurisdiction` field in the request body when you [create a namespace](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/create/):

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Workers KV Storage Write</code>

</details>

*Create a namespacebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"title": "<NAMESPACE_NAME>",
		"jurisdiction": "eu"
	}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/reference/data-location/#page","headline":"Data location","description":"Learn how the location of data stored in Workers KV is determined, including how you can restrict a namespace to a specific jurisdiction.","url":"https://developers.cloudflare.com/kv/reference/data-location/","inLanguage":"en","image":"https://developers.cloudflare.com/kv/reference/data-location/og.png?v=596d77ff0adae1cc","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
