---
title: DNSSEC keys
description: DNSSEC key management for Foundation DNS zones.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/foundation-dns/dnssec-keys.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DNSSEC keys

With [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/), you can request that the ZSK/KSK pair that is used for [DNSSEC](https://developers.cloudflare.com/dns/dnssec/) is unique to your Cloudflare account. To opt in to this feature, contact your account team.

All zones within your Cloudflare account - regardless of using [standard](https://developers.cloudflare.com/dns/nameservers/#standard-nameservers) or [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) \- will use the dedicated Zone Signing Key (ZSK) and Key Signing Key (KSK) for DNSSEC. These keys are set at the account level.

## Further reading

For more background information, refer to [How DNSSEC works ↗](https://www.cloudflare.com/learning/dns/dnssec/how-dnssec-works/).

For details about DNSSEC settings at Cloudflare, refer to the [DNSSEC documentation](https://developers.cloudflare.com/dns/dnssec/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/foundation-dns/","name":"Foundation DNS"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/foundation-dns/dnssec-keys/","name":"DNSSEC keys"}}]}
```
