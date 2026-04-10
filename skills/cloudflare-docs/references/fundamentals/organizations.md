---
title: Organizations
description: An organization is a top-level container in Cloudflare for managing multiple accounts. It allows administrators to govern accounts, members, and resources from a single location rather than managing each account individually. Organization Super Administrators have implicit access to all accounts within the organization. This means they do not need explicit membership on each account.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/organizations/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Organizations

 Enterprise-only 

An organization is a top-level container in Cloudflare for managing multiple accounts. It allows administrators to govern accounts, members, and resources from a single location rather than managing each account individually. Organization Super Administrators have implicit access to all accounts within the organization. This means they do not need explicit membership on each account.

Each user can create one organization, and each organization supports up to 500 accounts and 500 zones.

Note

Cloudflare Organizations is currently in public beta.

## Features

* **Centralized account management**: Assign Enterprise Accounts to your Organization and manage them from a single dashboard.
* **Implicit access**: Organization Super Administrators can access any account in the organization without requiring explicit per-account membership.
* **Aggregate audit logs**: View, filter, and download aggregate HTTP analytics across all Organization child accounts.
* **Organization-level membership**: Invite members to the organization once, granting them access to all child accounts.
* **Terraform support**: Manage Organizations with infrastructure as code from day one.

---

* [ Set up ](https://developers.cloudflare.com/fundamentals/organizations/setup/)
* [ Manage members ](https://developers.cloudflare.com/fundamentals/organizations/manage-members/)
* [ Manage organizations ](https://developers.cloudflare.com/fundamentals/organizations/manage-organization/)
* [ Limitations ](https://developers.cloudflare.com/fundamentals/organizations/limitations/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/organizations/","name":"Organizations"}}]}
```
