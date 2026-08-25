---
description: Connect a sandbox to an Artifacts repo.
title: Sandbox SDK + Artifacts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Sandbox SDK + Artifacts

Last updated Apr 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/examples/sandbox-sdk-artifacts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example uses the `git-repo-per-sandbox` Sandbox SDK template and highlights the Artifacts-specific pieces.

Start from the template with `create cloudflare`, as shown in [Run Claude Code on a Sandbox](https://developers.cloudflare.com/sandbox/tutorials/claude-code/#1-create-your-project). Then adapt the Artifacts flow with the focused snippets below.

* Creates or reuses a sandbox by ID.
* Creates or reuses an Artifacts repo with the same ID.
* Passes an authenticated Git remote into the sandbox as `ARTIFACTS_GIT_REMOTE`.

## Create your project

npmyarnpnpm

```
npm create cloudflare@latest -- repo-per-sandbox --template=cloudflare/sandbox-sdk/examples/git-repo-per-sandbox
```

```
yarn create cloudflare repo-per-sandbox --template=cloudflare/sandbox-sdk/examples/git-repo-per-sandbox
```

```
pnpm create cloudflare@latest repo-per-sandbox --template=cloudflare/sandbox-sdk/examples/git-repo-per-sandbox
```

```sh
cd repo-per-sandbox
```

## 1\. Create or reuse the repo

The template keeps one Artifacts repo per sandbox ID. Use your own source of truth to decide whether this request should create a new repo or load an existing one.

```js
let defaultBranch;
let remote;
let token;
const sandboxWasJustCreated = true; // for example, set this when you create a new sandbox record

if (sandboxWasJustCreated) {
	const created = await env.ARTIFACTS.create(sandboxId);

	defaultBranch = created.defaultBranch;
	remote = created.remote;
	token = created.token;
} else {
	const repo = await env.ARTIFACTS.get(sandboxId);

	defaultBranch = repo.defaultBranch;
	remote = repo.remote;
	token = (await repo.createToken("write", 3600)).plaintext;
}
```

```ts
let defaultBranch: string;
let remote: string;
let token: string;
const sandboxWasJustCreated = true; // for example, set this when you create a new sandbox record

if (sandboxWasJustCreated) {
	const created = await env.ARTIFACTS.create(sandboxId);

	defaultBranch = created.defaultBranch;
	remote = created.remote;
	token = created.token;
} else {
	const repo = await env.ARTIFACTS.get(sandboxId);

	defaultBranch = repo.defaultBranch;
	remote = repo.remote;
	token = (await repo.createToken("write", 3600)).plaintext;
}
```

The template already knows the repo name, so start with direct lookup instead of scanning `list()` pages. Avoid broad `catch` blocks here. They can hide missing-repo, auth, and validation failures behind the same retry message.

If your flow can race with repo creation, handle that retry at the application level after you inspect the thrown error.

## 2\. Create or reuse the sandbox

Use the same ID for the sandbox:

```js
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, sandboxId);
```

```ts
import { getSandbox } from "@cloudflare/sandbox";

const sandbox = getSandbox(env.Sandbox, sandboxId);
```

## 3\. Pass the repo into the sandbox

Convert the write token into an authenticated Git remote, then store it as an environment variable inside the sandbox.

Use a short-lived token and pass it into the sandbox only after the sandbox session is authorized to push changes.

```js
function toAuthenticatedRemote(remote, token) {
	const tokenSecret = token.split("?expires=")[0];
	return `https://x:${tokenSecret}@${remote.slice("https://".length)}`;
}

await sandbox.setEnvVars({
	ARTIFACTS_GIT_REMOTE: toAuthenticatedRemote(remote, token),
});
```

```ts
function toAuthenticatedRemote(remote: string, token: string) {
	const tokenSecret = token.split("?expires=")[0];
	return `https://x:${tokenSecret}@${remote.slice("https://".length)}`;
}

await sandbox.setEnvVars({
	ARTIFACTS_GIT_REMOTE: toAuthenticatedRemote(remote, token),
});
```

Code running inside the sandbox can then use `ARTIFACTS_GIT_REMOTE` with `git clone`, `git fetch`, `git pull`, or `git push`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/examples/sandbox-sdk-artifacts/#page","headline":"Sandbox SDK + Artifacts · Cloudflare Artifacts docs","description":"Connect a sandbox to an Artifacts repo.","url":"https://developers.cloudflare.com/artifacts/examples/sandbox-sdk-artifacts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
