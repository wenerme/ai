---
description: Manage tunnel authentication tokens for remote and local tunnels.
title: Tunnel tokens
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Tunnel tokens

Last updated Sep 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/tunnel/reference/tunnel-tokens/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A remotely-managed tunnel only requires a token to run. Anyone with the token can run the tunnel.

## Get the token

To get the token for a remotely-managed tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** > **Tunnels**. [Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select your tunnel.
3. Select **Add a replica**.
4. Copy the `cloudflared` installation command into a text editor (do not run the command). The token is the `eyJ...` string.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Cloudflare One Connectors Write</code>
- <code>Cloudflare One Connector: cloudflared Write</code>
- <code>Cloudflare Tunnel Write</code>

</details>

*Get a Cloudflare Tunnel tokenbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/token" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Rotate a token

Rotate tokens regularly to reduce the risk of compromise. For tunnels with multiple [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability), rotate outside working hours and update replicas in batches.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** > **Tunnels**. [Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select your tunnel.
3. Select **Rotate token**. After rotating the token, `cloudflared` cannot establish new connections with the old token. Existing connectors remain active until restarted.
4. Select **Add replica** and copy the new `cloudflared` installation command.
5. On each replica, reinstall the `cloudflared` service using the new token:

   ```sh
   sudo cloudflared service uninstall
   sudo cloudflared service install <NEW_TOKEN>
   ```



<details>

<summary>

Rotate a compromised token

</summary>

If your tunnel token is compromised, immediately <a href="#rotate-a-token">rotate the token</a>, then force-disconnect all existing connections:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Cloudflare One Connectors Write</code>
- <code>Cloudflare One Connector: cloudflared Write</code>
- <code>Cloudflare Tunnel Write</code>

</details>

*Clean up Cloudflare Tunnel connectionsbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connections" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Then reinstall the <code>cloudflared</code> service on all replicas using the new token.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/reference/tunnel-tokens/#page","headline":"Tunnel tokens","description":"Manage tunnel authentication tokens for remote and local tunnels.","url":"https://developers.cloudflare.com/tunnel/reference/tunnel-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
```
