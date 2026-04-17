---
title: Phases list
description: Complete list of phases available in the Ruleset Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/reference/phases-list.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Phases list

The following tables list the [phases](https://developers.cloudflare.com/ruleset-engine/about/phases/) of Cloudflare products powered by the Ruleset Engine, in the order those phases are executed. Some products such as the Cloudflare Web Application Firewall have more than one associated phase.

## Network layer

[Network-layer ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) phases apply to packets received on the Cloudflare global network.

| Phase name                   | Used in product/feature                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ddos\_l4                     | [Network-layer DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/)       |
| magic\_transit               | [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/add-policies/)                           |
| magic\_transit\_managed      | [Cloudflare Network Firewall managed rulesets](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/enable-managed-rulesets/)             |
| magic\_transit\_ratelimit    | [Cloudflare Network Firewall rate limiting policies](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/create-rate-limiting-policies/) |
| magic\_transit\_ids\_managed | [Cloudflare Network Firewall Intrusion Detection System (IDS)](https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/)                  |

## Application layer

[Application-layer ↗](https://www.cloudflare.com/learning/ddos/what-is-layer-7/) phases apply to requests received on the Cloudflare global network.

### Request phases

The phases execute in the order they appear in the table.

| Phase name                           | Used in product/feature                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| http\_request\_dynamic\_redirect     | [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)                     |
| http\_request\_sanitize              | [URL normalization](https://developers.cloudflare.com/rules/normalization/)                                      |
| http\_request\_transform             | [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/)                              |
| _N/A_ (internal phase)               | [Waiting Room Rules](https://developers.cloudflare.com/waiting-room/additional-options/waiting-room-rules/)      |
| http\_request\_api\_gateway\_early\* | [API Shield](https://developers.cloudflare.com/api-shield/)                                                      |
| http\_config\_settings               | [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/)                              |
| http\_request\_origin                | [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/)                                            |
| ddos\_l7\*                           | [HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/)          |
| http\_request\_firewall\_custom      | [Custom rules (Web Application Firewall)](https://developers.cloudflare.com/waf/custom-rules/)                   |
| http\_ratelimit                      | [Rate limiting rules (WAF)](https://developers.cloudflare.com/waf/rate-limiting-rules/)                          |
| http\_request\_api\_gateway\_late    | [API Shield](https://developers.cloudflare.com/api-shield/)                                                      |
| http\_request\_firewall\_managed     | [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/)                                        |
| http\_request\_sbfm                  | [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/)                 |
| _N/A_ (internal phase)               | [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)                  |
| http\_request\_redirect              | [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)                         |
| _N/A_ (internal phase)               | [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/)                      |
| http\_request\_late\_transform       | [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/) |
| http\_request\_cache\_settings       | [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)                                       |
| http\_request\_snippets              | [Snippets](https://developers.cloudflare.com/rules/snippets/)                                                    |
| http\_request\_cloud\_connector      | [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/)                                      |

\* _This phase is for configuration purposes only — the corresponding rules will not be executed at this stage in the request handling process._

Change notice for Super Bot Fight Mode rulesets

Updating Super Bot Fight Mode rules via the Rulesets API is no longer supported and may cause unexpected behavior if you do so.

### Response phases

The phases execute in the order they appear in the table.

| Phase name                         | Used in product/feature                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| http\_custom\_errors               | [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/)                                                |
| _N/A_ (internal phase)             | [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/)                            |
| http\_response\_headers\_transform | [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/)     |
| http\_ratelimit                    | [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) (when they use response information) |
| http\_response\_compression        | [Compression Rules](https://developers.cloudflare.com/rules/compression-rules/)                                        |
| http\_response\_firewall\_managed  | [Cloudflare Sensitive Data Detection](https://developers.cloudflare.com/waf/managed-rules/) (Data Loss Prevention)     |
| http\_log\_custom\_fields          | [Logpush custom fields](https://developers.cloudflare.com/logs/logpush/logpush-job/custom-fields/)                     |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/reference/phases-list/","name":"Phases list"}}]}
```
