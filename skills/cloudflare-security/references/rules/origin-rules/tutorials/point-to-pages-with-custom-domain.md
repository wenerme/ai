---
description: This tutorial will instruct you how to configure an origin rule and a DNS record to point to a Pages deployment with a custom domain.
title: Point to Pages with a custom domain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Point to Pages with a custom domain

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/origin-rules/tutorials/point-to-pages-with-custom-domain/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial will instruct you how to configure an origin rule and a DNS record to point to a Pages deployment with a custom domain.

The procedure will use the following example values:

| URL that website visitors will access | mycustomerexample.com/blog/\* |
| ------------------------------------- | ----------------------------- |
| Zone domain                           | mycustomerexample.com         |
| Cloudflare Pages subdomain            | myblog.pages.dev              |
| Cloudflare Pages custom domain        | blogmirror.example.com        |

When configuring your Pages custom domain, use a custom domain that you do not plan to use in production (`blogmirror.example.com` in this example).

## 1\. Configure custom domain in your Pages project

To add the custom domain to your Pages deployment:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.
[Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Custom domains**.
4. Select **Set up a custom domain**.
5. Enter `blogmirror.example.com` and select **Continue**.

When you add the custom domain to your Pages deployment, Cloudflare automatically creates a `CNAME` DNS record for the custom domain.

## 2\. Create origin rule to rewrite host header and override DNS record

In your `mycustomerexample.com` zone, create an origin rule with the following configuration:

**If incoming requests match**

| Field    | Operator | Value    |
| -------- | -------- | -------- |
| URI Path | wildcard | /blog/\* |

If using the Expression Editor, enter the following expression:

```txt
(http.request.uri.path wildcard "/blog/*")
```

**Set origin parameters**

* Value after **Host header** \> **Rewrite to**: `blogmirror.example.com`
* Value after **DNS record** \> **Override to**: `blogmirror.example.com`

## 3\. (Optional) Configure URL rewrite

In this example, the URL that website visitors will access starts with `/blog`. However, the Pages deployment does not have this initial URL segment.

Use a URL rewrite to remove the `/blog` segment from the URL path.

1. Go to **Rules** \> **Overview**.
2. Select **Create rule** \> **URL Rewrite Rule**.
3. Enter a descriptive name for the rule in **Rule name**.
4. In **If incoming requests match**, select **Wildcard pattern**.
5. Enter the following value in **Request URL**:
```txt
https://<YOUR_HOSTNAME>/blog/*
```
In the current example, the value would be `https://mycustomerexample.com/blog/*`.
6. In **Then rewrite the path and/or query**, enter the following values under **Path**:

| Target path   | Rewrite to |
| ------------- | ---------- |
| \[/\] blog/\* | \[/\] ${1} |
7. Select **Deploy**.

Note

Cloudflare provides a rule template in the dashboard called **Rewrite Path for Object Storage Bucket** that you can use and adapt to configure the URL rewrite rule.

## More resources

* [Tutorial: Change URI Path and Host Header](https://developers.cloudflare.com/rules/origin-rules/tutorials/change-uri-path-and-host-header/)
* [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
* [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/origin-rules/tutorials/point-to-pages-with-custom-domain/#page","headline":"Point to Pages with a custom domain · Cloudflare Rules docs","description":"This tutorial will instruct you how to configure an origin rule and a DNS record to point to a Pages deployment with a custom domain.","url":"https://developers.cloudflare.com/rules/origin-rules/tutorials/point-to-pages-with-custom-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
