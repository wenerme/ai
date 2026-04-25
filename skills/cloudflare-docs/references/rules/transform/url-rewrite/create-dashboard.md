---
title: Create a URL rewrite rule in the dashboard
description: Create URL rewrite rules in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Create a URL rewrite rule in the dashboard

Refer to the [Rules examples gallery](https://developers.cloudflare.com/rules/transform/examples/?operation=Rewrite+URL) for examples of rule definitions.

To create a rule:

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **URL Rewrite Rule**.
3. (Optional) Select one of the rule templates that address common use cases. Then, review and adjust the proposed rule configuration.
4. Enter a descriptive name for the rule in **Rule name**.  
![The URL rewrite rule creation page in the Cloudflare dashboard.](https://developers.cloudflare.com/_astro/create-url-rewrite-rule.DIgpB8IB_ZNTjfK.webp)
5. Under **If incoming requests match**, select one of the following options:  
   * **Wildcard pattern**: The rule will only apply to traffic matching the wildcard pattern in **Request URL**. Refer to [Wildcard pattern parameters](#wildcard-pattern-parameters) for details.  
   * **Custom filter expression**: The rule will only apply to traffic matching a custom expression. Define the [rule expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) to configure which requests should be rewritten. Use either the Expression Builder or the Expression Editor to define the custom expression. For more information, refer to [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).  
   Note  
   Check the [fields and functions](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/fields-functions/) you can use in filter expressions of URL rewrite rules.  
   * **All incoming requests**: The rule will apply to all traffic.
6. (Optional) Define the action for your URL rewrite rule by selecting one of the available options displayed as radio buttons, and then a value from the drop-down list, depending on the action:  
   * If you select **Rewrite to** \> _Static_, enter the string that will replace the original URL path (or query string). For example, enter `welcome-gb.html` to rewrite the original URL path to `/welcome-gb.html`.  
   * If you select **Rewrite to** \> _Dynamic_, enter a [rewrite expression](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/fields-functions/#rewrite-expressions) that defines the dynamic URL rewrite to perform.  
   * If you do not want to change the value of a component of the original request (the URL path or the URL query string), choose _Preserve_ for that component.  
For more information, refer to [URL rewrite parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/parameters/).
7. (Optional) Under **Place at**, define where to place the rule in the rules list: first rule in the list, last rule in the list, or in a custom position (after a given rule).
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.  
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

## Wildcard pattern parameters

The Cloudflare dashboard offers a simplified user interface for creating URL rewrites based on wildcard matching and replacement. When you select **Wildcard pattern**, you will have the following parameters available:

* **Request URL**: Enter the [wildcard pattern](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) using the asterisk (`*`) character to match multiple requests. For example, `http*://*.example.com/*`.
* **Then rewrite the path and/or query**: Define the [URL rewrite settings](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/parameters/) including:  
   * **Path** \> **Target path**: Enter the URI path to match, which can include wildcards (for example, `/oldpath/*`).  
   * **Path** \> **Rewrite to**: Enter the new URI path. You can use [wildcard replacement](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) such as `${1}` and `${2}` to define a dynamic target path (for example, `/newpath/${1}`). Leave this field empty to remove the URI path.  
   * **Query** \> **Target query**: Enter the query string to match, which can include wildcards (for example, `?sort=*`).  
   * **Query** \> **Rewrite to**: Enter the new query string. You can use [wildcard replacement](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) such as `${1}` and `${2}` to define a dynamic query string (for example, `?order=${1}`). Leave this field empty to remove the query string.

Refer to [URL rewrite parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/parameters/#wildcard-matching-and-replacement) for the equivalent rule configuration when using the API.

Notes

The **Request URL** value is only used to match the incoming request with a rule. It will not be used for capturing URL patterns for rewrites. If you are matching the URL path or query string in **Target path** or **Target query**, respectively, make sure that the **Request URL** pattern also matches the incoming request, or else the rule will not trigger.

To validate URL rewrite rule matches, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/). To validate rewritten URLs, check your origin server.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/url-rewrite/","name":"URL Rewrite Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/url-rewrite/create-dashboard/","name":"Create a URL rewrite rule in the dashboard"}}]}
```
