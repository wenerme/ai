---
title: Azure
description: Configure 1.1.1.1 on Microsoft Azure virtual networks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Azure

These steps configure 1.1.1.1 as the DNS resolver for an Azure Virtual Network (VNet). This applies to all resources in the VNet, including virtual machines.

1. Log in to your Azure portal.
2. From the Azure portal side menu, select **Virtual Networks**.
3. Select the virtual network you want to configure.
4. Select **DNS Servers** \> **Custom**, and add two entries:  
```  
1.1.1.1  
1.0.0.1  
```
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/azure/","name":"Azure"}}]}
```
