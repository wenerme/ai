---
title: Repositories
description: Understand repository identity, APIs, and scope.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Repositories

Artifacts stores work in repositories. A repository is one isolated Git service with its own history, refs, remote URL, tokens, and durable state.

Every repository lives inside one namespace. If the namespace does not exist yet, Artifacts creates it when you create the first repo in it.

The namespace groups related repositories, and the repository name identifies one repository inside that group.

## Understand repository identity

A repository has three identifiers:

* a namespace name
* a repository name
* a repository ID returned by the APIs

The namespace and repository name form the stable address that you use in the Workers binding, the REST API, and the Git remote. The repository ID is useful when you need an opaque identifier in API responses or logs.

Each repository is isolated from other repositories. Tokens, lifecycle, refs, and mutations apply to that repository only.

## Understand the repository APIs

Artifacts exposes the same repository through three interfaces:

| Interface       | What you use it for                                                                | What it returns                                                        |
| --------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Workers binding | Create, list, import, inspect, fork, delete, and mint tokens from a Worker         | Repository metadata, repository handles, and repo-scoped token results |
| REST API        | Create, list, import, inspect, fork, delete, and mint tokens from external systems | Cloudflare API responses with repository metadata and token results    |
| Git protocol    | Clone, fetch, pull, and push repository contents                                   | Standard Git behavior over HTTPS                                       |

These interfaces point to the same repository.

For example, you can create a repository from the [Workers binding](https://developers.cloudflare.com/artifacts/api/workers-binding/) or the [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/), then hand the returned `remote` URL to a standard Git client. You do not create different repositories for each interface.

## Understand how the interfaces relate

The Workers binding and the REST API are control-plane interfaces. Use them to manage repositories and tokens.

The Git protocol is the data-plane interface. Use it to read and write commits, trees, and refs through a normal Git workflow.

That split leads to a common pattern:

1. Use the Workers binding or REST API to create a repository.
2. Read back the repository `remote` URL.
3. Mint a repo-scoped token.
4. Use the `remote` and token with `git clone`, `git fetch`, `git pull`, or `git push`.

## Understand repository scope

Repository scope matters in two places: naming and access.

### Name inside a namespace

Repository names are unique within a namespace, not across your whole account. You can reuse a short repository name in different namespaces when that helps your environment or tenant layout.

For example, a repository named `app` can exist in both the `prod` namespace and the `staging` namespace.

### Token inside a repository

Artifacts tokens are repo-scoped. A token minted for one repository does not grant access to another repository, even when both repositories live in the same namespace.

Use `read` tokens for clone, fetch, and pull. Use `write` tokens only when a client must push changes.

## Use repositories as units of work

Artifacts works best when you treat each repository as one unit of work.

Use one repository per agent, session, user task, baseline, or fork target when those units need separate history, cleanup, and access control. Use namespaces to group those repositories by environment, tenant, or shard.

For more information, refer to [Namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/), [How Artifacts works](https://developers.cloudflare.com/artifacts/concepts/how-artifacts-works/), and [Best practices for Artifacts](https://developers.cloudflare.com/artifacts/concepts/best-practices/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/concepts/repositories/","name":"Repositories"}}]}
```
