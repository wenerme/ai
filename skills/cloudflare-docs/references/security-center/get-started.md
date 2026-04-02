---
title: Get started
description: This guide covers the steps you need to take to set up Security Center in your Cloudflare account for the first time.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/security-center/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

This guide covers the steps you need to take to set up Security Center in your Cloudflare account for the first time.

## Prerequisites

* A Cloudflare account
* At least one zone onboarded to Cloudflare

## Enable Security Insights and start initial scan

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

### Scan Frequency

Once you enable Security Insights, Cloudflare performs scans at a [regular frequency](https://developers.cloudflare.com/security-center/security-insights/how-it-works/#scan-frequency), according to your Cloudflare plan.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/get-started/","name":"Get started"}}]}
```
