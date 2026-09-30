---
description: Compare Containers and Dynamic Workers for code that needs Linux or only calls methods that your Worker provides.
title: Choose a sandbox environment
image: https://developers.cloudflare.com/sandbox/concepts/og.png?v=c938c077dd21d345
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Choose a sandbox environment

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/concepts/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A sandbox runs code that you did not write and do not trust, such as code that a model generates or the test suite of a repository. Cloudflare runs it in one of two environments: a [Container](https://developers.cloudflare.com/containers/), which runs a Linux image, or a [Dynamic Worker](https://developers.cloudflare.com/dynamic-workers/), which runs JavaScript against methods that your [Worker](https://developers.cloudflare.com/workers/) provides. Your Worker starts either one, and one Worker can use both.

## What the code can use

Code in a Container can use everything in its Linux image: runtimes, packages, files, and the processes it starts.

Code in a Dynamic Worker can use only the modules, methods, and values that your Worker passes to it. It does not inherit the bindings, credentials, or data of your Worker. Set `globalOutbound` to `null` to block its direct access to the Internet.

Your Workerkeepscredentials, policy

Containerrunsa commandfromyour Linux imagecan useruntimes, packagesfiles, processes

Dynamic Workerrunsgenerated codereceivesmethods, valuesyou pass

not inheritedbindings, datacredentials

## Use a Container when the code expects Linux

Most existing tools expect an operating system as well as a language runtime. `npm test` needs Node.js, dependencies on a filesystem, and child processes. A preview server keeps a process running and listens on a port. A compiler may need a toolchain or native binaries.

JavaScript code can need Linux too. A Dynamic Worker cannot start child processes or load native add-ons, and Workers implements some Node.js modules only in part. For what Workers supports, refer to [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

Your Worker decides when the container starts, whether it can reach the Internet, and which HTTP requests reach it. The [Agents sandbox tool](https://developers.cloudflare.com/agents/tools/sandbox/) uses a Container to run commands for an agent.

## Use a Dynamic Worker when the code calls known methods

When code only needs to call methods that you define, such as a script against a known API, run it in a Dynamic Worker. Your Worker decides what each method can reach before it passes the method in.

For example, your Worker can pass a `listPullRequests()` method that works for one repository and keeps the API token. Generated code can filter the pull requests, but it cannot reach another repository or read the token. For more information, refer to [Bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/).

[Code Mode](https://developers.cloudflare.com/agents/tools/codemode/) uses this for agents. The model writes JavaScript against typed methods, a Dynamic Worker runs it, and only the result returns to the model context.

`load()` creates a new Dynamic Worker. `get()` with a stable ID lets the runtime reuse a warm Dynamic Worker when the same code runs again. To give a generated application its own storage, use [Durable Object facets](https://developers.cloudflare.com/dynamic-workers/usage/durable-object-facets/). That storage does not give the application access to your other resources.

## How each environment isolates code

A Container runs in a [Firecracker](https://developers.cloudflare.com/containers/concepts/architecture/#container-runtime) microVM with its own kernel and network, which no other workload shares. Your image runs as a Linux container inside that VM.

V8, the JavaScript engine in Chrome, runs each Dynamic Worker in a sandbox that cannot read memory outside itself. The Workers runtime adds a process-level sandbox around it. For more information, refer to the [Workers security model](https://developers.cloudflare.com/workers/reference/security-model/).

## What you maintain

With a Container, you build and update the image. Existing tools run without changes, but the container must start before the first command runs. For more information, refer to [Container cold starts](https://developers.cloudflare.com/containers/concepts/architecture/#cold-starts).

With a Dynamic Worker, you write each method and decide what it returns. When generated code needs another operation, you add a method. The code that loads the Dynamic Worker lists everything the generated code can reach.

## Use both in one application

A coding agent can answer questions about a repository through scoped methods in a Dynamic Worker. When the agent proposes a patch, the same Worker starts a Container and runs the test suite of the repository.

### [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/)

Post a command to a Worker and read stdout from Linux.

### [Run JavaScript](https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/)

Post JavaScript to a Worker and read the sandboxed result.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/concepts/#page","headline":"Choose a sandbox environment","description":"Compare Containers and Dynamic Workers for code that needs Linux or only calls methods that your Worker provides.","url":"https://developers.cloudflare.com/sandbox/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/concepts/og.png?v=c938c077dd21d345","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
