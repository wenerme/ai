---
description: Create configuration rules in the Cloudflare dashboard.
title: Create a configuration rule in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a configuration rule in the dashboard

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

1. In the Cloudflare dashboard, go to the Rules **Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Configuration Rule**.
3. (Optional) Select one of the rule templates that address common use cases. Then, review and adjust the proposed rule configuration.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.
6. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
7. Under **Then the settings are**, add the [configuration settings](https://developers.cloudflare.com/rules/configuration-rules/settings/) you wish to change for requests matching the rule expression.
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/#page","headline":"Create a configuration rule in the dashboard · Cloudflare Rules docs","description":"Create configuration rules in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/rules/configuration-rules/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
