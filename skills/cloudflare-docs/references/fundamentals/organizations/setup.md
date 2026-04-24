---
title: Set up
description: Create a Cloudflare Organization, assign accounts, and invite members to manage resources centrally.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/organizations/setup.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Set up

This guide covers how to create an organization, assign accounts, and invite members.

## Prerequisites

Before you create an organization:

* You must have an Enterprise plan.
* You must have [two-factor authentication (2FA)](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/) or [single sign-on (SSO)](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/) enabled.
* You must be a Super Administrator on the accounts you want to assign.

Note

All organization members must have 2FA or SSO enabled.

## Create an organization

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Select **Organizations**.
3. Select **Create organization**.
4. Enter a name for the organization.
5. Select **Create**.

The organization overview page displays after creation.

## Assign accounts

After creating an organization, you can assign accounts to manage them centrally:

1. From the organization overview, select **Assign an account**.
2. Search for an account name. Only Enterprise accounts where you are a Super Administrator will appear.
3. Select the account.
4. Select **Assign to organization**.

The assigned account now appears on the organization overview page. From here, you can view the account, copy its ID, or rename it.

To remove an account from your organization, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Organization Super Administrator

When you create an organization, you become the Organization Super Administrator. This role provides implicit access to all accounts in your organization.

Implicit access means you do not need explicit membership on each account. When you access any account within your organization, you automatically have Super Administrator permissions.

### Invite members

You can invite additional members to your organization. Invited members receive implicit Super Administrator access to all accounts in the organization.

1. From the organization overview, select **Members**.
2. Select **Invite member**.
3. Enter the email address.
4. Select **Send invitation**.

The user receives an email invitation. After accepting, they have implicit access to all accounts in the organization.

Invited members must have 2FA or SSO enabled to join.

## View audit logs

You can view, filter, and download audit logs for HTTP traffic across all domains in your organization:

1. From the organization overview, select **Analytics & Logs**.
2. Use filters to narrow results by date range, account, domain, or other criteria.
3. To export data, select **Download**.

The data includes traffic for proxied hostnames and may be based on a sample. This data does not reflect billable usage.

## Manage your organization

### Rename your organization

1. Go to **Organizations** \> **Manage Organization**.
2. Next to **Organization name**, select **Rename**.
3. Enter the new name.
4. Select **Rename**.

### Edit customer identification data

1. Go to **Organizations** \> **Manage Organization**.
2. Next to **Customer identification data**, select **Edit**.
3. Update the information.
4. Select **Save**.

## Terraform

You can manage Organizations using the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/organization).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/organizations/","name":"Organizations"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/organizations/setup/","name":"Set up"}}]}
```
