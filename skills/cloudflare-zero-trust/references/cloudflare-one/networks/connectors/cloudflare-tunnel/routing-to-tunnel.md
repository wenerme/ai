---
description: How Published applications works in Zero Trust networking.
title: Published applications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Published applications

Last updated Jun 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare Tunnel allows you to publish local applications to the Internet via a public hostname. For example, you can [add a published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application) that points `docs.example.com` to `https://localhost:8080`. Anyone can now view your application by going to `docs.example.com` in their web browser.

Cloudflare can route traffic down your Cloudflare Tunnel using a [DNS record](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) or [Cloudflare Load Balancer](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/). You can configure either option from the Cloudflare dashboard by pointing a DNS `CNAME` record or a load balancer pool to your Cloudflare Tunnel subdomain (`<UUID>.cfargotunnel.com`). You can also associate these records with your tunnel from `cloudflared` directly.

For TCP or UDP applications, Cloudflare can also route traffic through a [Spectrum application](https://developers.cloudflare.com/spectrum/get-started/#create-a-spectrum-application-using-a-virtual-network-origin) attached to a [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/).

Note

You do not need a paid Cloudflare Access plan to publish an application via Cloudflare Tunnel. [Access seats](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) are only required if you want to [secure the application using Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), such as requiring users to log in via an identity provider.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/#page","headline":"Published applications · Cloudflare One docs","description":"How Published applications works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
