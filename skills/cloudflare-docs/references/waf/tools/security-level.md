---
title: Security Level
description: Set the Security Level threshold for challenging suspicious visitors.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/tools/security-level.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Security Level

In the old Cloudflare dashboard, security level has the value _Always protected_ and you cannot change this setting. To turn [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) on or off, use the separate toggle.

In the new security dashboard, the Cloudflare API, and in Terraform, use security level to turn Under Attack mode on or off.

Cloudflare's [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) performs additional security checks to help mitigate layer 7 DDoS attacks. When you enable Under Attack mode, Cloudflare will present a Managed Challenge page.

Warning

Only use [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) when a website is under a DDoS attack. Under Attack mode may affect some actions on your domain, such as your API traffic.

To enable or disable Under Attack mode for your API or any other part of your domain, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

## Threat score

Previously, a threat score represented a Cloudflare threat score from 0–100, where 0 indicates low risk. Now, the threat score is always `0` (zero).

Recommendation

Currently we do not recommend creating rules based on the threat score, since this score is no longer being populated.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/security-level/","name":"Security Level"}}]}
```
