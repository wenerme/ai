---
title: Configurations
description: Both Custom and Managed Lists are located in the account settings. Refer to Features by plan type for more information on plan eligibility.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/application-security/lists/configuration.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Configurations

Both Custom and Managed Lists are located in the account settings. Refer to [Features by plan type](https://developers.cloudflare.com/learning-paths/application-security/lists/features/) for more information on plan eligibility.

## Custom Lists

Using a Custom List is an alternative to creating individual Firewall rules with long lists of IP addresses or other types of identifiers. They are easier to read and update, especially when they are used across many security rules. Lists are often used in conjunction with in-house or third party security feeds.

## Managed Lists

The following lists are managed by the Cloudflare team and are regularly updated.

| Display name                                    | Name in expressions | Description                                                                                                                         |
| ----------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare Open Proxies                         | cf.open\_proxies    | IP addresses of known open HTTP and SOCKS proxy endpoints, which are frequently used to launch attacks and hide attackers identity. |
| Cloudflare Anonymizers                          | cf.anonymizer       | IP addresses of known anonymizers (Open SOCKS Proxies, VPNs, and TOR nodes).                                                        |
| Cloudflare VPNs                                 | cf.vpn              | IP addresses of known VPN servers.                                                                                                  |
| Cloudflare Malware                              | cf.malware          | IP addresses of known sources of malware.                                                                                           |
| Cloudflare Botnets, Command and Control Servers | cf.botnetcc         | IP addresses of known botnet command-and-control servers.                                                                           |

  
## Creating a rule

Refer to [Use lists in expressions](https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/) to learn how to invoke a Managed List.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/lists/","name":"Lists"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/lists/configuration/","name":"Configurations"}}]}
```
