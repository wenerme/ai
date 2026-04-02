---
title: Set up Private Network Load Balancing with Cloudflare WAN
description: Consider the following steps to learn how to configure Private Network Load Balancing solution, using Cloudflare WAN (formerly Magic WAN) as the on-ramp and off-ramp to securely connect to your private or internal services.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/private-network/cloudflare-wan.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Set up Private Network Load Balancing with Cloudflare WAN

Consider the following steps to learn how to configure Private Network Load Balancing solution, using [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) (formerly Magic WAN) as the on-ramp and off-ramp to securely connect to your private or internal services.

One of the pre-requisites to using Private Network Load Balancing (PNLB) with Cloudflare WAN is having Cloudflare WAN set up in your account and having completed onboarding. You can connect with a Cloudflare One Appliance, or your own hardware via an IPsec or GRE tunnel. Check out the [Cloudflare WAN documentation](https://developers.cloudflare.com/cloudflare-wan/get-started/) for more details or to get started.

## 1\. Create Load Balancer Pools

Load Balancer Pools are logical groupings of endpoints — typically organized by physical datacenter or geographic region. The endpoints in the pool are the destinations where traffic is ultimately routed.

Note

Endpoints accessed via Cloudflare WAN must be accessible in and assigned to the default VNET.

Warning

The IP destination addresses must also be routable in your Cloudflare WAN configuration. Please contact your Cloudflare account team to confirm that the addresses are available in your configuration.

Pools can be created using either the Cloudflare dashboard or the API. Refer to the [Create a pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/#create-a-pool) documentation section for more information.

## 2\. Create an Account Load Balancer with a Private IP

1. Go to **Load Balancing** at the account level and select **Create a Load Balancer**.
2. Select **Private Load Balancer**.
3. On the next step you can choose to associate this load balancer with either:
* A CGNAT IP from the Cloudflare range or
* A custom [RFC1918 address ↗](https://datatracker.ietf.org/doc/html/rfc1918).
1. Add a descriptive name to identify your Load Balancer.
2. Proceed through the setup.

After selecting an IP address and completing the setup, you will be redirected to the Load Balancing dashboard. You can locate your load balancer using the search bar or by filtering for **Private** load balancers. Be sure to note the assigned IP address, as it will be required in the following steps.

Note

Traffic from your load balancer will appear to originate from one of Cloudflare's IP addresses. These IP addresses must be whitelisted to ensure proper traffic flow. Ensure your routing is properly configured to return traffic to your IPsec/GRE tunnels and not the public Internet. Private Load Balancers created with a Cloudflare private IP address will receive a default address in the CGNAT range `100.112.0.0`. This IP address is configurable. Refer to [Cloudflare source IP range](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-cloudflare-source-ips/) to learn more.

## 3\. FQDN override (optional)

If you want your load balancer and its endpoints to be transparently accessible to users via a hostname, you can create a DNS record in your internal DNS system or create an override in Cloudflare that maps the hostname to the Load Balancer's IP address. This ensures that traffic destined for the hostname resolves to the correct IP.

To create the override, follow these steps:

1. In **Gateway**, select **Firewall policies**.
2. In the **DNS** tab, create an override where:  
   * The **Selector** equals `Host`  
   * The **Operator** equals `is`  
   * The **Value** is the hostname you wish to associate with your load balancer.
3. Set the **Action** to _Override_, and in **Override Hostname**, enter the IP address of your Private Load Balancer.

Requests to the hostname will now resolve to your private load balancer.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/private-network/","name":"Private Network Load Balancing"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/private-network/cloudflare-wan/","name":"Set up Private Network Load Balancing with Cloudflare WAN"}}]}
```
