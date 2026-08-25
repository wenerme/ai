---
description: Deploy WAF managed rulesets at the zone level in the dashboard.
title: Deploy a WAF managed ruleset in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a WAF managed ruleset in the dashboard

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The instructions in this page provide general guidance for deploying and configuring a managed ruleset for a zone.

For more specific instructions, refer to the following pages:

* [Deploy the Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/#deploy-in-the-dashboard)
* [Deploy the Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#deploy-in-the-dashboard)
* [Deploy the Cloudflare Sensitive Data Detection ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/#deploy-in-the-dashboard)

Tip

To deploy a managed ruleset for several Enterprise domains in your account, refer to [Deploy a WAF managed ruleset in the dashboard (account)](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/).

## Deploy a managed ruleset

To deploy a managed ruleset for a zone:

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Turn on the managed ruleset(s) you want to deploy:

  * **Cloudflare managed ruleset** \- Deploys the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/).
  * **OWASP Core** \- Deploys the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/).
  * **Sensitive data detection** \- Deploys the [Cloudflare Sensitive Data Detection](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/) managed ruleset.
4. Review the deployment settings. Edit the scope, if necessary, to apply the ruleset to a subset of the incoming requests, or configure any custom settings (also known as overrides).
5. Select **Save**.

This operation deploys the managed ruleset for the current zone, creating a new rule with the _Execute_ action.

To temporarily turn off a managed ruleset without deleting its deployment configuration, use the toggle next to the rule that deploys the managed ruleset.

## Configure a managed ruleset

Configure a managed ruleset to:

* Specify a custom filter expression to apply the rules in the ruleset to a subset of incoming requests.
* Configure (or override) specific settings for one or more rules (for example, configure a rule with an action different from the default action configured by Cloudflare), or turn off those rules.

To skip one or more rules — or even entire managed rulesets — for specific incoming requests, [add an exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/).

Note

Some managed rulesets may not allow custom configuration, depending on your Cloudflare plan.

### Configure all the rules in a managed ruleset

To configure (or override) settings for all the rules in a managed ruleset:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset) to open the deployment configuration page.
5. (Optional) To execute the managed ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.
6. In the ruleset configuration section, define settings for all the rules in the ruleset by setting one or more fields using the drop-down lists.
For example, select the action to perform for all the rules in the ruleset.
7. Select **Save**.

### Configure rules of a managed ruleset with specific tags

To configure (or override) settings of rules tagged with specific tags:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure/browse. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.

1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.

  * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.
  * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

### Configure individual rules of a managed ruleset

To configure (or override) settings of individual rules of a managed ruleset:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure/browse. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.

1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.
3. Select **Next**, and then select **Save**.

### Browse the rules of a managed ruleset

You can browse the available rules in a managed ruleset and search for individual rules or tags.

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Find the managed ruleset you want to browse, and select **View ruleset**.
4. Review the rules and their tags in the side panel.

### Delete a managed ruleset deployment rule or an exception

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure.
4. Next to the managed ruleset deployment rule (execute rule) or exception (skip rule) you want to delete, select the three dots > **Delete** and confirm the operation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#page","headline":"Deploy a WAF managed ruleset in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Deploy WAF managed rulesets at the zone level in the dashboard.","url":"https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
