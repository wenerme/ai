---
description: Scope Cloudflare member permissions to individual Cloudflare Tunnel instances and Cloudflare Mesh nodes.
title: Granular permissions for Tunnels and Mesh nodes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Granular permissions for Tunnels and Mesh nodes

Last updated May 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can scope Cloudflare member permissions to individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes, instead of granting account-wide access to every Tunnel and Mesh node. This enables least-privilege delegation for private networking operations — for example, letting a support operator stream logs from a single Tunnel without exposing the rest of your account.

Granular permissions are a parallel layer to [account-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles) — they do not replace them. Members who already hold an account-level role like `Cloudflare Access` or `Cloudflare Zero Trust` continue to have write access to every Tunnel and Mesh node in the account.

## How it works

For any API request on a specific Tunnel or Mesh node, access is granted if the principal has **either**:

* An account-level role that covers the resource (for example, `Cloudflare Access` or `Cloudflare Zero Trust`), **or**
* A [resource-scoped role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) bound to that specific Tunnel or Mesh node.

[Resource enumeration endpoints](#resource-enumeration) (`GET /accounts/{id}/cfd_tunnel`, `GET /accounts/{id}/warp_connector`) return only the resources the principal has at least read access to.

## Grant a granular permission

Granular permissions are assigned through the standard [member management](https://developers.cloudflare.com/fundamentals/manage-members/manage/) flow.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Manage Account** \> **Members** and select **Invite Members**, or open an existing member to edit their permissions.
2. Add a permission policy and choose a [resource-scoped role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) that targets Tunnels or Mesh nodes.
3. In the **Scope** section, choose **Specific resources**.
4. Set **Resource type** to one of:
  * **Cloudflare Tunnel instances** — for individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances.
  * **Cloudflare Mesh nodes** — for individual [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes.
5. Select one or more specific Tunnels or Mesh nodes from the resource picker.
6. Save the policy.

You can attach multiple granular policies to the same member to cover different Tunnels and Mesh nodes with different roles.

## Resource enumeration

Listing endpoints are authorization-aware. When a principal calls a listing endpoint, the response is filtered to the resources they have at least read access to.

| Endpoint                                | Method | Returns                                                       |
| --------------------------------------- | ------ | ------------------------------------------------------------- |
| /accounts/{account\_id}/cfd\_tunnel     | GET    | Cloudflare Tunnel instances the principal can read or manage. |
| /accounts/{account\_id}/warp\_connector | GET    | Cloudflare Mesh nodes the principal can read or manage.       |
| /accounts/{account\_id}/teamnet/routes  | GET    | Routes attached to Tunnels the principal can read or manage.  |

Members with an account-level role that covers Tunnels and Mesh continue to see all resources in the account.

## Backward compatibility

* Existing account-level roles and API tokens continue to function as before.
* Existing automation that authenticates with an account-level token (for example, Terraform pipelines using a `Cloudflare Access` token) is unaffected.
* Granular permissions are opt-in. Granting one to a member adds capability; it never removes capability that the member already has from an account-level role.

## Related resources

* [Roles reference](https://developers.cloudflare.com/fundamentals/manage-members/roles/) — the full list of Cloudflare roles, including resource-scoped roles for Tunnels and Mesh nodes.
* [Role scopes](https://developers.cloudflare.com/fundamentals/manage-members/scope/) — how policy scopes work across account, domain, and resource layers.
* [Manage account members](https://developers.cloudflare.com/fundamentals/manage-members/manage/) — the member invite and edit flow.
* [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/)
* [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/#page","headline":"Granular permissions for Tunnels and Mesh nodes · Cloudflare One docs","description":"Scope Cloudflare member permissions to individual Cloudflare Tunnel instances and Cloudflare Mesh nodes.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
