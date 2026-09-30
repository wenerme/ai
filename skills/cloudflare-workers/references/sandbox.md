---
description: Execute untrusted or generated code in Linux virtual machines or isolated Workers.
title: Sandboxes on Cloudflare
image: https://developers.cloudflare.com/sandbox/og.png?v=a45996aa42e663ad
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Sandboxes on Cloudflare

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Start a sandbox and run untrusted or generated code

Available on Workers Paid plan

A sandbox is an isolated place to run code. The code cannot directly read the memory or data of your application. Your Worker decides which application APIs and data the code receives, and whether the code can reach the public Internet.

You can use a sandbox for agent-written code, user-uploaded applications, data analysis, development previews, build pipelines, or any other work that should not share a process with your application.

Cloudflare provides two sandbox environments. Both are accessible through a [Worker](https://developers.cloudflare.com/workers/), the application that already handles your traffic.

If your application uses `@cloudflare/sandbox` 0.x, refer to [Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/), or move it to the current version with [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

---

## Containers

[Containers](https://developers.cloudflare.com/containers/) run an image you provide. The instance is a full Linux environment, so you can run any language and keep processes running. Your Worker starts the instance and sends it work. HTTP from the Internet reaches the instance only through your Worker.

Each instance is a microVM with its own kernel and network, so no other workload shares it.

A sandbox container uses the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), which is in public beta.

A Durable Object in your Worker starts the instance from an image and runs a command in it:

```ts
container.start({
	image: "cloudflare/debian-trixie",
	entrypoint: ["sleep", "infinity"],
	enableInternet: false,
});
const process = await container.exec(["uname", "-a"]);
const output = await process.output();
```

[Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/) [Build a coding agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/)

---

## Dynamic Workers

[Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/) create a new Worker at runtime. The untrusted code can be JavaScript, Python, or WebAssembly. Compile TypeScript to JavaScript before loading it.

The Workers runtime runs each Dynamic Worker apart from your Worker and from other Dynamic Workers. A Dynamic Worker reaches your application only through the methods and data you pass to it.

Your Worker loads the untrusted module as a new Worker, blocks its outbound requests, and calls it:

```ts
const sandbox = env.LOADER.load({
	compatibilityDate: "$today",
	mainModule: "code.js",
	modules: { "code.js": untrustedModule },
	globalOutbound: null,
});
const entrypoint = sandbox.getEntrypoint<CodeEntrypoint>("Code");
const result = await entrypoint.evaluate();
```

[Run JavaScript](https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/) [Build an AI code interpreter](https://developers.cloudflare.com/sandbox/get-started/build-an-ai-code-interpreter/)

---

## Concepts

### [Choose a sandbox environment](https://developers.cloudflare.com/sandbox/concepts/)

Decide whether a job needs Linux or only calls methods that your Worker provides.

### [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)

Understand what keeps a Linux sandbox running, what stops it, and which files a snapshot brings back.

### [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/)

Decide what each sandbox holds, because its code can use everything you place inside it.

## Guides

### [Run commands](https://developers.cloudflare.com/sandbox/commands/)

Run Python code and tests, stream output, keep processes running, and open a terminal.

### [Work with files](https://developers.cloudflare.com/sandbox/files/)

Move files, keep a workspace between instances, and mount an R2 bucket.

### [Preview applications](https://developers.cloudflare.com/sandbox/previews/)

From your browser, open a web server that runs in a sandbox.

### [Credentials and network](https://developers.cloudflare.com/sandbox/network/)

Keep credentials in your Worker, and decide which services a sandbox reaches.

### [Manage sandboxes](https://developers.cloudflare.com/sandbox/manage/)

List a user's sandboxes, and record when and why each one stops.

### [Coding agents](https://developers.cloudflare.com/sandbox/coding-agents/)

Run coding agents such as Claude Code, Codex, and Devin in a sandbox that belongs to one task.

---

## Related products

[Workers](https://developers.cloudflare.com/workers/)

The serverless platform these sandbox environments run on.

[Durable Objects](https://developers.cloudflare.com/durable-objects/)

Identity and coordination for an attached container.

[Workers AI](https://developers.cloudflare.com/workers-ai/)

Run models on Cloudflare, then execute the code they generate in a sandbox.

---

## More resources

| Topic | Links |
| --- | --- |
| Deploy and debug | [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/), [Local development](https://developers.cloudflare.com/containers/guides/local-dev/), [Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) |
| Reference | [`@cloudflare/sandbox`](https://developers.cloudflare.com/sandbox/reference/), [Durable Object container API](https://developers.cloudflare.com/containers/api/durable-object-container/), [Dynamic Workers API](https://developers.cloudflare.com/dynamic-workers/api-reference/) |
| Pricing and limits | [Containers pricing](https://developers.cloudflare.com/containers/platform/pricing/), [Container limits](https://developers.cloudflare.com/containers/platform/limits/), [Dynamic Workers pricing](https://developers.cloudflare.com/dynamic-workers/pricing/) |
| Related | [Code Mode](https://developers.cloudflare.com/agents/tools/codemode/), [Workers security model](https://developers.cloudflare.com/workers/reference/security-model/) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/#page","headline":"Sandboxes on Cloudflare","description":"Execute untrusted or generated code in Linux virtual machines or isolated Workers.","url":"https://developers.cloudflare.com/sandbox/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/og.png?v=a45996aa42e663ad","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
