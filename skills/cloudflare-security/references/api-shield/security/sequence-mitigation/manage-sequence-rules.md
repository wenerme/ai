---
description: Create and manage sequence rules in the dashboard or via WAF custom rules.
title: Manage sequence rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage sequence rules

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/manage-sequence-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare recommends creating sequence rules using WAF custom rules. Refer to the [sequence custom rules documentation](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/custom-rules/) for more information.

Note

Sequence mitigation is currently in a closed beta and is only available for Enterprise customers. If you would like to be included in the beta, contact your account team.

## Create a sequence rule

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **API sequence rules**.
3. Name your rule.
4. Select a starting endpoint. This is the endpoint that you expect users to hit first in their request flow when using your API.

  * Choose a hostname to display the list of endpoints for that hostname.
  * Choose an endpoint.
  * Select **Set as starting endpoint**.
5. Select a final endpoint. This is the endpoint you are targeting for protection.

  * Choose a hostname to display the list of endpoints for that hostname.
  * Choose an endpoint.
  * Select **Set as ending endpoint**.
6. Choose an action that corresponds to the security model type:

  * **Allow**: This will create a positive security model by defining approved sequences on your API.
  * **Log** / **Block**: This will test or enforce a negative security model defining known bad sequences on your API.
Note
If you chose **Allow**, select whether to log or block the request to the final endpoint when users do not first request the starting endpoint in the sequence.
7. Select **Create rule**.

## Edit a sequence rule

You also have the option to edit an existing rule by selecting it on the rule list. You can rename your rule, adjust the starting and ending endpoint order, modify the endpoint, and change the action of the rule.

## Reprioritize a sequence rule

You can change the priority order of your rules by selecting and dragging the rules on the list.

You can also explicitly set a priority order by selecting the three dots on your rule and choosing **Move to…** where you can set the new priority in the resulting modal window.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/manage-sequence-rules/#page","headline":"Manage sequence rules · Cloudflare API Shield docs","description":"Create and manage sequence rules in the dashboard or via WAF custom rules.","url":"https://developers.cloudflare.com/api-shield/security/sequence-mitigation/manage-sequence-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
