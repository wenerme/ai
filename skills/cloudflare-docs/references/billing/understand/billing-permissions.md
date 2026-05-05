---
title: Billing permissions
description: Who can view and manage billing on your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Billing permissions

Access to billing features in the Cloudflare dashboard depends on the role assigned to each account member. This page maps each billing action to the required role.

## Roles and billing capabilities

| Action                             | Super Administrator | Administrator | Billing |
| ---------------------------------- | ------------------- | ------------- | ------- |
| View invoices and billing history  | Yes                 | Yes           | Yes     |
| Download invoice PDFs              | Yes                 | Yes           | Yes     |
| View billable usage dashboard      | Yes                 | Yes           | Yes     |
| Pay an outstanding balance         | Yes                 | No            | Yes     |
| Add or update payment methods      | Yes                 | No            | Yes     |
| Change billing address             | Yes                 | No            | Yes     |
| Change billing email               | Yes                 | No            | Yes     |
| Set up budget alerts               | Yes                 | Yes           | Yes     |
| Change or cancel subscriptions     | Yes                 | Yes           | No      |
| Upgrade or downgrade a domain plan | Yes                 | Yes           | No      |
| Manage account members and roles   | Yes                 | No            | No      |

Note

The Billing role can view and pay but cannot change subscriptions or plans. To both manage subscriptions and handle payments, a user needs the Super Administrator role.

## Assign the Billing role

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).
2. Select your account.
3. Go to **Manage Account** \> **Members**.
4. Select **Invite** to add a new member, or select an existing member to edit their role.
5. Assign the **Billing** role.

For more detail on account roles, refer to [Manage account members](https://developers.cloudflare.com/fundamentals/manage-members/manage/).

## API access for billing

API tokens used for billing endpoints require the `Billing Read` or `Billing Edit` permission. To create an API token with billing access:

1. Go to **My Profile** \> **API Tokens**.
2. Select **Create Token**.
3. Use the **Custom token** template.
4. Under **Permissions**, select **Account** \> **Billing** \> **Read** (or **Edit**).

For full API documentation, refer to the [Cloudflare API reference ↗](https://developers.cloudflare.com/api/).

## Related resources

* [Manage account members](https://developers.cloudflare.com/fundamentals/manage-members/manage/) — Add, remove, and change roles for account members
* [API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) — Create tokens with specific permissions
* [How Cloudflare billing works](https://developers.cloudflare.com/billing/understand/how-billing-works/) — Billing lifecycle and charge types

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/understand/","name":"Understand"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/understand/billing-permissions/","name":"Billing permissions"}}]}
```
