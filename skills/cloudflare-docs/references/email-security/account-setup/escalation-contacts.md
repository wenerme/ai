---
title: Escalation contacts
description: Configure escalation contacts in Cloudflare Email security to prioritize alerts for phishing threats and email irregularities. Set up SOC, Triage, Analyst, and Executive contacts.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/escalation-contacts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Escalation contacts

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

Whenever Email security (formerly Area 1) finds an exceptional phishing threat or Email Service irregularity behavior (compromised email servers at a partner or vendor, wire fraud tactics, and more), we try to reach out to our customers.

There are four types of contacts available to configure, each with a priority type:

* **SOC Contact**: P1 priority.
* **Triage Analyst**: P2 priority.
* **In-Depth Analyst**: P3 priority.
* **Executive Contact**: P4 priority.

Email security will start by reaching out to P1-level contacts. If they do not respond, we will then try reaching out to the other contacts down the list until we receive a reply from one of these groups.

You can enable these special notifications through an opt-in process:

1. Log in to the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Subscriptions** \> **Escalation Contacts**.
4. Select **Add Contact**.
5. Fill out the form.
6. Select **Save**.

Note

If you select **Critical Service Events**, the contact will be sent a text and/or an email message. They will need to select the link to confirm the subscriptions.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/escalation-contacts/","name":"Escalation contacts"}}]}
```
