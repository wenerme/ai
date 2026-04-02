---
title: Create a request header transform rule in the dashboard
description: Refer to the Rules examples gallery for examples of rule definitions.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/request-header-modification/create-dashboard.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a request header transform rule in the dashboard

Refer to the [Rules examples gallery](https://developers.cloudflare.com/rules/transform/examples/?operation=Request+modification) for examples of rule definitions.

To create a rule:

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Request Header Transform Rule**.
3. (Optional) Select one of the rule templates that address common use cases. Then, review and adjust the proposed rule configuration.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.
6. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).  
Note  
Check the [available fields and functions](https://developers.cloudflare.com/rules/transform/request-header-modification/reference/fields-functions/).
7. For **Modify request header**, select one of the following options:  
   * _Set static_ — Sets the value of an HTTP request header to a static string value. Overrides the value of an existing header with the same name or adds a new header if it does not exist.  
   * _Set dynamic_ — Sets the value of an HTTP request header according to the provided expression. Overrides the value of an existing header with the same name or adds a new header if it does not exist.  
   * _Remove_ — Removes the HTTP request header with the provided name, if it exists.
8. Enter the name of the HTTP request header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.
9. To modify another HTTP request header in the same rule, select **Set new header**. You can modify up to 30 HTTP request headers in a single rule.  
The following example includes the modification of three headers:  
![Example configuration performing three request header modifications: set a dynamic header value, set a static header value, and remove an existing header.](https://developers.cloudflare.com/_astro/request-header-modification-example.CKUUJ7cw_2iC6Rs.webp)
10. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.  
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/request-header-modification/","name":"Request Header Transform Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/request-header-modification/create-dashboard/","name":"Create a request header transform rule in the dashboard"}}]}
```
