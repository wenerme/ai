---
description: Connect two sites with Cloudflare Mesh by routing traffic in both directions between private subnets through Mesh nodes.
title: Connect two private networks with Cloudflare Mesh
image: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-sites/og.png?v=19e1a35d3288eda9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect two private networks with Cloudflare Mesh

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-sites/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Connect two sites, offices, or cloud networks with [Cloudflare Mesh](https://developers.cloudflare.com/mesh/). A Linux Mesh node at each site carries traffic between the private subnets through Cloudflare. Hosts behind the nodes do not need the Cloudflare One Client.

This example uses separate subnets and tests traffic in both directions:

| Site | Private subnet | Mesh node local IP | Test host IP |
| --- | --- | --- | --- |
| Site A | `10.0.0.0/24` | `10.0.0.10` | `10.0.0.50` |
| Site B | `192.168.1.0/24` | `192.168.1.10` | `192.168.1.50` |

Replace these addresses with your own. The subnets must not overlap each other or your Mesh IP range.

## Prerequisites

- A [supported Linux host](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#linux) at each site, with a stable local IP and administrator access
- Access to each site's router or cloud route table to direct traffic to its local Mesh node
- A test service on a host in each subnet, such as SSH on TCP port `22`
- Netcat ( `nc`) installed on the hosts where you will run the TCP tests

Before you begin, [set up Cloudflare Mesh](https://developers.cloudflare.com/mesh/get-started/) for your account. The setup wizard configures device enrollment, Mesh IP assignment, enrolled-device reachability, and Gateway proxying.

If your account already uses Cloudflare One, verify the [required account settings](https://developers.cloudflare.com/mesh/get-started/#required-account-settings). Existing settings are not overwritten by the setup wizard.

For containers, use separate node identities and review the [container source NAT behavior](https://developers.cloudflare.com/mesh/guides/run-mesh-in-containers/#source-nat/) before configuring return routes.

## Connect a node at each site

1. In the Cloudflare dashboard, go to **Networking** > **Mesh**. [Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. Select **Add participant** > **Add node**. Name the node `site-a`, select **Create node**, and then select **Linux**.
3. Run the displayed installation and registration commands on the Linux host at Site A. Confirm that the node appears as **Online**.
4. Repeat the procedure at Site B with a new node named `site-b`. Use the new node's installation commands and token. Each site needs a distinct node identity.
5. Confirm both nodes appear as **Online** and record their local IPs and Mesh IPs.

Each node must forward traffic for its subnet. The Linux installation commands include persistent IP forwarding. On both hosts, verify that IPv4 forwarding is on:

```sh
sysctl net.ipv4.ip_forward
```

If the output is not `net.ipv4.ip_forward = 1`, follow [Make IP forwarding persistent](https://developers.cloudflare.com/mesh/best-practices/#make-ip-forwarding-persistent/). Cloud virtual machines may also require [provider-specific forwarding settings](https://developers.cloudflare.com/mesh/best-practices/#cloud-vpc-deployments/).

If a node uses UFW, firewalld, nftables, or another host firewall, allow forwarded traffic between its local network and Cloudflare One Client interfaces. Also check that cloud firewall rules or security groups allow the forwarded traffic. Enabling `net.ipv4.ip_forward` does not override firewall rules that drop forwarded packets.

## Advertise each local subnet

A [CIDR route](https://developers.cloudflare.com/mesh/features/routes/#manage-cidr-routes) tells Cloudflare which node can reach a private subnet.

1. In the Cloudflare dashboard, go to **Networking** > **Mesh** and select `site-a`. [Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. In the **Routes** tab, select **Add route**. Enter `10.0.0.0/24` and select **Add route**.
3. Select `site-b` and add a route for `192.168.1.0/24`.

Advertise only subnets that the node can reach on its own local network. A route to a node's Mesh IP is not a substitute for a route to hosts behind that node.

## Route remote subnets through Cloudflare

Each node must send traffic for the **other** site's subnet through Cloudflare. Check the [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) settings in the device profile applied to each node:

| Node | Include mode | Exclude mode |
| --- | --- | --- |
| `site-a` | Include `100.96.0.0/12` and `192.168.1.0/24` | Do not exclude either range or a parent range containing it |
| `site-b` | Include `100.96.0.0/12` and `10.0.0.0/24` | Do not exclude either range or a parent range containing it |

Use your configured device IP range if it differs from `100.96.0.0/12`. On each node, run `warp-cli settings` to confirm which [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/#via-the-cli) is applied. If both nodes share a profile, changing it affects both sites. Confirm that `site-a` can still reach `10.0.0.50` locally and `site-b` can still reach `192.168.1.50` locally.

## Configure the site routers

When a node is not the local default gateway, add static routes on the site's router. The next hop is the node's **local IP**, not its Mesh IP:

1. On the Site A router, route `192.168.1.0/24` to `10.0.0.10`.
2. On the Site B router, route `10.0.0.0/24` to `192.168.1.10`.

These routes also provide the return path: a reply from Site B to a Site A host returns through `site-b`, and vice versa. To reach hosts from enrolled devices by Mesh IP, also route `100.96.0.0/12` to the local node at **each** site. If a node is the site's default gateway, hosts already send traffic through it and those additional static routes are not needed.

## Verify both directions

Confirm that an SSH service listens on each test host, or use the port of another service. Test from a host **behind** each node, not only from the nodes themselves:

1. On Site A host `10.0.0.50`, test Site B host `192.168.1.50`:

   ```sh
   nc -vz 192.168.1.50 22
   ```

2. On Site B host `192.168.1.50`, test Site A host `10.0.0.50`:

   ```sh
   nc -vz 10.0.0.50 22
   ```

A successful TCP connection confirms the service path. If a test fails, check forwarding, Split Tunnels, return routes, destination firewalls, and [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/). `ping` requires the ICMP Gateway proxy. For a symptom-by-symptom checklist, refer to [Troubleshoot Cloudflare Mesh connectivity](https://developers.cloudflare.com/mesh/troubleshooting/).

## Secure and monitor the connection

Use [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/) to control which sources can reach each destination IP and port. You can combine network policies with [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) for enrolled client devices.

Review allowed and blocked connections in [Gateway network logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#network). Client device traffic includes the enrolled user identity. Mesh node traffic uses the identity `warp_connector@<your-team-name>.cloudflareaccess.com`.

## Next steps

- [Connect two servers](https://developers.cloudflare.com/mesh/guides/connect-servers/) by Mesh IP without subnet routing.
- [Configure high availability](https://developers.cloudflare.com/mesh/features/high-availability/) for routed subnets.
- [Review MTU recommendations](https://developers.cloudflare.com/mesh/best-practices/#mtu-and-packet-fragmentation/) if large packets fail.
- [Explore other VPN replacement scenarios](https://developers.cloudflare.com/cloudflare-one/setup/replace-vpn/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-sites/#page","headline":"Connect two private networks with Cloudflare Mesh","description":"Connect two sites with Cloudflare Mesh by routing traffic in both directions between private subnets through Mesh nodes.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-sites/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-sites/og.png?v=19e1a35d3288eda9","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
