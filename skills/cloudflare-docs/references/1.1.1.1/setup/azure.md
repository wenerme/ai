---
title: Azure
description: Configure 1.1.1.1 on Microsoft Azure virtual networks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Azure

1. Log in to your Azure portal.
2. From the Azure portal side menu, select **Virtual Networks**.
3. Navigate to the virtual network associated with your virtual machine (VM).
4. Select **DNS Servers** \> **Custom**, and add two entries:  
```  
1.1.1.1  
1.0.0.1  
```
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/azure/","name":"Azure"}}]}
```
