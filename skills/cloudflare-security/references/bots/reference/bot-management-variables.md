---
description: Ruleset Engine fields and Workers variables available for bot detection rules.
title: Bot Management variables
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Bot Management variables

Last updated Aug 26, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/reference/bot-management-variables/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Ruleset Engine fields

Bot Management provides access to several [new variables](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Bots) within the expression builder of Ruleset Engine-based products such as [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/).

* **Bot Score** (`cf.bot_management.score`): An integer between 1-99 that indicates [Cloudflare's level of certainty](https://developers.cloudflare.com/bots/concepts/bot-score/) that a request comes from a bot.
* **Verified Bot** (`cf.bot_management.verified_bot`): A boolean value that indicates whether a request originates from a Cloudflare allowed bot.
Cloudflare maintains a large allowlist of good, automated bots (such as Google Search Engine and Pingdom) that perform beneficial tasks. Cloudflare identifies and verifies these bots primarily through reverse DNS validation, ensuring the source IP matches the requesting service.
We also use additional validation methods, including checking ASN blocks and public lists. If these methods are unavailable, Cloudflare utilizes internal data and machine learning to identify and verify legitimate IP addresses from good bots. Most customers choose to [allow this traffic](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot%5Fmanagement.verified%5Fbot/).
* **Serves Static Resource** (`cf.bot_management.static_resource`): An identifier that matches [file extensions](https://developers.cloudflare.com/bots/additional-configurations/static-resources/) for many types of static resources. Use this variable if you send emails that retrieve static images.
* **ja3Hash** (`cf.bot_management.ja3_hash`) and **ja4** (`cf.bot_management.ja4`): A [**JA3/JA4 fingerprint**](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/) helps you profile specific SSL/TLS clients across different destination IPs, Ports, and X509 certificates.
* **Bot Detection IDs** (`cf.bot_management.detection_ids`): List of IDs that correlate to the Bot Management heuristic detections made on a request (you can have multiple heuristic detections on the same request).
* **Signed Agent** (`cf.bot_management.signed_agent`): A boolean value that indicates whether the request originated from a known agent that self-identifies with Web Bot Auth. Such agents are now classified as [verified bots and agents](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) labeled as intermediary.
* **Verified Bot Categories** (`cf.verified_bot_category`): A string that allows you to segment your verified bot traffic by its [type and purpose](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#legacy-categories).

## Workers variables

These variables are also available as part of the [request.cf](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) object via Cloudflare Workers:

* `request.cf.botManagement.score`
* `request.cf.botManagement.verifiedBot`
* `request.cf.botManagement.staticResource`
* `request.cf.botManagement.ja3Hash`
* `request.cf.botManagement.ja4`
* `request.cf.botManagement.jsDetection.passed`
* `request.cf.botManagement.detectionIds`
* `request.cf.botManagement.signedAgent`
* `request.cf.verifiedBotCategory`

## O2O and subrequests

For Orange-to-Orange (O2O) traffic and any related subrequests where Bot Management is in effect, Bot Management fields (including bot score, verified bot, and JA3/JA4) represent the eyeball (end-user) connection to your platform.

Eyeball signals are preserved through the O2O chain, so the fields must be present regardless of which O2O request path you reach.

## Corporate Proxy

The Bot Management Corporate Proxy field contains identified cloud-based corporate proxies and secure web gateways that are Enterprise-only, and provide outbound security services to their clients.

You can access the Corporate Proxy field in [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), or [Workers](https://developers.cloudflare.com/workers/) to provide different security rules for traffic from these sources. You can also exempt them from rules using Bot Management scores.

```txt
not cf.bot_management.verified_bot
and not cf.bot_management.static_resource
and not  cf.bot_management.corporate_proxy
and cf.bot_management.score lt 30
```

## Log fields

Once you enable Bot Management, Cloudflare also surfaces bot information in its [HTTP requests log fields](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/):

* BotDetectionIDs
* BotScore
* BotScoreSrc
* BotTags

## Ephemeral IDs

[Ephemeral IDs](https://developers.cloudflare.com/turnstile/additional-configuration/ephemeral-id/) are short-lived device identifiers returned in the [Turnstile Siteverify API](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) response under `metadata.ephemeral_id`. They are not Ruleset Engine fields and cannot be used in WAF custom rules or Workers directly.

Note

Ephemeral IDs require **Enterprise Bot Management** with the Turnstile Enterprise add-on, or a standalone **Enterprise Turnstile** subscription. The feature must be enabled by your Cloudflare account team and cannot be self-activated.

Refer to [Ephemeral IDs](https://developers.cloudflare.com/turnstile/additional-configuration/ephemeral-id/) for implementation details and the full enablement process.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/reference/bot-management-variables/#page","headline":"Bot Management variables · Cloudflare bot solutions docs","description":"Ruleset Engine fields and Workers variables available for bot detection rules.","url":"https://developers.cloudflare.com/bots/reference/bot-management-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
