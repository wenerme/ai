---
description: Track organization-wide AI spend, attribute usage to identities, and detect anomalous sessions in AI Gateway.
title: User Insights
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# User Insights

Last updated Aug 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/observability/user-insights/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The User Insights dashboard shows how much your organization spends on AI, which identities are responsible for that spend, and which users deviate from their typical usage. It uses the traffic already flowing through your gateway, so there is no additional setup.

## Attribute usage to identities

User Insights is available to all AI Gateway customers at no additional cost and works on any traffic through your gateway. Without an identity or custom metadata on your requests, all usage is grouped under a single anonymous identifier, and User Insights cannot distinguish between individual users.

To attribute usage to individual users, add a user identifier with [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/), or put your gateway behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/). With Access, each authenticated request carries a verified identity you can filter spend and analytics by.

## Key metrics

At the top of the User Insights page, you can view the following organization-wide metrics for the selected time range:

* **Active users**: Identities with gateway usage.
* **Total requests**: Gateway requests in this range.
* **Adoption rate**: IdP identities with at least one request.
* **Tokens per active user**: Median over this time range.
* **Median spend / active user**: Observed spend per attributed identity.
* **Top 10% request activity**: Share of attributed requests made by the most active users.
* **Users to review**: Users whose cost is at least 2x the median spend.
* **Identity coverage**: Share of requests attributed to users.

## Anomaly detection

User Insights baselines each user's normal usage and flags sessions that fall outside it, which can indicate a compromised credential or a misbehaving agent.

Baselines are calculated per session, not per request. For each user, User Insights uses the 95th percentile (p95) session cost over the last 30 days. The baseline is rolling and updates as usage changes.

A session is flagged when it exceeds both of the following thresholds:

* **Relative**: More than 2x the user's own p95 session cost.
* **Absolute**: Above the organization-level p99 session cost across all users.

Both thresholds must be met. This avoids flagging small spikes from low-usage users and routine high-cost sessions from heavy users.

Flagged users appear in a filtered view with the sessions that triggered the flag and their cost. User Insights does not block requests.

## User view

Select a user to see their usage in detail:

* **Spend**: Total observed spend for the user in this range.
* **Requests**: Total gateway requests made by the user.
* **Tokens**: Total tokens consumed by the user.
* **Gateway cached requests**: Number of requests served from cache.
* **Errored requests**: Number of requests that returned an error.
* **Cache hit rate**: Share of requests served from cache.
* **Sessions**: Approximate session count from request metadata.
* **Top model**: The model the user sent the most requests to.
* **Top provider**: The provider the user sent the most requests to.
* **Last seen**: Most recent activity, from the daily spend trend.
* **Active days**: Number of days the user sent traffic in this range.
* **Identity coverage**: Share of the user's requests attributed to an identity.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/user-insights/#page","headline":"User Insights · Cloudflare AI Gateway docs","description":"Track organization-wide AI spend, attribute usage to identities, and detect anomalous sessions in AI Gateway.","url":"https://developers.cloudflare.com/ai-gateway/observability/user-insights/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
