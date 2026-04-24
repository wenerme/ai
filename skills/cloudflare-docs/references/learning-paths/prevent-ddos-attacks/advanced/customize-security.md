---
title: Customize Cloudflare security
description: Learn about customize cloudflare security in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/prevent-ddos-attacks/advanced/customize-security.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Customize Cloudflare security

Another way of reducing origin traffic is customizing the Cloudflare WAF and other security features. The fewer malicious requests that reach your application, the fewer that could reach (and overwhelm) your origin.

To reduce incoming malicious requests, you could:

* Create [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) for protection based on specific aspects of incoming requests.
* Adjust DDoS rules to handle [false negatives and false positives](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-examples/).
* Build [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to protect against specific patterns of requests.
* Enable [bot protection](https://developers.cloudflare.com/bots/get-started/) or set up [Bot Management for Enterprise](https://developers.cloudflare.com/bots/get-started/bot-management/) to protect against automated abuse.
* Explore [network-layer DDoS attack protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/).
* Review the rest of Cloudflare's [security options](https://developers.cloudflare.com/learning-paths/application-security/account-security/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/customize-security/","name":"Customize Cloudflare security"}}]}
```
