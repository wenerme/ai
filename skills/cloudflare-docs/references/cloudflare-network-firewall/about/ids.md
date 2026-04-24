---
title: IDS
description: Detect threats with the Network Firewall Intrusion Detection System.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-network-firewall/about/ids.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# IDS

Cloudflare's Intrusion Detection System (IDS) is a Cloudflare Advanced Network Firewall (formerly Magic Firewall) feature you can use to actively monitor for a wide range of known threat signatures in your traffic. An IDS expands the security coverage of a firewall to analyze traffic against a broader threat database, detecting a variety of sophisticated attacks such as ransomware, data exfiltration, and network scanning based on signatures or “fingerprints” in network traffic.

With Cloudflare's global anycast network, you get:

* Cloudflare's entire global network capacity is now the capacity of your IDS.
* Built in redundancy and failover. Every server runs Cloudflare's IDS software, and traffic is automatically attracted to the closest network location to its source.
* Continuous deployment for improvements to Cloudflare's IDS capabilities.

Refer to [Enable IDS](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/enable-ids/) for more information on enabling IDS and creating new rulesets. After IDS is enabled, your traffic will be scanned to find malicious traffic. The detections are logged to destinations that can be configured from the dashboard. Refer to [Use Logpush with IDS](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-logpush-with-ids/) for instructions on configuring a destination to receive the detections. Additionally, all traffic that is analyzed can be accessed via [network analytics](https://developers.cloudflare.com/analytics/network-analytics/). Refer to [GraphQL Analytics](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) to query the analytics data.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-network-firewall/","name":"Cloudflare Network Firewall"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-network-firewall/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-network-firewall/about/ids/","name":"IDS"}}]}
```
