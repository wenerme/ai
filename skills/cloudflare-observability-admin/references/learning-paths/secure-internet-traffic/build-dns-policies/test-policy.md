---
description: Test Gateway DNS policy enforcement.
title: Test a policy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Test a policy

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/test-policy/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

It is common for a misconfigured Gateway policy to accidentally block traffic to benign sites. To ensure a smooth deployment, we recommend testing a simple policy before deploying DNS filtering to your organization.

## Test a policy in the browser

1. Go to **Traffic policies** \> **Firewall policies**.
2. Turn off all existing DNS policies.
3. Turn on any existing security policies or create a policy to block all security categories:

| Selector            | Operator | Value                | Action |
| ------------------- | -------- | -------------------- | ------ |
| Security Categories | in       | _All security risks_ | Block  |
4. Ensure that your browser is not configured to use an alternate DNS resolver. For example, Chrome has a **Use secure DNS** setting that will cause the browser to send requests to 1.1.1.1 and bypass your DNS policies.
5. In the browser, go to `malware.testcategory.com`. Your browser will display:
  * The Gateway block page, if your device is connected through the Cloudflare One Client in Traffic and DNS mode.
  * A generic error page, if your device is connected through another method, such as DNS only mode.

Note

[Custom block pages](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) require you to install a root certificate on the device.

1. In **Logs** \> **Gateway** \> **DNS**, verify that you see the blocked domain.
2. Slowly turn on or add other policies to your configuration.
3. When testing against frequently-visited sites, you may need to [clear the DNS cache](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/test-dns-filtering/#clear-dns-cache) in your browser or OS. Otherwise, the DNS lookup will return the locally-cached IP address and bypass your DNS policies.

You have now validated DNS filtering on a test device.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/test-policy/#page","headline":"Test a policy · Cloudflare Learning Paths","description":"Test Gateway DNS policy enforcement.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-dns-policies/test-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
