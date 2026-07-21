---
title: Setup
description: Enable automatic mitigation of random prefix attacks in the Cloudflare dashboard or via the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Setup

In order to enable automatic mitigation of [random prefix attacks](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/):

1. Set up [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/setup/).
2. Enable attack mitigation on your DNS Firewall cluster.

  * [ Dashboard ](#tab-panel-8764)
  * [ API ](#tab-panel-8765)

  1. In the Cloudflare dashboard, go to the **DNS Firewall Clusters** page.
  [ Go to **Clusters** ](https://dash.cloudflare.com/?to=/:account/dns-firewall/clusters)
  2. Select the cluster you want to update, then select **Edit**.
  3. Turn on **Attack mitigation** and choose whether Cloudflare should only mitigate attacks when the upstream is unhealthy.
  4. Select **Save**.
Send a [PATCH request](https://developers.cloudflare.com/api/resources/dns%5Ffirewall/methods/edit/) to update your DNS Firewall cluster:
Required API token permissions
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
  * `DNS Firewall Write`

**Update DNS Firewall Cluster**
```bash
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

Once you turn on attack mitigation, Cloudflare returns a `REFUSED` response to queries that are part of a random prefix attack.

Note

If you do not specify otherwise, Cloudflare automatically sets the `only_when_upstream_unhealthy` parameter to true, which means that Cloudflare will only mitigate attacks when we detect that the upstream is unresponsive (possibly as a result of an attack).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/#page","headline":"Protect against random prefix attacks · Cloudflare DNS docs","description":"Enable automatic mitigation of random prefix attacks in the Cloudflare dashboard or via the API.","url":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-07-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dns-firewall/","name":"DNS Firewall"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dns-firewall/random-prefix-attacks/","name":"Random prefix attack mitigation"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/dns-firewall/random-prefix-attacks/setup/","name":"Setup"}}]}
```
