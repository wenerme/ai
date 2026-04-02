---
title: Primary setup (Full)
description: Cloudflare DNS offers a few different setup options. A primary setup (also known as full) is the most common and the only one available for Free or Pro plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/zone-setups/full-setup/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Primary setup (Full)

Cloudflare DNS offers a few different [setup options](https://developers.cloudflare.com/dns/zone-setups/). A primary setup (also known as full) is the most common and the only one available for Free or Pro plans.

In a primary setup, Cloudflare is your primary authoritative DNS provider, which means that, when a visitor tries to access your website or application, DNS resolvers will consider the [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/) that you have on Cloudflare.

For this to work, you must go through a few steps that involve not only Cloudflare, but also your registrar and your previous DNS provider (if you were using one). Refer to [Set up a primary zone](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) for detailed instructions.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/full-setup/","name":"Primary setup (Full)"}}]}
```
