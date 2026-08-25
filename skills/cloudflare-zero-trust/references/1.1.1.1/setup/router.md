---
description: Configure 1.1.1.1 on your router.
title: Router
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Router

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/setup/router/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Configuring 1.1.1.1 on your router applies the DNS setting to every device on your network. You do not need to change DNS settings on individual phones, computers, or other devices.

1. Go to the **IP address** used to access your router's admin console in your browser.

  * Linksys and Asus routers typically use `http://192.168.1.1` or `http://router.asus.com` (for ASUS).
  * Netgear routers typically use `http://192.168.1.1` or `http://routerlogin.net`.
  * D-Link routers typically use `http://192.168.0.1`.
  * Ubiquiti routers typically use `http://unifi.ubnt.com`.
  * MikroTik routers typically use `http://192.168.88.1`.
2. Enter the router credentials. For consumer routers, the default credentials for the admin console are often found under or behind the device.
3. In the admin console, locate the section where **DNS settings** are configured. This may be contained within categories such as **WAN** and **IPv6** (Asus routers), **IP** (MikroTik routers), or **Internet** (Netgear routers). Consult your router's documentation for details.
4. Take note of any DNS addresses that are currently set and save them in a safe place in case you need to use them later.
5. Depending on what you want to configure, choose one of the following DNS addresses for IPv4:
Use 1.1.1.1 resolver
```txt
1.1.1.1
1.0.0.1
```
Block malware with 1.1.1.1 for Families
```txt
1.1.1.2
1.0.0.2
```
Block malware and adult content with 1.1.1.1 for Families
```txt
1.1.1.3
1.0.0.3
```
6. Depending on what you want to configure, choose one of the following DNS addresses for IPv6:
Use 1.1.1.1 resolver
```txt
2606:4700:4700::1111
2606:4700:4700::1001
```
Block malware with 1.1.1.1 for Families
```txt
2606:4700:4700::1112
2606:4700:4700::1002
```
Block malware and adult content with 1.1.1.1 for Families
```txt
2606:4700:4700::1113
2606:4700:4700::1003
```
7. Save the updated settings.

## Use DNS over TLS on OpenWrt

If your router runs OpenWrt, you can encrypt DNS traffic using DNS over TLS. For setup instructions, refer to [Adding DNS-Over-TLS support to OpenWrt (LEDE) with Unbound ↗](https://blog.cloudflare.com/dns-over-tls-for-openwrt/).

## FRITZ!Box

Starting with [FRITZ!OS 7.20 ↗](https://en.avm.de/press/press-releases/2020/07/fritzos-720-more-performance-convenience-security/), DNS over TLS is supported. Refer to [Configuring different DNS servers in the FRITZ!Box ↗](https://en.avm.de/service/knowledge-base/dok/FRITZ-Box-7590/165%5FConfiguring-different-DNS-servers-in-the-FRITZ-Box/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/setup/router/#page","headline":"Set up 1.1.1.1 on a router · Cloudflare 1.1.1.1 docs","description":"Configure 1.1.1.1 on your router.","url":"https://developers.cloudflare.com/1.1.1.1/setup/router/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
