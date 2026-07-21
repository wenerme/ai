---
description: Instantly revert your Cloudflare Pages project to a previous production deployment.
title: Rollbacks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

#  Rollbacks

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/pages/configuration/rollbacks/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Rollbacks allow you to instantly revert your project to a previous production deployment.

Any production deployment that has been successfully built is a valid rollback target. When your project has rolled back to a previous deployment, you may still rollback to deployments that are newer than your current version. Note that preview deployments are not valid rollback targets.

In order to perform a rollback, go to **Deployments** in your Pages project. Browse the **All deployments** list and select the three dotted actions menu for the desired target. Select **Rollback to this deployment** for a confirmation window to appear. When confirmed, your project's production deployment will change instantly.

![Deployments for your Pages project that can be used for rollbacks](https://developers.cloudflare.com/_astro/rollbacks.DNHeRPOm_ZWbDar.webp)

## Related resources

* [Preview Deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
* [Branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/rollbacks/#page","headline":"Rollbacks · Cloudflare Pages docs","description":"Instantly revert your Cloudflare Pages project to a previous production deployment.","url":"https://developers.cloudflare.com/pages/configuration/rollbacks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
