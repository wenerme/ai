---
title: Permissions
description: When you create a user, the available options for permissions depend on whether your account is a parent account or a child account.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/account-setup/permissions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Permissions

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

Access to Area 1

Beginning October 1, 2025, access and support for Email Security (formerly Area 1) will only be available through the Cloudflare dashboard. Your Email Security protection will not change, but you will no longer be able to access the Area 1 dashboard or send support requests to `@area1security.com` email addresses. For help accessing the Cloudflare dashboard, reach out to [successteam@cloudflare.com](mailto:successteam@cloudflare.com).

When you [create a user](https://developers.cloudflare.com/email-security/account-setup/manage-account-members/#add-user), the available options for permissions depend on whether your account is a **parent** account or a **child** account.

## Parent accounts

Parent accounts are treated as containers with no services provisioned. User accounts created at the parent level will allow them to access any child account.

These accounts are only required for administrators who manage multiple accounts, most commonly associated with our [partners](https://developers.cloudflare.com/email-security/partners/).

Parent users can have one of the following roles:

* **Viewer**: Can enter child accounts but is prevented from making any settings changes, regardless of the customer account settings.
* **SOC Analyst**: Can enter child accounts and make changes on behalf of the customer.

If your account has [parent permissions](https://developers.cloudflare.com/email-security/account-setup/manage-parent-permissions/) that conflict with a parent user's permissions, the parent permissions set on your account take precedence.

## Child accounts

Child accounts control settings and services associated with an Email security instance.

### Child users

Users created at child level will only have access to the assigned child account. These users can have one of the following roles:

* **Super Admin**: Has full access to the account and can make any configuration changes. Can access **Settings** (the gear icon).
* **Configuration Admin**: Can make configuration changes and manage users, except for Super Admin. Has no ability to review messages.
* **SOC Analyst**: Can search, review and retract messages. Has no admin capabilities or access to **Settings** (the gear icon).
* **Viewer**: Only has access to metrics within the system. No access to **Settings** (the gear icon).

| Account area              | Super Admin | Configuration Admin | SOC Analyst | Viewer |
| ------------------------- | ----------- | ------------------- | ----------- | ------ |
| All Settings              | ✅           | ✅                   | ❌           | ❌      |
| User Profile              | ✅           | ✅                   | ✅           | ✅      |
| Global Search             | ✅           | ✅                   | ✅           | ✅      |
| Detection Search          | ✅           | ✅                   | ✅           | ✅      |
| Detection Search Actions  | ✅           | ✅                   | ✅           | ❌      |
| Mail Trace                | ✅           | ✅                   | ✅           | ❌      |
| Home                      | ✅           | ✅                   | ✅           | ✅      |
| Email                     | ✅           | ✅                   | ✅           | ✅      |
| Web                       | ✅           | ✅                   | ✅           | ✅      |
| Accountability            | ✅           | ✅                   | ✅           | ✅      |
| Announcements and Support | ✅           | ✅                   | ✅           | ✅      |
| Landscape                 | ✅           | ✅                   | ✅           | ✅      |
| Message Preview           | ✅           | ❌                   | ✅           | ❌      |
| Message Retraction        | ✅           | ❌                   | ✅           | ❌      |
| Admin Quarantine          | ✅           | ❌                   | ✅           | ❌      |

### Parent users

Depending on the [parent permissions](https://developers.cloudflare.com/email-security/account-setup/manage-parent-permissions/) of your child account, you can delegate access to parent users of your account. This configuration will allow a parent user to view and change settings associated with your account.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/account-setup/","name":"Account setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/account-setup/permissions/","name":"Permissions"}}]}
```
