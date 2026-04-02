---
title: Router
description: It is possible to encrypt DNS traffic out from your router using DNS-over-TLS if it is running OpenWrt. For more details, see our blog post on the topic: Adding DNS-Over-TLS support to OpenWrt (LEDE) with Unbound.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/setup/router.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Router

1. Go to the **IP address** used to access your router's admin console in your browser.  
   * Linksys and Asus routers typically use `http://192.168.1.1` or `http://router.asus.com` (for ASUS).  
   * Netgear routers typically use `http://192.168.1.1` or `http://routerlogin.net`.  
   * D-Link routers typically use `http://192.168.0.1`.  
   * Ubiquiti routers typically use `http://unifi.ubnt.com`.
2. Enter the router credentials. For consumer routers, the default credentials for the admin console are often found under or behind the device.
3. In the admin console, find the place where **DNS settings** are set. This may be contained within categories such as **WAN** and **IPv6** (Asus Routers) or **Internet** (Netgear Routers). Consult your router's documentation for details.
4. Take note of any DNS addresses that are currently set and save them in a safe place in case you need to use them later.
5. Depending on what you want to configure, choose one of the following DNS addresses for IPv4:  
Use 1.1.1.1 resolver  
```  
1.1.1.1  
1.0.0.1  
```  
Block malware with 1.1.1.1 for Families  
```  
1.1.1.2  
1.0.0.2  
```  
Block malware and adult content with 1.1.1.1 for Families  
```  
1.1.1.3  
1.0.0.3  
```
6. Depending on what you want to configure, choose one of the following DNS addresses for IPv6:  
Use 1.1.1.1 resolver  
```  
2606:4700:4700::1111  
2606:4700:4700::1001  
```  
Block malware with 1.1.1.1 for Families  
```  
2606:4700:4700::1112  
2606:4700:4700::1002  
```  
Block malware and adult content with 1.1.1.1 for Families  
```  
2606:4700:4700::1113  
2606:4700:4700::1003  
```
7. Save the updated settings.

## Using DNS-Over-TLS on OpenWrt

It is possible to encrypt DNS traffic out from your router using DNS-over-TLS if it is running OpenWrt. For more details, see our blog post on the topic: [Adding DNS-Over-TLS support to OpenWrt (LEDE) with Unbound ↗](https://blog.cloudflare.com/dns-over-tls-for-openwrt/).

## FRITZ!Box

Starting with [FRITZ!OS 7.20 ↗](https://en.avm.de/press/press-releases/2020/07/fritzos-720-more-performance-convenience-security/), DNS over TLS is supported, see [Configuring different DNS servers in the FRITZ!Box ↗](https://en.avm.de/service/knowledge-base/dok/FRITZ-Box-7590/165%5FConfiguring-different-DNS-servers-in-the-FRITZ-Box/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/router/","name":"Router"}}]}
```
