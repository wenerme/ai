---
description: Create Network-layer DDoS Attack Protection overrides in the dashboard.
title: Configure in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt
> Use this file to discover all available pages before exploring further.

#  Configure in the dashboard

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Configure the Network-layer DDoS Attack Protection managed ruleset by defining [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Cloudflare dashboard. DDoS overrides allow you to customize the **action** and **sensitivity** of one or more rules in the managed ruleset.

You define overrides for the Network-layer DDoS Attack Protection managed ruleset at the account level.

For more information on the available parameters and allowed values, refer to [Ruleset parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/override-parameters/).

## Create a DDoS override

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.
[ Go to **DDoS Managed Rules** ↗ ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Network-layer DDoS Protection**.
3. Select **Deploy a DDoS override**.
4. In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.
5. If you are creating an override for a subset of the incoming packets, define the [custom expression](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-expressions/) that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.
6. Select **Next**.
7. Depending on what you wish to override, refer to the following sections (you can perform both configurations on the same override):
Configure all the rules in the ruleset (ruleset override)

  1. Select **Next**.
  2. Enter a name for your override in **Execution name**.
  3. To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.
  4. To set the sensitivity level for all the rules in the ruleset, select a value in **Ruleset sensitivity**.
Configure one or more rules

  1. Search for the rules you wish to override using the available filters. You can search for tags.
  2. To override a single rule, select the desired value for a field in the displayed dropdowns next to the rule.
To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure a managed ruleset](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset). 14\. Select **Next**. 15\. Enter a name for your override in **Execution name**.
Notes

  * Tag and rule overrides have priority over ruleset overrides.
  * The managed ruleset includes some read-only rules that you cannot override.
8. To save and deploy the override, select **Deploy**. If you are not ready to deploy your override, select **Save as Draft**.

### Delete a DDoS override

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.
[ Go to **DDoS Managed Rules** ↗ ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to the **Network-layer DDoS Protection** tab.
3. Select the override.
4. Select **Delete deployment**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account.
2. Go to **Networking > L3/4 DDoS Protection**.
3. Next to the DDoS override you wish to delete, select **Delete**.
4. Select **Delete** to confirm the operation.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/#page","headline":"Configure Network-layer DDoS Attack Protection in the dashboard · Cloudflare DDoS Protection docs","description":"Create Network-layer DDoS Attack Protection overrides in the dashboard.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
