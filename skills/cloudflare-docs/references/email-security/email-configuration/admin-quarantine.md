---
title: Admin Quarantine
description: Admin Quarantine allows you to automatically prevent incoming messages from reaching a recipient's inbox based on the disposition assigned by Email security.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/admin-quarantine.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Admin Quarantine

Admin Quarantine allows you to automatically prevent incoming messages from reaching a recipient's inbox based on the [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) assigned by Email security.

The messages sent to Admin Quarantine are determined by your [domain settings](https://developers.cloudflare.com/email-security/email-configuration/domains-and-routing/domains/).

## Quarantine emails by disposition

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Select **Email Configuration** \> **Domains**.
4. Select the three dots on the domain that you want to configure admin quarantine for, and choose **Edit**.
5. In **Quarantine Policy** choose the dispositions you want to enable quarantine for that domain.
6. Select **Update Domain**.

Note

Quarantine by disposition needs to be configured manually per domain.

## Access Admin Quarantine

You can view and potentially release emails that were sent to **Admin Quarantine**:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Email** \> **Admin Quarantine**.  
![Access Admin Quarantine to review emails](https://developers.cloudflare.com/_astro/access-quarantine.BZq99YOT_Z3IBFs.webp)
3. Review emails as needed.

## Release quarantined emails

From **Admin Quarantine**, you can also release quarantined emails by selecting one or more messages:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Email** \> **Admin Quarantine**.
3. Find the email you want to release.
4. Select **...** \> **Release**.  
![Select release to remove emails from quarantine](https://developers.cloudflare.com/_astro/release-emails.DcaUOQSx_Zo9uH8.webp)
5. Select **Release** to confirm that you want to release the selected email.
6. (Optional) You can also release multiple messages, by selecting the box next to each message you want to release.

Note

After being released from quarantine, Email security forwards the original email messages to their destination. These emails will arrive at email inboxes from the original sender, not Email security.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/admin-quarantine/","name":"Admin Quarantine"}}]}
```
