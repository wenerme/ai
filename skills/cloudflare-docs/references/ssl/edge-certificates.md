---
title: Edge certificates
description: Edge certificates are the SSL/TLS certificates that Cloudflare presents to your visitors. Consider how different certificate types align to common use cases.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Edge certificates

Consider the information below for guidance on how to choose different edge certificates for common use cases, or refer to the other pages in this section for more options.

If you are not familiar with what SSL/TLS certificates are, refer to [Concepts](https://developers.cloudflare.com/ssl/concepts/).

Note

Occasionally, the Cloudflare dashboard displays a wildcard certificate with only the apex hostname listed (and does not include the wildcard symbol `*`).

This behavior occurs when all of the following conditions are true:

* The zone is on a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).
* The certificate has a subject or SAN that is a wildcard for the zone's parent domain.

## Use cases

### Simplify issuance and renewal

Issuing and renewing certificates can take up a lot of time from your technical teams. Leverage Cloudflare [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) or [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) to simplify this process.

Advanced certificates offer more customization than Universal SSL.

With [custom certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/), you have full control in terms of certificate authority (CA) or certificate [validation level](https://developers.cloudflare.com/ssl/concepts/#validation-level), but you need to handle issuance and renewal on your own.

### Meet cipher suites requirements

The different algorithms used in SSL/TLS encryption can vary in terms of how secure they are.

Through [cipher suites customization](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) you can control which ciphers are used for your domain and/or specific hostnames, making it possible to achieve balance between highly available marketing websites (`www.example.com`) that even legacy devices can access and highly secure services or applications (`shop.example.com`) that require [standards compliance](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/).

Cipher suites customization applies to any edge certificate used in connections to a given hostname. However, to enable [custom cipher suites and other features](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/#advanced-certificate-manager), you must [purchase the Advanced Certificate Manager add-on ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/acm/).

If you already have Advanced Certificate Manager, use the API to set up custom cipher suites. Refer to [Customize cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) for more guidance.

### Automate domain control validation (DCV)

If you want to use Cloudflare but manage DNS externally ([partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)), you may need to perform [domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) to prove that you have control over your domain before your SSL/TLS certificate can be issued.

To make this process easier and automate DCV at certificate renewal, use [advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) and set up [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}}]}
```
