---
description: Verify your AI crawler identity for Pay Per Crawl.
title: Verify your AI crawler
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify your AI crawler

Last updated Jul 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

graph LR
A[Set up your<br>Cloudflare Account] --> B[Verify your<br>AI crawler]:::highlight
B --> C[Discover<br>payable content]
C --> D[Connect to<br>Stripe]
D --> E[Crawl pages]
classDef highlight fill:#F6821F,color:white

Once you have connected your Stripe account, set up your AI crawler as a [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

## Content access restriction

When an AI crawler tries to access content protected by pay per crawl, it receives a HTTP status code 402\. This indicates payment is required. The HTTP header of the response includes the cost of the content.

For example, the response header may look like below:

```plaintext
HTTP/2 402
date: Fri, 06 Jun 2025 08:42:38 GMT
content-type: text/plain; charset=utf-8
crawler-price: USD 0.01
server: cloudflare
```

To access this content, you must verify your AI crawler.

## 1\. Follow Web Bot Auth protocol

Ensure your AI crawler identifies itself with the required headers for Web Bot Auth.

Follow the steps found in [Web Both Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/).

## 2\. Follow verified bot policy

Ensure your AI crawler follows Cloudflare's [verified bots policy](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

## 3\. Submit verification request

Submit a form to add your AI crawler to Cloudflare's list of verified bots.

1. In the Cloudflare dashboard, go to **Manage Account** \> **Settings**.
[Go to **Configurations** ↗](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to the **Bot Submission Form** tab.
3. Fill out the form with the following required information:

  * **Select bot type**: Choose either **Verified Bot** or **Signed Agent**.
  * **Verification Method**: Select **Request Signature**.
  * **User-Agents header values**: Provide the User-Agent string(s) your bot uses.
  * **User-Agents Match Pattern**: Provide substring patterns that match your User-Agent (for example, `GoogleBot | GoogleScraper`).
4. Select **Submit**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/#page","headline":"Verify your AI crawler · Cloudflare AI Crawl Control docs","description":"Verify your AI crawler identity for Pay Per Crawl.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
