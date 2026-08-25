---
description: Deploy WAF managed rulesets per custom hostname using WAF for SaaS.
title: Managed rulesets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Managed rulesets

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/managed-rulesets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you are interested in [WAF for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/) but unsure of where to start, Cloudflare recommends using WAF Managed Rules. The Cloudflare security team creates and manages a variety of rules designed to detect common attack vectors and protect applications from vulnerabilities. These rules are offered in [managed rulesets](https://developers.cloudflare.com/waf/managed-rules/), like Cloudflare Managed and OWASP, which can be deployed with different settings and sensitivity levels.

---

## Prerequisites

WAF for SaaS is available for customers on an Enterprise plan.

If you would like to deploy a managed ruleset at the account level, refer to the [WAF documentation](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/).

Ensure you have reviewed [Get Started with Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) and familiarize yourself with [WAF for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/).

Customers can automate the [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/) tagging by adding it to the custom hostnames at creation. For more information on tagging a custom hostname with custom metadata, refer to the [API documentation](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/).

---

## 1\. Choose security tagging system

1. Outline `security_tag` buckets. These are fully customizable with no strict limit on quantity. For example, you can set `security_tag` to `low`,`medium`, and `high` as a default, with one tag per custom hostname.
2. If you have not already done so, [associate your custom metadata to custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/#1-associate-custom-metadata-to-a-custom-hostname) by including the `security_tag`in the custom metadata associated with the custom hostname. The JSON blob associated with the custom hostname is fully customizable.

After the association is complete, the JSON blob is added to the defined custom hostname. This blob is then associated to every incoming request and exposed in the WAF through the [cf.hostname.metadata](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.hostname.metadata/) field. In the rule, you can access `cf.hostname.metadata` and get the data you need from that blob.

---

## 2\. Deploy rulesets

Note

Account-level WAF requires an Enterprise plan with a paid add-on.

1. In the Cloudflare dashboard, go to the **WAF** page.
[Go to **WAF** ↗](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. Select **Deploy** \> **Deploy managed ruleset**.
4. Next to **Cloudflare Managed Ruleset**, choose **Select ruleset**.
5. Give a name to the rule deploying the ruleset in **Execution name**.
6. Select **Edit scope** to execute the managed ruleset for a subset of incoming requests.
7. Select **Custom filter expression**.
8. Select **Edit expression** to switch to the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).
9. The basic expression should look like this, plus any logic you would like to add (like filtering by a specific custom hostname with `http.host eq "<HOSTNAME>"`):
```txt
(lookup_json_string(cf.hostname.metadata, "security_tag") eq "low") and (cf.zone.plan eq "ENT")
```
Note
Rulesets deployed at the account level will only apply to incoming traffic of Enterprise domains on your account. When you define a custom expression using the Expression Editor, use parentheses to enclose any custom conditions and end your expression with `and (cf.zone.plan eq "ENT")` so that the rule only applies to domains on an Enterprise plan.
10. Select **Next**.
11. (Optional) You can modify the ruleset configuration by changing, for example, what rules are enabled or what action should be the default.
12. Select **Deploy**.

## Next steps

While this guide uses the Cloudflare Managed Ruleset, you can also create a custom ruleset and deploy on your custom hostnames. To do this, go to the **Custom rulesets** tab and select **Create ruleset**. For examples of a low/medium/high ruleset, refer to [WAF for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/managed-rulesets/#page","headline":"Managed rulesets per custom hostname · Cloudflare for Platforms docs","description":"Deploy WAF managed rulesets per custom hostname using WAF for SaaS.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/waf-for-saas/managed-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
