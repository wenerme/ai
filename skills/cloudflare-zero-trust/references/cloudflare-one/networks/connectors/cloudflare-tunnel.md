---
description: How Cloudflare Tunnel works in Zero Trust networking.
title: Cloudflare Tunnel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Tunnel

Last updated Aug 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Looking to expose public applications?

This documentation covers Cloudflare Tunnel use cases for private networking and Zero Trust, like VPN replacement and private network access. For publishing public web applications, APIs, and services to the Internet through Cloudflare refer to the [Cloudflare Tunnel documentation](https://developers.cloudflare.com/tunnel).

Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address. With Tunnel, you do not send traffic to an external IP — instead, a lightweight daemon in your infrastructure (`cloudflared`) creates [outbound-only connections](#outbound-only-connections) to Cloudflare's global network. Cloudflare Tunnel can connect HTTP web servers, [SSH servers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/), [remote desktops](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/), and other protocols safely to Cloudflare. This way, your origins can serve traffic through Cloudflare without being vulnerable to attacks that bypass Cloudflare.

Refer to our [reference architecture](https://developers.cloudflare.com/reference-architecture/architectures/sase/) for details on how to implement Cloudflare Tunnel into your existing infrastructure.

## How it works

`cloudflared` establishes [outbound connections](#outbound-only-connections) (tunnels) between your resources and Cloudflare's global network. A tunnel is a persistent object identified by a UUID — it serves as the logical link between your origin and Cloudflare. Within the same tunnel, you can run as many `cloudflared` processes ([connectors](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/#connector)) as needed. Each connector sends traffic to the nearest Cloudflare data center.

![How an HTTP request reaches a private application connected with Cloudflare Tunnel](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1768,height=1102,format=webp/_astro/handshake.eh3a-Ml1.jpg)

### Outbound-only connections

Cloudflare Tunnel uses an outbound-only connection model to enable bidirectional communication. When you install and run `cloudflared`, `cloudflared` initiates an outbound connection through your firewall from the origin to the Cloudflare global network.

Once the connection is established, traffic flows in both directions over the tunnel between your origin and Cloudflare. Most firewalls allow outbound traffic by default. `cloudflared` takes advantage of this standard by connecting out to the Cloudflare network from the server you installed `cloudflared` on. You can then configure your firewall to allow only these outbound connections and block all inbound traffic, effectively blocking access to your origin from anything other than Cloudflare. This setup ensures that all traffic to your origin is securely routed through the tunnel.

Authenticated Origin Pulls does not apply

Because Cloudflare Tunnel does not use an inbound listener on your origin, [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) has no effect on hostnames routed through Cloudflare Tunnel. Origin traffic is already authenticated using your tunnel's connector credentials.

## Next steps

* Create a tunnel using the [Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or [API](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/).
* [Download cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/), the server-side daemon that connects your infrastructure to Cloudflare.
* Review useful [Tunnel terms](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/) to familiarize yourself with the concepts used in Tunnel documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/#page","headline":"Cloudflare Tunnel · Cloudflare One docs","description":"How Cloudflare Tunnel works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Video","Private networks"]}
```
