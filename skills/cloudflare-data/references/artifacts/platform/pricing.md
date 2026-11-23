---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Review Artifacts pricing information.
title: Pricing
image: https://developers.cloudflare.com/artifacts/platform/pricing/og.png?v=d91474ce3a62ac8e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Artifacts is currently only available on the Workers Paid plan.

Note

Cloudflare will begin billing for Artifacts operations and storage on November 19, 2026.

Artifacts pricing is billed on two dimensions:

- **Operations**: the number of repo operations, such as `create`, `push`, and `pull`.
- **Storage**: the total amount of stored data, measured in gigabyte-months ( `GB-mo`).

## Artifacts pricing

| Unit | Workers Free | Workers Paid |
| --- | --- | --- |
| Operations (1,000 operations)<sup>1</sup> | Unavailable | First 10,000 per month + $0.15 per additional 1,000 operations |
| Storage (GB-mo) | Unavailable | First 1 GB per month + $0.50 per additional GB-mo |

<sup>1</sup> Pulls (including Git clones and fetches), pushes, creates, forks, and deletes each count as 1 operation. Reads of repo content, such as files, trees, commits, and logs, are billed at a 100:1 ratio, and token operations, such as creating or revoking a repo token, at a 5:1 ratio. For example, 100 reads or 5 token operations count as 1 operation for billing purposes. These ratios do not affect Artifacts metrics and analytics, which reflect actual usage.

## Storage usage

Storage is billed using gigabyte-month (`GB-mo`) as the billing metric, identical to [Durable Objects SQL storage](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend). A `GB-mo` is calculated by averaging peak storage per day over a 30-day billing period.

- Storage is calculated across all repositories.
- Replicas do not add storage charges. Storage is replicated by default, and you do not need to manage repository availability or uptime.
- Repos remain stored until you explicitly delete them.

## Repository pricing (coming soon)

In addition to operations and storage, Artifacts will bill for the number of repositories an account stores. Repository charges are not part of the November 19, 2026 billing start. Cloudflare will notify you before repository charges begin.

| Unit | Workers Free | Workers Paid |
| --- | --- | --- |
| Repositories | Unavailable | First 100,000 per month + $0.01 per additional repository |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/platform/pricing/#page","headline":"Pricing","description":"Review Artifacts pricing information.","url":"https://developers.cloudflare.com/artifacts/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/artifacts/platform/pricing/og.png?v=d91474ce3a62ac8e","dateModified":"2026-11-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
