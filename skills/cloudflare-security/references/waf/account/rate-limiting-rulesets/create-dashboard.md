---
description: Create account-level rate limiting rulesets in the dashboard.
title: Create a rate limiting ruleset in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a rate limiting ruleset in the dashboard

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This feature requires an Enterprise plan.

At the account level, rate limiting rules are grouped into rate limiting rulesets. You must first create a custom ruleset with one or more rate limiting rules, and then deploy it to one or more zones on an Enterprise plan.

For more information on rule parameters, refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/).

## 1\. Create a custom rate limiting ruleset

1. In the Cloudflare dashboard, go to the **WAF** page.
[Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Rate limiting rulesets** tab.
3. To create a new empty ruleset, select **Create ruleset**. To duplicate an existing ruleset, select the three dots next to it > **Duplicate**.
4. Enter a name for the ruleset and (optionally) a description.
5. In the ruleset creation page, select **Create rule**.
6. In the rule creation page, enter a descriptive name for the rule in **Rule name**.
![Create rate limiting rule at the account level in the Cloudflare dashboard](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1002,height=1340,format=webp/_astro/rate-limiting-create-account.DD1IrUhr.png)
7. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
8. (Optional) Under **Cache status**, disable **Also apply rate limiting to cached assets** to consider only the requests that reach the origin when determining the rate.
9. Under **With the same characteristics**, configure the characteristics that will define the request counters for rate limiting purposes. Each value combination will have its own counter to determine the rate. Refer to [How Cloudflare determines the request rate](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/) for more information.
The available characteristics depend on your Cloudflare plan and product subscriptions.
10. (Optional) To define an expression that specifies the conditions for incrementing the rate counter, enable **Use custom counting expression** and set the expression. By default, the counting expression is the same as the rule expression. The counting expression can include [response fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Response).
11. Under **When rate exceeds**, define the maximum number of requests and the time period to consider when determining the rate.
12. Under **Then take action**, select the rule action from the **Choose an action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.
13. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests) for requests exceeding the configured rate limit.
14. Select the mitigation timeout in the **Duration** dropdown. This is the time period during which Cloudflare applies the select action once the rate is reached.
Enterprise customers with a paid add-on can [throttle requests](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-following-behavior) instead of applying the configured action for a selected duration. To throttle requests, under **With the following behavior** select _Throttle requests over the maximum configured rate_.
15. Select **Add rule**.
16. Create additional rate limiting rules as needed, and then select **Create** to create the ruleset.

## 2\. Deploy the custom rate limiting ruleset

To deploy a custom rate limiting ruleset to one or more zones on an Enterprise plan:

1. In the Cloudflare dashboard, go to the **WAF** page.
[Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Rate limiting rulesets** tab.
3. Under **Your custom rate limiting rulesets** and next to the rate limiting ruleset you wish to deploy, select **Deploy**.
4. In the ruleset deployment page, enter a descriptive name for the rule deploying the ruleset in **Execution name**.
5. Under **Execution scope**, review the scope of the rate limiting ruleset to deploy. If necessary, select **Edit scope** and configure the expression that will determine the scope of the current rule.
Caution
Deployed custom rate limiting rulesets will only apply to incoming traffic of zones on an Enterprise plan. The Expression Builder will automatically include this filter. If you define a custom expression using the Expression Editor, you must include `AND zone.level eq "ENT"` in your expression so that the rule only applies to zones on an Enterprise plan.
6. To deploy your rule immediately, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

The **Deployed custom rate limiting rulesets** list will show a rule for each deployed custom rate limiting ruleset.

## Configure a custom response for blocked requests

When you select the _Block_ action in a rule you can optionally define a custom response.

The custom response has three settings:

* **With response type**: Choose a content type or the default rate limiting response from the list. The available custom response types are the following:

| Dashboard value | API value          |
| --------------- | ------------------ |
| Custom HTML     | "text/html"        |
| Custom Text     | "text/plain"       |
| Custom JSON     | "application/json" |
| Custom XML      | "text/xml"         |
* **With response code**: Choose an HTTP status code for the response, in the range 400-499\. The default response code is 429.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected. The maximum field size is 30 KB.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-dashboard/#page","headline":"Create a rate limiting ruleset in the dashboard for an account · Cloudflare Web Application Firewall (WAF) docs","description":"Create account-level rate limiting rulesets in the dashboard.","url":"https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
