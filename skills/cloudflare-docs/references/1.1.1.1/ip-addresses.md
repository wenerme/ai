---
title: IP addresses
description: Get IPv4 and IPv6 addresses for Cloudflare DNS resolvers, 1.1.1.1 and 1.1.1.1 for Families.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IP addresses

Use the addresses below to configure your device or router. Two addresses are provided for each resolver for redundancy.

For step-by-step instructions, refer to [Set up](https://developers.cloudflare.com/1.1.1.1/setup/).

---

## 1.1.1.1

The standard resolver provides fast, private DNS lookups with no content filtering.

| IPv4            | IPv6                                      |
| --------------- | ----------------------------------------- |
| 1.1.1.1 1.0.0.1 | 2606:4700:4700::1111 2606:4700:4700::1001 |

Refer to [Encryption](https://developers.cloudflare.com/1.1.1.1/encryption/) to learn how to encrypt your DNS queries.

---

## 1.1.1.1 for Families

1.1.1.1 for Families adds automatic filtering to block known malware, phishing, and (optionally) adult content.

For more information, refer to [1.1.1.1 for Families set up](https://developers.cloudflare.com/1.1.1.1/setup/#1111-for-families).

### Block malware

| IPv4            | IPv6                                      |
| --------------- | ----------------------------------------- |
| 1.1.1.2 1.0.0.2 | 2606:4700:4700::1112 2606:4700:4700::1002 |

### Block malware and adult content

| IPv4            | IPv6                                      |
| --------------- | ----------------------------------------- |
| 1.1.1.3 1.0.0.3 | 2606:4700:4700::1113 2606:4700:4700::1003 |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/ip-addresses/","name":"IP addresses"}}]}
```
