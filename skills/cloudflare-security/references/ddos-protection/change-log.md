---
description: Stay updated with Cloudflare's DDoS protection. Discover the latest rule updates, accuracy improvements, and threat landscape adaptations.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ddos-protection/change-log/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare has a regular cadence of releasing updates and new rules to the DDoS managed rulesets. The updates either improve a rule's accuracy, lower false positives rates, or increase the protection due to a change in the threat landscape.

The release cycle for a new rule within the regular cadence follows this process:

* Cloudflare adds a new rule configured with the _Log_ action, and announces the rule in the "Scheduled changes" section of each managed ruleset.
* From that point on, if this rule matches any traffic, the matched traffic will be visible in one of the [analytics dashboards](https://developers.cloudflare.com/ddos-protection/reference/analytics/). If you suspect this might be a false positive, you can lower the sensitivity for that rule. Refer to [override examples](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-examples/#legitimate-traffic-is-incorrectly-identified-as-an-attack-and-causes-a-false-positive) for details.
* Cloudflare updates the rule action to mitigate traffic (for example, using the _Block_ action) after a period of at least seven days, usually on a Monday. The exact date is shown in the scheduled changes list.

Changes to existing rules follow the same process, except that Cloudflare will create a temporary updated rule (denoted as `BETA` in rule description) before updating the original rule on the next release cycle.

Cloudflare is very proactive in responding to new attack vectors, which may need to be released outside of the 7-day cycle, defined as an Emergency Release. This emergency release is only used to respond to new high priority threats with a low false positive probability.

## RSS feeds

* [General updates](https://developers.cloudflare.com/ddos-protection/change-log/general-updates/) \- [Subscribe to RSS](https://developers.cloudflare.com/ddos-protection/change-log/general-updates/index.xml)
* [Network-layer DDoS managed ruleset](https://developers.cloudflare.com/ddos-protection/change-log/network/) \- [Subscribe to RSS](https://developers.cloudflare.com/ddos-protection/change-log/network/index.xml)
* [HTTP DDoS managed ruleset](https://developers.cloudflare.com/ddos-protection/change-log/http/) \- [Subscribe to RSS](https://developers.cloudflare.com/ddos-protection/change-log/http/index.xml)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/ddos-protection/change-log/#page","headline":"Changelog for global changes to DDoS protection · Cloudflare DDoS Protection docs","description":"Stay updated with Cloudflare's DDoS protection. Discover the latest rule updates, accuracy improvements, and threat landscape adaptations.","url":"https://developers.cloudflare.com/ddos-protection/change-log/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
