---
description: Monitor exposed credentials events in Security Events.
title: Monitor exposed credentials events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor exposed credentials events

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/monitor-events/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

**Sampled logs** in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) shows entries for requests with exposed credentials identified by rules with the _Log_ action.

Check for exposed credentials events in the Security Events dashboard, filtering by a specific rule ID. For more information on filtering events, refer to [Adjust displayed data](https://developers.cloudflare.com/waf/analytics/security-events/#adjust-displayed-data).

## Important notes

Exposed credentials events are only logged after you activate the Exposed Credentials Check Managed Ruleset or create a custom rule checking for exposed credentials.

The log entries will not contain the values of the exposed credentials (username, email, or password). However, if [matched payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/) is enabled, the log entries will contain the values of the fields in the rule expression that triggered the rule. These values might be the values of credential fields, depending on your rule configuration.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/monitor-events/#page","headline":"Monitor exposed credentials events · Cloudflare Web Application Firewall (WAF) docs","description":"Monitor exposed credentials events in Security Events.","url":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/monitor-events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
