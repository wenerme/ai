---
description: Create scoped Security Rules from reviewed attack signature confidence, category, and Ref metadata.
title: Use attack signatures in Security Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Use attack signatures in Security Rules

Last updated Sep 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/attack-signature-detection/use-attack-signatures-in-security-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Attack Signature Detection fields let Security Rules act on matching traffic. The detection fields do not apply actions by themselves.

Note

Attack Signature Detection is available in Early Access. Contact your Cloudflare account team to request access.

## Create a mitigation policy

1. Review historical matches in **Security Analytics** \> **Attack Analysis**.
2. Choose whether to match a confidence, category, or signature Ref value.
3. Scope the rule to the intended hostname, path, method, or endpoint.
4. Select an action appropriate for the reviewed traffic.
5. Monitor the result and adjust the expression if legitimate traffic is affected.

Start with the narrowest application scope that meets your security objective. Treat low-confidence signatures as candidates for application-specific review instead of broad blocking.

You can use these fields in Security Rules created in the dashboard or through the API. For rule creation steps, refer to [Create a custom rule in the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) or [Create a custom rule via API](https://developers.cloudflare.com/waf/custom-rules/create-api/).

## Match a category

This expression matches the SQL injection category:

```txt
any(cf.waf.signature.request.categories[*] eq "sqli")
```

Use the same array expression for another category, including a specific CVE category. Review historical matches before selecting an action.

## Match confidence

This expression matches high-confidence signatures:

```txt
any(cf.waf.signature.request.confidence[*] eq "high")
```

Replace `high` with `low` to match low-confidence signatures. You can create separate rules to apply different actions to each confidence level.

## Match a signature Ref

This expression matches a specific signature Ref:

```txt
any(cf.waf.signature.request.refs[*] eq "d68f8101f6e14e25aefcaea69c530a29")
```

The Ref is the same value as the corresponding Managed Rule public Rule ID. Use this mapping to reconcile the rule with your Managed Rules configuration.

## Scope rules and exceptions

Combine a signature condition with request properties in the rule builder. Use properties such as hostname, path, and method to limit mitigation to the affected application surface.

For a known false positive, exclude the legitimate endpoint from mitigation. Keep protection for the rest of the application. Validate combined expressions in the rule builder before deployment.

## Understand rule ordering

Attack Signature Detection and Managed Rules have no special interaction. A Custom Rule using a detection field follows normal Custom Rules ordering.

A terminating action stops request processing at that rule. Managed Rules do not evaluate the same request. A non-terminating _Log_ action lets processing continue to Managed Rules.

## Compare with Managed Rules

To compare the two products without changing traffic:

1. Create a Custom Rule that references the relevant detection fields.
2. Select the _Log_ action for the Custom Rule.
3. Keep the corresponding Managed Rules protection in _Block_ mode.
4. In [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/), compare logged detection matches with Managed Rules blocks.

Verify whether Managed Rules already mitigate the traffic before adding duplicate handling. Recheck your Security Rules after application releases or major traffic changes.

For field types and Logpush mappings, refer to [Attack Signature Detection fields](https://developers.cloudflare.com/waf/detections/attack-signature-detection/fields/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/use-attack-signatures-in-security-rules/#page","headline":"Use attack signatures in Security Rules · Cloudflare Web Application Firewall (WAF) docs","description":"Create scoped Security Rules from reviewed attack signature confidence, category, and Ref metadata.","url":"https://developers.cloudflare.com/waf/detections/attack-signature-detection/use-attack-signatures-in-security-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
