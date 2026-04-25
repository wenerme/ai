---
title: Cipher suites
description: Consider information about supported cipher suites, how to meet your security requirements, and how to troubleshoot compatibility and other issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ TLS ](https://developers.cloudflare.com/search/?tags=TLS) 

# Cipher suites

Cipher suites are a combination of ciphers used to negotiate security settings during the [SSL/TLS handshake ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) (and therefore separate from the [SSL/TLS protocol](https://developers.cloudflare.com/ssl/reference/protocols/)).

  
This section covers cipher suites used in connections between clients — such as your visitor's browser — and the Cloudflare network. For information about cipher suites used between Cloudflare and your origin server, refer to [Origin server > Cipher suites](https://developers.cloudflare.com/ssl/origin-configuration/cipher-suites/).

Note

Cloudflare maintains a [public repository of our SSL/TLS configurations ↗](https://github.com/cloudflare/sslconfig) on GitHub, where you can find changes in the commit history.

[RC4 cipher suites ↗](https://blog.cloudflare.com/end-of-the-road-for-rc4/) or [SSLv3 ↗](https://blog.cloudflare.com/sslv3-support-disabled-by-default-due-to-vulnerability/) are no longer supported.

## Cipher suites and edge certificates

While the cipher suites used by default for all Cloudflare domains/zones are meant to balance security and compatibility, some of them might be considered weak by third-party testing tools, such as the Qualys SSL Labs test.

If the default option ([Legacy](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/)) does not meet your business requirements, you can [purchase the Advanced Certificate Manager add-on ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/acm/) to be able to [specify more secure cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/).

Custom cipher suites is a hostname-level setting. Once specified, the configuration is applicable to all edge certificates used to connect to the hostname(s), regardless of [certificate type](https://developers.cloudflare.com/ssl/edge-certificates/) (universal, advanced, or custom).

## Related SSL/TLS settings

Although configured independently, cipher suites interact with other SSL/TLS settings.

### Minimum TLS Version

You can specify a [minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) that is required for a client to connect to your website or application.

For example, if TLS 1.1 is selected as the minimum, visitors attempting to connect using TLS 1.0 will be rejected while visitors attempting to connect using TLS 1.1, 1.2, or 1.3 (if enabled) will be allowed.

Each cipher suite relates to a specific minimum protocol that it supports. This means that if you use a [higher security level](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/) for your cipher suites and stop supporting TLS 1.0, you should also adjust your minimum TLS version accordingly.

[Compliance standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/) can also require you to up the minimum TLS version accepted in connections to your website or application.

### TLS 1.3

You cannot set specific TLS 1.3 ciphers. Instead, you can enable [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire zone and Cloudflare will use [all applicable TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/). In combination with this, you can still [disable weak cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) for TLS 1.0-1.2.

Cloudflare may return the following names for TLS 1.3 cipher suites. This is how they map to [RFC 8446 ↗](https://www.rfc-editor.org/rfc/rfc8446.html) names:

| Cloudflare                    | RFC 8446                        |
| ----------------------------- | ------------------------------- |
| AEAD-AES128-GCM-SHA256        | TLS\_AES\_128\_GCM\_SHA256      |
| AEAD-AES256-GCM-SHA384        | TLS\_AES\_256\_GCM\_SHA384      |
| AEAD-CHACHA20-POLY1305-SHA256 | TLS\_CHACHA20\_POLY1305\_SHA256 |

## Resources

* [ Customize cipher suites ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/)
* [ Security levels ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/)
* [ Compliance standards ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/)
* [ Supported cipher suites ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/)
* [ Troubleshooting ](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/troubleshooting/)

## Limitations

It is not possible to configure cipher suites for [Cloudflare Pages](https://developers.cloudflare.com/pages/) hostnames.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/","name":"Cipher suites"}}]}
```
