---
title: Statistics and details
description: DMARC Management (beta) allows you to review whether emails sent on your behalf passed or failed DMARC, SPF, and DKIM authentication checks.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/dmarc-management/statistics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Statistics and details

DMARC Management (beta) allows you to review whether emails sent on your behalf passed or failed DMARC, SPF, and DKIM authentication checks.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Email** \> **DMARC Management**.
3. The graph shows the volume of emails over a selected time period. Use the dropdown to select a period of up to 30 days.
4. Moving your mouse through the graph gives you details for a particular day. Select **View reports** for a list of DMARC reports by date.
5. Select one of the dates shown to open a window with more details.

## Source details

The Top 10 sources section shows you details about the top sources sending emails on your behalf, with information such as total volume of emails and how these sources fared regarding security policies.

You also have access to information about all third parties, and can drill down for further details on each of them:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Email** \> **DMARC Management**.
3. Select **View all**.
4. The next page shows you a list of all sources sending email on your behalf. You can filter this list by time period.
5. Find a source you want to inspect further, and select the three dots in front of it > **Details** to learn more about that third party.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dmarc-management/","name":"DMARC Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/dmarc-management/statistics/","name":"Statistics and details"}}]}
```
