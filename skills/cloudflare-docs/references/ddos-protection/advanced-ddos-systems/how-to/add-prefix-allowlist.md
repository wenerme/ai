---
title: Add an IP or prefix to the allowlist
description: Allowlist trusted IP addresses or prefixes to exclude them from Advanced DDoS Protection.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Add an IP or prefix to the allowlist

To add an IP address or prefix to the Advanced DDoS Protection [allowlist](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#allowlist):

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection**.
3. Under **General settings** \> **Allowlist**, select **Edit**.
4. Enter a prefix and (optionally) a description in **Prefix** and **Description**, respectively.
5. To exclude the current prefix from the allowlist instead of including it, uncheck the **Enabled** checkbox. 6\. Select **Add**.

Allowlists support approximately 200 IP addresses in a single expression for a rule.

Important

Prefixes in the allowlist will be vulnerable to IP spoofing attacks. If an attacker can guess the source IP addresses you have allowlisted, their packets will be allowlisted.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/","name":"Add an IP or prefix to the allowlist"}}]}
```
