---
title: Digital experience
description: Digital experience resources and guides for Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/dex/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Digital experience

Digital Experience Monitoring (DEX) provides visibility into device, network, and application performance across your Zero Trust organization.

With DEX, you can monitor the state of your [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) deployment and resolve issues impacting end-user productivity. DEX is designed for IT and security teams who need to proactively monitor and troubleshoot device and network health across distributed environments. DEX is available on all Cloudflare Zero Trust and SASE plans.

DEX is compatible with Cloudflare's [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) for the EU (European Union). When CMB is configured for the EU, customer logs are stored exclusively in the EU region.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## When a user reports a problem

If a user notifies that “the connection is not working” or “performance is slow,” DEX allows you to:

* Use [device monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/) to check device health and endpoint connectivity.
* Test network health and application responsiveness with [synthetic tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) — automated connectivity checks that run periodically from user devices.
* Identify whether problems originate from the device (such as [issues with the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/)), the network, or Cloudflare.

## Troubleshooting other Cloudflare One features

Use DEX to troubleshoot other Cloudflare One features:

* Test connectivity to a [SaaS application secured with Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/).
* Verify that a website routed through [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) is reachable from user devices.
* Confirm that users can successfully reach internal resources after configuring a [Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).

### Get started

To start using DEX for device, network, and application monitoring:

1. [Create a Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization).
2. [Install the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and sign in to register your device to the organization.
3. Create [tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) to verify device connectivity to applications and networks.
4. [Monitor](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/) device and network health across your fleet using real-time and historical metrics.
5. Run [remote captures](https://developers.cloudflare.com/cloudflare-one/insights/dex/remote-captures/) to collect diagnostic logs and packet captures from user devices.
6. Set up [notifications](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/) to get alerts when degraded connectivity or application performance is detected.

### Troubleshooting

For help resolving common issues with Digital Experience Monitoring, refer to [Troubleshoot Digital Experience Monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/troubleshooting/).

### Directory

Review all available documentation for DEX capabilities.

* [ Device monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/)
* [ Synthetic tests ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/)
* [ Rules ](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/)
* [ Remote captures ](https://developers.cloudflare.com/cloudflare-one/insights/dex/remote-captures/)
* [ Notifications ](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/)
* [ IP visibility ](https://developers.cloudflare.com/cloudflare-one/insights/dex/ip-visibility/)
* [ DEX MCP server ](https://developers.cloudflare.com/cloudflare-one/insights/dex/dex-mcp-server/)
* [ Troubleshoot Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/troubleshooting/)
* [ MCP server ](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/dex-analysis)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}}]}
```
