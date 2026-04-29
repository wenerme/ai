---
title: Default password
description: Information about Cloudflare One Appliance's default password.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Default password

Cloudflare One Appliance (formerly Magic WAN Connector) ships to you with a default password that enables you to access the hardware box or the virtual machine. Cloudflare recommends that you change this password after the first boot.

## Default password to access hardware Cloudflare One Appliance

The default password for Cloudflare One Appliance is the serial number (also known as a Service Tag for Dell devices), all uppercase followed by an `!` (exclamation mark). For example, `A1B2C3D!`

## Default password to access Virtual Appliance

The default password for Virtual Appliance is the last seven characters of your license key, all uppercase, plus an `!` (exclamation mark).

For example, if your license key is `mconn-abcdefghijklmnopqrstuvwxyz`, your default password will be `TUVWXYZ!`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/appliance/","name":"Configure with Appliance"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/appliance/maintenance/","name":"Maintenance"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-wan/configuration/appliance/maintenance/default-password/","name":"Default password"}}]}
```
