---
title: Changelog
description: There are no scheduled entries at this time.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/ssl.xml) 

There are no scheduled entries at this time.

## 2024-10-18

**New cloudflare\_branding flag allows hostnames with over 64 characters for all CAs**

To order certificates for hostnames longer than 64 characters, customers can now use the `cloudflare_branding` flag when ordering a certificate via [API ↗](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/create/). Setting `cloudflare_branding` to `true` will cause `sni.cloudflaressl.com` to be used as the common name, while the long hostname is added as part of the subject alternative name (SAN).

## 2024-09-19

**SSL.com available with ACM and SSL for SaaS**

SSL.com is one of the [certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) that Cloudflare partners with. SSL.com is now available as an option to customers with Advanced Certificate Manager (ACM) or SSL for SaaS. Consider our [reference documentation](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#sslcom) for details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/changelog/","name":"Changelog"}}]}
```
