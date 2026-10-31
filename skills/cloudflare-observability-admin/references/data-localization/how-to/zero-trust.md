---
description: Configure data localization controls for Cloudflare One traffic, private keys, and supported logs.
title: Data residency for Cloudflare One
image: https://developers.cloudflare.com/data-localization/how-to/zero-trust/og.png?v=fc232a5634433dfc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Data residency for Cloudflare One

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/data-localization/how-to/zero-trust/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cloudflare One](https://developers.cloudflare.com/cloudflare-one/) provides separate controls for where Cloudflare processes supported traffic and where Cloudflare stores supported logs. These controls have different settings and supported regions.

| Control | What it controls | Current availability |
| --- | --- | --- |
| [Processing region (Regional Services for Gateway)](#processing-region-for-gateway) | Where Gateway decrypts HTTPS traffic and performs HTTP inspection | Available for [supported on-ramps and regions](#processing-region-for-gateway) |
| [Connection locations](#connection-locations) | Where `cloudflared`, the Cloudflare One Client, and Direct CNI connect | Earth, United States, or FedRAMP High |
| [Processing region for Access](#access) | Where Cloudflare processes reverse proxy requests for Access-protected applications | Team domain: FedRAMP Moderate Compliant (Domestic). Public hostnames: any managed region available for Regional Hostnames |
| [Processing region for Browser Isolation](#browser-isolation) | Where Cloudflare processes supported Browser Isolation traffic | US FedRAMP region only |
| [Log region (Customer Metadata Boundary)](#log-region) | Where Cloudflare stores supported Customer Logs | European Union and United States for selected datasets |
| [Email Security regional processing](https://developers.cloudflare.com/cloudflare-one/email-security/reference/regional-processing/) | Where Email Security examines messages for supported deployment types | Refer to the [Email Security documentation](https://developers.cloudflare.com/cloudflare-one/email-security/reference/regional-processing/) |

This guide describes the current scope of Cloudflare One data residency controls.

## FedRAMP environments

Customers that require a FedRAMP-authorized Cloudflare One deployment should use the applicable [Cloudflare One FedRAMP environment ↗︎](https://www.cloudflare.com/cloudflare-for-government/). Product and feature availability varies between FedRAMP environments. Contact your account team to select and configure the appropriate environment.

## Processing region for Gateway

Processing region (Regional Services for Gateway) controls where Cloudflare Gateway decrypts HTTPS traffic and performs HTTP inspection. Gateway HTTP inspection requires [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-controls/http-policies/tls-decryption/).

Processing region for Gateway does not apply to Gateway DNS or network policy processing. Gateway DNS or network policy processing occurs at the Cloudflare data center where traffic is received.

Processing region for Gateway is configured at the Cloudflare One account level. The selected region applies to Gateway HTTP traffic from supported on-ramps for the account.

### Supported on-ramps

Cloudflare One applies this behavior to traffic sent to Gateway through these on-ramps:

- [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) in [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-and-dns-mode-default)
- [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)
- [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/) connected through IPsec, GRE, or Direct CNI

Cloudflare WAN requires [unified routing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#unified-routing-mode) for this support.

### Connection termination is separate from inspection location

These on-ramps create a connection that may terminate at a Cloudflare data center outside the selected region (for example, Cloudflare One Client creates a MASQUE tunnel that may terminate outside the region). HTTPS traffic carried inside the connection remains encrypted until Gateway forwards it to the selected region for TLS decryption and HTTP inspection.

For connection termination locations, refer to [Connection locations](#connection-locations).

### Available regions

Processing region for Gateway is available in these regions:

- European Union
- Exclusive of Hong Kong and Macau
- Exclusive of Russia and Belarus
- FedRAMP Moderate Compliant (Domestic)
- FedRAMP Moderate Compliant (International)
- IRAP Protected
- NATO
- Schengen Area
- United States of America

Refer to [Region support](https://developers.cloudflare.com/data-localization/region-support/) for region definitions. Contact your account team to configure or inquire about the availability of other regions.

### Gateway limitations

You can [bring your own certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/) to Gateway, but the certificate cannot be restricted to a specific region.

[File Sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-controls/http-policies/file-sandboxing/) processes quarantined files in the United States, regardless of the selected Gateway processing region. Using File Sandboxing with a non-US processing region sends those files outside the selected region.

Processing region for Gateway supports [predefined and custom DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) that do not use [EDM, custom wordlists, document entries, or AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/), or [pattern entries with custom functions](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/custom-validation-workers/). [AI context analysis and OCR](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) are also unsupported.

Feature availability in dedicated FedRAMP environments may differ from these Gateway limitations. Contact your account team for current FedRAMP feature support.

### Egress traffic

Regional Services and egress policies are separate controls. Regional Services controls where Gateway decrypts HTTPS traffic and performs HTTP inspection. Dedicated egress IPs provide predictable, account-specific source IP addresses after traffic leaves Gateway for its destination. Customers can use them for origin allowlisting or to associate Gateway traffic with a selected IP geolocation.

Use [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-controls/egress-policies/dedicated-egress-ips/) and [Gateway egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-controls/egress-policies/) to select these source IP addresses for Gateway traffic.

## Connection locations

The following connection locations are separate from processing region:

- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#region) connects globally by default. The `--region us` option restricts tunnel connections to data centers in the United States. In FedRAMP High environments, the tunnel token automatically routes `cloudflared` to FedRAMP data centers and no `--region` flag is required.
- [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#environment) connects to the global environment by default. The `fedramp_high` setting connects the client to the FedRAMP High environment.
- [Direct CNI](https://developers.cloudflare.com/network-interconnect/) terminates a physical connection at the facility selected during provisioning. This is a physical topology choice that is made by the customer.

## Access

Cloudflare Access uses different connection paths depending on the application type:

1. The user connects to the [Access team domain](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name), such as `<team>.cloudflareaccess.com`, to authenticate.
2. For a public application, the user connects to the protected application hostname, such as `app.example.com`, to access the application.
3. For a private application, the user reaches the application's private IP or hostname through the Cloudflare One Client, Cloudflare WAN, or Browser Isolation. Cloudflare evaluates the Access application policies before allowing traffic to reach the application.

### Processing region

The Access team domain supports processing in the FedRAMP Moderate Compliant (Domestic) region. Contact your account team to configure the Access team domain as regionalized.

A public application hostname can use any managed region available for Regional Hostnames. Configure the region on the proxied DNS hostname using one of the documented [ways to use Regional Services](https://developers.cloudflare.com/data-localization/regional-services/#ways-to-use-regional-services).

For a private application hostname reached through Cloudflare Tunnel, the [`cloudflared --region us` setting](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#region) restricts the connector's Cloudflare connections to data centers in the United States. In FedRAMP High environments, the tunnel token routes `cloudflared` to FedRAMP data centers and no `--region` flag is required. The Tunnel region setting is configured separately from the processing region for eligible Gateway HTTP traffic.

### Log region

When Customer Metadata Boundary is set to the European Union, Access does not store Access User Logs and the dashboard appears empty. Use [Logpush](https://developers.cloudflare.com/logs/logpush/) to retain these logs. For more information, refer to [Log region](#log-region).

### Geo Key Manager

If the protected application hostname uses a supported custom certificate, [configure Geo Key Manager](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/setup/) to restrict where Cloudflare stores the private TLS key for that hostname. This setting applies to the hostname's TLS certificate, not to Cloudflare One.

## Browser Isolation

Processing region does not control where [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) sessions run. Browser Isolation supports regional processing only in the US FedRAMP region. Contact your account team to set up a FedRAMP account.

## CASB

CASB does not support regional processing through Regional Services or regional log storage through Customer Metadata Boundary.

## Log region

[Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) is an account-level setting that stores supported Customer Logs in the European Union or United States. It is configured independently from the processing region.

Support varies by dataset. In the [CMB-supported Logpush dataset list](https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/), Respects CMB indicates whether the dataset's logs are stored only in the selected region. If a dataset is unavailable in the selected CMB region, Logpush does not deliver data for that dataset.

For datasets marked as respecting CMB, Cloudflare stores the logs and initiates Logpush delivery from the selected CMB region to a destination you control. CMB does not restrict the destination's location.

Refer to the current lists of [CMB-supported Logpush datasets](https://developers.cloudflare.com/data-localization/metadata-boundary/logpush-datasets/) and [CMB-supported GraphQL datasets](https://developers.cloudflare.com/data-localization/metadata-boundary/graphql-datasets/) for coverage.

Some Cloudflare One products provide additional product-specific controls for reducing or protecting logged data.

### Gateway logs

Use Gateway logging controls to [exclude supported personally identifiable information fields](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/manage-pii/) or [select which events appear in Cloudflare One activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#selective-logging).

Gateway activity logs are unavailable in the dashboard when Customer Metadata Boundary is enabled. Enterprise users can still export logs through [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

### DLP payload and AI prompt logging

Gateway DLP inspection applies to HTTP traffic through [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/) and requires TLS decryption.

[Configure DLP payload and AI prompt logging](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/) to encrypt matched content with a customer-provided public key. Only the customer holds the private key required to decrypt the protected content.

### SSH command logs

[SSH command logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/ssh-command-logs/) can encrypt downloadable logs with a customer-provided public key for local decryption. This encryption only applies to downloadable SSH logs, not to logs exported through Logpush.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/how-to/zero-trust/#page","headline":"Data residency for Cloudflare One","description":"Configure data localization controls for Cloudflare One traffic, private keys, and supported logs.","url":"https://developers.cloudflare.com/data-localization/how-to/zero-trust/","inLanguage":"en","image":"https://developers.cloudflare.com/data-localization/how-to/zero-trust/og.png?v=fc232a5634433dfc","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging","SSH"]}
```
