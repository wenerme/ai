---
title: Network Time Protocol
description: Network Time Protocol (NTP) is an Internet protocol designed to synchronize time between computer systems communicating over unreliable and variable-latency network paths. Cloudflare offers its version of NTP for free so you can use our global anycast network to synchronize time from our closest server.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/time-services/ntp/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Network Time Protocol

[Network Time Protocol ↗](https://tools.ietf.org/html/rfc1305) (NTP) is an Internet protocol designed to synchronize time between computer systems communicating over unreliable and variable-latency network paths. Cloudflare offers its version of NTP for free so you can use our [global anycast network ↗](https://www.cloudflare.com/network/) to synchronize time from our closest server.

## Background

NTP works by having a client send a query packet out to an NTP server that then responds with its clock time. The client then computes an estimate of the difference between its clock and the remote clock and attempts to compensate for any network delay. The NTP client then queries multiple servers and implements algorithms to select the best estimate.

Cloudflare does not implement leap smearing: NTP includes a Leap Indicator field [spec ↗](https://tools.ietf.org/html/rfc5905#section-7.3) and the kernel will apply the leap second correction at the appropriate time. This is the behavior servers in `pool.ntp.org` share. Using servers that smear time along with servers that do not may lead to unpredictable and anomalous results.

## Next steps

For more background information about NTP, refer to the [introductory blog ↗](https://blog.cloudflare.com/secure-time/).

To enable NTP on your device, refer to our [Usage guide](https://developers.cloudflare.com/time-services/ntp/usage/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/time-services/","name":"Time Services"}},{"@type":"ListItem","position":3,"item":{"@id":"/time-services/ntp/","name":"Network Time Protocol"}}]}
```
