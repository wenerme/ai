---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Grant members, User Groups, and API tokens access to the Workers in specific dispatch namespaces.
title: Workers for Platforms roles and permissions
image: https://developers.cloudflare.com/workers/authorization/workers-for-platforms/og.png?v=f7d68982a0c97669
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers for Platforms roles and permissions

In [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/), you can grant access to the Workers in specific [dispatch namespaces](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace). Assign a Workers Namespace role to a member, User Group, or API token, and select the namespaces it applies to.

A namespace role applies to every current and future Worker in the selected namespaces, and only to those Workers. Workers in other namespaces, account Workers, and your [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) use [Workers roles](https://developers.cloudflare.com/workers/authorization/workers/).

For the platform-wide permission model, refer to the [Roles and permissions overview](https://developers.cloudflare.com/workers/authorization/).

## Workers Namespace roles

| Role | Description |
| --- | --- |
| Workers Namespace Metadata Read-Only | View Workers, settings, and bindings in a namespace. Cannot view script code or secrets. |
| Workers Namespace Content Read-Only | Everything in Metadata Read-Only, plus script code and secret names. Cannot make changes. |
| Workers Namespace Editor | Create, update, deploy, and delete Workers in a namespace, including their code, settings, and secrets. Cannot view, update, or delete the namespace itself. |
| Workers Namespace Admin | Everything in Editor, plus view, update, and delete the namespace itself. |

Namespace roles apply to the namespace as a whole. Unlike [Workers Editor](https://developers.cloudflare.com/workers/authorization/workers/#workers-roles), which cannot create or delete Workers, Workers Namespace Editor can upload new Workers to the namespace and delete existing ones.

Creating and listing dispatch namespaces requires account-level Workers access.

## Grant access to members and User Groups

1. In the Cloudflare dashboard, go to the **Members** page and select a [member](https://developers.cloudflare.com/fundamentals/manage-members/manage/). [Go to **Members** ↗](https://dash.cloudflare.com/?to=/:account/members)
2. Add a [permission policy](https://developers.cloudflare.com/fundamentals/manage-members/policies/) and set the scope to **Individual Namespaces**.
3. Select the namespaces and a Workers Namespace role.

To give several people the same access, assign the policy to a [User Group](https://developers.cloudflare.com/fundamentals/manage-members/user-groups/).

## Create a scoped API token

1. In the Cloudflare dashboard, go to the **Account API Tokens** page and create an [account-owned API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/). [Go to **Account API tokens** ↗](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Select a Workers Namespace role and set the scope to **Specified Namespaces**.
3. Select the namespaces the token can access.

To create the token with the API, use the namespace ID without dashes in the resource key:

```json
{
	"name": "Namespace editor",
	"policies": [
		{
			"effect": "allow",
			"permission_groups": [{ "id": "<WORKERS_NAMESPACE_EDITOR_ID>" }],
			"resources": {
				"com.cloudflare.api.account.<ACCOUNT_ID>": {
					"com.cloudflare.edge.worker.namespace.<NAMESPACE_ID>": "*"
				}
			}
		}
	]
}
```

To find permission group IDs, use the [list permission groups](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/subresources/permission_groups/methods/list/) endpoint. To find a namespace ID, use the `namespace_id` field returned by the [list dispatch namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/methods/list/) endpoint.

## Limitations

- Namespace roles apply to every Worker in a namespace. You cannot scope a namespace role to an individual user Worker.
- Creating and listing dispatch namespaces requires account-level Workers access.
- Your [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) and [outbound Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) are regular Workers, so they use [Workers roles](https://developers.cloudflare.com/workers/authorization/workers/).
- The [`wrangler login`](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) OAuth flow does not support namespace roles. To use them with Wrangler, [authenticate with an account-owned API token](https://developers.cloudflare.com/workers/authorization/#use-granular-permissions-with-wrangler).
- Namespace roles do not include observability data such as logs, metrics, and traces for user Workers.

## Related resources

- [Roles and permissions overview](https://developers.cloudflare.com/workers/authorization/)
- [Workers roles and permissions](https://developers.cloudflare.com/workers/authorization/workers/)
- [How Workers for Platforms works](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/)
- [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/)
- [Role scopes](https://developers.cloudflare.com/fundamentals/manage-members/scope/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/authorization/workers-for-platforms/#page","headline":"Workers for Platforms roles and permissions","description":"Grant members, User Groups, and API tokens access to the Workers in specific dispatch namespaces.","url":"https://developers.cloudflare.com/workers/authorization/workers-for-platforms/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/authorization/workers-for-platforms/og.png?v=f7d68982a0c97669","dateModified":"2026-11-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
