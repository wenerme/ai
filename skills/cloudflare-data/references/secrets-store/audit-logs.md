---
description: Actions logged for Secrets Store operations, including create, update, and delete.
title: Audit logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt
> Use this file to discover all available pages before exploring further.

# Audit logs

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/secrets-store/audit-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account. This page lists the actions that are logged for Secrets Store.

* Access
* Create
  * Duplicating a secret is presented as a `create` log with a field `duplicated_from_id`.
* Update
  * A boolean `"value_modified": true` is presented when the secret value is edited.
* Delete

For information on how to access and use audit logs, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/audit-logs/#page","headline":"Audit logs · Cloudflare Secrets Store docs","description":"Actions logged for Secrets Store operations, including create, update, and delete.","url":"https://developers.cloudflare.com/secrets-store/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
