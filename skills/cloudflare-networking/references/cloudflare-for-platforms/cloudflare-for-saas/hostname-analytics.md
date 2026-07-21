---
description: View per-hostname analytics for traffic, bots, cache, and security events.
title: Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

#  Analytics

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can use custom hostname analytics for two general purposes: exploring how your customers use your product and sharing the benefits provided by Cloudflare with your customers.

These analytics include **Site Analytics**, **Bot Analytics**, **Cache Analytics**, **Security Events**, and [any other datasets](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/) with the `clientRequestHTTPHost` field.

Note

The plan of your Cloudflare for SaaS application determines the analytics available for your custom hostnames.

## Explore customer usage

Use custom hostname analytics to help your organization with billing and infrastructure decisions, answering questions like:

* "How many total requests is your service getting?"
* "Is one customer transferring significantly more data than the others?"
* "How many global customers do you have and where are they distributed?"

If you see one customer is using more data than another, you might increase their bill. If requests are increasing in a certain geographic region, you might want to increase the origin servers in that region.

To access custom hostname analytics, either [use the dashboard](https://developers.cloudflare.com/analytics/faq/about-analytics/) and filter by the `Host` field or [use the GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/) and filter by the `clientRequestHTTPHost` field. For more details, refer to our tutorial on [Querying HTTP events by hostname with GraphQL](https://developers.cloudflare.com/analytics/graphql-api/tutorials/end-customer-analytics/).

## Share Cloudflare data with your customers

With custom hostname analytics, you can also share site information with your customers, including data about:

* How many pageviews their site is receiving.
* Whether their site has a large percentage of bot traffic.
* How fast their site is.

Build custom dashboards to share this information by specifying an individual custom hostname in `clientRequestHTTPHost` field of [any dataset](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/) that includes this field.

## Logpush

[Logpush](https://developers.cloudflare.com/logs/logpush/) sends metadata from Cloudflare products to your cloud storage destination or SIEM.

Using [filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/), you can send set sample rates (or not include logs altogether) based on filter criteria. This flexibility allows you to maintain selective logs for custom hostnames without massively increasing your log volume.

Filtering is available for [all Cloudflare datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/).

Note

Filtering is not supported on the following data types: `objects`, `array[object]`.

For the Firewall events dataset, the following fields are not supported: `Action`, `Description`, `Kind`, `MatchIndex`, `Metadata`, `OriginatorRayID`, `RuleID`, and `Source`.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/#page","headline":"Analytics · Cloudflare for Platforms docs","description":"View per-hostname analytics for traffic, bots, cache, and security events.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics","GraphQL"]}
```
