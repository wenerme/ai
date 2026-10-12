---
description: Restrict where Cloudflare Queues stores and processes messages by setting a jurisdiction.
title: Data location
image: https://developers.cloudflare.com/queues/configuration/data-location/og.png?v=cd5a7d27e28a9f6a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Data location

Last updated Oct 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/queues/configuration/data-location/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

By default, Queues stores and processes messages across Cloudflare's global network. You can restrict a queue to a jurisdiction to meet data residency requirements, such as the [General Data Protection Regulation (GDPR) ↗︎](https://gdpr-info.eu/) or [FedRAMP ↗︎](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers can produce to and consume from a restricted queue from any location. The jurisdiction only restricts where Queues stores and processes messages.

## Supported jurisdictions

| Parameter | Location |
| --- | --- |
| `eu` | European Union |
| `us` | United States |
| `fedramp` | FedRAMP-Moderate data centers |

## Create a queue with a jurisdiction

### Use the dashboard

1. In the Cloudflare dashboard, go to **Queues**. [Go to **Queues** ↗](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select **Create queue**.
3. Enter a queue name and select a jurisdiction.
4. Select **Create queue**.

### Use the cf CLI

With the [Cloudflare CLI](https://developers.cloudflare.com/cf/) (`cf`) installed and authenticated, use the `--jurisdiction` flag to create a restricted queue:

```bash
cf queues create --queue-name my-eu-queue --jurisdiction eu
```

### Use the REST API

Set the `jurisdiction` parameter when you create a queue with the [Create Queue](https://developers.cloudflare.com/api/resources/queues/methods/create/) endpoint:

```bash
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "queue_name": "my-eu-queue",
    "jurisdiction": "eu"
  }'
```

You can only set a jurisdiction when you create a queue. You cannot add, change, or remove the jurisdiction later.

The dashboard displays a queue's jurisdiction on the Queues overview and settings pages.

## Dead Letter Queues

A [Dead Letter Queue (DLQ)](https://developers.cloudflare.com/queues/configuration/dead-letter-queues/) must use the same jurisdiction as its source queue. If you specify a queue name that does not exist as the DLQ, Cloudflare automatically creates that queue in the same jurisdiction as the source queue.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/configuration/data-location/#page","headline":"Data location","description":"Restrict where Cloudflare Queues stores and processes messages by setting a jurisdiction.","url":"https://developers.cloudflare.com/queues/configuration/data-location/","inLanguage":"en","image":"https://developers.cloudflare.com/queues/configuration/data-location/og.png?v=cd5a7d27e28a9f6a","dateModified":"2026-10-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
