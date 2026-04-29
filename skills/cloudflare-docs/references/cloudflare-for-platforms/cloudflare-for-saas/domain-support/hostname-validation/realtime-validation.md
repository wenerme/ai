---
title: Real-time validation
description: Validate custom hostnames when customers add DNS routing records to their domain.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Real-time validation

When you use a real-time validation method, Cloudflare verifies your customer's hostname when your customers adds their [DNS routing record](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#3-have-customer-create-cname-record) to their authoritative DNS.

## Use when

Real-time validation methods put less burden on your customers because it does not require any additional actions.

However, it may cause some downtime since Cloudflare takes a few seconds to iterate over DNS records. This downtime also can increase - due to the increasing [validation backoff schedule](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/backoff-schedule/) \- if your customer takes additional time to add their DNS routing record.

To minimize this downtime, you can continually send no-change [PATCH requests](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) for the specific custom hostname until it validates (which resets the validation backoff schedule).

To avoid any chance of downtime, use a [pre-validation method](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/)

## How to

Real-time validation occurs automatically when your customer adds their [DNS routing record](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#3-have-customer-create-cname-record).

The exact record depends on your Cloudflare for SaaS setup.

### Normal setup (CNAME target)

Most customers will have a `CNAME` target, which requires their customers to create a `CNAME` record similar to:

```

mystore.com CNAME customers.saasprovider.com


```

### Apex proxying

With [apex proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/), SaaS customers need to create an `A` record for their hostname that points to the IP prefix allocated to the SaaS provider's account.

```

example.com.  60  IN  A   192.0.2.1


```

Note

For [BYOIP](https://developers.cloudflare.com/byoip/) customers, Cloudflare automatically enables the Apex Proxy Access feature on your BYOIP block, which allows Custom Hostnames to be activated via [Apex proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/#apex-proxying) when Authoritative DNS for a customer's hostname targets any IP addresses in your BYOIP block.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/","name":"Cloudflare for SaaS"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/","name":"Custom hostnames"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/","name":"Hostname validation"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/","name":"Real-time validation"}}]}
```
