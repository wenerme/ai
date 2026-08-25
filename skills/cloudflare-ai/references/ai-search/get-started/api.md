---
description: Create AI Search instances programmatically using the REST API.
title: REST API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# REST API

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-search/get-started/api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide walks you through creating an AI Search instance using the REST API.

## 1\. Create an API token

You need an API token with **AI Search:Edit** and **AI Search:Run** permissions.

1. In the Cloudflare dashboard, go to **My Profile** \> **API Tokens**.
[Go to **API Tokens** ↗](https://dash.cloudflare.com/profile/api-tokens)
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Enter a **Token name**, for example `AI Search Manager`.
5. Under **Permissions**, add two permissions:

  * **Account** \> **AI Search:Edit**
  * **Account** \> **AI Search:Run**
6. Select **Continue to summary**, then select **Create Token**.
7. Copy and save the token value. This is your `API_TOKEN`.

## 2\. Create an AI Search instance

Use the [Create instance API](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/create/) to create an instance. Replace `<ACCOUNT_ID>` with your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance"
  }'
```

### Connect a data source (optional)

You can create an instance that is connected to a website or R2 bucket as a data source. AI Search indexes the content automatically.

**Website:**

Automatically crawl and index a [website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) that you own.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance",
    "type": "web-crawler",
    "source": "example.com"
  }'
```

**R2 bucket:**

Index documents stored in an [R2 bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/). Connecting an R2 bucket requires a [service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/). If you have never created an R2-backed instance before, you need to pass the `token_id` field in the create request. Refer to the [service API token configuration](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) for setup instructions.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{
    "id": "my-instance",
    "type": "r2",
    "source": "<R2_BUCKET_NAME>",
    "token_id": "<SERVICE_TOKEN_ID>"
  }'
```

## 3\. Add content

If you did not create an instance that is connected to a data source, upload files using the [Items API](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/upload/). You can skip this step if you connected a website or R2 bucket.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/my-instance/items" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -F "file=@/path/to/your/file.pdf"
```

AI Search indexes uploaded files automatically.

## 4\. Check indexing status

Check if your content has finished indexing.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/my-instance/stats" \
  -H "Authorization: Bearer <API_TOKEN>"
```

## Try it out

Once indexing is complete, run your first query.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/my-instance/search" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "content": "How do I get started?",
        "role": "user"
      }
    ]
  }'
```

You can also test queries in the dashboard by going to your instance and selecting the **Playground** tab.

## Add to your application

### [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/)

Query AI Search directly from your Workers code.

### [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/)

Query AI Search using HTTP requests.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/get-started/api/#page","headline":"REST API · Cloudflare AI Search docs","description":"Create AI Search instances programmatically using the REST API.","url":"https://developers.cloudflare.com/ai-search/get-started/api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
