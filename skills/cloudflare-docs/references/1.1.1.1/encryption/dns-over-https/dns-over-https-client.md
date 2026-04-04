---
title: Connect to 1.1.1.1 using DoH clients
description: Learn how to connect to Cloudflare's 1.1.1.1 using DNS over HTTPS (DoH) clients.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/encryption/dns-over-https/dns-over-https-client.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Connect to 1.1.1.1 using DoH clients

Several DoH clients are available for connecting to 1.1.1.1.

## Cloudflare WARP client

Refer to [WARP client](https://developers.cloudflare.com/warp-client/) for guidance on WARP modes and get-started information for different [operating systems](https://developers.cloudflare.com/warp-client/get-started/).

## DNSCrypt-Proxy

The [DNSCrypt-Proxy ↗](https://dnscrypt.info) 2.0+ supports DoH out of the box. It supports both 1.1.1.1 and other services. It also includes more advanced features, such as load balancing and local filtering.

1. [Install DNSCrypt-Proxy ↗](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation).
2. Verify that `dnscrypt-proxy` is installed and the version is 2.0 or later:  
Terminal window  
```  
dnscrypt-proxy -version  
```  
```  
2.0.8  
```
3. Set up the configuration file using the [official instructions ↗](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation#setting-up-dnscrypt-proxy), and add `cloudflare` and `cloudflare-ipv6` to the server list in `dnscrypt-proxy.toml`:  
TOML  
```  
server_names = ['cloudflare', 'cloudflare-ipv6']  
```
4. Make sure that nothing else is running on `localhost:53`, and check that everything works as expected:  
Terminal window  
```  
dnscrypt-proxy -resolve cloudflare-dns.com  
```  
```  
Resolving [cloudflare-dns.com]  
Domain exists:  yes, 3 name servers found  
Canonical name: cloudflare-dns.com.  
IP addresses:   2400:cb00:2048:1::6810:6f19, 2400:cb00:2048:1::6810:7019, 104.16.111.25, 104.16.112.25  
TXT records:    -  
Resolver IP:    172.68.140.217  
```
5. Register it as a system service according to the [DNSCrypt-Proxy installation instructions ↗](https://github.com/jedisct1/dnscrypt-proxy/wiki/installation).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/encryption/","name":"Encryption"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/","name":"DNS over HTTPS"}},{"@type":"ListItem","position":5,"item":{"@id":"/1.1.1.1/encryption/dns-over-https/dns-over-https-client/","name":"Connect to 1.1.1.1 using DoH clients"}}]}
```
