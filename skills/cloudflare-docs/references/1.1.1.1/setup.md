---
title: Set up
description: Learn how to set up Cloudflare's 1.1.1.1 DNS resolver for enhanced security and privacy. Protect against malware and adult content with easy configuration.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Phishing ](https://developers.cloudflare.com/search/?tags=Phishing) 

# Set up

By default, your devices use a [DNS server ↗](https://www.cloudflare.com/learning/dns/what-is-dns/) provided by your Internet service provider (ISP). You can change this to use 1.1.1.1 instead, which gives you faster and more private DNS resolution. Some [ISPs and network equipment providers](https://developers.cloudflare.com/1.1.1.1/infrastructure/network-operators/) already partner with Cloudflare to offer this.

If your provider does not use Cloudflare, follow the instructions for your device or router below.

Device or router specific guides

* [ Android ](https://developers.cloudflare.com/1.1.1.1/setup/android/)
* [ Azure ](https://developers.cloudflare.com/1.1.1.1/setup/azure/)
* [ Gaming consoles ](https://developers.cloudflare.com/1.1.1.1/setup/gaming-consoles/)
* [ Google Cloud ](https://developers.cloudflare.com/1.1.1.1/setup/google-cloud/)
* [ iOS ](https://developers.cloudflare.com/1.1.1.1/setup/ios/)
* [ Linux ](https://developers.cloudflare.com/1.1.1.1/setup/linux/)
* [ macOS ](https://developers.cloudflare.com/1.1.1.1/setup/macos/)
* [ Router ](https://developers.cloudflare.com/1.1.1.1/setup/router/)
* [ Windows ](https://developers.cloudflare.com/1.1.1.1/setup/windows/)

You can also set up [1.1.1.1 for Families](#1111-for-families) for additional protection against malware and adult content on your home network. 1.1.1.1 for Families uses the same [privacy commitments](https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/) as the standard 1.1.1.1 resolver.

---

## 1.1.1.1 for Families

1.1.1.1 for Families automatically blocks DNS queries to domains associated with malware, phishing, or (optionally) adult content.

1.1.1.1 for Families has two options:

Block malware

Use the following DNS resolvers to block malicious content:

* `1.1.1.2`
* `1.0.0.2`
* `2606:4700:4700::1112`
* `2606:4700:4700::1002`

Block malware and adult content

Use the following DNS resolvers to block malware and adult content:

* `1.1.1.3`
* `1.0.0.3`
* `2606:4700:4700::1113`
* `2606:4700:4700::1003`

When a queried domain is classified as malicious, Cloudflare returns the address `0.0.0.0` instead of the real address. This prevents your device from connecting to the blocked site.

Domain miscategorization

If you are using 1.1.1.1 for Families and a domain is incorrectly blocked or allowed, [submit feedback ↗](https://radar.cloudflare.com/categorization-feedback/) to help improve Cloudflare's categorization. Your submission is anonymous.

### Test 1.1.1.1 for Families

After configuring 1.1.1.1 for Families, verify that filtering is working with the following test URLs:

* [https://malware.testcategory.com/ ↗](https://malware.testcategory.com/) — Tests whether known malware domains are blocked.
* [https://nudity.testcategory.com/ ↗](https://nudity.testcategory.com/) — Tests whether adult content and malware domains are blocked.

### DNS over HTTPS (DoH)

DNS over HTTPS (DoH) encrypts your DNS queries by sending them as HTTPS requests. This prevents anyone between your device and the resolver — such as your ISP or a network attacker — from seeing which domains you look up. For more information, refer to the [Learning Center article on DNS encryption ↗](https://www.cloudflare.com/learning/dns/dns-over-tls/).

To configure an encrypted DoH connection to 1.1.1.1 for Families, enter one of the following URLs in your DoH-compatible client or router:

Block malware

```

https://security.cloudflare-dns.com/dns-query


```

Block malware and adult content

```

https://family.cloudflare-dns.com/dns-query


```

### DNS over TLS (DoT)

DNS over TLS (DoT) encrypts DNS queries using TLS on a dedicated port (`853`). Like DoH, it prevents eavesdropping on your DNS traffic. For more information, refer to the [Learning Center article on DNS encryption ↗](https://www.cloudflare.com/learning/dns/dns-over-tls/).

To configure an encrypted DoT connection to 1.1.1.1 for Families, enter one of the following hostnames in your DoT-compatible client or router:

Block malware

```

security.cloudflare-dns.com


```

Block malware and adult content

```

family.cloudflare-dns.com


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}}]}
```
