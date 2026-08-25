---
description: Learn how to connect to Cloudflare's 1.1.1.1 using DNS over HTTPS (DoH) clients.
title: Connect to 1.1.1.1 using DoH clients
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to 1.1.1.1 using DoH clients

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A DoH client is a software that runs on your device and sends DNS queries to a resolver like 1.1.1.1 over an encrypted HTTPS connection. Once configured, the client handles DNS resolution for your device or network.

## Cloudflare WARP client

Refer to [WARP client](https://developers.cloudflare.com/warp-client/) for guidance on WARP modes and get-started information for different [operating systems](https://developers.cloudflare.com/warp-client/get-started/).

## DNSCrypt-Proxy

[DNSCrypt-Proxy ↗](https://dnscrypt.info) 2.0+ supports DoH out of the box. It supports both 1.1.1.1 and other services. It also includes more advanced features, such as load balancing and local filtering.

1. [Install DNSCrypt-Proxy ↗](https://github.com/DNSCrypt/dnscrypt-proxy/wiki/installation).
2. Verify that `dnscrypt-proxy` is installed and the version is 2.0 or later:
```sh
dnscrypt-proxy -version
```
```sh
2.0.8
```
3. Set up the configuration file using the [official instructions ↗](https://github.com/DNSCrypt/dnscrypt-proxy/wiki/installation#setting-up-dnscrypt-proxy), and add `cloudflare` and `cloudflare-ipv6` to the server list in `dnscrypt-proxy.toml`:
```toml
server_names = ['cloudflare', 'cloudflare-ipv6']
```
4. Make sure that nothing else is running on `localhost:53` (port `53` is the standard DNS port on your local machine), and check that everything works as expected:
```sh
dnscrypt-proxy -resolve cloudflare-dns.com
```
```sh
Resolving [cloudflare-dns.com]
Domain exists:  yes, 3 name servers found
Canonical name: cloudflare-dns.com.
IP addresses:   2400:cb00:2048:1::6810:6f19, 2400:cb00:2048:1::6810:7019, 104.16.111.25, 104.16.112.25
TXT records:    -
Resolver IP:    172.68.140.217
```
5. Register it as a system service so that it starts automatically when your device boots. Follow the [DNSCrypt-Proxy installation instructions ↗](https://github.com/DNSCrypt/dnscrypt-proxy/wiki/installation).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/#page","headline":"Connect to 1.1.1.1 using DoH clients · Cloudflare 1.1.1.1 docs","description":"Learn how to connect to Cloudflare's 1.1.1.1 using DNS over HTTPS (DoH) clients.","url":"https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/dns-over-https-client/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
