---
description: Configure Host selectors in Gateway.
title: Host selectors
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Host selectors

Last updated Aug 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode                                                                                                               | Enterprise                                                      |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.4.929.0           |
| macOS    | ✅            | 2025.4.929.0           |
| Linux    | ✅            | 2025.4.929.0           |
| iOS      | ✅            | 1.11                   |
| Android  | ✅            | 2.4.2                  |
| ChromeOS | ✅            | 2.4.2                  |

Egress policies are evaluated at Layer 4 ([https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/ ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)) of the OSI model, where only IP addresses are available — not hostnames. The [Application](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#application), [Content Categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#content-categories), [Domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#domain), and [Host](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#host) selectors need to match traffic by hostname, so Gateway uses a two-step process:

1. When Gateway receives a DNS query for a hostname that matches one of these selectors, it initially resolves the query to a temporary initial resolved IP. By default, this IP is drawn from a Cloudflare-owned public range (`172.64.128.0/20` for IPv4, or `2606:4700:0cf1:4000::/64` for IPv6). You can [configure a custom IPv4 range](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) if it conflicts with your existing network.
2. When traffic arrives with this temporary destination IP, Gateway can identify which hostname the connection belongs to, apply the correct egress policy, then replace the temporary IP with the real destination IP before forwarding the traffic.

1. [Client device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)
Requests `bank.example.com`
2. DNS query↓
3. [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)
Returns a temporary initial resolved IP, matches the connection to a Host egress policy, then rewrites the destination to the real IP.
`172.64.128.0/20`
4. Host selector match↓
5. ↗Public Internet
`bank.example.com` · real destination IP

These selectors require additional configuration before they work.

## Turn on Host selectors

To turn on the selectors for your account:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Policy settings**, turn on **Allow egress policy host selectors**.

Use the [Patch Zero Trust account configuration](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/configurations/methods/edit/) endpoint to update your Zero Trust configuration. For example:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"settings": {
				"host_selector": {
						"enabled": true
				}
		}
	}'
```

## Prerequisites

Traffic must be on-ramped to Gateway with the following methods:

| On-ramp method                                                                                                              | Compatibility |
| --------------------------------------------------------------------------------------------------------------------------- | ------------- |
| [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) | ✅             |
| [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)               | ✅             |
| [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)                             | ✅             |
| [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)                    | ❌             |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/)                           | ✅             |

Traffic from unsupported on-ramp methods resolves using your default Gateway settings. If you use DNS locations to send DNS queries to Gateway (over IPv4, IPv6, DNS over TLS, or DNS over HTTPS), Gateway does not return the initial resolved IP and the host selectors do not apply.

### Configuration changes

To configure your Zero Trust organization to use Host selectors with Egress policies:

1. Make sure you deploy the following version of the Cloudflare One Client on your users' devices:

  * **Desktop**: [Cloudflare One Client version 2025.4.929.0](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) or later
  * **iOS**: [Cloudflare One Client version 1.11](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#ios) or later
  * **Android and Chrome OS**: [Cloudflare One Client version 2.4.2](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#android) or later.
If you need to support devices running prior versions of WARP, add and deploy the following key-value pair to your devices' [WARP configuration file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) (`mdm.xml` on Windows and Linux or `com.cloudflare.warp.plist` on macOS):
```diff
<array>
	<dict>
+		<key>doh_in_tunnel</key>
+		<true/>
	</dict>
