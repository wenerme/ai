---
description: Manage rulesets and rules programmatically with the Rulesets API.
title: Rulesets API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Rulesets API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ruleset-engine/rulesets-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Rulesets API provides an interface for managing and configuring the execution of rulesets, supporting different Cloudflare products powered by the Ruleset Engine.

## Get started

To get started, review the [JSON objects](https://developers.cloudflare.com/ruleset-engine/rulesets-api/json-object/) and the available [endpoints](https://developers.cloudflare.com/ruleset-engine/rulesets-api/endpoints/).

---

## Limits

You should avoid making concurrent updates to the same ruleset. There are rate limits in place to prevent the same ruleset from being concurrently updated too many times. The exact limits depend on the size of the ruleset and volume of requests, and can be different for each ruleset.

The rate limits are most frequently hit when concurrently modifying several rules in the same ruleset. To avoid this, you should [update the entire ruleset in a single operation](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) instead.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/#page","headline":"Rulesets API · Cloudflare Ruleset Engine docs","description":"Manage rulesets and rules programmatically with the Rulesets API.","url":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
