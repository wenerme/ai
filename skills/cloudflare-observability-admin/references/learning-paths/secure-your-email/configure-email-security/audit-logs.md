---
description: Enable email security audit logs via Logpush.
title: Enable audit logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable audit logs

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Email security, you can enable logs to review actions performed on your account.

To enable audit logs:

1. In the Cloudflare dashboard, go to the **Logpush** page.
[Go to **Logpush** ↗](https://dash.cloudflare.com/?to=/:account/logs)
2. Select your storage destination.
3. Select the three dots > **Edit**.
4. Under **Configure logpush job**:

  * **Job name**: Enter the job name, if it is not already prepopulated.
  * **If logs match** \> Select **Filtered logs**:
    * **Field**: Choose `ResourceType`.
    * **Operator**: Choose `starts with`.
    * **Value**: Enter `email_security`.
5. Select **Submit**.

You can now view logs via the Cloudflare dashboard.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/#page","headline":"Enable audit logs · Cloudflare Learning Paths","description":"Enable email security audit logs via Logpush.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
