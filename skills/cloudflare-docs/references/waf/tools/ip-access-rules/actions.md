---
title: IP Access rules actions
description: An IP Access rule can perform one of the following actions:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/tools/ip-access-rules/actions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# IP Access rules actions

An IP Access rule can perform one of the following actions:

* **Block**: Prevents a visitor from visiting your site.
* **Allow**: Excludes visitors from all security checks, including [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/), [Under Attack mode](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/), and the WAF. Use this option when a trusted visitor is being blocked by Cloudflare's default security features. The _Allow_ action takes precedence over the _Block_ action.  
Allowing a given country code will not bypass WAF managed rules (previous and new versions). Refer to [Important remarks about allowing/blocking by country](https://developers.cloudflare.com/waf/tools/ip-access-rules/#important-remarks-about-allowingblocking-by-country) for more information.
* **Managed Challenge**: Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge from a list of possible actions. For more information, refer to [Interstitial Challenge Pages](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge).
* **Non-Interactive Challenge**: Presents a non-interactive challenge page to visitors. Prevents bots from accessing the site.
* **Interactive Challenge**: Requires the visitor to complete an interactive challenge before visiting your site. Prevents bots from accessing the site.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/ip-access-rules/","name":"IP Access rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/ip-access-rules/actions/","name":"IP Access rules actions"}}]}
```
