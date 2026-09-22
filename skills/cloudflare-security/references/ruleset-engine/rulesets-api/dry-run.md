---
description: Validate rules and rulesets in the Cloudflare dashboard or with the Rulesets API without deploying changes.
title: Validate rule changes before deployment
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Validate rule changes before deployment

Last updated Sep 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ruleset-engine/rulesets-api/dry-run/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare can validate a rule or ruleset before deployment. Validation checks the complete configuration without persisting or publishing changes.

Validation includes:

- Expression syntax and the availability of fields, functions, and operators
- Actions, action parameters, and phase compatibility
- Permissions, plan entitlements, and rule quotas
- References to resources used by the rule

## Dashboard validation

The Cloudflare dashboard automatically validates supported rule changes before deployment. If validation fails, the dashboard displays the error without publishing the change.

Dashboard validation is available for custom rules and rate limiting rules under **Security** > **Security rules**.

[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)

It is also available when you create or update rules under **Rules** > **Overview**.

[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)

## API validation

Supported Rulesets API mutation endpoints accept the `dry_run=true` query parameter. You can use this parameter with `POST`, `PUT`, `PATCH`, and `DELETE` operations at the account or zone level.

A dry run performs the same authorization and server-side validation checks as the requested operation. It does not create, update, delete, or publish any configuration.

Only `true` and `false` are valid values for `dry_run`. An omitted value defaults to `false`. Any other value returns a `400` response.

### Example

The following request validates a rule update without applying it:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Response Compression Write</code>
- <code>Config Settings Write</code>
- <code>Dynamic URL Redirects Write</code>
- <code>Cache Settings Write</code>
- <code>Custom Errors Write</code>
- <code>Origin Write</code>
- <code>Managed headers Write</code>
- <code>Zone Transform Rules Write</code>
- <code>Mass URL Redirects Write</code>
- <code>Magic Firewall Write</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>HTTP DDoS Managed Ruleset Write</code>
- <code>Sanitize Write</code>
- <code>Transform Rules Write</code>
- <code>Select Configuration Write</code>
- <code>Bot Management Write</code>
- <code>Zone WAF Write</code>
- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>
- <code>Logs Write</code>

</details>

*Update a zone ruleset rulebash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID?dry_run=true" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"action": "block",
		"expression": "ip.src.country eq \"GB\"",
		"description": "Block requests from the United Kingdom",
		"enabled": true
	}'
```

The API returns the same errors and status codes as the corresponding write operation. A successful operation that normally returns `200` returns `result: null`. An operation that normally returns `204 No Content` continues to return `204`.

For supported operations and request schemas, refer to the [Rulesets API reference](https://developers.cloudflare.com/api/resources/rulesets/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/dry-run/#page","headline":"Validate rule changes before deployment","description":"Validate rules and rulesets in the Cloudflare dashboard or with the Rulesets API without deploying changes.","url":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/dry-run/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
