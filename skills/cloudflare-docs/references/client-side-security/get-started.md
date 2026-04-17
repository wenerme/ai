---
title: Get started with client-side security
description: Learn how to get started with Cloudflare's client-side security.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started with client-side security

## 1\. Activate client-side resource monitoring

To enable client-side resource monitoring:

* [  New dashboard ](#tab-panel-5440)
* [ Old dashboard ](#tab-panel-5441)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. Turn on **Continuous script monitoring**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Client-side security**.
3. Go to the **Settings** tab.
4. Next to **Continuous monitoring and alerting**, select **Enable**.

If you do not have access to client-side security settings in the Cloudflare dashboard, check if your user has one of the [necessary roles](https://developers.cloudflare.com/client-side-security/reference/roles-and-permissions/).

## 2\. Review detected resources

When you enable client-side resource monitoring, it may take a while to get the list of detected scripts in your domain.

To review the scripts detected by Cloudflare:

1. Go to the client-side resources page:  
   * [  New dashboard ](#tab-panel-5438)  
   * [ Old dashboard ](#tab-panel-5439)  
   1. In the Cloudflare dashboard, go to the **Web assets** page.  
   [ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)  
   2. Select the **Client-side resources** tab.  
   1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.  
   2. Go to **Security** \> **Client-side security**.
2. Review the list of detected scripts, checking for any unknown or unexpected scripts. [Depending on your plan and subscriptions](https://developers.cloudflare.com/client-side-security/#availability), Cloudflare will also:  
   * Inform you if a script is [considered malicious](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).  
   * [Show the details](https://developers.cloudflare.com/client-side-security/detection/monitor-connections-scripts/#view-details) about each detected script.

Depending on your Cloudflare plan, you may be able to also review the connections made by scripts in your domain's pages and check them for malicious activity.

## 3\. (Optional) Configure alerts

Once you have activated client-side security's resource monitoring, you can set up one or more alerts informing you of relevant client-side changes on your zones. The [available alert types](https://developers.cloudflare.com/client-side-security/alerts/alert-types/) depend on your Cloudflare plan and subscriptions.

To configure an alert:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Choose **Add** and then select **Client-side security (formerly Page Shield)** in the **Product** dropdown.
3. Select an [alert type](https://developers.cloudflare.com/client-side-security/alerts/alert-types/).
4. Enter the notification name and description.
5. (Optional) If you are a customer with Client-Side Security Advanced, you can [define the zones for which you want to filter alerts](https://developers.cloudflare.com/client-side-security/alerts/#scoped-alerts) in **Rules of these zones**. This option requires that you define [content security rules](https://developers.cloudflare.com/client-side-security/rules/) in the selected zones.
6. Select one or more notification destinations (notification email, webhooks, and connected notification services).
7. Select **Create**.

To learn how you can handle an alert, refer to [Handle a client-side resource alert](https://developers.cloudflare.com/client-side-security/best-practices/handle-an-alert/).

## 4\. (Optional) Define content security rules

Note

Only available to customers with Client-Side Security Advanced.

[Content security rules](https://developers.cloudflare.com/client-side-security/rules/) (previously called policies) define allowed resources on your websites. Create content security rules to implement a positive security model[1](#user-content-fn-1).

### 4.1\. Create a content security rule with the Log action

When you create a content security rule with the [_Log_ action](https://developers.cloudflare.com/client-side-security/rules/#rule-actions), Cloudflare logs any resources not covered by the rule, without blocking any resources. Use this action to validate a new rule before deploying it.

Note

Only available to customers with Client-Side Security Advanced.

* [  New dashboard ](#tab-panel-5444)
* [ Old dashboard ](#tab-panel-5445)

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
6. Under **Then take action**, select _Log_.
7. To save and deploy your rule, select **Deploy**.

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
7. Under **Then take action**, select _Log_.
8. To save and deploy your rule, select **Deploy**.

### 4.2\. Review rule violations

Resources not covered by the content security rule you created will be reported as [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/). After some time, review the list of rule violations to make sure the rule is correct.

To view rule violation information:

* [  New dashboard ](#tab-panel-5442)
* [ Old dashboard ](#tab-panel-5443)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Content security rules**.

* In the Cloudflare dashboard, go to **Security** \> **Client-side security** \> **Rules**.

The displayed information includes the following:

* A sparkline next to the rule name, showing violations in the past seven days.
* For content security rules with associated violations, an expandable details section for each rule, with the top resources present in violation events and a sparkline per top resource.

Update the rule if needed.

### 4.3\. Change rule action to Allow

Once you have verified that your content security rule is correct, change the rule action from _Log_ to _Allow_.

When you use the [_Allow_ action](https://developers.cloudflare.com/client-side-security/rules/#rule-actions), Cloudflare starts blocking any resources not explicitly allowed by the rule.

## Footnotes

1. A positive security model is one that defines what is allowed and rejects everything else. In contrast, a negative security model defines what will be rejected and accepts the rest. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/get-started/","name":"Get started with client-side security"}}]}
```
