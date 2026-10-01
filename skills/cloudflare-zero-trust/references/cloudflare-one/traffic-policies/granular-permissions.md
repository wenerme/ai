---
description: Scope Cloudflare member permissions to individual Gateway traffic policies and lists instead of granting account-wide access.
title: Granular permissions for Gateway
image: https://developers.cloudflare.com/cloudflare-one/traffic-policies/granular-permissions/og.png?v=327dde7bf2ec3aef
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Granular permissions for Gateway

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-policies/granular-permissions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can scope Cloudflare member permissions to individual Gateway [traffic policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) and [lists](https://developers.cloudflare.com/cloudflare-one/traffic-policies/expression-syntax/#selectors-by-field-type), instead of granting account-wide access to every Gateway resource. For example, you can let a security analyst manage a specific set of HTTP policies without exposing DNS policies or account-wide configuration.

Granular permissions are a parallel layer to [account-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles) and do not replace them. Members who already hold an account-level role like `Cloudflare Gateway` or `Cloudflare Zero Trust` continue to have write access to every Gateway resource in the account.

## Account-level roles

Gateway provides dedicated account-level roles that grant access to specific resource types across the entire account, without requiring the broader `Cloudflare Gateway` or `Cloudflare Zero Trust` role.

| Role | Access |
| --- | --- |
| Zero Trust Gateway Read Only | Read-only access to all Gateway resources. |
| Zero Trust Account Lists Admin | Full create, edit, and delete access to all Gateway lists. |
| Zero Trust DNS Location Admin | Full create, edit, and delete access to all DNS locations. |
| Zero Trust DNS Policies Admin | Full create, edit, delete, and reorder access to all DNS policies. |
| Zero Trust HTTP Policies Admin | Full create, edit, delete, and reorder access to all HTTP policies. |
| Zero Trust Network Policies Admin | Full create, edit, delete, and reorder access to all network policies. |
| Zero Trust Resolver Policies Admin | Full create, edit, delete, and reorder access to all resolver policies. |
| Zero Trust Egress Policies Admin | Full create, edit, delete, and reorder access to all egress policies. |
| Zero Trust Proxy Endpoints Admin | Full create, edit, and delete access to all proxy endpoints. |

These roles appear in the [roles reference](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

## Resource-scoped roles

In addition to account-level roles, you can grant members access to **specific individual policies or lists**. For example, you can allow a team member to edit one HTTP isolation policy without exposing any other policies in the account.

Resource-scoped roles cover read and edit access to existing resources. They do not grant the ability to create new policies or lists. To create new resources, a member needs an account-level role.

Gateway supports resource-scoped permissions for:

- **Individual Gateway lists**, allowing a member to edit a specific list used in policy expressions.
- **Individual Gateway policies**, allowing a member to edit a specific traffic policy. This applies to all policy families:
  - DNS policies
  - HTTP policies (including [isolation policies](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/))
  - Network policies
  - Resolver policies
  - Egress policies

Note

Resource-scoped Gateway permissions do not include DNS locations. DNS locations are managed through the account-level `Zero Trust DNS Location Admin` role.

## How it works

For any API request on a specific Gateway policy or list, access is granted if the principal has **either**:

- An account-level role that covers the resource (for example, `Zero Trust HTTP Policies Admin`, `Cloudflare Gateway`, or `Cloudflare Zero Trust`), **or**
- A [resource-scoped role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) bound to that specific policy or list.

[Listing endpoints](#resource-enumeration) return only the policies and lists the principal has at least read access to.

## Grant a granular permission

Granular permissions are assigned through the standard [member management](https://developers.cloudflare.com/fundamentals/manage-members/manage/) flow.

1. In the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/), go to **Manage Account** > **Members** and select **Invite Members**, or open an existing member to edit their permissions.
2. Add a permission policy and choose a [resource-scoped role](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) that targets Gateway policies or lists.
3. In the **Scope** section, choose **Specific resources**.
4. Set **Resource type** to one of:
   - **Gateway policies** to scope access to individual traffic policies (DNS, HTTP, network, resolver, or egress).
   - **Gateway lists** to scope access to individual lists.
5. Select one or more specific policies or lists from the resource picker.
6. Save the policy.

You can attach multiple granular policies to the same member to cover different Gateway resources with different roles.

## Resource enumeration

Listing endpoints are authorization-aware. When a principal calls a listing endpoint, the response is filtered to the resources they have at least read access to.

| Endpoint | Method | Returns |
| --- | --- | --- |
| `/accounts/{account_id}/gateway/rules` | `GET` | Gateway policies the principal can read or manage. |
| `/accounts/{account_id}/gateway/lists` | `GET` | Gateway lists the principal can read or manage. |

Members with an account-level role that covers Gateway continue to see all resources in the account.

## Browser Isolation policies

[Isolation policies](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/) are Gateway HTTP policies with the *Isolate* or *Do Not Isolate* action. All Gateway HTTP policy permissions apply identically to isolation policies, and there is no separate permission surface for Browser Isolation.

The per-policy [settings](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#policy-settings) (copy/paste, file download/upload, keyboard, printing) are part of the HTTP policy object, so whoever can edit the policy can also edit those settings.

To delegate management of specific isolation policies, grant a member a resource-scoped role for the individual HTTP policy.

## Backward compatibility

- Existing account-level roles and API tokens continue to function as before.
- Existing automation that authenticates with an account-level token (for example, Terraform pipelines using a `Cloudflare Gateway` token) is unaffected.
- Granular permissions are opt-in. Granting one to a member adds capability; it never removes capability that the member already has from an account-level role.

## Related resources

- [Roles reference](https://developers.cloudflare.com/fundamentals/manage-members/roles/) -- the full list of Cloudflare roles, including resource-scoped roles for Gateway policies and lists.
- [Role scopes](https://developers.cloudflare.com/fundamentals/manage-members/scope/) -- how policy scopes work across account, domain, and resource layers.
- [Manage account members](https://developers.cloudflare.com/fundamentals/manage-members/manage/) -- the member invite and edit flow.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/granular-permissions/#page","headline":"Granular permissions for Gateway","description":"Scope Cloudflare member permissions to individual Gateway traffic policies and lists instead of granting account-wide access.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/granular-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/granular-permissions/og.png?v=327dde7bf2ec3aef","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
