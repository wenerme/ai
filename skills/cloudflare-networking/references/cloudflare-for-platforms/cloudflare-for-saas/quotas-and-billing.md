---
description: Understand custom hostname quotas, monitor usage with the API, and determine which hostnames count toward billing.
title: Quotas and billing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Quotas and billing

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/quotas-and-billing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare for SaaS plans include a number of custom hostnames. Additional hostnames are billed according to your plan. For included hostnames, maximum hostnames, and current usage pricing, refer to [Plans](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/).

## Quota behavior

Custom hostname quotas apply at either the zone or account level. A zone-level quota includes hostnames in one zone. An account-level quota includes hostnames across every zone in the account.

The assigned quota is a soft limit. When usage reaches this limit, you can continue creating custom hostnames. The [Create Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/) response then includes a billing warning.

Non-Enterprise plans also have an API enforcement threshold. After usage reaches this threshold, the API rejects requests to create custom hostnames. Enterprise plans can continue to create custom hostnames after reaching this threshold.

The quota API returns current usage, the soft quota, and the enforcement threshold for the applicable scope.

## Check quota usage

Send a `GET` request to the custom hostname quota endpoint:

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/quota" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

The response contains these quota fields:

| Field     | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| allocated | The operational soft quota for the zone or account.                                             |
| used      | The custom hostnames counted toward the allocation.                                             |
| exceeded  | Whether usage has reached or exceeded the allocation.                                           |
| hard\_cap | The API enforcement threshold for non-Enterprise plans. Enterprise plans can exceed this value. |

Use `used` and `allocated` to monitor operational capacity. The `exceeded` field becomes `true` when `used` is greater than or equal to `allocated`.

## Billable hostnames

Each custom hostname counts toward usage until you delete it. This includes hostnames that are pending validation or activation. Deleting an unused custom hostname removes it from the usage count.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/quotas-and-billing/#page","headline":"Quotas and billing · Cloudflare for Platforms docs","description":"Understand custom hostname quotas, monitor usage with the API, and determine which hostnames count toward billing.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/quotas-and-billing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
