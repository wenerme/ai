---
description: Resource Tagging lets you attach key-value pairs to a wide range of Cloudflare resource types — including zones, custom hostnames, Cloudflare Tunnels, Workers, D1 databases, R2 buckets, KV namespaces, and more. Tags are stored separately from the resources themselves, enabling cross-resource queries and policy enforcement without modifying underlying resource configurations.
title: Resource Tagging
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/resource-tagging/llms.txt
> Use this file to discover all available pages before exploring further.

# Resource Tagging

Last updated Apr 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/resource-tagging/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Attach custom key-value metadata to Cloudflare resources for organization, access control, and billing attribution.

Available on all plans

Resource Tagging lets you attach key-value pairs to a wide range of [Cloudflare resource types](https://developers.cloudflare.com/resource-tagging/reference/resource-types/) — including zones, custom hostnames, Cloudflare Tunnels, Workers, D1 databases, R2 buckets, KV namespaces, and more. Tags are stored separately from the resources themselves, enabling cross-resource queries and policy enforcement without modifying underlying resource configurations.

Public beta

Resource Tagging is in public beta. The API is stable, but behavior may change as we iterate based on feedback.

## How it works

Tags are simple key-value string pairs stored as a JSON object:

```json
{
  "environment": "production",
  "team": "platform",
  "region": "us-west-1"
}
```

You manage tags through the Tagging API using `GET`, `PUT`, and `DELETE` operations. The API supports [filtering resources by tags](https://developers.cloudflare.com/resource-tagging/how-to/filter-resources/) with AND/OR logic, negation, and key-only matching.

Authentication uses [Account Owned Tokens (AOTs)](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/), which are account-level tokens independent of individual users.

## Limitations

* The dashboard is in beta. You can view and manage tags in the dashboard under **Manage Account** \> **Resource Tagging**, but the API remains the recommended interface for automation workflows.
* `PUT` replaces all tags. There is no `PATCH` endpoint. The `PUT` operation replaces all tags on a resource. Use the [GET, merge, PUT workflow](https://developers.cloudflare.com/resource-tagging/how-to/manage-tags/#add-a-single-tag) to modify individual tags.
* `DELETE` removes all tags. There is no way to delete a single tag. Use `PUT` with the remaining tags instead.
* Querying tags for a resource that has never been tagged returns a `500` error instead of `404`. This is a known beta limitation.

## Get started

Follow the [Get started guide](https://developers.cloudflare.com/resource-tagging/get-started/) to set up authentication and make your first API calls.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/resource-tagging/#page","headline":"Overview · Cloudflare Resource Tagging docs","description":"Resource Tagging lets you attach key-value pairs to a wide range of Cloudflare resource types — including zones, custom hostnames, Cloudflare Tunnels, Workers, D1 databases, R2 buckets, KV namespaces, and more. Tags are stored separately from the resources themselves, enabling cross-resource queries and policy enforcement without modifying underlying resource configurations.","url":"https://developers.cloudflare.com/resource-tagging/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
