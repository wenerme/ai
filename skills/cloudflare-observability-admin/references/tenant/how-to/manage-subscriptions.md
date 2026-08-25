---
description: Add and manage zone and account-level subscriptions for tenant-managed Cloudflare accounts.
title: Manage subscriptions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tenant/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage subscriptions

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Once your customer has a zone provisioned, you can add zone and account-level subscriptions.

## Zone subscriptions

### Create zone subscription

To create a zone subscription, typically used to upgrade a zone's plan from `PARTNERS_FREE` to a paid [Zone plan](https://developers.cloudflare.com/tenant/reference/subscriptions/#zone-plans), send a [POST](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/create/) request to the `/zones/{zone_id}/subscription` endpoint and include the following values:

* `rate_plan` object

  * Contains the zone plan corresponding to what customers would order in the dashboard. For a list of available values, refer to [Zone subscriptions](https://developers.cloudflare.com/tenant/reference/subscriptions/#zone-plans).
* `component_values` array

  * Additional services depending on your reseller agreement, such as additional `page_rules`.
* `frequency` string

  * How often the subscription is renewed automatically (defaults to `"monthly"`).

```bash
curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/subscription' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rate_plan": {
    "id": "<RATE_PLAN>"
  },
  "frequency": "annual"
}'
```

```bash
curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/subscription' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rate_plan": {
    "id": "PARTNERS_BIZ"
  },
  "component_values": [
    {
      "name": "page_rules",
      "value": 50
    }
  ]
}
```

### Get zone subscription details

To get the details of a zone subscription, send a [GET](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/get/) request to the `/zones/<ZONE_ID>/subscription` endpoint.

### Update zone subscription

To update a subscription on a zone, typically used to update an existing subscription's 'component\_values' or to downgrade a zone's subscription, send a [PUT](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update/) request to the `/zones/<ZONE_ID>/subscription` endpoint.

---

## Account subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account-level subscriptions.

### Create account subscription

To create an account subscription, send a [POST](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/create/) request to the `/accounts/{account_id}/subscriptions` endpoint and include the following values:

* `rate_plan` object

  * Contains the account subscription corresponding to a specific add-on service. For a list of available values, refer to [Available subscriptions](https://developers.cloudflare.com/tenant/reference/subscriptions/).
* `component_values` array

  * Additional services depending on your reseller agreement, such as additional endpoints for load balancing or additional seats for Cloudflare Zero Trust. If not included, the subscription includes the default values associated with each purchase.
* `frequency` string

  * How often the subscription is renewed automatically (defaults to `"monthly"`).

```bash
curl 'https://api.cloudflare.com/client/v4/accounts/{account_id}/subscriptions' \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rate_plan": {
    "id": "<RATE_PLAN_NAME>"
  }
}'
```

### Get account subscription details

To get all subscriptions for an account, send a [GET](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get/) request to the `/accounts/<ACCOUNT_ID>/subscriptions` endpoint.

### Update account subscription

To update a subscription on an account, send a [PUT](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/update/) request to the `/accounts/<ACCOUNT_ID>/subscriptions/<SUBSCRIPTION_ID>` endpoint.

### Delete account subscription

To delete a subscription on an account, send a [DELETE](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/delete/) request to the `/accounts/<ACCOUNT_ID>/subscriptions/<SUBSCRIPTION_ID>` endpoint.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/#page","headline":"Manage subscriptions · Cloudflare Tenant docs","description":"Add and manage zone and account-level subscriptions for tenant-managed Cloudflare accounts.","url":"https://developers.cloudflare.com/tenant/how-to/manage-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
