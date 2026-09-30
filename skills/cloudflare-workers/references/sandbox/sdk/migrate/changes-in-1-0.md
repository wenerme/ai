---
description: Sandbox SDK 1.0 moves the work of the 0.x Sandbox class into a Durable Object that you write, which decides lifetime, network access, and state.
title: Changes in Sandbox SDK 1.0
image: https://developers.cloudflare.com/sandbox/sdk/migrate/changes-in-1-0/og.png?v=bd924d25697c0b99
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Changes in Sandbox SDK 1.0

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/migrate/changes-in-1-0/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

In Sandbox SDK 0.x, the `Sandbox` class from the package is your Durable Object. It starts the container, keeps it running, and sends each call to a server inside the container. In 1.0, you write the Durable Object class, and it calls the container directly through `this.ctx.container`.

Sandbox SDK 0.12

Your WorkercallsgetSandbox()

Sandbox classfromthe packagemanagesstart, lifetimepreviews, backups

Containerimagecloudflare/sandboxrunsthe SDK serverbash sessionsSandbox SDK 1.0

Your WorkercallsgetByName()

Durable Objectfromyour codemanagesstart, lifetimepreviews, backups

Containerimageyour imagerunsyour commands

for Filessandbox-shim

`this.ctx.container` does what the 0.x SDK server did. It runs commands, connects to ports, intercepts outbound requests, and saves snapshots. The package keeps only small helpers, such as the `Files` class.

Decisions that depend on your application stay in your code: how long a sandbox runs, what it can reach, and what happens when a call fails. For example, a cancelled command may already have changed files, and only your application knows whether running it again is safe.

## Where each 0.x feature goes

Each 0.x feature moves to one of three places, depending on which part of 0.x did its work:

- The `Sandbox` class handles lifetime, preview URLs, tunnels, backups, and process tracking. In 1.0, these become code in your Durable Object class, which keeps any records it needs in its own storage.
- The SDK server runs commands, sessions, and file calls. In 1.0, these become `exec()` calls, or calls to the `Files` class, which runs the `sandbox-shim` helper through `exec()`.
- Wrangler configuration and class properties set the image, Internet access, and outbound rules. In 1.0, these become options to `start()` and outbound handlers that your class registers.

Some 0.x features have no equivalent. For each 0.x API and its replacement, refer to the [API map](https://developers.cloudflare.com/sandbox/sdk/migrate/api-map/).

## Decisions your code makes

A container has no Internet access unless `start()` passes `enableInternet: true`. To allow one destination, your class registers an outbound handler for its hostname. The handler can add a credential that the container never sees. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/).

`exec()` takes an array of arguments and starts that process without a shell. Text passed as an argument cannot start a second command. A shell runs only when you start one, such as `["sh", "-c", "npm ci && npm test"]`. Each call also sets its own `cwd` and `env`. No session carries them from one call to the next.

Your class decides how long a sandbox runs by setting the inactivity timeout after `start()`, and again in the constructor when a restarted Durable Object finds the container running. A deploy does not replace running containers. A new image applies only to containers that start after the deploy. The same holds for code that your class runs when it starts a container, such as the outbound handlers it registers. For more information, refer to [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/).

Your image provides every tool that your commands use. The 0.x image includes Python, Git, `curl`, `wget`, `jq`, `unzip`, and `ps`. `cloudflare/debian-trixie` and `node:24-trixie-slim`, which these pages use, include none of them. `Files` and `S3Mount` also need the `sandbox-shim` helper in the image. For the `COPY` line, refer to [`@cloudflare/sandbox` requirements](https://developers.cloudflare.com/sandbox/reference/#requirements).

The package writes nothing to Durable Object storage. A preview token, a process record, or a snapshot ID exists only if your class stores it. The keys that 0.x wrote stay in storage, and 1.0 code ignores them.

The package also retries nothing and sets no time limits. To stop a command that runs too long, run it under GNU coreutils `timeout`, as [Replace timeouts](https://developers.cloudflare.com/sandbox/sdk/migrate/commands/#replace-timeouts) describes.

## Related resources

- [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/)
- [API map](https://developers.cloudflare.com/sandbox/sdk/migrate/api-map/)
- [Sandbox lifetime](https://developers.cloudflare.com/sandbox/concepts/lifetime/)
- [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/migrate/changes-in-1-0/#page","headline":"Changes in Sandbox SDK 1.0","description":"Sandbox SDK 1.0 moves the work of the 0.x Sandbox class into a Durable Object that you write, which decides lifetime, network access, and state.","url":"https://developers.cloudflare.com/sandbox/sdk/migrate/changes-in-1-0/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/migrate/changes-in-1-0/og.png?v=bd924d25697c0b99","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
