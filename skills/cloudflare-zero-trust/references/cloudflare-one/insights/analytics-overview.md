---
description: Reference information for Analytics overview in Zero Trust analytics.
title: Analytics overview
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics overview

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare One Analytics overview provides a dashboard that reports on how Cloudflare One is protecting your organization and networks. Use this page to monitor usage and potential security concerns within your organization.

To view the Analytics overview, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com) and go to **Overview**.

The Analytics overview includes reports and insights across the following products and categories:

* [Global status](#global-status) of your Zero Trust Organization
* [Access](#access)
* Gateway
  * [HTTP traffic](#proxy-traffic)
  * [Network traffic](#gateway-network-requests)
  * [DNS traffic](#dns-traffic)
  * [Firewall policies](#gateway-insights)

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Global status

In **Global status**, you can view a report on your organization's Cloudflare One adoption that contains the following metrics:

* Access apps configured
* Gateway HTTP policies
* Gateway network policies
* Gateway DNS policies
* SaaS integrations
* Data Loss Prevention (DLP) profiles

You can also view a report on your [seat usage](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) across your Zero Trust Organization that contains the following metrics. A seat is a billable unit consumed when a user authenticates to your Zero Trust organization.

* Total seats
* Used seats
* Unused seats

## Access

In **Access**, you can view a report on your [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/) configuration that contains:

**Metrics:**

* Total access attempts
* Granted access
* Denied (policy violation)
* Active logins over time
* Top applications with most logins

**Filters:**

* Access data by country

## Gateway

### Proxy traffic

In **Proxy traffic**, you can view a report on your [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) HTTP traffic that contains:

**Metrics:**

* Total requests over time
* Allowed requests
* Blocked requests
* Isolated requests (served through [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/))
* Do not inspect requests
* Top bandwidth consumers (GB)
* Top denied users

**Filters:**

* Gateway HTTP traffic data by country

### Gateway (network requests)

In **Gateway (network requests)**, you can view a report on your Gateway network traffic that contains:

**Metrics:**

* Total sessions
* Authenticated sessions
* Blocked sessions
* Allowed sessions
* Override sessions
* Top bandwidth consumers in GB
* Top denied users

**Filters:**

* Gateway network traffic data by country

### DNS traffic

In **DNS traffic**, you can view a report on your Gateway DNS traffic that contains:

**Metrics:**

* Total DNS queries
* Allowed DNS queries
* Blocked DNS queries
* Override DNS queries
* Safe Search DNS queries
* Restricted DNS queries
* Other DNS queries

**Filters:**

* Gateway DNS traffic by query type
* Gateway DNS traffic by country

### Gateway insights

In **Gateway insights**, you can view a report on your Gateway firewall policies that contains the following metrics:

* Top domain blocking policies
* Most user queries
* Top devices
* Top countries

### CASB metrics

In **CASB**, you can review instances of security issues — such as misconfigurations, unauthorized user activity, and shadow IT — found in your SaaS integrations by [Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/).

* Integrations by number of findings
* [DLP](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) findings by profile name

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/#page","headline":"Analytics overview · Cloudflare One docs","description":"Reference information for Analytics overview in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
```
