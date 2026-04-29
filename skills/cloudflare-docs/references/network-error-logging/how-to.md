---
title: How to
description: NEL reports show you why a request failed, the country a request failed from, and last mile network a request failed from, and the likely intended Cloudflare data center.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-error-logging/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How to

Use NEL reports to view information such as:

* Why a request failed
* The country a request failed from
* The last mile network a request failed from
* The Cloudflare data center the request was most likely meant for
1. Log in to your Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select **Analytics & Logs** \> **Edge Reachability**.

Click a tab under **Reachability summary** to view specific information related to your Origin ASN, Origin, IP, or data center. Hover over a location on the map to view the number of reachable requests.

Under **Reachability by data center**, click a location under Data Centers to filter reachability by a specific location.

To view the log fields available for NEL, refer to [NEL reports](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/nel%5Freports/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-error-logging/","name":"Network Error Logging"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-error-logging/how-to/","name":"How to"}}]}
```
