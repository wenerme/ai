---
title: Troubleshoot with IPsec logs
description: Use IPsec logs to troubleshoot issues with your IPsec tunnels during the key-exchange phase of the IPsec handshake. Configure a logpush job to forward these logs to your preferred storage service for analysis.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/magic-transit/troubleshooting/ipsec-troubleshoot.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshoot with IPsec logs

Use IPsec logs to troubleshoot issues with your IPsec tunnels during the key-exchange phase of the IPsec handshake. Configure a logpush job to forward these logs to your preferred storage service for analysis.

## Set up an IPsec logpush job

1. Go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)
2. Select **Create a Logpush job**.
3. Select **IPsec logs** as your dataset.

Refer to the [Logpush documentation](https://developers.cloudflare.com/logs/logpush/) for more information about features, including the [available fields](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ipsec%5Flogs/) in the dataset.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/magic-transit/","name":"Magic Transit"}},{"@type":"ListItem","position":3,"item":{"@id":"/magic-transit/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/magic-transit/troubleshooting/ipsec-troubleshoot/","name":"Troubleshoot with IPsec logs"}}]}
```
