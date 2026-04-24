---
title: Traffic policies
description: How Traffic policies works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ DNS ](https://developers.cloudflare.com/search/?tags=DNS)[ Video ](https://developers.cloudflare.com/search/?tags=Video) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/traffic-policies/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Traffic policies

Every organization needs a way to control what users can reach on the Internet — blocking malware sites, restricting risky applications, and deciding how traffic exits the corporate network. Think of traffic policies as a set of security checkpoints, each inspecting a different layer of your traffic before it is allowed through.

Cloudflare Gateway, a [Secure Web Gateway ↗](https://www.cloudflare.com/learning/access-management/what-is-a-secure-web-gateway/) (a cloud service that sits between your users and the Internet to enforce security rules), allows you to set up policies that inspect and filter your organization's Internet traffic. Traffic policies control which websites, applications, and services your users can access — and how that traffic leaves your network.

Gateway supports several policy types because network traffic can be inspected at different layers — from raw packets up to full HTTP requests. Each policy type gives you control at a specific layer:

Packet filtering

**[Packet filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/network-firewall-overview/)** inspects raw network packets and blocks traffic based on properties like source IP address or protocol. It does not need to know who the user is or what session they belong to.

Use packet filtering to drop unwanted traffic before it reaches any other policy.

DNS policies

**[DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)** check every DNS query your users make. When a query matches a policy rule, Gateway can block the domain from resolving — the site never loads because the domain name is never translated to an IP address.

DNS policies act at the earliest stage of a connection, before any content is fetched. This makes them the fastest policy type to deploy and the broadest in scope. For more information on [DNS filtering ↗](https://www.cloudflare.com/learning/access-management/what-is-dns-filtering/), refer to the Cloudflare Learning Center.

Use DNS policies to block malicious domains, restrict content categories, or prevent entire sites from loading. For full threat protection, pair DNS policies with HTTP policies — DNS blocks known bad domains, while HTTP catches threats hidden in allowed traffic.

Network policies

**[Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/)** inspect individual TCP, UDP, and Generic Routing Encapsulation (GRE) packets. They can match on IP addresses, ports, protocols, and the server name sent at the start of an encrypted connection (Server Name Indication, or SNI).

Use network policies to block access to specific ports or non-HTTP services such as SSH and RDP.

HTTP policies

**[HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/)** inspect the full content of web requests — including URLs, headers, and uploaded or downloaded files. Gateway decrypts HTTPS traffic so it can examine what DNS and network policies cannot see. This requires installing a [Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on user devices.

Use HTTP policies to block specific URLs, scan file uploads for sensitive data, block malware in downloads, and control which accounts users can sign in to — for example, allow your company Google Workspace account but block personal Gmail.

Egress policies

**[Egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/)** control how traffic leaves your network by assigning fixed IP addresses that belong to your organization. Third-party services can recognize these IPs as yours.

Use egress policies to connect to partners or services that only allow traffic from a known list of IP addresses.

Resolver policies

**[Resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/)** send DNS queries to specific DNS servers instead of the default Cloudflare resolver.

Use resolver policies to resolve private hostnames on your internal network, route queries to your own DNS servers for compliance, or reach internal resources while connected through Cloudflare One.

Note

When creating or editing policies, it may take up to 60 seconds for that policy to be updated across all of Cloudflare's data centers.

## Set up Cloudflare Gateway traffic policies

Before you create Cloudflare Gateway traffic policies, you need connect the devices or networks you want to protect and confirm that Cloudflare Gateway can inspect their traffic. For each traffic policy type, follow this workflow:

1. Connect the devices or networks you want to protect.
2. Verify that Gateway is receiving traffic from your devices.
3. Set up recommended security policies — for example, block all [security threat categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) with a DNS policy.
4. Add policies specific to your organization's needs.

For example, if your goal is to prevent employees from accessing known malware domains, you would start by enrolling devices with the Cloudflare One Client (step 1), confirm DNS queries appear in your Gateway logs (step 2), then create a DNS policy that blocks all security-risk categories (step 3).

For step-by-step setup guides, refer to [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/), [Network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/network/), and [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/) policies.

### How to choose a Cloudflare Gateway policy type

The following table maps common traffic-filtering goals to the best Cloudflare Gateway policy type:

| Filtering goal                         | Policy type      | Why                                                                    |
| -------------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| Block websites by URL                  | HTTP             | Inspects the full URL path, not just the domain                        |
| Block domains (all pages)              | DNS              | Prevents the domain from resolving                                     |
| Block non-HTTP traffic (SSH, RDP)      | Network          | Inspects TCP/UDP packets on any port                                   |
| Block malware and threats              | DNS _and_ HTTP   | DNS blocks known-bad domains. HTTP catches threats in allowed traffic. |
| Assign static egress IPs               | Egress           | Lets third-party services identify your organization                   |
| Drop traffic before other policies run | Packet filtering | Blocks by packet attributes without user context                       |
| Route DNS to custom nameservers        | Resolver         | Overrides the default Cloudflare resolver                              |

After you choose a Cloudflare Gateway policy type, continue with the matching setup guide to create the policy that fits your traffic-filtering goal.

## Troubleshoot Cloudflare Gateway policies

For help resolving common issues with Cloudflare Gateway policies, refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/traffic-policies/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}}]}
```
