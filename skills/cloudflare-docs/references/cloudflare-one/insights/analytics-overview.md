---
title: Analytics overview
description: The Cloudflare One Analytics overview provides a dashboard that reports on how Cloudflare One is protecting your organization and networks. Use this page to monitor usage and potential security concerns within your organization.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/analytics-overview.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Analytics overview

The Cloudflare One Analytics overview provides a dashboard that reports on how Cloudflare One is protecting your organization and networks. Use this page to monitor usage and potential security concerns within your organization.

To view the Analytics overview, log into [Cloudflare One ↗](https://one.dash.cloudflare.com) and go to **Overview**.

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
* DLP profiles

You can also view a report on your [seat usage](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) across your Zero Trust Organization that contains the following metrics:

* Total seats
* Used seats
* Unused seats

## Access

In **Access**, you can view a report on your Access configuration that contains:

**Metrics:**

* Total access attempts
* Granted access
* Denied (policy violation)
* Active logins overtime
* Top applications with most logins

**Filters:**

* Access data by country

## Gateway

### Proxy traffic

In **Proxy traffic**, you can view a report on your Gateway HTTP traffic that contains:

**Metrics:**

* Total requests overtime
* Allowed requests
* Blocked requests
* Isolated requests
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
* Audit SSH sessions
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

In **CASB**, you can review instances of security issues found in your SaaS integrations.

* Integrations by number of findings
* DLP findings by profile name

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics-overview/","name":"Analytics overview"}}]}
```
