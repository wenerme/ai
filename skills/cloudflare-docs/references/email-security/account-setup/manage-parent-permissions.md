---
title: Manage parent permissions
description: When you set up Email security through a partner, that partner's account is the parent account to your child account.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/manage-parent-permissions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage parent permissions

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

When you set up Email security through a [partner](https://developers.cloudflare.com/email-security/partners/), that partner's account is the **parent** account to your **child** account.

Each child account can set the level of access allowed to their account from the parent. You may want to update this setting if you are receiving troubleshooting support from your parent account.

To update parent permissions:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Delegated Accounts**.
4. Select a permission level:  
   * **No external account access**: Shuts off all access from the parent account (including Email security).  
   * **Allow external account view-only access** (default): Allows a parent user to view the customer's portal, including settings.  
   * **Allow external account Super Admin access**: Allows a parent user to administer the customer account on their behalf. By selecting this option the customer is acknowledging consent for outside administration of their account.
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/manage-parent-permissions/","name":"Manage parent permissions"}}]}
```
