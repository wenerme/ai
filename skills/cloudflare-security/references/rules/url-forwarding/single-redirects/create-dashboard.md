---
description: Create Single Redirect rules in the Cloudflare dashboard.
title: Create a redirect rule in the dashboard
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a redirect rule in the dashboard

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

1. In the Cloudflare dashboard, go to the Rules **Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** \> **Redirect Rule**.
3. (Optional) Select one of the rule templates that address common use cases. Then, review and adjust the proposed rule configuration.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select one of the following options:

  * **Wildcard pattern**: The rule will only apply to traffic matching the wildcard pattern.
    * **Request URL**: Enter the [wildcard pattern](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#wildcard-matching) using the asterisk (`*`) character to match multiple requests. For example, `http*://*.example.com/files/*`.
    * **Then**: Define the [URL redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/) including:
      * **Target URL**: Enter the target URL, which can be static (for example, `https://example.com`) or dynamic (for example, `https://example.com/${1}/files/${2}`). Use [wildcard replacement](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) such as `${1}` and `${2}` to define dynamic target URLs.
      * **Status code**: Select the status code for the redirect (for example, `301`).
      * **Preserve query string**: Choose whether to keep the query string from the original request.
  * **All incoming requests**: The rule will apply to all traffic.
    * **Then**: Define the [URL redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/) for all incoming requests.
  * **Custom filter expression**: The rule will only apply to traffic matching a custom expression. Define the [rule expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) to configure which requests should be redirected.
    * **Then**: Define the [URL redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/) for requests matching the custom rule expression.
6. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

Note

Single Redirects require that the incoming traffic for the hostname referenced in visitors' requests is [proxied by Cloudflare](https://developers.cloudflare.com/dns/proxy-status/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/#page","headline":"Create a redirect rule in the dashboard · Cloudflare Rules docs","description":"Create Single Redirect rules in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
