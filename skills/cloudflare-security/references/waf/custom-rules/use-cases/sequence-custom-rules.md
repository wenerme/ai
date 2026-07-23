---
description: Build sequence-based rules within WAF custom rules.
title: Build a sequence rule within custom rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a sequence rule within custom rules

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/sequence-custom-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can build an [API sequence rule](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/custom-rules/) via the Cloudflare dashboard.

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. To create a new empty rule, select **Create rule** \> **Custom rules**.
3. Enter a descriptive name for the rule in **Rule name**.
4. Under **When incoming requests match**, use the **Field** drop-down list to filter by **Sequences** and select from:

  * Current Operation
  * Previous Operations
  * Elapsed time
5. Under **Value**, select the edit icon to use Builder and build a sequence on the side panel.
6. Under **Select a hostname for this sequence**, choose all or a specific hostname from the dropdown list. Optionally, you can use the search bar to search for a specific hostname.
7. From the **Methods** dropdown list, choose all methods or a specific request method.
8. Select the checkbox for each endpoint in the order that you want them to appear in the sequence.
9. Set the time to complete.
10. Select **Save**.
11. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
12. (Optional) If you selected the _Block_ action, you can configure a custom response.
13. Under **Place at**, select the order of when the rule will fire.
14. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

Note

The fields in the custom rule are populated as a grouped sequence based on the values that you entered on Builder.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. To create a new empty rule, select **Create rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, use the **Field** drop-down list and select:
  * Current Operation
  * Previous Operations
  * Elapsed time
6. Under **Value**, build a sequence by selecting a hostname for the sequence.
7. Select the checkbox for each endpoint in the order that you want them to appear in the sequence.
8. Set the time to complete.
9. Select **Save**.
10. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
11. (Optional) If you selected the _Block_ action, you can configure a custom response.
12. Under **Place at**, select the order of when the rule will fire.
13. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/sequence-custom-rules/#page","headline":"Build a sequence rule within custom rules · Cloudflare Web Application Firewall (WAF) docs","description":"Build sequence-based rules within WAF custom rules.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/sequence-custom-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
