---
title: Custom IKE ID for IPsec
description: Use custom IKE IDs for IPsec tunnels.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Custom IKE ID for IPsec

Cloudflare WAN (formerly Magic WAN) customers can configure a custom IKE ID for their IPsec tunnels. Customers that are using Cloudflare WAN and a VeloCloud SD-WAN device together should utilize this option to create a high availability configuration.

Note

This feature is only available via API. There are no configuration options for a custom IKE ID for an IPsec tunnel in the Cloudflare dashboard.

VeloCloud has a high availability mechanism that allows customers to specify one set of IKE parameters (like IKE ID) and multiple remote IPs. Customers create an IKE ID, and then assign the same custom IKE ID to their primary IPsec tunnel and their backup IPsec tunnel. FQDN is the only supported type for custom IKE IDs.

Cloudflare WAN customers can set a custom IKE ID for an IPsec tunnel using the following API call. Customers will need to fill in the appropriate values for `<account_id>`, `<tunnel_id>`, and the FQDN wildcard before running the API call.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/ipsec_tunnels/TUNNEL_ID" \

  --request PATCH \

  --json '{

    "custom_remote_identities": {

        "fqdn_id": "<your_custom_label>.<account_id>.custom.ipsec.cloudflare.com"

    }

  }'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/common-settings/","name":"Common settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec/","name":"Custom IKE ID for IPsec"}}]}
```
