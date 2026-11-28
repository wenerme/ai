---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Instantly revert your Cloudflare Pages project to a previous production deployment.
title: Rollbacks
image: https://developers.cloudflare.com/pages/configuration/rollbacks/og.png?v=d09d6797fb38d071
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Rollbacks

Rollbacks allow you to instantly revert your project to a previous production deployment. For rollbacks and gradual deployments on Cloudflare Workers, refer to [Workers Rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/).

Any production deployment that has been successfully built, and has not been deleted, is a valid rollback target. Deployments older than 30 days are deleted, except your 100 most recent and your current production deployment, and you cannot roll back to a deleted deployment. For more information, refer to [Deployments limits](https://developers.cloudflare.com/pages/platform/limits/#deployments). When your project has rolled back to a previous deployment, you may still roll back to deployments that are newer than your current version. Note that preview deployments are not valid rollback targets.

To perform a rollback:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project and go to **Deployments**.
3. Browse the **All deployments** list, select the three-dot actions menu for the desired target, and select **Rollback to this deployment**.
4. Confirm in the dialog window to update your production deployment.

![Deployments for your Pages project that can be used for rollbacks](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2144,height=662,format=webp/_astro/rollbacks.DNHeRPOm.png)

## Related resources

- [Preview Deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)
- [Workers Rollbacks](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/rollbacks/#page","headline":"Rollbacks","description":"Instantly revert your Cloudflare Pages project to a previous production deployment.","url":"https://developers.cloudflare.com/pages/configuration/rollbacks/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/rollbacks/og.png?v=d09d6797fb38d071","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
