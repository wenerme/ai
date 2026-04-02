---
title: Glossary
description: The following terms are used throughout the Tenant API docs. For more details on how these concepts interact with each other, refer to Tenant structure.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/tenant/glossary.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Glossary

The following terms are used throughout the Tenant API docs. For more details on how these concepts interact with each other, refer to [Tenant structure](https://developers.cloudflare.com/tenant/structure/).

## Tenant

A **Tenant** is a special type of Cloudflare account that contains other accounts and resources.

## Tenant admin

Once you sign a partner agreement with Cloudflare, we create a special Tenant account and then add your user to that account as a **Tenant admin**. Cloudflare can add multiple users as Tenant admins upon request.

Tenant admins then become the default [**Super administrator(s)**](https://developers.cloudflare.com/fundamentals/manage-members/roles/) for all accounts and zones contained within the Tenant.

This means that each Tenant admin's user API key can be used to provision accounts based on the catalog specified in your partner agreement.

If needed, you can also [create additional **Super administrators**](https://developers.cloudflare.com/fundamentals/manage-members/manage/).

## Account

An entity that contains various settings, users, and resources (zones, Zero Trust applications, Workers).

## User

A member of a Cloudflare account with their own user profile and [an associated role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) that specifies their privileges within that account.

## Resource

A resource is an entity owned by an account, which could be a zone/domain, a Workers instance, or a Zero Trust application.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/glossary/","name":"Glossary"}}]}
```
