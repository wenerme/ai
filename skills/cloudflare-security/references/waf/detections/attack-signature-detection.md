---
description: Detect attack signature matches independently from mitigation and use the results to create scoped Security Rules.
title: Attack Signature Detection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Attack Signature Detection

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/attack-signature-detection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Attack Signature Detection evaluates requests against Cloudflare attack signatures. It records match metadata without applying an action by itself.

Note

Attack Signature Detection is available in Early Access. Contact your Cloudflare account team to request access.

Traditional WAF deployments combine detection and mitigation through managed rules. You may need to review matches before blocking traffic to reduce false positives.

Attack Signature Detection separates these steps. It records confidence, category, and signature Ref metadata for matching requests. Review this data in **Security Analytics** \> **Attack Analysis** before creating a [Security Rule](https://developers.cloudflare.com/security/rules/). Security Rules provide the mitigation layer. You can match confidence, category, or signature Ref values. You can also combine these values with properties such as hostname, path, and HTTP method.

A signature match does not mean Cloudflare blocked the request. Inspect the request outcome and your deployed rules to determine the applied action.

Attack Signature Detection uses the same signature definitions as [Cloudflare Managed Rules](https://developers.cloudflare.com/waf/managed-rules/).

## How request evaluation works

Attack Signature Detection uses the following request lifecycle:

1. Cloudflare evaluates a request against attack signatures.
2. Matching signatures populate confidence, category, and Ref fields.
3. The match data becomes available in Security Analytics.
4. A Security Rule can evaluate these fields and apply its action.

Attack Signature Detection does not inherit your Managed Rules deployment configuration. Managed Rules actions and overrides do not create Security Rules based on detection fields.

When no rule references an Attack Signature Detection field, detection does not add request latency. When a rule references a detection field, detection runs inline. Inline detection should have latency similar to Cloudflare Managed Rules evaluation.

## Compare Attack Signature Detection and Managed Rules

Attack Signature Detection and Managed Rules use one signature catalog. Cloudflare releases each new signature to both products at the same time.

| Area           | Attack Signature Detection                                                                       | Cloudflare Managed Rules                                                              |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Signatures     | Uses the same signatures as Cloudflare Managed Rules.                                            | Uses the same signatures as Attack Signature Detection.                               |
| Primary result | Populates confidence, category, and Ref metadata.                                                | Applies the configured managed ruleset actions.                                       |
| Mitigation     | Requires a Security Rule that references a detection field.                                      | Uses Managed Rules actions, overrides, and deployment configuration.                  |
| Analysis       | Shows signature-oriented data in **Security Analytics** \> **Attack Analysis**.                  | Shows events produced by the deployed managed ruleset configuration.                  |
| Identifier     | A signature Ref matches the corresponding Managed Rule public Rule ID.                           | A public Rule ID matches the corresponding signature Ref.                             |
| Rule ordering  | A Custom Rule follows normal Custom Rules ordering. A terminating action stops later evaluation. | Managed Rules evaluate unless an earlier terminating action stops request processing. |

The shared Ref and Rule ID help you compare detection results with your Managed Rules deployment. Equivalent signatures do not produce equivalent behavior. Attack Signature Detection produces metadata, while Managed Rules apply configured actions.

Attack Signature Detection and Managed Rules have no special interaction. Normal phase and terminating-action behavior applies. Attack Signature Detection does not replace Managed Rules during Early Access.

## Explore Attack Signature Detection

* [Analyze attack signatures](https://developers.cloudflare.com/waf/detections/attack-signature-detection/analyze-attack-signatures/)
* [Use attack signatures in Security Rules](https://developers.cloudflare.com/waf/detections/attack-signature-detection/use-attack-signatures-in-security-rules/)
* [Fields](https://developers.cloudflare.com/waf/detections/attack-signature-detection/fields/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/#page","headline":"Attack Signature Detection · Cloudflare Web Application Firewall (WAF) docs","description":"Detect attack signature matches independently from mitigation and use the results to create scoped Security Rules.","url":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
