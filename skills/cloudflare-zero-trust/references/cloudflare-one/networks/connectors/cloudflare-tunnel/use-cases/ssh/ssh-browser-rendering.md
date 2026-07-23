---
description: Connect to SSH in the browser in Zero Trust networking.
title: Connect to SSH in the browser
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to SSH in the browser

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-browser-rendering/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare's browser-based terminal allows end users to connect to an SSH server without managing SSH keys or installing the Cloudflare One Client.

This method requires routing SSH access to the server through a public hostname. The traffic is proxied over this connection, and the user logs in to the server with their Cloudflare Access credentials.

The browser-based terminal can be used in conjunction with [the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/) and [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) so that there are multiple ways to connect to the server. You can reuse the same Cloudflare Tunnel when configuring each connection method.

## 1\. Connect the server to Cloudflare

1. Create a Cloudflare Tunnel by following our [dashboard setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).
2. In the Cloudflare dashboard, go to **Networking** \> **Tunnels** and select your tunnel.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
3. On the **Routes** tab, select **Add route**, then select **Published application**.
4. Choose a domain from the drop-down menu and specify any subdomain (for example, `ssh.example.com`).
5. For **Service**, select _SSH_ and enter `localhost:22`. If the SSH server is on a different machine from where you installed the tunnel, enter `<server IP>:22`.
6. Select **Add route**.
7. (Recommended) Add a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) to Cloudflare Access in order to manage access to your server.

## 2\. Connect as a user

To enable browser-rendering for SSH, refer to [Browser-rendered terminal](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/).

When users visit the public hostname URL (for example, `https://ssh.example.com`) and log in with their Access credentials, Cloudflare will render a terminal in their browser.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-browser-rendering/#page","headline":"Connect to SSH in the browser · Cloudflare One docs","description":"Connect to SSH in the browser in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-browser-rendering/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH"]}
```
