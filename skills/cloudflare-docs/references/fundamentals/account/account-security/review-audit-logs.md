---
title: Review audit logs - v1
description: Review Cloudflare Audit Logs v1 to track account activity through the dashboard or API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/account/account-security/review-audit-logs.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Review audit logs - v1

Note

Audit Logs version 2 is available. Refer to the [Audit Logs v2 documentation](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/) for more details.

Audit logs summarize the history of changes made within your Cloudflare account. Audit logs include account level actions like login, as well as zone configuration changes.

Audit Logs are available on all plan types and are captured for both individual users and for multi-user organizations.

Note

Most beta features will not appear in audit logs until they are out of beta.

## Access audit logs

### Using the dashboard

To access audit logs in the Cloudflare dashboard:

In the Cloudflare dashboard, go to the **Audit Logs** page.

[ Go to **Audit logs** ](https://dash.cloudflare.com/?to=/:account/audit-log) 

You can search these audit logs by user email or domain and filter by date range. To download audit logs, click **Download CSV**.

Note

Depending on the volume of data, the export of large amounts of events from Audit Logs might fail with errors. We always recommend using Cloudflare [Logpush](https://developers.cloudflare.com/logs/logpush/) to make sure Audit Logs are always available and stored externally.

### Using the API

To get audit logs from the Cloudflare API, send a [GET request](https://developers.cloudflare.com/api/resources/audit%5Flogs/methods/list/).

We recommending using the API for downloading historical audit log data.

To maintain Audit Logs query performance, the Audit Logs API was modified on 2019-06-30 to return records with a maximum age of 18 months.

## Retention

Audit Logs are retained for 18 months before being deleted. Enterprise customers can use [Logpush](https://developers.cloudflare.com/logs/logpush/) to store Audit Logs for longer periods of time.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/review-audit-logs/","name":"Review audit logs - v1"}}]}
```
