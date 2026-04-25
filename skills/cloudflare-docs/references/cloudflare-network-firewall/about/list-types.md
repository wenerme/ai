---
title: List types
description: IP list types available for Network Firewall policies.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# List types

## Threat intelligence

Cloudflare handles millions of HTTP requests each second and blocks billions of cyber threats each day. Cloudflare uses that data to detect malicious actors on the Internet and turns that information into a list of known malicious IP addresses. Cloudflare also integrates with a number of third-party vendors to augment the coverage.

The threat intelligence feed categories are described in [Managed IP Lists](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists). All of these lists are compatible with Cloudflare Network Firewall (formerly Magic Firewall).

## IP lists

Use [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) to group services in networks, like web servers, or for lists of known bad IP addresses to make managing good network endpoints easier. IP lists are helpful for users with very expansive firewall rules with many IP lists. By default, you can add up to 10,000 IPs across all lists. Refer to [Use an IP list](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/add-policies/#use-an-ip-list) to check an example of how to use an IP list.

## Geo-blocking

Geo-blocking enables you to selectively allow or block traffic to any country. Refer to [Block a country](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/add-policies/#block-a-country) to check an example of how to block a country.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/about/list-types/","name":"List types"}}]}
```
