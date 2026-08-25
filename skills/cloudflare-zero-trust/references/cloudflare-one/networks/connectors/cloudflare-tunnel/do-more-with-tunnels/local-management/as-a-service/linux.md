---
description: Linux in Zero Trust networking.
title: Linux
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Linux

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/linux/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can install `cloudflared` as a system service on Linux.

## Prerequisites

Before you install Cloudflare Tunnel as a service on Linux, follow Steps 1 through 4 of the [Tunnel CLI setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/). At this point you should have a named tunnel and a `config.yml` file in your `.cloudflared` directory.

## 1\. Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/). At a minimum you must specify the following arguments to run as a service:

| Argument         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| tunnel           | The UUID of your tunnel                              |
| credentials-file | The location of the credentials file for your Tunnel |

## 2\. Run `cloudflared` as a service

1. Install the `cloudflared` service.
```sh
cloudflared service install
```
Note
Installing the `cloudflared` systemd service on Linux typically requires elevated privileges. When the install command is run with `sudo`, `$HOME` points to `/root`, which may prevent `cloudflared` from locating a configuration file created in `/home/<USER>/.cloudflared/config.yml`. In this case, the config path can be passed explicitly:
```sh
sudo cloudflared --config /home/<USER>/.cloudflared/config.yml service install
```
2. Start the service.
```sh
systemctl start cloudflared
```
3. (Optional) View the status of the service.
```sh
systemctl status cloudflared
```

## Next steps

You can now [route traffic through your tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

```sh
systemctl restart cloudflared
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/linux/#page","headline":"Run as a service on Linux · Cloudflare One docs","description":"Linux in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/linux/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Linux"]}
```
