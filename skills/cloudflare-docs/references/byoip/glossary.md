---
title: Glossary
description: Definitions for terms used across BYOIP documentation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Glossary

Review the definitions for terms used across Cloudflare's BYOIP documentation.

| Term                                      | Definition                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address map                               | A data structure enabling customers with BYOIP prefixes or account-level static IPs to specify which IP addresses should be mapped to DNS records when they are proxied through Cloudflare.                                                                                                       |
| autonomous system numbers (ASNs)          | A large network or group of networks that has a unified routing policy. Every computer or device that connects to the Internet is connected to an autonomous system.                                                                                                                              |
| Border Gateway Protocol (BGP)             | The routing protocol for the Internet, which is responsible for picking the most efficient routes to deliver Internet traffic.                                                                                                                                                                    |
| Internet Routing Registry (IRR)           | A globally distributed database of routing information which contains announced routes and routing policies in a common format. Network operators use this information, as well as [RPKI](https://developers.cloudflare.com/byoip/concepts/route-filtering-rpki/), to configure backbone routers. |
| Resource Public Key Infrastructure (RPKI) | A cryptographic method of signing records that associate a route with an originating autonomous system number.                                                                                                                                                                                    |
| Route Origin Authorization (ROA)          | The RPKI-signed object that states an autonomous system is authorized to originate a particular IP address prefix or set of prefixes.                                                                                                                                                             |
| Unicast Reverse Path Forwarding (uRPF)    | A security feature that can prevent spoofing attacks.                                                                                                                                                                                                                                             |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/glossary/","name":"Glossary"}}]}
```
