---
title: Create a content security rule in the dashboard
description: Learn how to create a content security rule in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/rules/create-dashboard.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Create a content security rule in the dashboard

Note

Only available to customers with Client-Side Security Advanced.

* [  New dashboard ](#tab-panel-5669)
* [ Old dashboard ](#tab-panel-5670)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
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

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Security** \> **Client-side security** \> **Rules**.
3. Select **Create rule**.
4. Enter a descriptive name for the rule in **Description**.
5. Under **If incoming requests match**, define the rule scope. You can use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
6. Under **Allow these directives**, select the desired [CSP directives](https://developers.cloudflare.com/client-side-security/rules/csp-directives/) for the rule by enabling one or more checkboxes.  
   * To manually enter an allowed source, select **Add source**.  
   * To refresh the displayed sources based on detected resources, select **Refresh suggestions**.  
   Note  
   Cloudflare provides suggestions for **Default**, **Scripts**, and **Connections** directives. For the **Default** directive, suggestions are based on monitored scripts and connections resources.
7. Under **Then take action**, select the desired action:  
   * _Allow_: Enforces the CSP directives configured in the rule, blocking any other resources from being loaded on your website, and logging any [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/).  
   * _Log_: Logs any content security rule violations without blocking any resources not covered by the rule.
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/rules/","name":"Content security rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/rules/create-dashboard/","name":"Create a content security rule in the dashboard"}}]}
```
