---
title: Google Cloud
description: Google Cloud supports configuring outbound server policy within Cloud DNS. Policies are applied per Virtual Private Cloud (VPC) network, and will affect all resources within that VPC network, including any existing virtual machines.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/1.1.1.1/setup/google-cloud.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Google Cloud

Google Cloud supports configuring [outbound server policy ↗](https://cloud.google.com/dns/docs/server-policies-overview#dns-server-policy-out) within Cloud DNS. Policies are applied per Virtual Private Cloud (VPC) network, and will affect all resources within that VPC network, including any existing virtual machines.

Note

If you are using [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/), you can choose assigned [locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) to apply custom [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) via Gateway.

To configure 1.1.1.1 for your Google Cloud VPC network(s):

1. Open the [Google Cloud Console ↗](https://console.cloud.google.com).
2. Navigate to **Network Services** \> **Cloud DNS** and select [**DNS Server Policies** ↗](https://console.cloud.google.com/net-services/dns/policies).
3. Select **Create Policy**.
4. Provide a name for your Policy (such as `cloudflare-1-1-1-1`) and select associated VPC network or networks.
5. Under **Alternate DNS servers**, select **Add Item** and type:  
```  
1.1.1.1  
1.0.0.1  
```
6. Select **Create**.

DNS requests within the configured VPC network(s) will now use 1.1.1.1.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/1.1.1.1/","name":"1.1.1.1"}},{"@type":"ListItem","position":3,"item":{"@id":"/1.1.1.1/setup/","name":"Set up"}},{"@type":"ListItem","position":4,"item":{"@id":"/1.1.1.1/setup/google-cloud/","name":"Google Cloud"}}]}
```
