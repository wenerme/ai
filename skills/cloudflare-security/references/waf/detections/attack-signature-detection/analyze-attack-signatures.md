---
description: Investigate attack signature matches, affected applications, request outcomes, and possible false positives in Security Analytics.
title: Analyze attack signatures
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Analyze attack signatures

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/attack-signature-detection/analyze-attack-signatures/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use **Security Analytics** \> **Attack Analysis** to investigate attack signature matches before applying mitigation.

Note

Attack Signature Detection is available in Early Access. Contact your Cloudflare account team to request access.

## Review signature matches

1. In the Cloudflare dashboard, go to **Security** \> **Analytics**.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select **Attack Analysis**.
3. Choose the time range and application scope to investigate.
4. Plot request volume over time by signature Ref, category, or WAF Attack Score.
5. Compare high- and low-confidence matches.
6. Filter by request outcome to identify mitigated and unmitigated traffic.
7. Narrow the analysis by hostname, path, method, category, CVE, or signature Ref.
8. Review representative requests before creating or changing a Security Rule.

Use this analysis to identify common signatures and attack categories. You can also investigate a specific Common Vulnerabilities and Exposures (CVE) identifier or attack technique. Correlate the matches with [WAF Attack Score](https://developers.cloudflare.com/waf/detections/attack-score/) to add another signal.

The request outcome shows whether existing protections mitigated matching traffic. It also helps identify requests served by Cloudflare or your origin. A detection does not apply an action by itself.

## Interpret confidence

Confidence describes the expected false-positive characteristics of a signature. It does not prove that a request is malicious.

| Confidence | Meaning                                                                      | Comparison with Managed Rules                                                   | Recommended analysis                                                            |
| ---------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| high       | The signature targets a high true-positive and low false-positive rate.      | Includes the same signatures that the default Managed Rules deployment enables. | Confirm affected traffic and current mitigation before applying a broad action. |
| low        | The signature has a greater risk of matching legitimate application traffic. | Includes the Managed Rules signatures that are disabled by default.             | Review requests and scope mitigation to the affected application surface.       |

## Investigate possible false positives

Legitimate rich-text input can match a generic cross-site scripting signature. For example, a content management or support application may accept HTML.

Filter the analysis to that hostname, path, and method. Review representative requests to distinguish expected content from attacks. Then create a scoped rule or exception instead of changing protection for the entire application.

## Compare results with Managed Rules

Each signature Ref matches the corresponding Managed Rule public Rule ID. Use this identifier to find the Managed Rule and compare the detection with your deployment.

Check the request outcome and [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) before assuming Managed Rules blocked a match. Managed Rules actions and overrides determine their behavior.

## Sampling

Attack Analysis uses [Security Analytics adaptive sampling](https://developers.cloudflare.com/waf/analytics/security-analytics/#sampling). Use [Log Explorer](https://developers.cloudflare.com/log-explorer/) when you need 100% retention rather than sampled data.

After reviewing historical traffic, refer to [Use attack signatures in Security Rules](https://developers.cloudflare.com/waf/detections/attack-signature-detection/use-attack-signatures-in-security-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/analyze-attack-signatures/#page","headline":"Analyze attack signatures · Cloudflare Web Application Firewall (WAF) docs","description":"Investigate attack signature matches, affected applications, request outcomes, and possible false positives in Security Analytics.","url":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/analyze-attack-signatures/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
