---
title: Get started
description: Enable Security Insights to scan your account for misconfigurations and vulnerabilities.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Security Center scans your Cloudflare account configuration and identifies potential security risks, misconfigurations, and vulnerabilities across your domains. This guide covers the initial setup.

## Prerequisites

* A Cloudflare account.
* At least one [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) (domain or subdomain) added to your Cloudflare account.

## Enable Security Insights and start initial scan

Security Insights scans are enabled by default. The scan reviews your Cloudflare account settings and product configurations across all your domains, then reports any issues it finds as [insights](https://developers.cloudflare.com/security-center/security-insights/) — potential security risks, misconfigurations, or vulnerabilities.

Security Insights start scans by default. Security Insights will scan your Cloudflare environment and provide you with a list of detected [insights](https://developers.cloudflare.com/security-center/security-insights/). Refer to [How it works](https://developers.cloudflare.com/security-center/security-insights/how-it-works/) to learn more about how Security Insights perform a scan.

The initial scan time depends on the number of IT assets in all the domains of your Cloudflare account. When the scan is complete, the status of the page will change from **Scan in Progress** to **Last scan performed on: `<DATE_TIME>`**.

You can decide to stop a scan, and restart a scan later.

To disable scans:

1. In the Cloudflare dashboard, go to the **Security Insights** page.  
[ Go to **Security insights** ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Go to **Disable Security Center scans**, select **Disable scans**.

To restart a scan:

1. In the Cloudflare dashboard, go to the **Security Insights** page.  
[ Go to **Security insights** ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Select **Scan now**.

### Start a new scan

To manually start a scan:

1. In the Cloudflare dashboard, go to the **Infrastructure** page.  
[ Go to **Infrastructure** ](https://dash.cloudflare.com/?to=/:account/security-center/inventory)
2. Select **Scan now**.

Note

Only accounts with at least one Business or Enterprise zone, or accounts on the Teams Standard or Teams Enterprise plan, can start manual scans. All plans receive automatic scans.

### Scan frequency

After you enable Security Insights, Cloudflare performs scans automatically on a recurring schedule based on your plan:

| Plan                   | Scan frequency | On-demand scans |
| ---------------------- | -------------- | --------------- |
| Free, Pro, or Business | Every 7 days   | Yes             |
| Enterprise             | Every 3 days   | Yes             |

For more details, refer to [How it works](https://developers.cloudflare.com/security-center/security-insights/how-it-works/#scan-frequency).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/get-started/","name":"Get started"}}]}
```
