---
description: Review recent changes to Artifacts.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

#  Changelog

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/artifacts/platform/changelog/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/artifacts.xml)

## 2026-06-17


**Manage Artifacts from the Cloudflare dashboard**

You can now configure [Artifacts](https://developers.cloudflare.com/artifacts/concepts/how-artifacts-works/) namespaces, repos, and tokens directly from the Cloudflare dashboard.

Artifacts is Git-compatible storage that lets you store repos on Cloudflare and interact with them using standard Git workflows.

You can view and create [namespaces](https://developers.cloudflare.com/artifacts/concepts/namespaces/#use-namespaces-as-containers), which are top-level containers for repos:

![Artifacts namespaces dashboard showing namespace search and create namespace controls](https://developers.cloudflare.com/_astro/dashboard-namespaces.0BJelWZh_Z1uJ1iD.webp)

You can view, create, fork, and search repos within a namespace:

![Artifacts repositories dashboard showing repo source, access, and created columns](https://developers.cloudflare.com/_astro/dashboard-repositories.M9P9JUL__Agf9h.webp)

You can open a repo to view its files and copy its Git remote URL.

![Artifacts repository overview showing files, commits, token management, and quick actions](https://developers.cloudflare.com/_astro/dashboard-repo-overview.CSHxrCW2_81obq.webp)

You can also provision tokens directly from the dashboard to scope Git access to a single repo, with read tokens for clone, fetch, and pull workflows, or write tokens when a client needs to push changes.

To get started, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select **Storage & databases** \> **Artifacts**.

If you are enrolled in the Artifacts beta, you can use the dashboard to set up Artifacts. If you would like to join the beta, complete the [request form ↗](https://forms.gle/DwBoPRa3CWQ8ajFp7).

## 2026-05-18


**Manage Artifacts namespaces and repos with Wrangler CLI**

You can now manage [Artifacts](https://developers.cloudflare.com/artifacts/) namespaces, repos, and repo-scoped tokens directly from Wrangler CLI.

Available commands:

* `wrangler artifacts namespaces list` — List Artifacts namespaces in your account.
* `wrangler artifacts namespaces get` — Get metadata for a namespace.
* `wrangler artifacts repos create` — Create a repo in a namespace.
* `wrangler artifacts repos list` — List repos in a namespace.
* `wrangler artifacts repos get` — Get metadata for a repo.
* `wrangler artifacts repos delete` — Delete a repo.
* `wrangler artifacts repos issue-token` — Issue a repo-scoped token for Git access.

To get started, refer to the [Wrangler Artifacts commands documentation](https://developers.cloudflare.com/workers/wrangler/commands/artifacts/).

## 2026-04-16


**Artifacts now in beta: versioned filesystem with Git access**

[Artifacts](https://developers.cloudflare.com/artifacts/) is now in private beta. Artifacts is Git-compatible storage built for scale: create tens of millions of repos, fork from any remote, and hand off a URL to any Git client. It provides a versioned filesystem for storing and exchanging file trees across Workers, the REST API, and any Git client, running locally or within an agent.

You can [read the announcement blog ↗](https://blog.cloudflare.com/artifacts-git-for-agents-beta/) to learn more about what Artifacts does, how it works, and how to create repositories for your agents to use.

Artifacts has three API surfaces:

* Workers bindings (for creating and managing repositories)
* REST API (for creating and managing repos from any other compute platform)
* Git protocol (for interacting with repos)

As an example: you can use the Workers binding to create a repo and read back its remote URL:

```ts
# Create a thousand, a million or ten million repos: one for every agent, for every upstream branch, or every user.
const created = await env.PROD_ARTIFACTS.create("agent-007");
const remote = (await created.repo.info())?.remote;
```

Or, use the REST API to create a repo inside a namespace from your agent(s) running on any platform:

```bash
curl --request POST "https://artifacts.cloudflare.net/v1/api/namespaces/some-namespace/repos" --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" --header "Content-Type: application/json" --data '{"name":"agent-007"}'
```

Any Git client that speaks smart HTTP can use the returned remote URL:

```bash
# Agents know git.
# Every repository can act as a git repo, allowing agents to interact with Artifacts the way they know best: using the git CLI.
git clone https://x:${REPO_TOKEN}@artifacts.cloudflare.net/some-namespace/agent-007.git
```

To learn more, refer to [Get started](https://developers.cloudflare.com/artifacts/get-started/), [Workers binding](https://developers.cloudflare.com/artifacts/api/workers-binding/), and [Git protocol](https://developers.cloudflare.com/artifacts/api/git-protocol/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/artifacts/platform/changelog/#page","headline":"Changelog · Cloudflare Artifacts docs","description":"Review recent changes to Artifacts.","url":"https://developers.cloudflare.com/artifacts/platform/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
