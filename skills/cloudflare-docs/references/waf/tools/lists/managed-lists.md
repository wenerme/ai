---
title: Managed Lists
description: Cloudflare provides Managed Lists you can use in rule expressions. These lists are regularly updated.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/tools/lists/managed-lists.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Managed Lists

Cloudflare provides Managed Lists you can use in rule expressions. These lists are regularly updated.

Note

This feature requires an Enterprise plan.

## Managed IP Lists

Use Managed IP Lists to access Cloudflare's IP threat intelligence.

Cloudflare provides the following Managed IP Lists:

| Display name                                    | Name in expressions | Description                                                                                                                         |
| ----------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Open Proxies                         | cf.open\_proxies    | IP addresses of known open HTTP and SOCKS proxy endpoints, which are frequently used to launch attacks and hide attackers identity. |
| Cloudflare Anonymizers                          | cf.anonymizer       | IP addresses of known anonymizers (Open SOCKS Proxies, VPNs, and TOR nodes).                                                        |
| Cloudflare VPNs                                 | cf.vpn              | IP addresses of known VPN servers.                                                                                                  |
| Cloudflare Malware                              | cf.malware          | IP addresses of known sources of malware.                                                                                           |
| Cloudflare Botnets, Command and Control Servers | cf.botnetcc         | IP addresses of known botnet command-and-control servers.                                                                           |

  

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/lists/","name":"Lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/lists/managed-lists/","name":"Managed Lists"}}]}
```
