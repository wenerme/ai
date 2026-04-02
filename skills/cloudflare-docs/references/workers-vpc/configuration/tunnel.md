---
title: Cloudflare Tunnel
description: Cloudflare Tunnel creates secure connections from your infrastructure to Cloudflare's global network, providing the network connectivity that allows Workers to access your private resources.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers-vpc/configuration/tunnel/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Tunnel

Cloudflare Tunnel creates secure connections from your infrastructure to Cloudflare's global network, providing the network connectivity that allows Workers to access your private resources.

When you create a VPC Service, you specify a tunnel ID and target service. Workers VPC then routes requests from your Worker to the specified tunnel, which establishes a connection to the specified hostname or IP address, such that the target service receives the request and returns a response back to your Worker.

To allow members to create VPC Services that represent a target service reachable via a tunnel, you must assign them the **Connectivity Directory Admin** role. Members must possess **Connectivity Directory Bind** role to bind to existing VPC Services from worker.

The tunnel maintains persistent connections to Cloudflare, eliminating the need for inbound firewall rules or public IP addresses.

Note

This section provides tunnel configuration specific to Workers VPC use cases. For comprehensive tunnel documentation including monitoring and advanced configurations, refer to the [full Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## Create and run tunnel (`cloudflared`)

Cloudflare Tunnel requires the installation of a lightweight and highly scalable server-side daemon, `cloudflared`, to connect your infrastructure to Cloudflare.

Version and Configuration

Ensure you are running `cloudflared` version 2025.7.0 or later (latest version recommended) to ensure proper DNS resolution and connectivity. Older versions are not supported.

Workers VPC also requires Cloudflare Tunnel to connect using the [QUIC transport protocol](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#protocol) using `auto` or `quic`. Ensure outbound UDP traffic on port 7844 is allowed through your firewall for QUIC connections.

Cloudflare Tunnels can be created one of two ways:

1. **Remotely-managed tunnels (recommended):** Remotely-managed configurations are stored on Cloudflare, allowing you to manage the tunnel from any machine using the dashboard, API, or Terraform.
2. **Locally-managed tunnels:** A locally-managed tunnel is created by running `cloudflared tunnel create <NAME>` on the command line. Tunnel configuration is stored in your local cloudflared directory.

For Workers VPC, we recommend creating a remotely-managed tunnel through the dashboard. Follow the [Tunnels for Workers VPC dashboard setup guide](https://developers.cloudflare.com/workers-vpc/get-started/) to create your tunnel with provided installation commands shown in the dashboard.

For locally-managed tunnels, refer to the [cloudflared locally-managed tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/) guide. For manual installation, refer to the [cloudflared downloads page](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) for platform-specific installation instructions.

Note

Cloudflare Tunnels can either be configured for usage with [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/) or [Workers VPC](https://developers.cloudflare.com/workers-vpc/).

Use Tunnels with Zero Trust when you are exposing internal applications securely to your employees with Cloudflare Access and hostnames.

Use Tunnels with Workers VPC when you want to access private APIs, private databases, internal services or other HTTP services within your cloud or on-premise private network from Workers.

The same `cloudflared` instance can be used to cover both Zero Trust and Workers VPC use cases simultaneously.

Note

[Ingress configurations](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/) for locally-managed tunnels are only relevant when using tunnels to expose services to the public internet, and are not required for Workers VPC as routing is handled by the VPC Service configuration.

## Cloud platform setup guides

For platform-specific tunnel deployment instructions for production workloads:

* [AWS](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/aws/) \- Deploy tunnels in Amazon Web Services
* [Azure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/azure/) \- Deploy tunnels in Microsoft Azure
* [Google Cloud](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/google-cloud-platform/) \- Deploy tunnels in Google Cloud Platform
* [Kubernetes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/kubernetes/) \- Deploy tunnels in Kubernetes clusters
* [Terraform](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/terraform/) \- Deploy tunnels using Infrastructure as Code

Refer to the full Cloudflare Tunnel documentation on [how to setup Tunnels for high availability and failover with replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/).

Note

We do not recommend using `cloudflared` in autoscaling setups because downscaling (removing replicas) will break existing user connections to that replica. Additionally, `cloudflared` does not load balance across replicas; replicas are strictly for high availability and requests are routed to the nearest replica.

## Next steps

* Configure [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/) to connect your tunnels to Workers
* Review [hardware requirements](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/hardware-requirements/) for capacity planning
* Review the [complete Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) for advanced features

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/configuration/tunnel/","name":"Cloudflare Tunnel"}}]}
```
