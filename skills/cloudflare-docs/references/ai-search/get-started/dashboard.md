---
title: Dashboard
description: Create and configure AI Search using the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-search/get-started/dashboard.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Dashboard

This guide walks you through creating an AI Search instance using the Cloudflare dashboard.

## Prerequisites

AI Search integrates with R2 for storing your data. You must have an active R2 subscription before creating your first AI Search instance.

[ Go to **R2 Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview) 

## Create an AI Search instance

[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search) 
1. In the Cloudflare Dashboard, go to **Compute & AI** \> **AI Search**.
2. Select **Create**.
3. Choose how you want to connect your [data source](https://developers.cloudflare.com/ai-search/configuration/data-source/).
4. Configure [chunking](https://developers.cloudflare.com/ai-search/configuration/chunking/) and [embedding](https://developers.cloudflare.com/ai-search/configuration/models/) settings for how your content is processed.
5. Configure [retrieval settings](https://developers.cloudflare.com/ai-search/configuration/retrieval-configuration/) for how search results are returned.
6. Name your AI Search instance.
7. Create a [service API token](https://developers.cloudflare.com/ai-search/configuration/service-api-token/).
8. Select **Create**.

## Try it out

Once indexing is complete, you can run your first query. You can check indexing status on the **Overview** tab of your instance.

1. Go to **Compute & AI** \> **AI Search**.
2. Select your instance.
3. Select the **Playground** tab.
4. Select **Search with AI** or **Search**.
5. Enter a query to test the response.

## Add to your application

There are multiple ways you can connect AI Search to your application:

[ Workers Binding ](https://developers.cloudflare.com/ai-search/usage/workers-binding/) Query AI Search directly from your Workers code. 

[ REST API ](https://developers.cloudflare.com/ai-search/usage/rest-api/) Query AI Search using HTTP requests. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/get-started/dashboard/","name":"Dashboard"}}]}
```
