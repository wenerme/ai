---
description: Create rate limiting policies for network traffic.
title: Create Rate Limiting policies (beta)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-network-firewall/llms.txt
> Use this file to discover all available pages before exploring further.

#  Create Rate Limiting policies (beta)

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/create-rate-limiting-policies/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Rate limiting policies (beta) allow you to manage incoming traffic to your network for specific locations.

This guide will teach you how to create a policy for when incoming packets match, and in cases where your rate exceeds a certain value (in packets or bits).

Note

For Cloudflare Advanced Network Firewall customers, rate limiting (beta) is available by request through the account team.

## Add a policy

To add a policy:

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select the **Rate limiting** tab, then select **Add a policy**.
3. Fill out the information for your new policy:
  * Select the **Field**: At the moment, you can only choose a [colo name ↗](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/cloudflare-network-firewall/).
  * Select the **Operator**: Choose among **equals** or **is in**.
  * Select the **Value**.
4. When you are done, select **Save policy**.

## Edit an existing policy

To edit a policy:

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to edit in the list and select **Edit**.
4. Edit the policy with your changes and select **Edit policy**.

## Delete an existing policy

To delete an existing policy:

1. In the Cloudflare dashboard, go to the [Firewall Policies ↗](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall) page.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to delete from the list.
4. Select the three dots, then select **Remove**.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-network-firewall/how-to/create-rate-limiting-policies/#page","headline":"Create Rate Limiting policies (beta) · Cloudflare Network Firewall docs","description":"Create rate limiting policies for network traffic.","url":"https://developers.cloudflare.com/cloudflare-network-firewall/how-to/create-rate-limiting-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
