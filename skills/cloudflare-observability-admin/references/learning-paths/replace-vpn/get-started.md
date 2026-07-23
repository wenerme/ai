---
description: Replace your VPN with Cloudflare Zero Trust.
title: Get started with Zero Trust
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started with Zero Trust

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/replace-vpn/get-started/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this learning path, you will learn how to replace your existing VPN provider with Cloudflare's ZTNA solution. Your users will run the Cloudflare One Client on their devices, and you will run either Cloudflare Tunnel or Cloudflare Mesh in your network or on your application servers. After deploying Zero Trust, users will be able to connect to private resources (not exposed to the Internet) via TCP/UDP/ICMP, and administrators will be able to control access to these resources based on user identity, device posture, and other factors.

![How Cloudflare connects a user device to a private network application](https://developers.cloudflare.com/_astro/cf1-ref-arch-10.PVIlTF5F_1r8ALn.svg)

This guide will highlight best practices to follow and other decisions to consider when planning your deployment. Additionally, each module will include links to the key resources and how-to pages needed to get your deployment up and running.

Note

This learning path focuses on client-based remote access to internal services. If you are looking for clientless or browser-based functionality, refer to our [Deploy clientless access](https://developers.cloudflare.com/learning-paths/clientless-access/concepts/) learning path.

## Objectives

By the end of this module, you will be able to:

* Understand the high-level architecture and requirements for a ZTNA deployment to replace a legacy VPN.
* Set up a Cloudflare account.
* Create a Zero Trust organization to manage your devices and policies.
* Configure an identity provider (IdP) for user authentication.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/get-started/#page","headline":"Get started with Zero Trust · Cloudflare Learning Paths","description":"Replace your VPN with Cloudflare Zero Trust.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
