---
description: Use Security Insights to scan your account for misconfigurations and vulnerabilities.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt
> Use this file to discover all available pages before exploring further.

#  Get started

Last updated Jun 2, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/security-center/get-started/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Security Center scans your Cloudflare account configuration and identifies potential security risks, misconfigurations, and vulnerabilities across your domains. This guide covers the initial setup.

## Prerequisites

* A Cloudflare account.
* At least one [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) (domain or subdomain) added to your Cloudflare account.

## Turn Security Insights on or off

Security Insights scans are enabled by default. Security Insights will scan your Cloudflare environment and provide you with a list of detected [insights](https://developers.cloudflare.com/security/security-insights/). Refer to [How it works](https://developers.cloudflare.com/security/security-insights/how-it-works/) to learn more about how Security Insights perform a scan.

The initial scan time depends on the number of IT assets in all the domains of your Cloudflare account. When the scan is complete, the status of the page will change from **Scan in Progress** to **Last scan performed on: `<DATE_TIME>`**.

You can decide to stop a scan, and restart a scan later.

To disable scans:

1. In the Cloudflare dashboard, go to the **Security Insights** page.
[ Go to **Security insights** ↗ ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Go to **Disable Security Center scans**, select **Disable scans**.

To restart a scan:

1. In the Cloudflare dashboard, go to the **Security Insights** page.
[ Go to **Security insights** ↗ ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Select **Scan now**.

### Start a new scan

To manually start a scan:

1. In the Cloudflare dashboard, go to the **Security insights** page.
[ Go to **Security insights** ↗ ](https://dash.cloudflare.com/?to=/:account/security-center)
2. Select **Scan now**.

Note

Only accounts with at least one Business or Enterprise zone, or accounts on the Teams Standard or Teams Enterprise plan, can start manual scans. All plans receive automatic scans.

### Scan frequency

Cloudflare performs scans automatically for all accounts and zones by default. On-demand scans are available on all plans:

| Plan             | Scan Frequency | On-Demand |
| ---------------- | -------------- | --------- |
| Free             | Every 7 days   | Yes       |
| Pro and Business | Every 3 days   | Yes       |
| Enterprise       | Daily          | Yes       |

For more details, refer to [How it works](https://developers.cloudflare.com/security/security-insights/how-it-works/#scan-frequency).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security-center/get-started/#page","headline":"Get started · Cloudflare Security Center docs","description":"Use Security Insights to scan your account for misconfigurations and vulnerabilities.","url":"https://developers.cloudflare.com/security-center/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
