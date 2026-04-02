---
title: Partner Domains TLS
description: To add additional TLS requirements for emails coming from certain domains, you can enforce higher levels of SSL/TLS inspection. If TLS is required, mail without TLS from the specified domain will be dropped.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/domains-and-routing/partner-domains-tls.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Partner Domains TLS

To add additional TLS requirements for emails coming from certain domains, you can enforce higher levels of SSL/TLS inspection. If TLS is required, mail without TLS from the specified domain will be dropped.

## Add a domain

To require that email from a specific domain passes SSL/TLS inspection:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Domains & Routing** \> **Partner Domains TLS**.
4. Select **New Partner Domain**.
5. Enter a **Domain** and any **Notes**.
6. Select **Save**.

## Exempt TLS inspection

If you decide to exempt a domain from TLS inspection - by toggling **Require TLS Inbound** to **Off** \- this will not turn off enforcement against legacy standards like SSLv1, SSLv2, and TLSv1, which is generally considered insecure.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/domains-and-routing/","name":"Domains and routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/domains-and-routing/partner-domains-tls/","name":"Partner Domains TLS"}}]}
```
