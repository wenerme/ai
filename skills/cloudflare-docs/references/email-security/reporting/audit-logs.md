---
title: Audit Logs
description: Use Email security (formerly Area 1) logs to review actions performed on your account.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/reporting/audit-logs.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Audit Logs

You can use Email security logs to review actions performed on your account:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Users and Actions** \> **Audit Log**.
4. Review the logs. You can also filter by type of log from the dropdown menu.

## Logs preview

You can use one of the Preview logs to preview how Email security handles post delivery retractions. With Audit logs Preview, Email security shows you the emails that would have been retracted with Post Delivery Response (PDR) or Phish Submissions Response (PSR) enabled.

Refer to **Post delivery retractions for new threats** for [Gmail](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/add-retraction/#post-delivery-retractions-for-new-threats) or [Office 365](https://developers.cloudflare.com/email-security/email-configuration/retract-settings/office365-retraction/#post-delivery-retractions-for-new-threats) to learn more about this feature.

To review preview logs:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Users and Actions** \> **Audit Log**.
4. From the dropdown, select one of the **Preview** logs. This will show you what would have been retracted with Post Delivery Response or Phish Submission Response enabled.

Note

Timestamps in the dashboard of Email security (formerly Area 1) are localized to your timezone. Email security reads this information from the clock of your computer when you log in.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/reporting/","name":"Reporting"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/reporting/audit-logs/","name":"Audit Logs"}}]}
```
