---
description: Override HTTP Host headers sent to origin servers.
title: Override HTTP Host headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Override HTTP Host headers

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When your application needs specialized routing (`CNAME` setup or custom hosts like Heroku), you can customize the `Host` header used in health monitors on a per-endpoint or per-monitor level.

Important

If you set a header override on an individual endpoint, it will take precedence over a header override set on a monitor.

Also, if you configure an [Origin Rule](https://developers.cloudflare.com/rules/origin-rules/) that overrides the hostname and set up a header override in your Load Balancer configuration, the Load Balancer configuration will take precedence over the Origin Rule hostname override.

## Per endpoint Host header override

To balance traffic across multiple hosts, add `Host` headers to individual endpoints within the same pool.

For example, you might have a pool with endpoints hosted in multiple AppEngine projects or Amazon S3 buckets. You also might want to set up specific failover endpoints within a pool.

Since these examples require specific hostnames per endpoint, your load balancer will not properly route traffic _without_ a `Host` header override.

If you need an endpoint `Host` header override, add it when [creating](https://developers.cloudflare.com/load-balancing/pools/create-pool/) or editing a pool. For security reasons, this header must meet one of the following criteria:

* Is a subdomain of a zone associated with this account
* Matches the endpoint address
* Publicly resolves to the endpoint address

## Host header prioritization

If you set a header override on an individual endpoint, it will take precedence over a header override set on a monitor during health monitor requests.

For example, you might have a load balancer for `www.example.com` with the following setup:

* Pools:

  * Pool 1:

    * Endpoint 1 (`Host` header set to `lb-app-a.example.com`)
    * Endpoint 2
  * Pool 2:

    * Endpoint 3
    * Endpoint 4 (`Host` header set to `lb-app-b.example.com`)
* Monitor (`Host` header set to `www.example.com`)

In this scenario, health monitor requests for **Endpoint 1** would use `lb-app-a.example.com`, health monitor requests for **Endpoint 4** would use `lb-app-b.example.com`, and all other health monitor requests would default to `www.example.com`. For more information on updating your custom host configuration to be compatible with Cloudflare, see [Configure Cloudflare and Heroku over HTTPS](https://developers.cloudflare.com/support/third-party-software/others/configure-cloudflare-and-heroku-over-https/).

For a list of endpoints that override a monitor's `Host` header:

1. On a monitor, select **Edit**.
2. Select **Advanced health monitor settings**.
3. If you have endpoint overrides, you will see **Endpoint host header overrides**.
![Example configuration of endpoint host header overrides](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1906,height=360,format=webp/_astro/origin-host-header-override.CJNvqMtO.png)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/#page","headline":"Override HTTP Host headers · Cloudflare Load Balancing docs","description":"Override HTTP Host headers sent to origin servers.","url":"https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
