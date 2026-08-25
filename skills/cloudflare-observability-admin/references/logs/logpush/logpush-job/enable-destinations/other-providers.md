---
description: Learn about enable other providers in Cloudflare Logs.
title: Enable other providers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable other providers

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/other-providers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Logpush supports pushing logs to a limited set of services providers. However, you can configure Logpush via API.

## Manage via the Cloudflare dashboard

Refer to [Enable destinations](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/) for the list of services you can configure to use with Logpush through the Cloudflare dashboard. Interested in a different service? Take this [survey ↗](https://docs.google.com/forms/d/e/1FAIpQLScwOSabROywVajpMX2ZYCVl3saYs11cP4NIC8QR-wmOAnxOtA/viewform).

## Manage via API

The Cloudflare Logpush API allows you to configure and manage jobs via create, retrieve, update, and delete operations (CRUD).

With Logpush, you can create a job to upload logs of the metadata Cloudflare collects in batches as soon as possible to your cloud service provider. The default number of jobs that you can setup per dataset per domain is four, but you can setup more jobs depending on your plan and subscriptions.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).


To get started:

1. Set up a storage provider and grant Cloudflare access. Your storage provider may request your Cloudflare API credentials and other information including:

  * Email address
  * Cloudflare API key
  * Zone ID
  * Destination access details for your cloud service provider
2. Configure your Logpush job. For more information on how to configure a Logpush job, refer to [API configuration](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/other-providers/#page","headline":"Enable Logpush to other providers · Cloudflare Logs docs","description":"Learn about enable other providers in Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/other-providers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
