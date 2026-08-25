---
description: Create a WAF rule using Cloudforce One threat intelligence fields.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Jun 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/threat-intelligence/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Before you begin

* Your account must have an active [Cloudforce One subscription](https://developers.cloudflare.com/security-center/cloudforce-one/). Contact your account team for access.
* The [WAF](https://developers.cloudflare.com/waf/) must be enabled on your zone.

## 1\. Create a rule from Threat Events

The fastest way to create a threat intelligence rule is from a saved view in the [Threat Events](https://developers.cloudflare.com/security-center/cloudforce-one/) dashboard. Filter the threats you care about, then export the filters directly to a WAF rule.

1. In the Threat Events dashboard, build a saved view with the filters you want to act on (for example, _IPs targeting the financial sector in the last seven days_).
2. Export the saved view to a WAF rule. Cloudflare generates a custom rule expression that matches the saved view filters.
3. Review the generated rule. Set the action to _Log_ to validate matches before enforcing.
4. Deploy the rule.

## 2\. Review matches in Security Analytics

Once the rule is deployed, matches appear in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/). You can see the threat event details — including threat actors, target industries, and countries — directly in the analytics view.

1. In the Cloudflare dashboard, go to the **Analytics** page.
[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Review the threat intelligence matches. Use the threat event details to decide which categories of traffic to block or challenge.

If no matches appear after deploying the rule, contact your account team to verify your Cloudforce One subscription is active.

## 3\. Switch to Block or Managed Challenge

Once you are confident in the match patterns, update the rule action from _Log_ to _Block_ or _Managed Challenge_.

For more examples, refer to [Example rules](https://developers.cloudflare.com/waf/detections/threat-intelligence/example-rules/). For the full field list, refer to [Threat intelligence fields](https://developers.cloudflare.com/waf/detections/threat-intelligence/fields/).

## 4\. (Alternative) Create a rule manually

If you prefer to write expressions directly, you can create a rule from the dashboard or the API.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** \> **Security rules**.
3. Select **Create rule** \> **Custom rules**.
4. Enter a rule name.
5. Select **Edit expression** and enter an expression using threat intelligence fields. For example:
```txt
any(cf.intel.ip.target_countries[*] == "FR") and any(cf.intel.ip.datasets[*] == "ddos")
```
6. Set the action to _Log_ to validate matches before enforcing.
7. Select **Deploy**.

Threat intelligence fields work with the [Cloudflare API](https://developers.cloudflare.com/api/resources/rulesets/) and the [Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs). To create a custom rule via the API, refer to [Create a custom rule via API](https://developers.cloudflare.com/waf/custom-rules/create-api/).

Use the following expression to match IP addresses associated with DDoS activity targeting France:

```txt
any(cf.intel.ip.target_countries[*] == "FR") and any(cf.intel.ip.datasets[*] == "ddos")
```

Set the action to `log` to validate matches before enforcing.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/threat-intelligence/get-started/#page","headline":"Get started · Cloudflare Web Application Firewall (WAF) docs","description":"Create a WAF rule using Cloudforce One threat intelligence fields.","url":"https://developers.cloudflare.com/waf/detections/threat-intelligence/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Threat Intelligence"]}
```
