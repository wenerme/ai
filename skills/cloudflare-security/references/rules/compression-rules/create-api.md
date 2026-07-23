---
description: Create compression rules using the Rulesets API.
title: Create a compression rule via API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a compression rule via API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/compression-rules/create-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create a compression rule via API.

## Basic rule settings

When creating a compression rule via API, make sure you:

* Set the rule action to `compress_response`.
* Define the parameters in the `action_parameters` field according to the [settings](https://developers.cloudflare.com/rules/compression-rules/settings/#api-configuration-settings) you wish to override for matching requests.
* Deploy the rule to the `http_response_compression` phase at the zone level.

## Procedure

Follow this workflow to create a compression rule for a given zone via API:

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to check if there is already a ruleset for the `http_response_compression` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:

  * **kind**: `zone`
  * **phase**: `http_response_compression`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add a compression rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.

## Examples

For example API requests, refer to the [Examples gallery](https://developers.cloudflare.com/rules/compression-rules/examples/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/compression-rules/create-api/#page","headline":"Create a compression rule via API · Cloudflare Rules docs","description":"Create compression rules using the Rulesets API.","url":"https://developers.cloudflare.com/rules/compression-rules/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
