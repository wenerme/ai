---
description: Create and manage account-level custom rulesets in the dashboard.
title: Work with custom rulesets in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Work with custom rulesets in the dashboard

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/account/custom-rulesets/create-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Notes

Custom rulesets at the account level require an Enterprise plan.

You can create and deploy custom rulesets at the account or zone level. However, the Cloudflare dashboard currently does not support working with custom rulesets at the zone level. You will need to use the Cloudflare API to configure or deploy these rulesets.

## Create and deploy a custom ruleset

To create and deploy a custom ruleset at the account level:

1. In the Cloudflare dashboard, go to the **WAF** page.
[Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Custom rulesets** tab.
![Custom rulesets page in the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=334,format=webp/_astro/custom-rulesets-dashboard.B9PZ8Swr.png)
3. To create a new empty ruleset, select **Create ruleset**. To duplicate an existing ruleset, select the three dots next to it > **Duplicate**.
4. In the page that displays, enter a name and (optionally) a description for the custom ruleset.
5. Under **Scope**, define when the custom ruleset should run.

  * Select **All incoming requests** to apply the custom ruleset to all incoming requests for all your zones on an Enterprise plan.
  * Select **Custom filter expression** to define a custom expression that defines when to execute the custom ruleset. Use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**. Alternatively, select **Edit expression** to define your expression using the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).
Caution
Custom rulesets deployed at the account level only apply to incoming traffic of Enterprise domains. The Expression Builder will automatically include this filter. If you define a custom expression for the ruleset using the Expression Editor, you must use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that the rule only applies to domains on an Enterprise plan.
6. To create a new rule, select **Add rule**.
7. Enter a descriptive name for the rule in **Rule name**.
8. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**. Alternatively, select **Edit expression** to define your expression using the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).
9. Select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
10. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests).
11. Select **Deploy**.
12. Add other rules to the custom ruleset, if needed. You can also duplicate an existing rule in the custom ruleset.
13. Select **Create**.

## Edit a custom ruleset

1. In the Cloudflare dashboard, go to the **WAF** page.
[Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Custom rulesets** tab.
![Custom rulesets page in the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=334,format=webp/_astro/custom-rulesets-dashboard.B9PZ8Swr.png)
3. To edit a custom ruleset, select the three dots next to it > **Edit**.
4. Make any desired changes to the ruleset by selecting **Edit** next to the items you want to change.
5. When you are done, select **Back to rulesets list**.

Caution

Custom rulesets deployed at the account level only apply to incoming traffic of Enterprise domains. The Expression Builder in the Cloudflare dashboard will automatically include this filter. If you define a custom expression for the ruleset using the Expression Editor, you must use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that the rule only applies to domains on an Enterprise plan.

## Delete a custom ruleset

1. In the Cloudflare dashboard, go to the **WAF** page.
[Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Custom rulesets** tab.
3. To delete a custom ruleset, select the three dots next to it > **Delete**.
4. To confirm the delete operation, select **Delete**.

## Configure a custom response for blocked requests

When you select the _Block_ action in a rule you can optionally define a custom response.

The custom response has three settings:

* **With response type**: Choose a content type or the default WAF block response from the list. The available custom response types are the following:

| Dashboard value | API value          |
| --------------- | ------------------ |
| Custom HTML     | "text/html"        |
| Custom Text     | "text/plain"       |
| Custom JSON     | "application/json" |
| Custom XML      | "text/xml"         |
* **With response code**: Choose an HTTP status code for the response, in the range 400-499\. The default response code is 403.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected. The maximum field size is 2 KB.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/custom-rulesets/create-dashboard/#page","headline":"Work with WAF custom rulesets in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Create and manage account-level custom rulesets in the dashboard.","url":"https://developers.cloudflare.com/waf/account/custom-rulesets/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
