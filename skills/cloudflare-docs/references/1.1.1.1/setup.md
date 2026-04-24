---
title: Set up
description: Learn how to set up Cloudflare's 1.1.1.1 DNS resolver for enhanced security and privacy. Protect against malware and adult content with easy configuration.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/setup/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Set up

By default, the [DNS server ↗](https://www.cloudflare.com/learning/dns/what-is-dns/) your devices use is provided by your Internet service provider (ISP). Some [ISPs and network equipment providers](https://developers.cloudflare.com/1.1.1.1/infrastructure/network-operators/) partner with Cloudflare to add safer browsing to their offerings.

If your providers are not currently using Cloudflare, you can change the DNS settings on your device or router as detailed in the following instructions.

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

You can also set up [1.1.1.1 for Families](#1111-for-families) for an added layer of protection on your home network against malware and adult content. 1.1.1.1 for Families leverages Cloudflare's global network to ensure that it is fast and secure around the world, and includes the same [strong privacy guarantees](https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/) that Cloudflare committed to when launching 1.1.1.1.

---

## 1.1.1.1 for Families

1.1.1.1 for Families categorizes destinations on the Internet based on the potential threat they pose regarding malware, phishing, or other types of security risks.

1.1.1.1 for Families has two default options:

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

Cloudflare returns `0.0.0.0` if the [fully qualified domain name (FQDN) ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname) or IP in a DNS query is classified as malicious.

Domain miscategorization

If you are using 1.1.1.1 for Families and see a domain that you believe is miscategorized, [fill in this form ↗](https://radar.cloudflare.com/categorization-feedback/) to bring it to our attention. Your submission will remain anonymous.

We review these submissions to improve Cloudflare’s categorization.

### Test 1.1.1.1 for Families

After configuring 1.1.1.1 for Families, you can test if it is working as intended with the following URLs:

* [https://malware.testcategory.com/ ↗](https://malware.testcategory.com/): Use this to test if 1.1.1.1 for Families is blocking known malware addresses correctly.
* [https://nudity.testcategory.com/ ↗](https://nudity.testcategory.com/): Use this to test if 1.1.1.1 for Families is blocking known adult content and malware addresses correctly.

### DNS over HTTPS (DoH)

If you have a DoH-compliant client, such as a compatible router, you can set up 1.1.1.1 for Families to encrypt your DNS queries over HTTPS. This prevents spoofing and tracking by malicious actors, advertisers, ISPs, and others. For more information on DoH, refer to the [Learning Center article on DNS encryption ↗](https://www.cloudflare.com/learning/dns/dns-over-tls/).

To configure an encrypted DoH connection to 1.1.1.1 for Families, type one of the following URLs into the appropriate field of your DoH-compliant client:

Block malware

```

https://security.cloudflare-dns.com/dns-query


```

Block malware and adult content

```

https://family.cloudflare-dns.com/dns-query


```

### DNS over TLS (DoT)

1.1.1.1 for Families also supports DoT if you have a compliant client, such as a compatible DoT router. DoT allows you to encrypt your DNS queries, protecting you from spoofing, malicious actors, and others. You can learn more about DoT in the [Learning Center article on DNS encryption ↗](https://www.cloudflare.com/learning/dns/dns-over-tls/).

To configure an encrypted DoT connection to 1.1.1.1 for Families, type one of the following URLs into the appropriate field of your DoT-compliant client:

Block malware

```

security.cloudflare-dns.com


```

Block malware and adult content

```

family.cloudflare-dns.com


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}}]}
```
