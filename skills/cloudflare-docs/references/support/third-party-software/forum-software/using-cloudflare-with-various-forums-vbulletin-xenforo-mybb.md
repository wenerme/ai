---
title: Using Cloudflare with various forums
description: Many widely used forum platforms are compatible with Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

Copy page

# Using Cloudflare with various forums

## Overview

Many widely used forum platforms are compatible with Cloudflare.

These include:

* [Discourse ↗](https://community.cloudflare.com/t/using-discourse-with-cloudflare-best-practices/602890)
* vBulletin
* Xenforo
* MyBB

If you have a forum using these platforms, you can increase its speed and safety by adding Cloudflare.

---

## Steps

**1**. Cloudflare acts as a reverse proxy, meaning that all visitor IP addresses will become Cloudflare-affiliated IP addresses. If you are using services like **Stopforumspan** or blocking registration by IP address, you need to [restore original visitor IPs](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/).

**2**. To prevent admin functions from being affected by caching or performance features, create a [Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache) to bypass cache on the admin section of your site.

**3**. If you want certain services to access your website (APIs or certain IPs), [configure the WAF](https://developers.cloudflare.com/waf/).

**4**. Review your DNS records to make sure all your subdomain records are present. If you cannot find a subdomain, [add the DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/forum-software/","name":"Forum Software"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/forum-software/using-cloudflare-with-various-forums-vbulletin-xenforo-mybb/","name":"Using Cloudflare with various forums"}}]}
```
