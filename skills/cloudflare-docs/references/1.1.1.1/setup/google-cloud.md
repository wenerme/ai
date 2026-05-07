---
title: Google Cloud
description: Configure 1.1.1.1 on Google Cloud instances.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/1.1.1.1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ GCP ](https://developers.cloudflare.com/search/?tags=GCP) 

# Google Cloud

Google Cloud lets you configure custom DNS servers at the Virtual Private Cloud (VPC) network level using [outbound server policies ↗](https://cloud.google.com/dns/docs/server-policies-overview#dns-server-policy-out) in Cloud DNS. When you create an outbound server policy, all resources in that VPC network — including existing virtual machines — use the specified DNS servers.

Note

If you are using [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/), you can assign [locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) to apply custom [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) via Gateway.

To configure 1.1.1.1 for your Google Cloud VPC network:

1. Open the [Google Cloud Console ↗](https://console.cloud.google.com).
2. Go to **Network Services** \> **Cloud DNS** and select [**DNS Server Policies** ↗](https://console.cloud.google.com/net-services/dns/policies).
3. Select **Create Policy**.
4. Enter a name for your policy (for example, `cloudflare-1-1-1-1`) and select the VPC networks to apply it to.
5. Under **Alternate DNS servers**, select **Add Item** and enter:  
```  
1.1.1.1  
1.0.0.1  
```
6. Select **Create**.

DNS requests within the configured VPC networks will now use 1.1.1.1.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1 (DNS Resolver)"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/google-cloud/","name":"Google Cloud"}}]}
```
