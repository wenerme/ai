---
description: Connect two Linux servers with Cloudflare Mesh and reach services by private Mesh IP without exposing them to the public Internet.
title: Connect two servers with Cloudflare Mesh
image: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-servers/og.png?v=12ad51eba9e65c70
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect two servers with Cloudflare Mesh

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-servers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Install one Cloudflare Mesh node on each Linux server. Each server receives a private Mesh IP, so it can reach services on the other server through Cloudflare. Neither server needs a public IP address or a service exposed to the public Internet.

This setup reaches services running **on the nodes themselves**. To connect hosts behind the nodes instead, follow [Connect two sites](https://developers.cloudflare.com/mesh/guides/connect-sites/).

## Prerequisites

- Two servers running a [supported Linux distribution](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#linux), with administrator access
- A service listening on each server if you want to test both directions, such as SSH on TCP port `22`
- Netcat ( `nc`) installed on the servers where you will run the TCP tests
- Outbound access from both servers to the [Cloudflare One Client IPs and ports](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/)

Before you begin, [set up Cloudflare Mesh](https://developers.cloudflare.com/mesh/get-started/) for your account. The setup wizard configures device enrollment, Mesh IP assignment, enrolled-device reachability, and Gateway proxying.

If your account already uses Cloudflare One, verify the [required account settings](https://developers.cloudflare.com/mesh/get-started/#required-account-settings). Existing settings are not overwritten by the setup wizard.

To run a node in a container, refer to [Run Mesh in Docker or Kubernetes](https://developers.cloudflare.com/mesh/guides/run-mesh-in-containers/).

## Connect the first server

1. In the Cloudflare dashboard, go to **Networking** > **Mesh**. [Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. Select **Add participant** > **Add node**.
3. Name the node `server-a`, then select **Create node**.
4. Select **Linux** and run the displayed installation and registration commands on the first server. Keep the node token private.
5. Confirm that `server-a` appears as **Online** in the Mesh dashboard. Record its **Mesh IP**.

## Connect the second server

1. In **Networking** > **Mesh**, select **Add participant** > **Add node**. [Go to **Mesh** ↗](https://dash.cloudflare.com/?to=/:account/mesh)
2. Name the new node `server-b`, select **Create node**, then select **Linux**.
3. Run the new installation and registration commands on the second server. Do not reuse the first node token: each server needs its own node identity.
4. Confirm that `server-b` appears as **Online** and record its **Mesh IP**.

When a service runs on the node itself, you do not need a CIDR route, router changes, or IP forwarding. [IP forwarding](https://developers.cloudflare.com/mesh/best-practices/#make-ip-forwarding-persistent/) is only needed when a node routes traffic for other hosts.

## Allow service traffic

On each destination server, confirm the service listens on the Mesh IP or on all interfaces. A service bound only to a separate local-network IP cannot accept connections to its Mesh IP. Allow the required port from the other server's Mesh IP in the host firewall, and check any cloud firewall or security group. Scope these rules to Mesh IPs instead of opening the port to the public Internet.

Confirm that the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-controls/proxy/) handles the service protocol and that any [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/) permit the connection.

## Verify connectivity

If both servers run SSH, test each direction using the other server's Mesh IP:

1. On `server-a`, test TCP port `22` on `server-b`:

   ```sh
   nc -vz <SERVER-B-MESH-IP> 22
   ```

2. On `server-b`, test TCP port `22` on `server-a`:

   ```sh
   nc -vz <SERVER-A-MESH-IP> 22
   ```

Replace the Mesh IP placeholders with the addresses shown in the dashboard. If you use another service, substitute its port. **Online** means the node is connected to Cloudflare. A successful service test confirms that traffic reaches the destination. `ping` is only useful when the ICMP Gateway proxy is turned on.

If a test fails, refer to [Troubleshoot Cloudflare Mesh connectivity](https://developers.cloudflare.com/mesh/troubleshooting/).

## Secure and monitor the connection

Use [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/network-policies/) to control which sources can reach each destination IP and port. You can combine network policies with [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) for enrolled client devices.

Review allowed and blocked connections in [Gateway network logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#network). Client device traffic includes the enrolled user identity. Mesh node traffic uses the identity `warp_connector@<your-team-name>.cloudflareaccess.com`.

## Next steps

- [Connect two private networks](https://developers.cloudflare.com/mesh/guides/connect-sites/) through routed subnets.
- [Connect two devices](https://developers.cloudflare.com/mesh/guides/connect-client-devices/) by Mesh IP.
- [Connect Workers to Mesh](https://developers.cloudflare.com/workers-vpc/examples/connect-to-cloudflare-mesh/) with a VPC Network binding.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-servers/#page","headline":"Connect two servers with Cloudflare Mesh","description":"Connect two Linux servers with Cloudflare Mesh and reach services by private Mesh IP without exposing them to the public Internet.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-servers/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/guides/connect-servers/og.png?v=12ad51eba9e65c70","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
```
