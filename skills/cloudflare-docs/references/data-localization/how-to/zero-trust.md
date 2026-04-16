---
title: Zero Trust
description: Use Zero Trust products with the Data Localization Suite, including Gateway and CASB.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/how-to/zero-trust.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Zero Trust

In the following sections, we will give you some details about how different Zero Trust products can be used with the Data Localization Suite.

## Gateway

Regional Services can be used with Gateway in all [supported regions](https://developers.cloudflare.com/data-localization/region-support/). Be aware that Regional Services only apply when using the Cloudflare One Client in Traffic and DNS mode.

### Egress policies

Enterprise customers can purchase a [dedicated egress IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/) (IPv4 and IPv6) or range of IPs geolocated to one or more Cloudflare network locations. This allows your egress traffic to geolocate to the city selected in your [egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/).

### HTTP policies

As part of Regional Services, Cloudflare Gateway will only perform [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) when using the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) (in default [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/)).

#### Data Loss Prevention (DLP)

You are able to [log the payload of matched DLP rules](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules) and encrypt them with your public key so that only you can examine them later.

[Cloudflare cannot decrypt encrypted payloads](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#data-privacy).

### Network policies

You are able to [configure SSH proxy and command logs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/ssh-logging/). Generate a Hybrid Public Key Encryption (HPKE) key pair and upload the public key `sshkey.pub` to your dashboard. All proxied SSH commands are immediately encrypted using this public key. The matching private key – which is in your possession – is required to view logs.

### DNS policies

Regional Services controls where Cloudflare decrypts traffic; because most DNS traffic is not encrypted, Gateway DNS cannot be regionalized using Regional Services.

Refer to the [Cloudflare One Client settings](https://developers.cloudflare.com/data-localization/how-to/zero-trust/#cloudflare-one-client-settings) section below for more information.

### Custom certificates

You can [bring your own certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/) to Gateway but these cannot yet be restricted to a specific region.

### Logs and Analytics

By default, Cloudflare will store and deliver logs from data centers across our global network. To maintain regional control over your data, you can use [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) and restrict data storage to a specific geographic region. For more information refer to the section about [Logpush datasets supported](https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/).

Customers also have the option to reduce the logs that Cloudflare stores:

* You can [exclude PII from logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/manage-pii/)
* You can [disable logging, or only log blocked requests](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#selective-logging).

#### Verify regional map application

To verify that your regional map is being applied correctly, check the `IngressColoName` field in your [Zero Trust Network Session logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/#ingresscoloname). This field shows the name of the Cloudflare data center where traffic ingressed. Since regionalization is applied upstream from Gateway, the ingress data center will be located within your configured regional map, confirming that traffic is being processed in the correct region.

## Access

To ensure that all reverse proxy requests for applications protected by Cloudflare Access will only occur in FedRAMP-compliant data centers, you should use [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/) with the region set to FedRAMP.

## Cloudflare Tunnel

You can [configure Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#region) to only connect to data centers within the United States, regardless of where the software was deployed.

## Cloudflare One Client settings

### Local Domain Fallback

You can use the WARP setting [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) in order to use a private DNS resolver, which you can manage yourself.

### Split Tunnels

[Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) allow you to decide which IP addresses/ranges and/or domains are routed through or excluded from Cloudflare.

Warning

Gateway policies will not apply for excluded traffic.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/data-localization/how-to/zero-trust/","name":"Zero Trust"}}]}
```
