---
description: Learn about configure graphql client endpoint and http headers in Cloudflare analytics.
title: Configure GraphQL client endpoint and HTTP headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure GraphQL client endpoint and HTTP headers

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

1. Launch [GraphiQL ↗](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/).
2. Select **Edit HTTP Headers**. ![Clicking Edit HTTP Headers](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1018,height=721,format=webp/_astro/GraphiQL-edit-http-headers.Cc0SaBrH.png)The **Edit HTTP Headers** window appears. ![Editing HTTP Headers Window](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=921,height=212,format=webp/_astro/GraphiQL-edit-http-headers-window.D6rNIUCL.png)
3. Select **Add Header** to configure authentication. You can use Cloudflare Analytics API token authentication (recommended) or Cloudflare API key authentication.

  * **Token authentication**:
  Enter **Authorization** in the **Header Name** field, and enter `Bearer {your-analytics-token}` in the **Header value** field, then select **Save**.
  ![Editing HTTP Headers](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=606,height=148,format=webp/_astro/GraphiQL-edit-http-headers-token.BRr3JTFE.png)
  * **Key authentication**:
  Enter `X-AUTH-EMAIL` in the **Header name** field and your email address registered with Cloudflare in the **Header value** field, and select **Save**.
  Select **Add Header** to add a second header. Enter `X-AUTH-KEY` in the **Header Name** field, and paste your Global API Key in the **Header value** field, then select **Save**.
4. Select anywhere outside the **Edit HTTP Headers** window in GraphiQL to close it and return to the main GraphiQL display.
5. Enter `https://api.cloudflare.com/client/v4/graphql` in the **GraphQL Endpoint** field. ![Editing GraphQL Endpoint](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1007,height=712,format=webp/_astro/GraphiQL-response-pane.jm8FGlXL.png)

Note

The right-side response pane is empty when you enter your information correctly. An error displays when there are problems with your header credentials.

Now that you have configured authentication, you are ready to run queries using GraphiQL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/#page","headline":"Configure GraphQL client endpoint and HTTP headers · Cloudflare Analytics docs","description":"Learn about configure graphql client endpoint and http headers in Cloudflare analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
