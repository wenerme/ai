---
description: Scope Cloudflare member permissions to individual Cloudflare Tunnel instances.
title: Granular permissions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Granular permissions

Last updated May 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tunnel/advanced/granular-permissions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can scope Cloudflare member permissions to individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances instead of granting account-wide access. This lets you delegate management of specific Tunnels — for example, letting an application team manage one Tunnel for its service without exposing every Tunnel in the account.

Granular permissions are a parallel layer to account-level roles — they do not replace them. Members who already hold an account-level role like `Cloudflare Access` retain write access to every Tunnel in the account.

## How it works

For any API request on a specific Cloudflare Tunnel, access is granted if the principal has **either**:

* An account-level role that covers Tunnels (for example, `Cloudflare Access`), **or**
* A [resource-scoped role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) bound to that specific Tunnel.

[Listing endpoints](#resource-enumeration) (`GET /accounts/{id}/cfd_tunnel`, `GET /accounts/{id}/teamnet/routes`) return only the Tunnels and routes the principal has at least read access to.

## Grant a granular permission

Granular permissions are assigned through the standard [member management](https://developers.cloudflare.com/fundamentals/manage-members/manage/) flow.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Manage Account** \> **Members** and select **Invite Members**, or open an existing member to edit their permissions.
2. Add a permission policy and choose a [resource-scoped role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) that targets Cloudflare Tunnel instances.
3. In the **Scope** section, choose **Specific resources**.
4. Set **Resource type** to **Cloudflare Tunnel instances**.
5. Select one or more specific Tunnels from the resource picker.
6. Save the policy.

You can attach multiple granular policies to the same member to cover different Tunnels with different roles.

## Resource enumeration

Listing endpoints are authorization-aware. When a principal calls a listing endpoint, the response is filtered to the Tunnels and routes they have at least read access to.

| Endpoint                               | Method | Returns                                                       |
| -------------------------------------- | ------ | ------------------------------------------------------------- |
| /accounts/{account\_id}/cfd\_tunnel    | GET    | Cloudflare Tunnel instances the principal can read or manage. |
| /accounts/{account\_id}/teamnet/routes | GET    | Routes attached to Tunnels the principal can read or manage.  |

Members with an account-level role that covers Tunnels continue to see all Tunnels in the account.

## Backward compatibility

* Existing account-level roles and API tokens continue to function as before.
* Existing automation that authenticates with an account-level token (for example, Terraform pipelines using a `Cloudflare Access` token) is unaffected.
* Granular permissions are opt-in. Granting one to a member adds capability; it never removes capability that the member already has from an account-level role.

## Related resources

* [Roles reference](https://developers.cloudflare.com/fundamentals/manage-members/roles/) — the full list of Cloudflare roles, including resource-scoped roles for Cloudflare Tunnel instances.
* [Manage account members](https://developers.cloudflare.com/fundamentals/manage-members/manage/) — the member invite and edit flow.
* [Granular permissions for Cloudflare Tunnel and Cloudflare Mesh in Cloudflare One](https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/) — the same RBAC capability applied to Cloudflare Mesh nodes alongside Tunnels.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/advanced/granular-permissions/#page","headline":"Granular permissions · Cloudflare Docs","description":"Scope Cloudflare member permissions to individual Cloudflare Tunnel instances.","url":"https://developers.cloudflare.com/tunnel/advanced/granular-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
