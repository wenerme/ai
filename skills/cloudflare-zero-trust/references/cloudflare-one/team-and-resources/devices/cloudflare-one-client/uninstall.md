---
description: Uninstall the Cloudflare One Client in Zero Trust.
title: Uninstall the Cloudflare One Client
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Uninstall the Cloudflare One Client

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following procedures will uninstall the Cloudflare One Client (formerly WARP) from your device. If you used the Cloudflare One Client to deploy a root certificate, the certificate will also be removed.

## Windows

1. Go to Windows Settings (Windows Key + I).
2. Select **Apps**.
3. Select **Installed Apps**.
4. Scroll to find the Cloudflare One Client application, click the three dots (...), and select **Uninstall**.

## macOS

We include an uninstall script as part of the macOS package that you originally used.

1. To find and run the uninstall script, run the following commands:

```sh
cd /Applications/Cloudflare\ WARP.app/Contents/Resources
./uninstall.sh
```

1. If prompted, enter your admin credentials to proceed with the uninstall.

Note

You can bypass the **Are you sure** prompt by passing `-f` as a parameter to the macOS uninstall command.

## Linux

On CentOS 8, RHEL 8:

```sh
sudo yum remove cloudflare-warp
```

On Ubuntu 18.04, Ubuntu 20.04, Ubuntu 22.04, Debian 9, Debian 10, Debian 11:

```sh
sudo apt remove cloudflare-warp
```

## iOS and Android

1. Find the Cloudflare One Agent application (or the legacy 1.1.1.1 application) on the home screen.
2. Select and hold the application tile, and then select **Remove App**.
3. Select **Delete App**.

Note

If you [manually deployed a Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/), remember to manually delete the certificate from the device.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/#page","headline":"Uninstall the Cloudflare One Client · Cloudflare One docs","description":"Uninstall the Cloudflare One Client in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
