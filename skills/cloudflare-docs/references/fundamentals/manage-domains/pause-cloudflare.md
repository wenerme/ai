---
title: Pause Cloudflare
description: Temporarily pause Cloudflare on your domain to send traffic directly to your origin server for troubleshooting.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/manage-domains/pause-cloudflare.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Pause Cloudflare

To troubleshoot your site, you can pause Cloudflare globally. This will send traffic directly to your origin web server instead of Cloudflare's reverse proxy. Paused domains also cannot use Cloudflare services like [Rules](https://developers.cloudflare.com/rules/), [WAF](https://developers.cloudflare.com/waf/), and [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates/). Consider turning on [Development Mode](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/#enable-development-mode) to bypass caching while preserving protection.

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and domain.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Within **Overview**, choose **Advanced Actions** \> **Pause Cloudflare on Site**.

The process of pausing Cloudflare takes five minutes or less. This approach is preferable to [changing nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), which can cause propagation delays of several hours.

Note

Disabling a zone does not impact Spectrum applications.

---

## Alternatives to global pause

### Disable proxy on DNS records

Instead of pausing Cloudflare globally, you can disable the proxy on individual records:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **DNS** \> **Records**. Choose the record and select **Edit**.
3. Toggle **Proxy Status** to **Off**.

Adjusting the proxy status will prevent that record from using Cloudflare services like [Rules](https://developers.cloudflare.com/rules/), [WAF](https://developers.cloudflare.com/waf/), and [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates/).

### Enable Development Mode

To troubleshoot caching issues, you could [enable Development Mode](https://developers.cloudflare.com/cache/reference/development-mode/). This will bypass Cloudflare's cache while still preserving Cloudflare services like [Rules](https://developers.cloudflare.com/rules/), [WAF](https://developers.cloudflare.com/waf/), and [SSL/TLS certificates](https://developers.cloudflare.com/ssl/edge-certificates/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/pause-cloudflare/","name":"Pause Cloudflare"}}]}
```
