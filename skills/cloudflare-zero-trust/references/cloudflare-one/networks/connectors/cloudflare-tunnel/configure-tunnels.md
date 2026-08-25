---
description: Configure a tunnel resources and guides for Zero Trust networking.
title: Configure a tunnel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure a tunnel

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

After [creating your Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/), you can configure various aspects of how `cloudflared` runs and connects your infrastructure to Cloudflare's network. This section covers advanced configuration options to optimize tunnel performance, security, and availability.

* [Tunnel with firewall](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/): Configure firewall rules to allow `cloudflared` egress traffic while blocking all ingress, implementing a positive security model.
* [Tunnel availability and failover](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/): Deploy multiple `cloudflared` replicas for high availability and automatic failover across your infrastructure.
* [Tunnel run parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/): Modify tunnel service parameters to control how `cloudflared` runs on your system, including logging, connection settings, and protocol options.
* [Origin parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/): Reference information for Origin parameters in Zero Trust networking.
* [Tunnel permissions](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/): Manage tunnel tokens and control who can run your remotely-managed tunnels.
* [Cipher suites](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/cipher-suites/): Review the TLS cipher suites supported by `cloudflared` for secure connections between your origin and Cloudflare's network.

## Common configuration scenarios

### Optimize for production

For production deployments, consider the following steps:

* [Deploy replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/) \- Run multiple `cloudflared` instances for redundancy.
* [Configure logging](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#loglevel) \- Set appropriate log levels for monitoring and troubleshooting.
* [Review system requirements](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/) \- Ensure your infrastructure meets performance needs.
* [Configure firewall rules](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/) \- Implement egress-only traffic patterns for security.

### Secure your tunnel

All tunnel connections between `cloudflared` and Cloudflare's network are secured with TLS 1.3 and post-quantum encryption by default, ensuring your traffic is protected against current and future cryptographic threats.

Enhance tunnel security with:

* [Tunnel token management](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/) \- Control access to your tunnel credentials.
* [Egress-only firewall rules](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/) \- Allow only necessary outbound connections.
* Least privilege permissions - Run `cloudflared` as a non-root user with minimal permissions needed for tunnel operation.

### Improve reliability

Maximize tunnel uptime with:

* [Multiple replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) \- Deploy `cloudflared` across different hosts.
* [Health alerts](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/notifications/) \- Get notified when your tunnel is degraded or goes down.
* [Health metrics](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#metrics) \- Monitor tunnel resource usage to identify potential bottlenecks.
* [Load balancing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflare-load-balancers/) \- Distribute traffic across tunnel connections.
* [Automatic failover](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) \- Leverage built-in connection redundancy.

## Next steps

* [Monitor your tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/) to track performance and troubleshoot issues.
* [Configure routes](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/) to control how traffic reaches your applications.
* [Set up private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) for internal resource access.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/#page","headline":"Configure a tunnel · Cloudflare One docs","description":"Configure a tunnel resources and guides for Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
