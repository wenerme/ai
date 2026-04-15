---
title: Gateway
description: Review recent changes to Cloudflare Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/changelog/gateway.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Gateway

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/gateway.xml) 

## 2026-04-06

  
**Organizations is now in public beta for enterprises**   

We're announcing the public beta of **Organizations** for enterprise customers, a new top-level Cloudflare container that lets Cloudflare customers manage multiple accounts, members, analytics, and shared policies from one centralized location.

**What's New**

**Organizations \[BETA\]**: [Organizations](https://developers.cloudflare.com/fundamentals/organizations/) are a new top-level container for centrally managing multiple accounts. Each Organization supports up to 500 accounts and 5000 zones, giving larger teams a single place to administer resources at scale.

**Self-serve onboarding**: Enterprise customers can [create an Organization](https://developers.cloudflare.com/fundamentals/organizations/setup/) in the dashboard and assign accounts where they are already Super Administrators.

**Centralized Account Management**: At launch, every Organization member has the Organization Super Admin role. Organization Super Admins can invite other users and manage any child account under the Organization implicitly.**Shared policies**: Share [WAF](https://developers.cloudflare.com/waf/custom-rules/) or [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/organizations/) policies across multiple accounts within your Organization to simplify centralized policy management.**Implicit access**: Members of an Organization automatically receive Super Administrator permissions across child accounts, removing the need for explicit membership on each account. Additional Org-level roles will be available over the course of the year.

**Unified analytics**: View, filter, and download aggregate HTTP analytics across all Organization child accounts from a single dashboard for centralized visibility into traffic patterns and security events.

**Terraform provider support**: Manage Organizations with infrastructure as code from day one. Provision organizations, assign accounts, and configure settings programmatically with the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/organization).

**Shared policies**: Share [WAF](https://developers.cloudflare.com/waf/custom-rules/) or [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) policies across multiple accounts within your Organization to simplify centralized policy management.

Note

Organizations is in Public Beta. You must have an Enterprise account to create an organization, but once created, you can add accounts of any plan type where you are a Super Administrator.

For more info:

* [Get started with Organizations](https://developers.cloudflare.com/fundamentals/organizations/)
* [Set up your Organization](https://developers.cloudflare.com/fundamentals/organizations/setup/)
* [Review limitations](https://developers.cloudflare.com/fundamentals/organizations/limitations/)

## 2026-03-04

  
**Gateway Authorization Proxy and hosted PAC files (open beta)**   

The [Gateway Authorization Proxy](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint) and [PAC file hosting](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) are now in open beta for all plan types.

Previously, [proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#source-ip-endpoint) relied on static source IP addresses to authorize traffic, providing no user-level identity in logs or policies. The new authorization proxy replaces IP-based authorization with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) authentication, verifying who a user is before applying Gateway filtering without installing the WARP client.

This is ideal for environments where you cannot deploy a device client, such as virtual desktops (VDI), mergers and acquisitions, or compliance-restricted endpoints.

#### Key capabilities

* **Identity-aware proxy traffic** — Users authenticate through your identity provider (Okta, Microsoft Entra ID, Google Workspace, and others) via Cloudflare Access. Logs now show exactly which user accessed which site, and you can write [identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) like "only the Finance team can access this accounting tool."
* **Multiple identity providers** — Display one or multiple login methods simultaneously, giving flexibility for organizations managing users across different identity systems.
* **Cloudflare-hosted PAC files** — Create and host [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) directly in Cloudflare One with pre-configured templates for Okta and Azure, hosted at `https://pac.cloudflare-gateway.com/<account-id>/<slug>` on Cloudflare's global network.
* **Simplified billing** — Each user occupies a seat, exactly like they do with the Cloudflare One Client. No new metrics to track.

#### Get started

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies** \> **Proxy endpoints**.
2. [Create an authorization proxy endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint) and configure Access policies.
3. [Create a hosted PAC file](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) or write your own.
4. [Configure browsers](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#3b-configure-browser-to-use-pac-file) to use the PAC file URL.
5. [Install the Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) for HTTPS inspection.

For more details, refer to the [proxy endpoints documentation](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) and the [announcement blog post ↗](https://blog.cloudflare.com/gateway-authorization-proxy-identity-aware-policies/).

## 2025-09-11

  
**DNS filtering for private network onramps**   

[Magic WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/#dns-filtering) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#dns-filtering) users can now securely route their DNS traffic to the Gateway resolver without exposing traffic to the public Internet.

Routing DNS traffic to the Gateway resolver allows DNS resolution and filtering for traffic coming from private networks while preserving source internal IP visibility. This ensures Magic WAN users have full integration with our Cloudflare One features, including [Internal DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns) and [hostname-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

To configure DNS filtering, change your Magic WAN or WARP Connector DNS settings to use Cloudflare's shared resolver IPs, `172.64.36.1` and `172.64.36.2`. Once you configure DNS resolution and filtering, you can use _Source Internal IP_ as a traffic selector in your [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for routing private DNS traffic to your [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-02-12

**Upload/Download File Size selectors for HTTP policies**

Gateway and DLP users can now create HTTP policies with the [Download and Upload File Size (MiB)](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-size) traffic selectors. This update allows users to block uploads or downloads based on file size.

## 2025-02-02

**The default global Cloudflare root certificate expired on 2025-02-02 at 16:05 UTC**

If you installed the default Cloudflare certificate before 2024-10-17, you must generate a new certificate and activate it for your Zero Trust organization to avoid inspection errors. Refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#browser-and-certificate-issues) for instructions and troubleshooting steps.

## 2025-01-08

**Bring your own resolver IP (BYOIP) for DNS locations**

Enterprise users can now [provide an IP address](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#bring-your-own-dns-resolver-ip) for a private DNS resolver to use with [DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/). Gateway supports bringing your own IPv4 and IPv6 addresses.

## 2024-11-20

**Category filtering in the network policy builder**

Gateway users can now create network policies with the [Content Categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#content-categories) and [Security Risks](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#security-risks) traffic selectors. This update simplifies malicious traffic blocking and streamlines network monitoring for improved security management.

## 2024-10-17

**Per-account Cloudflare root certificate**

Gateway users can now generate [unique root CAs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) for their Zero Trust account. Both generated certificate and custom certificate users must [activate a root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/#activate-a-root-certificate) to use it for inspection. Per-account certificates replace the default Cloudflare certificate, which is set to expire on 2025-02-02.

## 2024-10-10

**Time-based policy duration**

Gateway now offers [time-based DNS policy duration](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/timed-policies/#time-based-policy-duration). With policy duration, you can configure a duration of time for a policy to turn on or set an exact date and time to turn a policy off.

## 2024-10-04

**Expanded Gateway log fields**

Gateway now offers new fields in [activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) for DNS, network, and HTTP policies to provide greater insight into your users' traffic routed through Gateway.

## 2024-09-30

**File sandboxing**

Gateway users on Enterprise plans can create HTTP policies with [file sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/) to quarantine previously unseen files downloaded by your users and scan them for malware.

## 2024-07-30

**UK NCSC indicator feed publicly available in Gateway**

Gateway users on any plan can now use the [PDNS threat intelligence feed](https://developers.cloudflare.com/security-center/indicator-feeds/#publicly-available-feeds) provided by the UK National Cyber Security Centre (NCSC) in DNS policies.

## 2024-07-14

**Gateway DNS filter non-authenticated queries**

Gateway users can now select which endpoints to use for a given DNS location. Available endpoints include IPv4, IPv6, DNS over HTTPS (DoH), and DNS over TLS (DoT). Users can protect each configured endpoint by specifying allowed source networks. Additionally, for the DoH endpoint, users can filter traffic based on source networks and/or authenticate user identity tokens.

## 2024-06-25

**Gateway DNS policy setting to ignore CNAME category matches**

Gateway now offers the ability to selectively ignore CNAME domain categories in DNS policies via the [**Ignore CNAME domain categories** setting](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#ignore-cname-domain-categories) in the policy builder and the [ignore\_cname\_category\_matches setting](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) in the API.

## 2024-04-05

**Gateway file type control improvements**

Gateway now offers a more extensive, categorized [list of files](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) to control uploads and downloads.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/gateway/","name":"Gateway"}}]}
```
