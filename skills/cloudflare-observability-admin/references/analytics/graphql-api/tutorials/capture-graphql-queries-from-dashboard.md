---
description: Capture dashboard GraphQL queries using Chrome DevTools.
title: Capture GraphQL queries with Chrome DevTools
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Capture GraphQL queries with Chrome DevTools

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Using [Chrome DevTools ↗](https://developer.chrome.com/docs/devtools), you can capture the queries running behind the Cloudflare Dashboard analytics. In this example, we will focus on the Network Analytics dataset, but the same process can be applied to any other analytics available in your dashboard.

1. In the Cloudflare dashboard, go to the **Network Analytics** page or any other analytics dashboard you are interested in seeing the GraphQL queries in.
[Go to **Network analytics** ↗](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics)
![Analytics tab](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2322,height=1090,format=webp/_astro/analytics-tab.sJIMwybT.png)
1. Open the [Chrome Developer Tools ↗](https://developer.chrome.com/docs/devtools) and select **Inspect**.
![Chrome developer tools](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1470,height=960,format=webp/_astro/chrome-developer-tools.D4a36rnA.png)
1. Select the **Network** tab in the Developer Tools panel.
2. In the filter bar, type `graphql` to filter out the GraphQL requests. If no requests appear, try reloading the page. As the page reloads, several network requests will populate the **Network** tab. Look for requests that contain `graphql` in the name.
![Type graphql in the search field](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1258,height=1032,format=webp/_astro/search-field.BxHnt1F0.png)
1. Select one of the GraphQL requests to open its details and go to the **Payload** tab. There you will find the GraphQL query. Select the query line and then **Copy value** to capture the query.
![Copy query value](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1110,height=740,format=webp/_astro/copy-value.BZMZMU5_.png)
1. If you want to capture a new query, adjust the filters in the **Network analytics** dashboard and a new query will appear in the GraphQL requests.
![Create a new query](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1538,height=866,format=webp/_astro/new-query.TN7tG2lX.png)

You can now use this query as the basis for your API call. Refer to the [Get started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/) section for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/#page","headline":"Capture GraphQL queries with Chrome DevTools · Cloudflare Analytics docs","description":"Capture dashboard GraphQL queries using Chrome DevTools.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
