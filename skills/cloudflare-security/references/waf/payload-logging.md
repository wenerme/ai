---
description: Log the request content that triggered a managed or custom rule match.
title: Log the payload of matched rules
image: https://developers.cloudflare.com/waf/payload-logging/og.png?v=df94312cd06d567c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Log the payload of matched rules

The WAF allows you to log the request information that triggered a managed rule or custom rule. This information is known as the payload. Payload information includes the specific string that triggered the rule, along with the text that appears immediately before and after the match.

Payload logging is especially useful when diagnosing the behavior of WAF rules. Since the values that triggered a rule may contain sensitive data, they are encrypted with a customer-provided public key so that only you can examine them later.

Note

This feature is only available for customers on an Enterprise plan.

## Turn on payload logging

To turn on payload logging, configure a public key to encrypt the logged payload. You can configure the key at one of the following scopes:

- **Account**: Applies to supported rule matches for every zone in the account that does not have a zone-level key.
- **Zone**: Applies to supported rule matches in the zone. A zone-level key takes precedence over an account-level key.
- **Managed ruleset**: Applies only to matches for a specific managed ruleset. This is the legacy configuration method.

An account-level or zone-level key takes precedence over a managed ruleset key. Configuring a key at either of these scopes does not delete existing managed ruleset keys. If no account-level or zone-level key applies, an existing managed ruleset key becomes effective again.

You can generate a key pair in the Cloudflare dashboard when configuring a managed ruleset, or use your own public key at any scope.

Once enabled, the WAF saves the payload of supported rule matches and encrypts it with your public key. If multiple rules checking the same request field match (for example, for the field `http.cookie`), the logged payload for that field will refer to the last matched rule.

Payload logging supports WAF managed rules and custom rules. It does not currently support rate limiting rules.

Important

Payload logging only captures data for requests that trigger a supported rule match **after** the feature is enabled. Existing or past Security Events will not have payload data.

For more information, refer to [Configure payload logging for Managed Rules](https://developers.cloudflare.com/waf/payload-logging/configure/) or [Configure payload logging via API](https://developers.cloudflare.com/waf/payload-logging/configure-api/).

Important

When you generate a key pair in the dashboard, Cloudflare will only save the generated public key, not the private key. You must store your private key safely.

## View payload content

To view the content of the payload in clear text, do one of the following:

- In the [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) page, enter your private key to decrypt the payload of a log entry directly in the browser. Refer to [View the payload content in the dashboard](https://developers.cloudflare.com/waf/payload-logging/view/) for details.
- Decrypt the payload in the command line using the `matched-data-cli` tool. Refer to [Decrypt the payload content in the command line](https://developers.cloudflare.com/waf/payload-logging/command-line/decrypt-payload/) for details.
- Decrypt the matched payload in your [Logpush](https://developers.cloudflare.com/logs/logpush/) job using a Worker before storing the logs in your SIEM system. Refer to [Store decrypted matched payloads in logs](https://developers.cloudflare.com/waf/payload-logging/decrypt-in-logs/) for details.

Important

All Cloudflare logs are encrypted at rest. Encrypting the payload content adds a second layer of encryption for the matched values that triggered a rule.

Make sure you store your private key safely. If you lose the private key, configure payload logging with a new public key. The payload of new requests will be encrypted with the new public key.

Cloudflare cannot decrypt encrypted payloads, since this operation requires your private key. Cloudflare staff will never ask for the private key.

## User role requirements

Only users with the [Super Administrator role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) can enable payload logging or edit the payload logging configuration in the dashboard.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/payload-logging/#page","headline":"Log the payload of matched rules","description":"Log the request content that triggered a managed or custom rule match.","url":"https://developers.cloudflare.com/waf/payload-logging/","inLanguage":"en","image":"https://developers.cloudflare.com/waf/payload-logging/og.png?v=df94312cd06d567c","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
```
