---
description: Create Rate Limiting policies (beta) in Gateway.
title: Create Rate Limiting policies (beta)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Rate Limiting policies (beta)

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/create-rate-limiting-policies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Rate limiting policies (beta) allow you to set maximum traffic thresholds - measured in packets or bits per second — for incoming traffic destined for your network as it arrives at specific Cloudflare data centers. When traffic to a location exceeds your defined limit, the policy takes action.

This guide walks you through creating a policy that matches incoming packets and triggers when the traffic rate exceeds your configured threshold.

Note

For Cloudflare Advanced Network Firewall customers, rate limiting (beta) is available by request through the account team.

## Add a policy

To add a policy:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and go to **Networking** \> **Firewall policies**.
2. In the **Rate limiting** tab, select **Add a policy**.
3. Fill out the information for your new policy:
  * Select the **Field**: At the moment, you can only choose a [data center name](https://developers.cloudflare.com/cloudflare-network-firewall/reference/network-firewall-fields/) (for example, `ORD` for Chicago).
  * Select the **Operator**: Choose among **equals** or **is in**.
  * Select the **Value**.
4. When you are done, select **Save policy**.

## Edit an existing policy

To edit a policy:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and go to **Networking** \> **Firewall policies**.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to edit in the list and select **Edit**.
4. Edit the policy with your changes and select **Edit policy**.

## Delete an existing policy

To delete an existing policy:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and go to **Networking** \> **Firewall policies**.
2. Select the **Rate limiting** tab.
3. Locate the policy you want to delete from the list.
4. Select the three dots, then select **Remove**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/create-rate-limiting-policies/#page","headline":"Create Rate Limiting policies (beta) · Cloudflare One docs","description":"Create Rate Limiting policies (beta) in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/create-rate-limiting-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
