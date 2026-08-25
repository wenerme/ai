---
description: Use Cloudflare Tunnel to share locally running Pages projects over a public URL.
title: Preview Local Projects with Cloudflare Tunnel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Preview Local Projects with Cloudflare Tunnel

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) runs a lightweight daemon (`cloudflared`) in your infrastructure that establishes outbound connections (Tunnels) between your origin web server and the Cloudflare global network. In practical terms, you can use Cloudflare Tunnel to allow remote access to services running on your local machine. It is an alternative to popular tools like [Ngrok ↗](https://ngrok.com), and provides free, long-running tunnels via the [TryCloudflare](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/) service.

While Cloudflare Pages provides unique [deploy preview URLs](https://developers.cloudflare.com/pages/configuration/preview-deployments/) for new branches and commits on your projects, Cloudflare Tunnel can be used to provide access to locally running applications and servers during the development process. In this guide, you will install Cloudflare Tunnel, and create a new tunnel to provide access to a locally running application. You will need a Cloudflare account to begin using Cloudflare Tunnel.

## Installing Cloudflare Tunnel

Cloudflare Tunnel can be installed on Windows, Linux, and macOS. To learn about installing Cloudflare Tunnel, refer to the [Install cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page in the Cloudflare for Teams documentation.

Confirm that `cloudflared` is installed correctly by running `cloudflared --version` in your command line:

```sh
cloudflared --version
```

```sh
cloudflared version 2021.5.9 (built 2021-05-21-1541 UTC)
```

## Run a local service

The easiest way to get up and running with Cloudflare Tunnel is to have an application running locally, such as a [React](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) or [SvelteKit](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/) site. When you are developing an application with these frameworks, they will often make use of a `npm run develop` script, or something similar, which mounts the application and runs it on a `localhost` port. For example, the popular `vite` tool runs your in-development React application on port `5173`, making it accessible at the `http://localhost:5173` address.

## Start a Cloudflare Tunnel

With a local development server running, a new Cloudflare Tunnel can be instantiated by running `cloudflared tunnel` in a new command line window, passing in the `--url` flag with your `localhost` URL and port. `cloudflared` will output logs to your command line, including a banner with a tunnel URL:

```sh
cloudflared tunnel --url http://localhost:5173
```

```sh
2021-07-15T20:11:29Z INF Cannot determine default configuration path. No file [config.yml config.yaml] in [~/.cloudflared ~/.cloudflare-warp ~/cloudflare-warp /etc/cloudflared /usr/local/etc/cloudflared]
2021-07-15T20:11:29Z INF Version 2021.5.9
2021-07-15T20:11:29Z INF GOOS: linux, GOVersion: devel +11087322f8 Fri Nov 13 03:04:52 2020 +0100, GoArch: amd64
2021-07-15T20:11:29Z INF Settings: map[url:http://localhost:5173]
2021-07-15T20:11:29Z INF cloudflared will not automatically update when run from the shell. To enable auto-updates, run cloudflared as a service: https://developers.cloudflare.com/argo-tunnel/reference/service/
2021-07-15T20:11:29Z INF Initial protocol h2mux
2021-07-15T20:11:29Z INF Starting metrics server on 127.0.0.1:42527/metrics
2021-07-15T20:11:29Z WRN Your version 2021.5.9 is outdated. We recommend upgrading it to 2021.7.0
2021-07-15T20:11:29Z INF Connection established connIndex=0 location=ATL
2021-07-15T20:11:32Z INF Each HA connection's tunnel IDs: map[0:cx0nsiqs81fhrfb82pcq075kgs6cybr86v9vdv8vbcgu91y2nthg]
2021-07-15T20:11:32Z INF +-------------------------------------------------------------+
2021-07-15T20:11:32Z INF |  Your free tunnel has started! Visit it:                    |
2021-07-15T20:11:32Z INF |    https://seasonal-deck-organisms-sf.trycloudflare.com     |
2021-07-15T20:11:32Z INF +-------------------------------------------------------------+
```

In this example, the randomly-generated URL `https://seasonal-deck-organisms-sf.trycloudflare.com` has been created and assigned to your tunnel instance. Visiting this URL in a browser will show the application running, with requests being securely forwarded through Cloudflare's global network, through the tunnel running on your machine, to `localhost:5173`:

![Cloudflare Tunnel example rendering a randomly-generated URL](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2078,height=1699,format=webp/_astro/tunnel.DK_OjmvC.png)

## Next Steps

Cloudflare Tunnel can be configured in a variety of ways and can be used beyond providing access to your in-development applications. For example, you can provide `cloudflared` with a [configuration file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/) to add more complex routing and tunnel setups that go beyond a simple `--url` flag. You can also [attach a Cloudflare DNS record](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) to a domain or subdomain for an easily accessible, long-lived tunnel to your local machine.

Finally, by incorporating Cloudflare Access, you can provide [secure access to your tunnels](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) without exposing your entire server, or compromising on security. Refer to the [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/) to learn more about what you can do with Cloudflare's entire suite of Zero Trust tools.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/#page","headline":"Preview Local Projects with Cloudflare Tunnel · Cloudflare Pages docs","description":"Use Cloudflare Tunnel to share locally running Pages projects over a public URL.","url":"https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
