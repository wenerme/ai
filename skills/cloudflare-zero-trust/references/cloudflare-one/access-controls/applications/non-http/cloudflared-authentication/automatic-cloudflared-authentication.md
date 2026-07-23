---
description: Enable automatic cloudflared authentication in Access.
title: Enable automatic cloudflared authentication
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable automatic cloudflared authentication

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When users connect to an Access application through `cloudflared`, the browser prompts them to allow access by displaying this page:

![Access request prompt page displayed after logging in with cloudflared.](https://developers.cloudflare.com/_astro/access-screen.BXZJ23p9_Mn6VE.webp)

Automatic `cloudflared` authentication allows users to skip this login page if they already have an active IdP session.

To enable automatic `cloudflared` authentication:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate your application and select **Configure**.
3. Go to **Authentication**.
4. Turn on **Allow automatic Cloudflared authentication**.
5. Select **Save**.

This option will still prompt a browser window in the background, but authentication will now happen automatically.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/#page","headline":"Enable automatic cloudflared authentication · Cloudflare One docs","description":"Enable automatic cloudflared authentication in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/automatic-cloudflared-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
```
