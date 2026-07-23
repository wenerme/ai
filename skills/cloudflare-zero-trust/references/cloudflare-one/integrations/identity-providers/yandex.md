---
description: Yandex in Zero Trust integrations.
title: Yandex
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Yandex

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/yandex/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Yandex is a web search engine that also offers identity provider (IdP) services.

## Set up Yandex

To set up Yandex for Cloudflare Access:

1. Log in to your Yandex account.
2. Select **Open a new OAuth Application**.
3. Select **New client**.
4. Complete the required fields.
5. Choose **Yandex.Passport API** to set the basic scopes.
6. Select the **Access to email address**, **Access to user avatar,** and **Access to username, first name and surname, gender** options.
7. Select **Platform** and select **Web Services.**
8. In the **Callback URL #1** field, enter the following URL:
```txt
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
```
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
![Yandex Platform interface with Web services checked and callback URI in open form field](https://developers.cloudflare.com/_astro/yandex-3.DteBNxdB_1qShkV.webp)
9. Select **Add**.
10. Scroll to the **Platforms** card, and select **Submit**.

**Yandex OAuth** card titled **Cloudflare Access App** displays.
11. Copy the **ID** and **Password**.
12. In Cloudflare One, go to **Integrations** \> **Identity providers**.
13. Under **Your identity providers**, select **Add new identity provider**.
14. Select Yandex.
15. Paste the ID and password in the appropriate fields.
16. Select **Save**.

## Example API Config

```json
{
	"config": {
		"client_id": "<your client id>",
		"client_secret": "<your client secret>"
	},
	"type": "yandex",
	"name": "my example idp"
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/yandex/#page","headline":"Yandex · Cloudflare One docs","description":"Yandex in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/yandex/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
```
