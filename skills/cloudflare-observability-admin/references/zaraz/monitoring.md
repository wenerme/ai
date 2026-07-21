---
description: Monitor Zaraz tool loading and event delivery.
title: Monitoring
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

#  Monitoring

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/zaraz/monitoring/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Zaraz Monitoring shows you different metrics regarding Zaraz. This helps you to detect issues when they occur. For example, if a third-party analytics provider stops collecting data, you can use the information presented by Zaraz Monitoring to find where in the workflow the problem occurred.

You can also check activity data in the **Activity last 24hr** section, when you access [tools](https://developers.cloudflare.com/zaraz/get-started/), [actions](https://developers.cloudflare.com/zaraz/custom-actions/) and [triggers](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) in the dashboard.

To use Zaraz Monitoring:

1. In the Cloudflare dashboard, go to the **Monitoring** page.
[ Go to **Monitoring** ↗ ](https://dash.cloudflare.com/?to=/:account/tag-management/monitoring)
2. Select one of the options (Loads, Events, Triggers, Actions). Zaraz Monitoring will show you how the traffic for that section evolved for the time period selected.

## Zaraz Monitoring options

* **Loads**: Counts how many times Zaraz was loaded on pages of your website. When [Single Page Application support](https://developers.cloudflare.com/zaraz/reference/settings/#single-page-application-support) is enabled, Loads will count every change of navigation as well.
* **Events**: Counts how many times a specific event was tracked by Zaraz. It includes the [Pageview event](https://developers.cloudflare.com/zaraz/get-started/), [Track events](https://developers.cloudflare.com/zaraz/web-api/track/), and [E-commerce events](https://developers.cloudflare.com/zaraz/web-api/ecommerce/).
* **Triggers**: Counts how many times a specific trigger was activated. It includes the built-in [Pageview trigger](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) and any other trigger you set in Zaraz.
* **Actions**: Counts how many times a [specific action](https://developers.cloudflare.com/zaraz/custom-actions/) was activated. It includes the pre-configured Pageview action, and any other actions you set in Zaraz.
* **Server-side requests**: tracks the status codes returned from server-side requests that Zaraz makes to your third-party tools.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/monitoring/#page","headline":"Monitoring · Cloudflare Zaraz docs","description":"Monitor Zaraz tool loading and event delivery.","url":"https://developers.cloudflare.com/zaraz/monitoring/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
