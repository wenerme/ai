---
title: General
description: Review frequently asked questions about Cloudflare Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ DNS ](https://developers.cloudflare.com/search/?tags=DNS) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/faq/general-faq.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# General

[❮ Back to FAQ](https://developers.cloudflare.com/cloudflare-one/faq/)

## What is the difference between Cloudflare Gateway and 1.1.1.1?

1.1.1.1 does not block any DNS query. When a browser requests for example.com, 1.1.1.1 simply looks up the answer either in cache or by performing a full recursive DNS query.

Cloudflare Gateway's DNS resolver introduces security into this flow. Instead of allowing all DNS queries, Gateway first checks the hostname being queried against the intelligence Cloudflare has about threats on the Internet. If that query matches a known threat, or is requesting a blocked domain configured by an administrator as part of a Gateway policy, Gateway stops it before the site could load for the user - and potentially execute code or phish that team member.

## Is multi-factor authentication supported?

Access supports two methods of enforcing MFA:

* **Independent MFA** — Access prompts users for a second factor directly, without relying on your identity provider. You can configure MFA requirements per organization, application, or policy. For more information, refer to [Enforce independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#independent-mfa).
* **Identity provider-based MFA** — Access respects the [MFA policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#identity-provider-based-mfa) set in your identity provider. For example, if your users are logging into an Access protected app through Okta, Okta would enforce an MFA check before sending the valid authentication confirmation back to Cloudflare Access.

## Which browsers are supported?

These browsers are supported:

* Internet Explorer 11
* Edge (current release, last release)
* Firefox (current release, last release)
* Chrome (current release, last release)
* Safari (current release, last release)

## What data localization services are supported?

Cloudflare Zero Trust can be used with the Data Localization Suite to ensure that traffic is only inspected in the regions you choose. For more information refer to [Use Zero Trust with Data Localization Suite](https://developers.cloudflare.com/data-localization/how-to/zero-trust/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/faq/general-faq/","name":"General"}}]}
```
