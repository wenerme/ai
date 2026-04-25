---
title: IP addresses
description: Get IPv4 and IPv6 addresses for Cloudflare DNS resolvers, 1.1.1.1 and 1.1.1.1 for Families.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# IP addresses

Consider the tables below to know which IPv4 or IPv6 addresses are used by the different Cloudflare DNS resolver offerings.

For detailed guidance refer to [Set up](https://developers.cloudflare.com/1.1.1.1/setup/).

---

## 1.1.1.1

1.1.1.1 is Cloudflare’s public DNS resolver. It offers a fast and private way to browse the Internet.

| IPv4            | IPv6                                      |
| --------------- | ----------------------------------------- |
| 1.1.1.1 1.0.0.1 | 2606:4700:4700::1111 2606:4700:4700::1001 |

Refer to [Encryption](https://developers.cloudflare.com/1.1.1.1/encryption/) to learn how to use 1.1.1.1 in an encrypted way.

---

## 1.1.1.1 for Families

1.1.1.1 for Families categorizes destinations on the Internet based on the potential threat they pose regarding malware, phishing, or other types of security risks.

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
