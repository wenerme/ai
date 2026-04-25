---
title: Tenant structure
description: Understand how tenants, accounts, users, and zones relate in the Cloudflare Tenant model.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Tenant structure

Cloudflare helps Channel and Alliance partners manage their and their customers' accounts through a Tenant structure.

![Partner accounts contain a tenant, which is a container for customer accounts and zones. For more details, keep reading.](https://developers.cloudflare.com/_astro/tenant-diagram.D0Hfc9bM_Z2lMoX4.webp) 

## Tenants and Tenant admins

A **Tenant** is a special type of Cloudflare account that contains other accounts and resources.

Once you sign a partner agreement with Cloudflare, we create a special Tenant account and then add your user to that account as a **Tenant admin**. Cloudflare can add multiple users as Tenant admins upon request.

Tenant admins then become the default [**Super administrator(s)**](https://developers.cloudflare.com/fundamentals/manage-members/roles/) for all accounts and zones contained within the Tenant.

This means that each Tenant admin's user API key can be used to provision accounts based on the catalog specified in your partner agreement.

If needed, you can also [create additional **Super administrators**](https://developers.cloudflare.com/fundamentals/manage-members/manage/).

## Accounts, users, and resources

This Tenant structure gives your account streamlined administrative access to customer:

* Accounts[1](#user-content-fn-1)
* Users[2](#user-content-fn-2)
* Resources[3](#user-content-fn-3)

At the same time, this structure keeps your customers' data and settings separate from each other.

## Footnotes

1. An entity that contains various settings, users, and resources (zones, Zero Trust applications, Workers).  
[↩](#user-content-fnref-1)
2. A member of a Cloudflare account with their own user profile and [an associated role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) that specifies their privileges within that account.  
[↩](#user-content-fnref-2)
3. A resource is an entity owned by an account, which could be a zone/domain, a Workers instance, or a Zero Trust application.  
[↩](#user-content-fnref-3)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/structure/","name":"Tenant structure"}}]}
```
