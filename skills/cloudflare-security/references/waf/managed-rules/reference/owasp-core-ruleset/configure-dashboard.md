---
description: Configure the OWASP Core Ruleset in the dashboard.
title: Configure in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure in the dashboard

Last updated Aug 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the [OWASP ModSecurity Core Rule Set ↗](https://owasp.org/www-project-modsecurity-core-rule-set/) (CRS). It is designed to work as a single entity to calculate a [threat score](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score) and execute an action based on that score.

Tip

Learn more about the [concepts](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/) around the OWASP Core Ruleset and check out the [ruleset evaluation example](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/).

## Deploy the Cloudflare OWASP Core Ruleset

1. In the Cloudflare dashboard, go to the Security **Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Turn on **OWASP core ruleset**.
4. Review the deployment settings. Edit the scope, if necessary, to apply the ruleset to a subset of the incoming requests, or configure any custom settings (also known as overrides).
5. Select **Save**.

This operation deploys the managed ruleset for the current zone, creating a new rule with the _Execute_ action.

## Configure in the dashboard

You can configure (or override) the Cloudflare OWASP Core Ruleset, overriding its default configuration, at several levels:

* [Ruleset level](#ruleset-level-configuration)
* [Tag level](#tag-level-configuration)
* [Rule level](#rule-level-configuration)

More specific configurations (rule and tag level) have greater priority than less specific configurations (ruleset level).

### Ruleset-level configuration

You can configure (or override) the following Cloudflare OWASP Core Ruleset settings in the Cloudflare dashboard:

* **Scope**: When you specify a custom filter expression, the Cloudflare OWASP Core Ruleset applies only to a subset of the incoming requests. By default, a managed ruleset deployed in the dashboard applies to all incoming traffic.
* **[Paranoia level](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#paranoia-level)**: The paranoia level (PL) classifies OWASP rules according to their aggressiveness, varying from _PL1_ to _PL4_, where _PL4_ is the most strict level. The available levels are:
  * _PL1_ (default)
  * _PL2_
  * _PL3_
  * _PL4_
* **[Score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold)**: The score threshold (or anomaly threshold) defines the minimum cumulative score — obtained from matching OWASP rules — for the WAF to apply the configured OWASP ruleset action. The available thresholds are:
  * _Low - 60 and higher_
  * _Medium - 40 and higher_ (default)
  * _High - 25 and higher_
* **OWASP action**: The action to perform when the calculated [request threat score](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score) is greater than the [score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold). The available actions are: _Block_, _Log_, _Non-Interactive Challenge_, _Managed Challenge_, and _Interactive Challenge_.
* **[Payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure/)**: When enabled, logs the request information (payload) that triggered a specific rule of the managed ruleset. You must configure a public key to encrypt the payload.

Once you have [deployed the Cloudflare OWASP Core Ruleset](#deploy-in-the-dashboard), do the following to configure it in the dashboard:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for **Cloudflare OWASP Core Ruleset**. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset) to open the deployment configuration page.
5. (Optional) To execute the Cloudflare OWASP Core Ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.
6. In the ruleset configuration section, define settings for all the rules in the Cloudflare OWASP Core Ruleset by setting one or more fields using the drop-down lists.
For example, select the action to perform for all the rules in the ruleset.
![The Configure deployment page displaying the available options to override all the rules in the OWASP Core Ruleset: OWASP Anomaly Score Threshold, OWASP Paranoia Level, and OWASP Action.](https://developers.cloudflare.com/_astro/ruleset-config-owasp-core-ruleset.mDp-LOkW_2rGR87.webp)
7. Select **Save**.

### Tag-level configuration

You can configure (or override) the following setting in the dashboard for OWASP Core Ruleset rules tagged with at least one of the selected tags:

* **Rule status**: Sets the rule status (enabled or disabled) for all the rules with the selected tags. To remove the action override at the tag level, set the action to _Default_.

Note

Setting the rule status for specific tags affects all current and future rules with the tags you selected.

Once you have [deployed the Cloudflare OWASP Core Ruleset](#deploy-in-the-dashboard), do the following to configure rules with specific tags in the dashboard:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for **Cloudflare OWASP Core Ruleset**. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.
![The Cloudflare dashboard displaying the list of rules in the Cloudflare OWASP Core Ruleset.](https://developers.cloudflare.com/_astro/rules-config-owasp-core-ruleset.TLx_hlPy_1FxxTc.webp)

1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.
![The Configure deployment page displaying selected rules with the 'attack-xss' tag in the Cloudflare OWASP Core Ruleset.](https://developers.cloudflare.com/_astro/tags-config-owasp-core-ruleset.DNxlhwVX_1HV2zC.webp)
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.

  * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.
  * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

### Rule-level configuration

You can configure (or override) the following setting in the dashboard for the selected OWASP Core Ruleset rules:

* **Rule status**: Sets the status (enabled or disabled) of a single rule or, if you select multiple rules, for the selected rules.

Once you have [deployed the Cloudflare OWASP Core Ruleset](#deploy-in-the-dashboard), do the following to configure individual ruleset rules in the dashboard:

1. In the Cloudflare dashboard, go to the **Security rules** page.
[Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for **Cloudflare OWASP Core Ruleset**. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.
![The Cloudflare dashboard displaying the list of rules in the Cloudflare OWASP Core Ruleset.](https://developers.cloudflare.com/_astro/rules-config-owasp-core-ruleset.TLx_hlPy_1FxxTc.webp)

1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.
![The Configure deployment page displaying selected rules in the Cloudflare OWASP Core Ruleset.](https://developers.cloudflare.com/_astro/tags-config-owasp-core-ruleset.DNxlhwVX_1HV2zC.webp)
3. Select **Next**, and then select **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#page","headline":"Configure the OWASP ruleset in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Configure the OWASP Core Ruleset in the dashboard.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
