---
title: Changelog
description: Review recent changes to Cloudflare WAN (formerly Magic WAN).
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-wan/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/cloudflare-wan.xml) 

## 2026-04-30

  
**Post-quantum IPsec interoperability with third-party devices**   

Cloudflare IPsec now supports post-quantum key agreement with compatible third-party devices. [Cisco ↗](https://www.cisco.com/) and [Fortinet ↗](https://www.fortinet.com/) are the first third-party vendors validated to interoperate with Cloudflare IPsec using ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism).

Post-quantum IPsec uses [RFC 9370 ↗](https://datatracker.ietf.org/doc/rfc9370/) and [draft-ietf-ipsecme-ikev2-mlkem ↗](https://datatracker.ietf.org/doc/draft-ietf-ipsecme-ikev2-mlkem/) to negotiate hybrid key agreement during the IKEv2 `IKE_INTERMEDIATE` phase. This combines classical Diffie-Hellman (Group 20) with ML-KEM-768 or ML-KEM-1024 to protect against [harvest-now, decrypt-later ↗](https://en.wikipedia.org/wiki/Harvest%5Fnow,%5Fdecrypt%5Flater) attacks.

Key details:

* Compatible with Cisco 8000 Series Secure Routers with IOS XR Release 26.1.1 and Fortinet FortiOS 7.6.6 and later.
* Uses ML-KEM-768 or ML-KEM-1024 as an additional Key Exchange to DH Group 20.
* Follows RFC 9370 and draft-ietf-ipsecme-ikev2-mlkem standards.
* No additional licensing required.

Post-quantum IPsec with third-party devices is now generally available with confirmed interoperability for the platforms listed above. Cloudflare intends to support interoperability with more vendors as they build out support for draft-ietf-ipsecme-ikev2-mlkem. Contact your account team to discuss support for additional vendors.

For supported key exchange methods and the list of validated platforms, refer to [GRE and IPsec tunnels](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/#tested-third-party-vendor-interoperability).

## 2026-04-07

  
**Link aggregation (LACP) support for Cloudflare One Appliance**   

Cloudflare One Appliance now supports Link Aggregation Control Protocol (LACP), allowing you to bundle up to six physical LAN ports into a single logical interface. Link aggregation increases available bandwidth and eliminates single points of failure on the LAN side of the appliance.

This feature is available in beta on physical appliance hardware with the latest OS. No entitlement is required.

To configure a Link Aggregation Group, refer to [Configure link aggregation groups](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/link-aggregation/).

## 2026-02-17

  
**Cloudflare One Product Name Updates**   

We are updating naming related to some of our Networking products to better clarify their place in the Zero Trust and Secure Access Service Edge (SASE) journey.

We are retiring some older brand names in favor of names that describe exactly what the products do within your network. We are doing this to help customers build better, clearer mental models for comprehensive SASE architecture delivered on Cloudflare.

#### What's changing

* **Magic WAN** → **Cloudflare WAN**
* **Magic WAN IPsec** → **Cloudflare IPsec**
* **Magic WAN GRE** → **Cloudflare GRE**
* **Magic WAN Connector** → **Cloudflare One Appliance**
* **Magic Firewall** → **Cloudflare Network Firewall**
* **Magic Network Monitoring** → **Network Flow**
* **Magic Cloud Networking** → **Cloudflare One Multi-cloud Networking**

**No action is required by you** — all functionality, existing configurations, and billing will remain exactly the same.

For more information, visit the [Cloudflare One documentation](https://developers.cloudflare.com/cloudflare-one/).

## 2026-02-12

  
**Anycast IPs displayed on the dashboard**   

Cloudflare WAN now displays your Anycast IP addresses directly in the dashboard when you configure IPsec or GRE tunnels.

Previously, customers received their Anycast IPs during onboarding or had to retrieve them with an API call. The dashboard now pre-loads these addresses, reducing setup friction and preventing configuration errors.

No action is required. All Cloudflare WAN customers can see their Anycast IPs in the tunnel configuration form automatically.

For more information, refer to [Configure tunnel endpoints](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/).

## 2026-02-11

  
**Post-quantum encryption support for Cloudflare One Appliance**   

Cloudflare One Appliance version 2026.2.0 adds [post-quantum encryption](https://developers.cloudflare.com/ssl/post-quantum-cryptography/) support using hybrid ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism).

The appliance now uses TLS 1.3 with hybrid ML-KEM for its connection to the Cloudflare edge. During the TLS handshake, the appliance and the edge share a symmetric secret over the TLS connection and inject it into the ESP layer of IPsec. This protects IPsec data plane traffic against harvest-now, decrypt-later attacks.

This upgrade deploys automatically to all appliances during their configured interrupt windows with no manual action required.

For more information, refer to [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/).

## 2026-01-30

  
**BGP over GRE and IPsec tunnels**   

Magic WAN and Magic Transit customers can use the Cloudflare dashboard to configure and manage BGP peering between their networks and their Magic routing table when using IPsec and GRE tunnel on-ramps (beta).

Using BGP peering allows customers to:

* Automate the process of adding or removing networks and subnets.
* Take advantage of failure detection and session recovery features.

With this functionality, customers can:

* Establish an eBGP session between their devices and the Magic WAN / Magic Transit service when connected via IPsec and GRE tunnel on-ramps.
* Secure the session by MD5 authentication to prevent misconfigurations.
* Exchange routes dynamically between their devices and their Magic routing table.

For configuration details, refer to:

* [Configure BGP routes for Magic WAN](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes)
* [Configure BGP routes for Magic Transit](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes)

## 2026-01-27

  
**Configure Cloudflare source IPs (beta)**   

Cloudflare source IPs are the IP addresses used by Cloudflare services (such as Load Balancing, Gateway, and Browser Isolation) when sending traffic to your private networks.

For customers using legacy mode routing, traffic to private networks is sourced from public Cloudflare IPs, which may cause IP conflicts. For customers using Unified Routing mode (beta), traffic to private networks is sourced from dedicated, non-Internet-routable private IPv4 range to ensure:

* Symmetric routing over private network connections
* Proper firewall state preservation
* Private traffic stays on secure paths

Key details:

* **IPv4**: Sourced from `100.64.0.0/12` by default, configurable to any `/12` CIDR
* **IPv6**: Sourced from `2606:4700:cf1:5000::/64` (not configurable)
* **Affected connectors**: GRE, IPsec, CNI, WARP Connector, and WARP Client (Cloudflare Tunnel is not affected)

Configuring Cloudflare source IPs requires Unified Routing (beta) and the `Cloudflare One Networks Write` permission.

For configuration details, refer to [Configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/).

## 2026-01-15

  
**Network Services navigation update**   

The Network Services menu structure in Cloudflare's dashboard has been updated to reflect solutions and capabilities instead of product names. This will make it easier for you to find what you need and better reflects how our services work together.

Your existing configurations will remain the same, and you will have access to all of the same features and functionality.

The changes visible in your dashboard may vary based on the products you use. Overall, changes relate to [Magic Transit ↗](https://developers.cloudflare.com/magic-transit/), [Magic WAN ↗](https://developers.cloudflare.com/magic-wan/), and [Magic Firewall ↗](https://developers.cloudflare.com/cloudflare-network-firewall/).

**Summary of changes:**

* A new **Overview** page provides access to the most common tasks across Magic Transit and Magic WAN.
* Product names have been removed from top-level navigation.
* Magic Transit and Magic WAN configuration is now organized under **Routes** and **Connectors**. For example, you will find IP Prefixes under **Routes**, and your GRE/IPsec Tunnels under **Connectors.**
* Magic Firewall policies are now called **Firewall Policies.**
* Magic WAN Connectors and Connector On-Ramps are now referenced in the dashboard as **Appliances** and **Appliance profiles.** They can be found under **Connectors > Appliances.**
* Network analytics, network health, and real-time analytics are now available under **Insights.**
* Packet Captures are found under **Insights > Diagnostics.**
* You can manage your Sites from **Insights > Network health.**
* You can find Magic Network Monitoring under **Insights > Network flow**.

If you would like to provide feedback, complete [this form ↗](https://forms.gle/htWyjRsTjw1usdis5). You can also find these details in the January 7, 2026 email titled **\[FYI\] Upcoming Network Services Dashboard Navigation Update**.

![Networking Navigation](https://developers.cloudflare.com/_astro/networking-overview-and-navigation.CeMgEFaZ_Z20HKl.webp) 

## 2025-12-31

  
**Breakout traffic visibility via NetFlow**   

Magic WAN Connector now exports NetFlow data for breakout traffic to Magic Network Monitoring (MNM), providing visibility into traffic that bypasses Cloudflare's security filtering.

This feature allows you to:

* Monitor breakout traffic statistics in the Cloudflare dashboard.
* View traffic patterns for applications configured to bypass Cloudflare.
* Maintain visibility across all traffic passing through your Magic WAN Connector.

For more information, refer to [NetFlow statistics](https://developers.cloudflare.com/cloudflare-wan/analytics/netflow-analytics/).

## 2025-11-06

  
**Automatic Return Routing (Beta)**   

Magic WAN now supports Automatic Return Routing (ARR), allowing customers to configure Magic on-ramps (IPsec/GRE/CNI) to learn the return path for traffic flows without requiring static routes.

Key benefits:

* **Route-less mode**: Static or dynamic routes are optional when using ARR.
* **Overlapping IP space support**: Traffic originating from customer sites can use overlapping private IP ranges.
* **Symmetric routing**: Return traffic is guaranteed to use the same connection as the original on-ramp.

This feature is currently in beta and requires the new Unified Routing mode (beta).

For configuration details, refer to [Configure Automatic Return Routing](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-automatic-return-routing-beta).

## 2025-11-06

  
**Designate WAN link for breakout traffic**   

Magic WAN Connector now allows you to designate a specific WAN port for breakout traffic, giving you deterministic control over the egress path for latency-sensitive applications.

With this feature, you can:

* Pin breakout traffic for specific applications to a preferred WAN port.
* Ensure critical traffic (such as Zoom or Teams) always uses your fastest or most reliable connection.
* Benefit from automatic failover to standard WAN port priority if the preferred port goes down.

This is useful for organizations with multiple ISP uplinks who need predictable egress behavior for performance-sensitive traffic.

For configuration details, refer to [Designate WAN ports for breakout apps](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/#designate-wan-ports-for-breakout-apps).

## 2025-09-11

  
**DNS filtering for private network onramps**   

[Magic WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/#dns-filtering) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#dns-filtering) users can now securely route their DNS traffic to the Gateway resolver without exposing traffic to the public Internet.

Routing DNS traffic to the Gateway resolver allows DNS resolution and filtering for traffic coming from private networks while preserving source internal IP visibility. This ensures Magic WAN users have full integration with our Cloudflare One features, including [Internal DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns) and [hostname-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

To configure DNS filtering, change your Magic WAN or WARP Connector DNS settings to use Cloudflare's shared resolver IPs, `172.64.36.1` and `172.64.36.2`. Once you configure DNS resolution and filtering, you can use _Source Internal IP_ as a traffic selector in your [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for routing private DNS traffic to your [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-09-08

  
**Custom IKE ID for IPsec Tunnels**   

Now, Magic WAN customers can configure a custom IKE ID for their IPsec tunnels. Customers that are using Magic WAN and a VeloCloud SD-WAN device together can utilize this new feature to create a high availability configuration.

This feature is available via API only. Customers can read the Magic WAN documentation to learn more about the [Custom IKE ID feature and the API call to configure it](https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec/).

## 2025-09-05

  
**Bidirectional tunnel health checks are compatible with all Magic on-ramps**   

All bidirectional tunnel health check return packets are accepted by any Magic on-ramp.

Previously, when a Magic tunnel had a bidirectional health check configured, the bidirectional health check would pass when the return packets came back to Cloudflare over the same tunnel that was traversed by the forward packets.

There are SD-WAN devices, like VeloCloud, that do not offer controls to steer traffic over one tunnel versus another in a high availability tunnel configuration.

Now, when a Magic tunnel has a bidirectional health check configured, the bidirectional health check will pass when the return packet traverses over any tunnel in a high availability configuration.

## 2025-07-31

  
**Terraform V5 support for tunnels and routes**   

The Cloudflare Terraform provider resources for Cloudflare WAN tunnels and routes now support Terraform provider version 5\. Customers using infrastructure-as-code workflows can manage their tunnel and route configuration with the latest provider version.

For more information, refer to the [Cloudflare Terraform provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

## 2025-07-30

  
**Magic Transit and Magic WAN health check data is fully compatible with the CMB EU setting.**   

Today, we are excited to announce that all Magic Transit and Magic WAN customers with CMB EU ([Customer Metadata Boundary - Europe](https://developers.cloudflare.com/data-localization/metadata-boundary/)) enabled in their account will be able to access GRE, IPsec, and CNI health check and traffic volume data in the Cloudflare dashboard and via API.

This ensures that all Magic Transit and Magic WAN customers with CMB EU enabled will be able to access all Magic Transit and Magic WAN features.

Specifically, these two GraphQL endpoints are now compatible with CMB EU:

* `magicTransitTunnelHealthChecksAdaptiveGroups`
* `magicTransitTunnelTrafficAdaptiveGroups`

## 2025-07-21

  
**Virtual Cloudflare One Appliance with KVM support (open beta)**   

The KVM-based virtual Cloudflare One Appliance is now in open beta with official support for Proxmox VE.

Customers can deploy the virtual appliance on KVM hypervisors to connect branch or data center networks to Cloudflare WAN without dedicated hardware.

For setup instructions, refer to [Configure a virtual Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-virtual-appliance/).

## 2025-04-30

  
**Cloudflare One Appliance supports multiple DNS server IPs**   

Cloudflare One Appliance DHCP server settings now support specifying multiple DNS server IP addresses in the DHCP pool.

Previously, customers could only configure a single DNS server per DHCP pool. With this update, you can specify multiple DNS servers to provide redundancy for clients at branch locations.

For configuration details, refer to [DHCP server](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/).

## 2025-02-14

  
**Configure your Magic WAN Connector to connect via static IP assignment**   

You can now locally configure your [Magic WAN Connector](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/) to work in a static IP configuration.

This local method does not require having access to a DHCP Internet connection. However, it does require being comfortable with using tools to access the serial port on Magic WAN Connector as well as using a serial terminal client to access the Connector's environment.

For more details, refer to [WAN with a static IP address](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-hardware-appliance/#bootstrap-via-serial-console).

## 2024-12-17

  
**Establish BGP peering over Direct CNI circuits**   

Magic WAN and Magic Transit customers can use the Cloudflare dashboard to configure and manage BGP peering between their networks and their Magic routing table when using a Direct CNI on-ramp.

Using BGP peering allows customers to:

* Automate the process of adding or removing networks and subnets.
* Take advantage of failure detection and session recovery features.

With this functionality, customers can:

* Establish an eBGP session between their devices and the Magic WAN / Magic Transit service when connected via CNI.
* Secure the session by MD5 authentication to prevent misconfigurations.
* Exchange routes dynamically between their devices and their Magic routing table.

Refer to [Magic WAN BGP peering](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes) or [Magic Transit BGP peering](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) to learn more about this feature and how to set it up.

## 2025-02-14

**Sites feature available to all Magic WAN customers**

All Magic WAN customers now have full access to the Magic WAN sites feature. Customers can configure a Magic WAN site either with or without a Magic WAN connector.

## 2024-12-17

**Magic WAN Connector configurable health checks**

Health check rate on Magic WAN Connector IPsec tunnels are now configurable.

## 2024-12-17

**BGP support for Cloudflare Network Interconnect (CNI)**

Magic WAN customers can now establish BGP peering over Direct CNI circuits. Customers can now dynamically exchange routes and path availability status between their router device and the Magic WAN table.

## 2024-12-12

**LAN Policy improvements for the Magic WAN Connector**

Magic WAN Connector LAN Policy now supports unidirectional traffic flows and port-ranges.

## 2024-10-01

**Early access testing for BGP on CNI 2.0 circuits**

Customers can exchange routes dynamically with their Magic virtual network overlay via Direct CNI or Cloud CNI based connectivity.

## 2024-09-27

**Magic WAN Connector sends Cloudflare One Client traffic to Internet**

All Magic WAN Connectors now route Cloudflare One Client traffic directly to the Internet, bypassing IPsec tunneling, to prevent double encapsulation of Cloudflare One Client traffic.

## 2024-07-17

**Updates to High Availability on the Magic WAN Connector**

The High Availability feature on Magic WAN Connector now supports additional failover conditions, DHCP lease syncing, and staggered upgrades.

## 2024-06-23

**ICMP support for traffic sourced from private IPs**

Magic WAN will now support ICMP traffic sourced from private IPs going to the Internet via Gateway.

## 2024-06-05

**Application based prioritization**

The Magic WAN Connector can now prioritize traffic on a per-application basis.

## 2024-05-31

**virtual IP addresses**

Customers using Gateway to filter traffic to Magic WAN destinations will now see traffic from Cloudflare egressing with the Cloudflare One Client virtual IP addresses (CGNAT range), rather than public Cloudflare IP addresses. This simplifies configuration and improves visibility for customers.

## 2024-01-23

**Network segmentation**

You can define policies in your Connector to either allow traffic to flow between your LANs without it leaving your local premises or to forward it via the Cloudflare network where you can add additional security features.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/changelog/","name":"Changelog"}}]}
```
