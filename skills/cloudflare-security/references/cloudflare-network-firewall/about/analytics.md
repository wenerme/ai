---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: View Network Firewall analytics and event logs.
title: Analytics
image: https://developers.cloudflare.com/cloudflare-network-firewall/about/analytics/og.png?v=413b912a69e7fffa
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics

## GraphQL Analytics

Use the GraphQL Analytics API to view data for packets passing through Cloudflare's network. For more information about using the GraphQL Analytics API and getting started, refer to [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) and [Querying Cloudflare Network Firewall Samples with GraphQL](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-network-firewall-samples/).

Refer to the [Network Firewall GraphQL Analytics tutorial](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) for sample queries for each Network Firewall phase.

### GraphQL nodes by phase

Each [Network Firewall phase](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/#network-layer) reports to a GraphQL node.

| Phase | Rules | GraphQL node |
| --- | --- | --- |
| `magic_transit` | Custom rules | `magicFirewallNetworkAnalyticsAdaptiveGroups` |
| `magic_transit_managed` | Managed rules | `magicFirewallNetworkAnalyticsAdaptiveGroups` |
| `magic_transit_ids_managed` | IDS | `magicIDPSNetworkAnalyticsAdaptiveGroups` |
| `magic_transit_ratelimit` | Rate limiting (beta) | `magicFirewallRateLimitNetworkAnalyticsAdaptiveGroups` |

### Verdict and outcome

Use `verdict` and `outcome` values to filter GraphQL queries. The `verdict` describes the rule evaluation or detection. For example, when a packet matches a drop rule expression, `verdict` is set to `drop`. The `outcome` describes the action that the system took. Samples matching a drop rule set `outcome` to `drop`. If the rule is disabled, the packet is not dropped, so `outcome` is set to `pass`.

Each phase uses these values slightly differently.

#### Custom and managed rules

For packets matching custom rules, the values depend on the rule's status and action:

- A disabled custom rule has `verdict=drop` and `outcome=pass`, regardless of its action.
- An enabled rule with the `block` action has `verdict=drop` and `outcome=drop`.
- An enabled rule with the `skip` action has `verdict=pass` and `outcome=pass`.

Managed rules use the rule's default action, or the action set by an override. The `block` and `skip` actions use the same values as enabled custom rules.

A managed rule with the `log` action has `verdict=drop` and `outcome=pass`. Disabled managed rules do not produce matching-rule samples.

#### IDS

The Intrusion Detection System (IDS) detects signatures but does not block packets.

- If a packet matches an IDS signature, `verdict=drop` and `outcome=pass`.
- If a packet matches no signatures, `verdict=pass` and `outcome=pass`.

#### Rate limiting

Each rate limiting (beta) rule sets a rate threshold in packets or bits, and drops packets over that threshold. The only available action is `block`, and a rule can be enabled or disabled.

- Packets matching a disabled rule ( `enabled=false`) have `verdict=drop` and `outcome=pass`.
- Packets matching a rule and under the threshold have `verdict=pass` and `outcome=pass`.
- Packets matching a rule and over the threshold have `verdict=drop` and `outcome=drop`.

### Default samples

Custom and managed rules also sample packets that match no enabled rule. These default samples have an empty `ruleId`, and show which traffic no rule matched. To count all packets that custom and managed rules allowed, add the samples that matched an enabled `skip` rule to the default samples.

Rate limiting also produces default samples, which estimate all packets that left the rate limiting phase without being dropped. Use only these samples to count packets that rate limiting allowed. A packet can match several rate limiting rules and stay under the threshold of each one. Each match can produce a sample with `verdict=pass`, so counting those samples counts the packet more than once.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/about/analytics/#page","headline":"Analytics","description":"View Network Firewall analytics and event logs.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/about/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-network-firewall/about/analytics/og.png?v=413b912a69e7fffa","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
