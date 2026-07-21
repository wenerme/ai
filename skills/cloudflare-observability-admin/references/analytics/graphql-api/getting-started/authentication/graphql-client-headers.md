---
description: Learn about configure graphql client endpoint and http headers in Cloudflare analytics.
title: Configure GraphQL client endpoint and HTTP headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Configure GraphQL client endpoint and HTTP headers

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

1. Launch [GraphiQL ↗](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/).
2. Select **Edit HTTP Headers**. ![Clicking Edit HTTP Headers](https://developers.cloudflare.com/_astro/GraphiQL-edit-http-headers.Cc0SaBrH_17rcJm.webp)The **Edit HTTP Headers** window appears. ![Editing HTTP Headers Window](https://developers.cloudflare.com/_astro/GraphiQL-edit-http-headers-window.D6rNIUCL_Z1C89jf.webp)
3. Select **Add Header** to configure authentication. You can use Cloudflare Analytics API token authentication (recommended) or Cloudflare API key authentication.

  * **Token authentication**:
  Enter **Authorization** in the **Header Name** field, and enter `Bearer {your-analytics-token}` in the **Header value** field, then select **Save**.
  ![Editing HTTP Headers](https://developers.cloudflare.com/_astro/GraphiQL-edit-http-headers-token.BRr3JTFE_2tTM7L.webp)
  * **Key authentication**:
  Enter `X-AUTH-EMAIL` in the **Header name** field and your email address registered with Cloudflare in the **Header value** field, and select **Save**.
  Select **Add Header** to add a second header. Enter `X-AUTH-KEY` in the **Header Name** field, and paste your Global API Key in the **Header value** field, then select **Save**.
4. Select anywhere outside the **Edit HTTP Headers** window in GraphiQL to close it and return to the main GraphiQL display.
5. Enter `https://api.cloudflare.com/client/v4/graphql` in the **GraphQL Endpoint** field. ![Editing GraphQL Endpoint](https://developers.cloudflare.com/_astro/GraphiQL-response-pane.jm8FGlXL_1dPBsE.webp)

Note

The right-side response pane is empty when you enter your information correctly. An error displays when there are problems with your header credentials.

Now that you have configured authentication, you are ready to run queries using GraphiQL.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/#page","headline":"Configure GraphQL client endpoint and HTTP headers · Cloudflare Analytics docs","description":"Learn about configure graphql client endpoint and http headers in Cloudflare analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
