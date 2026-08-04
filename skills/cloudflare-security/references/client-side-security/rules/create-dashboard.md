---
description: Learn how to create a content security rule in the Cloudflare dashboard.
title: Create a content security rule in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a content security rule in the dashboard

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/client-side-security/rules/create-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Only available to customers with Client-Side Security Advanced.

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create** \> **Content security rules**.
3. Enter a descriptive name for the rule in **Description**.
4. Under **If incoming requests match**, define the scope of the content security rule (or policy). You can use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
5. Under **Allow these directives**, select the desired [CSP directives](https://developers.cloudflare.com/client-side-security/rules/csp-directives/) for the content security rule by enabling one or more checkboxes.

  * To manually enter an allowed source, select **Add source**.
  * To refresh the displayed sources based on detected resources, select **Refresh suggestions**.
  Note
  Cloudflare provides suggestions for **Default**, **Scripts**, and **Connections** directives. For the **Default** directive, suggestions are based on monitored scripts and connections resources.
6. Under **Then take action**, select the desired action:
  * _Allow_: Enforces the CSP directives configured in the rule, blocking any other resources from being loaded on your website, and logging any [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/).
  * _Log_: Logs any content security rule violations without blocking any resources not covered by the rule.
7. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/rules/create-dashboard/#page","headline":"Create a content security rule in the dashboard · Client-side security docs","description":"Learn how to create a content security rule in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/client-side-security/rules/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CSP"]}
```
