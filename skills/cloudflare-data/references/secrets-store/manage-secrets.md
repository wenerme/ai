---
description: Learn about different operations to manage your secrets in Cloudflare Secrets Store.
title: Manage account secrets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage account secrets

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/secrets-store/manage-secrets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Secrets can be API tokens, public/private keys, authorization keys, passwords, or even code variables. The only limitation is that a secret must be a string that does not exceed 1024 bytes.

Once a secret is added to the Secrets Store, it can no longer be decrypted or accessed via API or on the dashboard. Only the service associated with a given secret will be able to access it.

## Limits

Customers who create a secrets store in the open beta can have up to 100 secrets per account. Also, there can only be one store per account.

Production secrets

If you use [Wrangler](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#manage-via-wrangler), there is a difference between production secrets and secrets that are only created locally (without the `--remote` flag). The limit of 100 secrets per account only considers production secrets.

## Resources

* [Manage via Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-secret)
* [Create a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#create-a-secret)
* [Duplicate a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#duplicate-a-secret)
* [Edit a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#edit-a-secret)
* [Delete a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#delete-a-secret)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/manage-secrets/#page","headline":"Manage account secrets · Cloudflare Secrets Store docs","description":"Learn about different operations to manage your secrets in Cloudflare Secrets Store.","url":"https://developers.cloudflare.com/secrets-store/manage-secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
