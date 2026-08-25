---
description: Create a tunnel (dashboard) in Zero Trust networking.
title: Create a tunnel (dashboard)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a tunnel (dashboard)

Last updated Jun 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Follow this step-by-step guide to create your first [remotely-managed tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/#remotely-managed-tunnel).

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## 1\. Create a tunnel

1. Log in to the Cloudflare dashboard and go to **Networking** \> **Tunnels**.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select **Create a tunnel**.
3. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
4. Select **Create Tunnel**.
5. Choose your operating system, then copy the installation command and run it in a terminal on your origin server.
6. Wait for the tunnel to connect. Once the connection is established, select **Continue**.

The next steps depend on whether you want to [publish an application to the Internet](#2a-publish-an-application) or [connect a private network](#2b-connect-a-network).

## 2a. Publish an application

Follow these steps to publish an application to the Internet. If you are looking to connect a private resource, skip to the [Connect a network](#2b-connect-a-network) section.

Prerequisites

Before you publish an application through your tunnel, you must [add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

After creating your tunnel, add a published application route:

1. Go to **Networking** \> **Tunnels**, then select your tunnel.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. On the **Routes** tab, select **Add route**, then select **Published application**.
3. Enter a subdomain and select a **Domain** from the drop-down menu. Specify any subdomain or path information.
Note
If you add a multi-level subdomain (more than one level of subdomain), you must [order an Advanced Certificate for the hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#i-see-this-site-cant-provide-a-secure-connection).
4. In **Service URL**, enter the protocol and address of your application (for example, `http://localhost:8000`). Refer to [supported protocols](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/) for available options.
5. Select **Save**.

Anyone on the Internet can now access the application at the specified hostname. To allow or block specific users, [create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

## 2b. Connect a network

To connect a private network through your tunnel, add a CIDR route:

1. Go to **Networking** \> **Routes**.
[Go to **Routes** ↗](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
2. Select **Create route**, then choose **Tunnel CIDR**.
3. Select the tunnel you just created.
4. In **Network**, enter the private IP address or CIDR range of your service (for example, `10.0.0.1` or `10.0.0.0/24`).
5. Select **Create route**.

`cloudflared` can now route traffic to these destination IPs. To configure Zero Trust policies and connect as a user, refer to [Connect an IP/CIDR](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/).

Note

If you would like to route to a private application using its hostname instead of its IP, refer to [Connect a private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/).

## 3\. View your tunnel

After saving the tunnel, you will be redirected to the **Networking** \> **Tunnels** page. Your tunnel should be listed with a `Healthy` status. If your tunnel status is `Inactive`, `Down`, or `Degraded`, refer to the [troubleshooting documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status) for recommended next steps.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#page","headline":"Create a tunnel (dashboard) · Cloudflare One docs","description":"Create a tunnel (dashboard) in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
