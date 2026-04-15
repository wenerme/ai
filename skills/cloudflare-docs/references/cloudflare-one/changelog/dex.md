---
title: Digital Experience Monitoring
description: Review recent changes to Digital Experience Monitoring.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/changelog/dex.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Digital Experience Monitoring

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dex.xml) 

There are no scheduled entries at this time.

## 2025-01-24

**IP visibility**

[IP visibility](https://developers.cloudflare.com/cloudflare-one/insights/dex/ip-visibility/) enables admins to inspect the different IP addresses associated with an end-user device. IP types available for review on the Cloudflare dashboard include: the device's private IP, the public IP assigned to the device by the ISP, and the router's (that the device is connected to) private IP.

## 2024-12-19

**Remote captures**

Admins can now collect packet captures (PCAPs) and WARP diagnostic logs from end-user devices. For more information, refer to [Remote captures](https://developers.cloudflare.com/cloudflare-one/insights/dex/remote-captures/).

## 2024-05-20

**Last seen ISP**

Admins can view the last ISP seen for a device by going to **My Team** \> **Devices**. Requires setting up a [traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/).

## 2024-05-13

**DEX alerts**

Admins can now set [DEX alerts](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/) using [Cloudflare Notifications](https://developers.cloudflare.com/notifications/). Three new DEX alert types:

* Device connectivity anomaly
* Test latency
* Test low availability

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/dex/","name":"Digital Experience Monitoring"}}]}
```
