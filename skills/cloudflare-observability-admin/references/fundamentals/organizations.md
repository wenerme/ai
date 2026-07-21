---
title: Organizations
description: Manage multiple Cloudflare accounts from a single organization with centralized access control and audit logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Organizations

An Organization is a top-level container in Cloudflare for managing multiple accounts. It allows administrators to govern accounts, members, and resources from a single location rather than managing each account individually. Organization Super Administrators have implicit access to all accounts within the Organization. This means they do not need explicit membership on each account.

Note

Cloudflare Organizations is currently in public beta. Organizations is actively used in production by Enterprise and MSSP/Distributor customers. Review [current limitations](https://developers.cloudflare.com/fundamentals/organizations/limitations/) before getting started.

## Who is this for?

Organizations is available to **Enterprise customers of any size** and **MSSP/Distributor partners** who manage multiple Cloudflare accounts. Whether you have 5 accounts or 500, Organizations helps you manage them from one dashboard.

Organizations supports two customer types, each with a different structure:

* **[Enterprise Organizations](https://developers.cloudflare.com/fundamentals/organizations/for-enterprise/)**: A single-tier structure for businesses managing their own accounts. One Organization contains multiple accounts directly.
* **[MSSP/Distributor Organizations](https://developers.cloudflare.com/fundamentals/organizations/for-mssp-distributors/)**: A multi-tier structure for channel partners and managed security service providers (MSSPs). A Distributor Organization contains child MSSP Organizations, each managing their own customer accounts.

Organization type is set at creation and cannot be changed.

### Enterprise hierarchy

```plaintext
Organization
├── Account 1
│   ├── Zone A
│   └── Zone B
├── Account 2
│   ├── Zone C
│   └── Zone D
└── Account 3
    └── Zone E
```

### MSSP/Distributor hierarchy

```plaintext
Distributor Organization
├── MSSP Organization A
│   ├── Sub-Organization A1
│   │   ├── Customer Account 1
│   │   │   ├── Zone A
│   │   │   └── Zone B
│   │   └── Customer Account 2
│   │       └── Zone C
│   └── Customer Account 3
│       └── Zone D
└── MSSP Organization B
    ├── Customer Account 4
    │   └── Zone E
    └── Customer Account 5
        └── Zone F
```

MSSP/Distributor Organizations support up to 5 levels of nested sub-organizations.

## Core features

* **Centralized account management**: Manage all accounts from a single dashboard.
* **Implicit access**: Organization Super Administrators can access any account in the Organization without requiring explicit per-account membership.
* **Aggregate analytics**: View, filter, and download aggregate HTTP analytics across all Organization child accounts.
* **Organization-level membership**: Invite members to the Organization once, granting them access to all child accounts.
* **WAF and Gateway policy sharing**: Create security policies once and share them across accounts in your Organization.
* **IdP federation**: Share a single identity provider configuration across all accounts in your Organization. Refer to [IdP federation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/) for setup details.
* **API, SDK, and Terraform support**: Manage Organizations programmatically with the [Cloudflare Organizations API](https://developers.cloudflare.com/api/resources/organizations/), SDKs, or Terraform provider.
* **Enhanced account switcher**: Navigate between accounts with an Organization-aware account switcher in the dashboard.

For a full list of features and limitations specific to each Organization type, refer to the [Enterprise](https://developers.cloudflare.com/fundamentals/organizations/for-enterprise/) or [MSSP/Distributor](https://developers.cloudflare.com/fundamentals/organizations/for-mssp-distributors/) guide.

---

* [ Organizations for Enterprise ](https://developers.cloudflare.com/fundamentals/organizations/for-enterprise/)
* [ Organizations for MSSP and Distributors ](https://developers.cloudflare.com/fundamentals/organizations/for-mssp-distributors/)
* [ Policy sharing ](https://developers.cloudflare.com/fundamentals/organizations/policy-sharing/)
* [ Limitations and troubleshooting ](https://developers.cloudflare.com/fundamentals/organizations/limitations/)
* [ Set up ](https://developers.cloudflare.com/fundamentals/organizations/setup/)
* [ Manage members ](https://developers.cloudflare.com/fundamentals/organizations/manage-members/)
* [ Manage organizations ](https://developers.cloudflare.com/fundamentals/organizations/manage-organization/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/fundamentals/organizations/#page","headline":"Organizations · Cloudflare Fundamentals docs","description":"Manage multiple Cloudflare accounts from a single organization with centralized access control and audit logs.","url":"https://developers.cloudflare.com/fundamentals/organizations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/organizations/","name":"Organizations"}}]}
```
