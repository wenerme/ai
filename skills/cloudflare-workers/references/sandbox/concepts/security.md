---
description: Code in a sandbox can use everything your Worker places inside it, so each sandbox should hold only what that code may have.
title: Sandbox security
image: https://developers.cloudflare.com/sandbox/concepts/security/og.png?v=2adea4bcbfadfee5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Sandbox security

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/concepts/security/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A sandbox runs code you do not trust, such as code that a model generates, a user writes, or a dependency brings in. Cloudflare isolates the sandbox from your Worker and from other sandboxes. For more information about that isolation, refer to [Sandboxes on Cloudflare](https://developers.cloudflare.com/sandbox/).

Isolation does not limit what the code does inside its own sandbox. Assume that the code uses everything it can reach there, including the files, credentials, and network access that your Worker provides.

## Everything in one sandbox is shared

Every process in a Container runs on the same Linux system. The processes can read the same files, see each other, and connect to the same `localhost` ports. Code loaded into one Dynamic Worker shares its memory in the same way.

A separate Linux user does not keep a command away from files. In a deployed sandbox, every process has the same Linux capabilities as `root`, so file permissions do not restrict it, and it can switch back to `root`. For more information, refer to the [`exec()` `user` option](https://developers.cloudflare.com/containers/api/durable-object-container/#exec).

The sandbox is therefore the smallest unit of trust. When two users share a sandbox, each user's code can read the other's work. A sandbox for each user, or for each job, keeps one user's code away from another user's files and credentials.

## Code can read what you put in its sandbox

For example, a coding agent clones a private repository, installs its dependencies, and runs its tests. If your Worker puts a token in the clone URL, Git saves that URL in the `.git/config` file of the repository. The tests, and every dependency they load, run with the same access as the agent. Any of that code can read the token.

Token in the clone URLToken in your Worker

Your Worker

Requests go straight to github.com.Adds the token to requests for github.com.ghp\_example

Sandbox

\# the agent

$ git pull

Already up to date.

\# code from a test dependency

$ cat .git/config

\[remote "origin"]

url = https://ghp\_example@github.com/acme/app.git

The token is in the clone URL. Code from a test dependency reads it from .git/config.

Environment variables, command arguments, and files your Worker writes work the same way. Once a value is in the sandbox, all the code there can read it and send it anywhere the sandbox can reach.

Credentials are safer outside the sandbox. A Container can send its request without the credential, and an outbound handler in your Worker adds the credential after the request leaves the sandbox. Add the credential only to HTTPS requests. The handler fetches with the scheme that the container used, so a credential added to a plain HTTP request crosses the Internet unencrypted.

A Dynamic Worker can receive a method that uses the credential in your Worker and returns only the result. The method and the outbound handler each decide which requests to make, so they limit what the code can do with the service. For both patterns, refer to [Call an authenticated API from a sandbox](https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/).

## The sandbox name decides what a request reaches

A Container keeps its files while it runs. A snapshot saves those files, including a token in `.git/config`, and restoring the snapshot brings them back. Your Worker reaches the same sandbox whenever it calls `getByName()` with the same name.

The name decides which sandbox, and which saved files, a request reaches. It does not show who sent the request. Authenticate the caller in your Worker, and derive the sandbox name from that identity. Reusing a name or a snapshot for someone else gives them the earlier user's files. The how-to guides read the name from the URL only to keep the examples short.

For more information about what a sandbox keeps between instances, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/#snapshots-carry-files-to-the-next-instance).

## Every opening is also a way out

A Container starts with `enableInternet: false` by default, so it cannot reach the Internet. Only requests that an outbound handler in your Worker intercepts leave it. A Dynamic Worker has the network access of your Worker unless you load it with `globalOutbound: null`, which makes `fetch()` and `connect()` throw.

Each destination you allow gives the code a way to send out what it can read. If you turn on Internet access so that `npm install` can download packages, a dependency can also send the token to any server. An outbound handler in your Worker can allow the package registry and block every other destination.

Keep Internet access off when you use an outbound handler. Handlers see HTTP on port `80` and HTTPS on port `443`. With Internet access on, connections to other ports go out directly. To route requests through your Worker, refer to [`interceptOutboundHttps()`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttps) for Containers and [Egress control](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/) for Dynamic Workers.

## Output carries the same risk

Results, files, and HTTP responses from a sandbox come from the code you do not trust. They need the same checks as user input before your application stores them, acts on them, or shows them to someone else.

A web preview carries more risk, because it runs in the visitor's browser. When your Worker forwards a page from a sandbox, the page runs under the hostname that served it. On your application hostname, the page can use your application cookies and call its APIs. Serve previews on a separate hostname to keep the page away from both. For an example, refer to [Serve previews on their own hostnames](https://developers.cloudflare.com/sandbox/previews/serve-previews-on-their-own-hostnames/).

## Related resources

- [Choose a sandbox environment](https://developers.cloudflare.com/sandbox/concepts/)
- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)
- [Call an authenticated API from a sandbox](https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/)
- [Preview a web application](https://developers.cloudflare.com/sandbox/previews/)
- [Workers security model](https://developers.cloudflare.com/workers/reference/security-model/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/concepts/security/#page","headline":"Sandbox security","description":"Code in a sandbox can use everything your Worker places inside it, so each sandbox should hold only what that code may have.","url":"https://developers.cloudflare.com/sandbox/concepts/security/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/concepts/security/og.png?v=2adea4bcbfadfee5","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
