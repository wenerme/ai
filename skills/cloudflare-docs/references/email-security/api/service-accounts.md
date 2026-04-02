---
title: Service accounts
description: A service account allows admins to create and maintain API credentials separate from a single username and password combination. It also allows you to create and control additional API access for different use cases.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/api/service-accounts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Service accounts

A **service account** allows admins to create and maintain API credentials separate from a single username and password combination. It also allows you to create and control additional API access for different use cases.

When you connect to the [Email security (formerly Area 1) API](https://developers.cloudflare.com/email-security/api/), the **Public Key** is used for the _username_ and the **Private Key** for the _password_.

## Create service account

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Service Accounts**.
4. Select **Add Service Account**.
5. Add a **Name**.
6. Select **Create Service Account**.
7. You will see your account's **Private Key** in a pop-up message (which will never be displayed again) and **Public Key** in the list of service accounts. Make sure to copy both values and store in a secure location.

---

## Rotate private key

If you lose your private key or need to rotate it for security reasons, you can generate a new private key:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Service Accounts**.
4. On a specific account, select **...** \> **Refresh key**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/api/service-accounts/","name":"Service accounts"}}]}
```