</array>
```
2. In your WARP [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/), configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) such that the initial resolved IPs route through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode):

  * **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.
  * **Include mode**: Add Split Tunnel entries for the following IP addresses:
    * **IPv4**: `172.64.128.0/20`
    * **IPv6**: `2606:4700:0cf1:4000::/64`
  This is the default range. You can [configure a custom initial resolved IP range](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) for IPv4 if it conflicts with your existing network.

The Cloudflare One Client must be set to _Traffic and DNS mode_ for traffic affected by these selectors to route correctly.

## Known issues

### DNS resolution location

For the [Application](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#application), [Content Categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#content-categories), [Domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#domain), and [Host](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#host) selectors, Gateway captures the destination IP address during the initial DNS resolution step described above. The egress policy does not change this IP address, so the destination Gateway connects to is independent of the location of the egress data center or dedicated egress IP you select.

If the resolved destination IP and the egress IP are located in different regions, connections to destinations that enforce geo-restriction or IP-allowlisting based on the connection source may be rejected.

This can affect you if you use Domain or Host egress selectors, your users are located outside the region associated with your egress IP, and the destination applies geo-restriction or IP-based access controls.

### Google Chrome restricts local network access

Starting with [Chrome 142 ↗](https://developer.chrome.com/release-notes/142), Local Network Access (LNA) restricts requests from websites to local IP addresses. LNA is implemented at the Chromium engine level, so this affects all Chromium-based browsers (for example, Microsoft Edge, Brave, and Opera), not only Google Chrome. This can affect accounts whose Gateway initial resolved IP range is still drawn from Carrier-Grade NAT (CGNAT) address space (`100.64.0.0/10`) — for example, the legacy default range `100.80.0.0/16`, or a custom range configured within CGNAT space. These browsers categorize such addresses as belonging to a local network. When a website loaded from a public IP makes subrequests to a domain resolved through an initial resolved IP in this space, the browser treats this as a public-to-local network request and displays a prompt asking the user to allow access to devices on the local network. The browser blocks requests to these domains until the user accepts this prompt.

This commonly occurs when an Egress policy matches broadly used domains (such as `cloudfront.net` or `github.com`), causing subrequests from public pages to resolve into CGNAT space.

Accounts using the current default initial resolved IP range (`172.64.128.0/20`) are not affected, because this range is public Cloudflare address space rather than CGNAT. If your account was created before this default changed, or if you configured a custom CGNAT-space range, refer to [Configure initial resolved IPs](https://developers.cloudflare.com/cloudflare-one/networks/routes/configure-initial-resolved-ips/) to move to a non-CGNAT range instead of relying on the following browser workarounds.

The workarounds below use Google Chrome Enterprise policies. If your organization manages a different Chromium-based browser, consult that browser's enterprise policy documentation for an equivalent control.

#### Iframes

If the affected request originates from within an iframe (for example, an application embedded in a third-party portal), the iframe must declare the `local-network-access` permission for the browser prompt to appear in the parent frame:

* **Chrome 142-144**: Use the `allow="local-network-access"` attribute on the iframe element.
* **Chrome 145+**: The permission was split into `allow="local-network"` and `allow="loopback-network"`.

If iframes are nested, every iframe in the chain must include the appropriate attribute. Since third-party applications control their own iframe attributes, this may not be configurable by the end user.

#### Workarounds

To avoid this issue, choose one of the following options:

* **Override IP address space classification (Chrome 146+)**: Use the [LocalNetworkAccessIpAddressSpaceOverrides ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessIpAddressSpaceOverrides) Chrome Enterprise policy to reclassify your CGNAT-space initial resolved IP range (for example, `100.80.0.0/16`) as public. This is the most targeted fix because it only changes the classification for the initial resolved IP range rather than disabling security checks entirely.
* **Allow specific URLs (Chrome 140+)**: Use the [LocalNetworkAccessAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessAllowedForUrls) Chrome Enterprise policy to exempt specific websites from Local Network Access checks. Note that `https://*` is a valid entry to disable checks for all URLs.
* **Allow specific URLs (Chrome 146+)**: Use the [LocalNetworkAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAllowedForUrls) Chrome Enterprise policy, which replaces `LocalNetworkAccessAllowedForUrls` starting in Chrome 146.
* **Opt out of Local Network Access restrictions (Chrome 142-152)**: Use the [LocalNetworkAccessRestrictionsTemporaryOptOut ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessRestrictionsTemporaryOptOut) Chrome Enterprise policy to completely opt out of Local Network Access restrictions. This is a temporary policy and will be removed after Chrome 152.
* **Disable the Chrome feature flag**: Go to `chrome://flags` and set the **Local Network Access Checks** flag to _Disabled_. This approach is suitable for individual users but not for enterprise-wide deployment.

### DNS Override policies bypass host selectors

If a domain matches a [DNS Override policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#override), Gateway will not apply the initial resolved IP mapping for that domain. This means host-based egress selectors (Application, Content Categories, Domain, and Host) will not evaluate against traffic to the overridden domain. Traffic to these domains will use the default Cloudflare egress method.

### HTTPS DNS records not supported

Host selectors do not support HTTPS DNS record types. When a domain uses HTTPS records for connection establishment, Gateway cannot map the DNS query to a hostname for egress policy evaluation. Traffic to these domains will use the default Cloudflare egress method instead of matching a host-based egress policy.

If you need to apply egress policies to a domain that uses HTTPS records, use an IP-based selector (such as [Destination IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#destination-ip)) instead.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/#page","headline":"Host selectors · Cloudflare One docs","description":"Configure Host selectors in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
```
