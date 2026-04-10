---
title: Cloudflare Waiting Room
description: Cloudflare Waiting Room allows you to route excess users of your website to a customized waiting room, helping preserve customer experience and protect origin servers from being overwhelmed with requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waiting-room/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Waiting Room

A virtual waiting room to manage peak traffic.

 Business and above 

Cloudflare Waiting Room allows you to route excess users of your website to a customized waiting room, helping preserve customer experience and protect origin servers from being overwhelmed with requests.

---

## Benefits

Waiting Room protects your origin server by preventing surges in legitimate traffic that may overload your origin.

Waiting Room also benefits your visitors by:

* Keeping your application online and preventing them from reaching error pages.
* Showing estimated wait times that are continuously updated.
* Opening up new spots more quickly by tracking dynamic inflow and [outflow](https://developers.cloudflare.com/waiting-room/reference/configuration-settings/#session-duration).
* Remembering each visitor's status to prevent someone from losing their place in line or having to re-queue if they leave your site.
* Appearing in your own [branding and style](https://developers.cloudflare.com/waiting-room/how-to/customize-waiting-room/), which enhances trust and lets you provide additional information as needed.

---

## Features

###  Scheduled Event 

Customize the behavior of a waiting room for a specific period of time.

[ Use Scheduled Event ](https://developers.cloudflare.com/waiting-room/additional-options/create-events/) 

###  Waiting Room Rules 

Create rules to indicate specific traffic or areas of your site or application that you do not want a waiting room to apply to.

[ Use Waiting Room Rules ](https://developers.cloudflare.com/waiting-room/additional-options/waiting-room-rules/) 

###  Waiting Room Analytics 

Get insights into the traffic going through your waiting room.

[ Use Waiting Room Analytics ](https://developers.cloudflare.com/waiting-room/waiting-room-analytics/) 

###  Additional hostname and path coverage 

Apply a single waiting room to multiple hostnames and paths within the same zone.

[ Use Additional hostname and path coverage ](https://developers.cloudflare.com/waiting-room/how-to/place-waiting-room/) 

---

## Related products

**[Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/)** 

Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare’s network to your customers via their own custom or vanity domains.

**[Rules](https://developers.cloudflare.com/rules/)** 

Cloudflare Rules allows you to make adjustments to requests and responses, configure Cloudflare settings, and trigger specific actions for matching requests.

**[SSL/TLS](https://developers.cloudflare.com/ssl/)** 

Cloudflare SSL/TLS encrypts your web traffic to prevent data theft and other tampering.

---

## Availability

The following customers have access to Cloudflare Waiting Room:

* Those qualified under [Project Fair Shot ↗](https://www.cloudflare.com/fair-shot/)
* Customers on a Business or Enterprise plan

Access to certain features depends on a customer's [plan type](https://developers.cloudflare.com/waiting-room/plans/).

Note

Enterprise customers can preview this product as a [non-contract service](https://developers.cloudflare.com/billing/preview-services/), which provides full access, free of metered usage fees, limits, and certain other restrictions.

---

## Prerequisites

* [Cloudflare’s CDN](https://developers.cloudflare.com/cache/) is required to use the Waiting Room feature.
* Configure a [proxied DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) or a [proxied load balancer](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/) for the waiting room’s hostname. A DNS record is not auto-configured after a waiting room is created.
* Visitors must enable cookies. Refer to [Waiting Room cookies](https://developers.cloudflare.com/waiting-room/reference/waiting-room-cookie/) for information on how cookies are used in Cloudflare Waiting Room.

---

## More resources

[Pricing](https://www.cloudflare.com/plans/) 

Explore pricing options for Waiting Room.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waiting-room/","name":"Waiting Room"}}]}
```
