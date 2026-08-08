---
description: Configure 1.1.1.1 on Microsoft Azure virtual networks.
title: Azure
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Azure

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/setup/azure/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

These steps configure 1.1.1.1 as the DNS resolver for an Azure Virtual Network (VNet). This applies to all resources in the VNet, including virtual machines.

1. Log in to your Azure portal.
2. From the Azure portal side menu, select **Virtual Networks**.
3. Select the virtual network you want to configure.
4. Select **DNS Servers** \> **Custom**, and add two entries:
```txt
1.1.1.1
1.0.0.1
```
5. Select **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/setup/azure/#page","headline":"Set up 1.1.1.1 on Azure · Cloudflare 1.1.1.1 docs","description":"Configure 1.1.1.1 on Microsoft Azure virtual networks.","url":"https://developers.cloudflare.com/1.1.1.1/setup/azure/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Azure"]}
```
