---
title: Setup
description: Enable automatic mitigation of random prefix attacks via the API.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dns/dns-firewall/random-prefix-attacks/setup.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Setup

In order to enable automatic mitigation of [random prefix attacks](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/):

1. Set up [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/setup/).
2. Send a [PATCH request](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/methods/edit/) to update your DNS Firewall cluster.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Firewall Write`  
Update DNS Firewall Cluster  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID" \  
  --request PATCH \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "attack_mitigation": {  
        "enabled": true,  
        "only_when_upstream_unhealthy": true  
    }  
  }'  
```

Once you receive a `200` success response from the API, queries identified as being part of a random prefix attack will receive a `REFUSED` response.

Note

If you do not specify otherwise in your API call, Cloudflare automatically sets the `"only_when_upstream_unhealthy"` parameter to true, which means that Cloudflare will only mitigate attacks when we detect that the upstream is unresponsive (possibly as a result of an attack). This setting can also be changed via the API, using a request similar to the ones shown above.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dns-firewall/","name":"DNS Firewall"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dns-firewall/random-prefix-attacks/","name":"Random prefix attack mitigation"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/dns-firewall/random-prefix-attacks/setup/","name":"Setup"}}]}
```
