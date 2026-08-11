---
description: Create response header modification rules in the dashboard.
title: Create a response header transform rule in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a response header transform rule in the dashboard

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/response-header-modification/create-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Refer to the [Rules examples gallery](https://developers.cloudflare.com/rules/transform/examples/?operation=Response+modification) for examples of rule definitions.

To create a rule:

1. In the Cloudflare dashboard, go to the Rules **Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Response Header Transform Rule**.
3. (Optional) Select one of the rule templates that address common use cases. Then, review and adjust the proposed rule configuration.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.
6. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
Note
Check the [available fields and functions](https://developers.cloudflare.com/rules/transform/response-header-modification/reference/fields-functions/).
7. For **Modify response header**, select one of the following operations:

  * _Add static_ — Adds an HTTP response header with a static string value. This operation will not remove any existing response headers with the same name.
  * _Add dynamic_ — Adds an HTTP response header according to the provided expression. This operation will not remove any existing response headers with the same name.
  * _Set static_ — Sets the value of an HTTP response header to a static string value. Overrides the value of any existing headers with the same name or adds a new header if it does not exist.
  * _Set dynamic_ — Sets the value of an HTTP response header according to the provided expression. Overrides the value of any existing headers with the same name or adds a new header if it does not exist.
  * _Remove_ — Removes the HTTP response header with the provided name, if it exists.
8. Enter the name of the HTTP response header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.
9. To modify another HTTP response header in the same rule, select **Set new header**. You can modify up to 30 HTTP response headers in a single rule.
The following example includes the modification of three response headers:
![Example configuration performing three response header modifications: set a dynamic header value, set a static header value, and remove an existing header.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1045,height=396,format=webp/_astro/response-header-modification-example.DTGup8MQ.png)
10. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/response-header-modification/create-dashboard/#page","headline":"Create a response header transform rule in the dashboard · Cloudflare Rules docs","description":"Create response header modification rules in the dashboard.","url":"https://developers.cloudflare.com/rules/transform/response-header-modification/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Response modification"]}
```
