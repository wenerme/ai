---
description: Reference information for Application Access Report in Zero Trust analytics.
title: Application Access Report
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Application Access Report

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Application Access Report provides a high-level summary of [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) usage across your organization. This dashboard helps administrators monitor authentication patterns, identity provider usage, and Access configuration metrics. If Access is not configured in your account, the dashboard appears empty.

The Application Access Report is powered by [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/).

To view the Application Access Report dashboard:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Go to **Dashboards**.
3. Select **Application Access Report**.

The [Application Access Report](https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/) dashboard offers a summary of overall Access activity, while [Access event analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/access/) dashboard provides a view of login events. You can export the Application Access Report to a PDF to share with stakeholders.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Prerequisites

To populate the Application Access Report dashboard, you must have:

* At least one [Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/) configured in your account.
* Users authenticating to these applications through Cloudflare Access.

## Available insights

The Application Access Report dashboard includes the following panels and metrics:

* [Summary of Access activity](#summary-of-access-activity)
* [Access events](#access-events)
* [Access decisions by event count](#access-decisions-by-event-count)
* [Access applications by event count](#access-applications-by-event-count)
* [Access events by type](#access-events-by-type)
* [Top counts of event details](#top-counts-of-event-details)
* [Access admin metrics](#access-admin-metrics)

### Summary of Access activity

The Summary of Access activity section shows a time series of Access login events over a selected period and a summary of login events. You can filter a time period in the upper right corner of the dashboard.

### Access events

Shows a time series of Access login events over a selected period. Each bar represents the number of login events in the x-axis time interval. You can use this graph to review user authentication activity and detect unusual login spikes.

### Access decisions by event count

Displays the total number of Access decisions made, grouped by outcome (for example, **Granted** or **Denied**).

### Access applications by event count

Shows a breakdown of authentication events by application type (for example, **Self-hosted**, **SaaS**, **Private network**, **Infrastructure** or **MCP Portal**).
Use this view to determine which application types users most frequently access.

### Access events by type

Categorizes authentication events by method, such as **SSO** or **Login** (direct credential-based authentication).
This panel helps administrators understand how users are authenticating across applications and identity providers.

### Top counts of event details

Lists the most common Access event attributes, including:

* Application name — Displays the top accessed applications.
* Identity provider — Shows which identity providers (IdPs) were most used.
* Users — Lists top users by number of login events.
* Countries — Displays top countries where users logged in.
* IP addresses — Lists the top source IPs associated with login events.

These insights help administrators identify usage patterns and trends.

### Access admin metrics

Provides a summary of Access configurations made by admin in your organization, including:

* Applications configured — Total number of Access-protected applications, broken down by type (for example, Self-hosted, SaaS, RDP, SSH, Private network, and [Cloudflare Dashboard SSO](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/)).
* Policies configured — Total number of Access policies, grouped by [policy action](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#actions) (for example, Allow, Block, Bypass, or Service Auth).

This section helps administrators audit their Access setup and verify that expected resources and policies are in place.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/#page","headline":"Application Access Report · Cloudflare One docs","description":"Reference information for Application Access Report in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO","Authentication"]}
```
