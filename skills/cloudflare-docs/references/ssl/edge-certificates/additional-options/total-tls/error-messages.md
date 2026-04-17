---
title: Error messages
description: Error messages you may encounter with Total TLS.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/additional-options/total-tls/error-messages.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Error messages

To help avoid [ERR\_SSL\_VERSION\_OR\_CIPHER\_MISMATCH](https://developers.cloudflare.com/ssl/troubleshooting/version-cipher-mismatch/) errors, Cloudflare automatically shows an error message - `This hostname is not covered by a certificate` \- on proxied DNS records not covered by a TLS certificate.

## Pending domains

If you recently [added your domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare - meaning that your zone is in a [pending state](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) \- you can often ignore this warning.

Once most domains becomes **Active**, Cloudflare will automatically issue a Universal SSL certificate, which will provide SSL/TLS coverage and remove the warning message.

Note

Since there are a few nuances to certificate coverage and issuance timing, review [Enable Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/) to make sure your domain will receive SSL/TLS coverage automatically.

## Active domains

If your zone is already active on Cloudflare, this warning identifies subdomains that are not covered by your current SSL/TLS certificate.

By default, Cloudflare [Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) only cover your apex domain and one level of subdomain.

| Hostname                 | Covered by Universal certificate? |
| ------------------------ | --------------------------------- |
| example.com              | Yes                               |
| www.example.com          | Yes                               |
| docs.example.com         | Yes                               |
| dev.docs.example.com     | No                                |
| test.dev.api.example.com | No                                |

To prevent insecure connections on a multi-level subdomain, do one of the following:

* Enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/), which automatically issues individual certificates to your proxied hostnames not covered by a Universal certificate.
* Order an [Advanced Certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) covering the subdomain.
* Upload a [Custom Certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/) covering the subdomain.

If none of these solutions work, you could also remove the multi-level subdomain.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/total-tls/","name":"Total TLS"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/additional-options/total-tls/error-messages/","name":"Error messages"}}]}
```
