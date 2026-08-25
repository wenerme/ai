---
description: Understand how tenants, accounts, users, and zones relate in the Cloudflare Tenant model.
title: Tenant structure
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tenant/llms.txt
> Use this file to discover all available pages before exploring further.

# Tenant structure

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tenant/structure/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare helps Channel and Alliance partners manage their and their customers' accounts through a Tenant structure.

![Partner accounts contain a tenant, which is a container for customer accounts and zones. For more details, keep reading.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=5582,height=3855,format=webp/_astro/tenant-diagram.D0Hfc9bM.png)

## Tenants and Tenant admins

A **Tenant** is a special type of Cloudflare account that contains other accounts and resources.

Once you sign a partner agreement with Cloudflare, we create a special Tenant account and then add your user to that account as a **Tenant admin**. Cloudflare can add multiple users as Tenant admins upon request.

Tenant admins then become the default [**Super administrator(s)**](https://developers.cloudflare.com/fundamentals/manage-members/roles/) for all accounts and zones contained within the Tenant.

This means that each Tenant admin's user API key can be used to provision accounts based on the catalog specified in your partner agreement.

If needed, you can also [create additional **Super administrators**](https://developers.cloudflare.com/fundamentals/manage-members/manage/).

## Accounts, users, and resources

This Tenant structure gives your account streamlined administrative access to customer:

* Accounts[1](#user-content-fn-1)
* Users[2](#user-content-fn-2)
* Resources[3](#user-content-fn-3)

At the same time, this structure keeps your customers' data and settings separate from each other.

## Footnotes

1. An entity that contains various settings, users, and resources (zones, Zero Trust applications, Workers).
[↩](#user-content-fnref-1)
2. A member of a Cloudflare account with their own user profile and [an associated role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) that specifies their privileges within that account.
[↩](#user-content-fnref-2)
3. A resource is an entity owned by an account, which could be a zone/domain, a Workers instance, or a Zero Trust application.
[↩](#user-content-fnref-3)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tenant/structure/#page","headline":"Tenant structure · Cloudflare Tenant docs","description":"Understand how tenants, accounts, users, and zones relate in the Cloudflare Tenant model.","url":"https://developers.cloudflare.com/tenant/structure/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
