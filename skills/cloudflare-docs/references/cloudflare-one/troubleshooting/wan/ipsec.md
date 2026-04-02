---
title: IPsec
description: Use IPsec logs to troubleshoot issues with your IPsec tunnels during the key-exchange phase of the IPsec handshake. Configure a logpush job to forward these logs to your preferred storage service for analysis.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/troubleshooting/wan/ipsec.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# IPsec

Use IPsec logs to troubleshoot issues with your IPsec tunnels during the key-exchange phase of the IPsec handshake. Configure a logpush job to forward these logs to your preferred storage service for analysis.

## Set up an IPsec logpush job

1. Go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)
2. Select **Create a Logpush job**.
3. Select **IPsec logs** as your dataset.

Refer to the [Logpush documentation](https://developers.cloudflare.com/logs/logpush/) for more information about features, including the [available fields](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec%5Flogs/) in the dataset.

---

## More WAN resources

For more information, refer to the full Cloudflare WAN documentation.

[ Full IPsec troubleshooting guide ❯ ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/troubleshooting/ipsec-troubleshoot/) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/troubleshooting/wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/troubleshooting/wan/ipsec/","name":"IPsec"}}]}
```
