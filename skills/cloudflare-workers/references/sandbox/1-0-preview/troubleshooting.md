---
description: Common failures on @cloudflare/sandbox@next and where to fix them.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page is for `@cloudflare/sandbox@next`. Stable-package symptoms may differ.

Use this symptom-to-fix map. For deeper recovery, refer to [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/). For lifecycle behavior, refer to [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/).

## Deploy and image

| Symptom                                                                      | What to check                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RuntimeControlProtocolError, control/protocol failures after deploy          | Worker package and container image are on different lines. Use the same @next / cloudflare/sandbox:next (or the same exact prerelease) pair.                                          |
| Container never becomes ready, or you see repeated ContainerUnavailableError | Cold start or capacity. Back off using retryAfterMs when set, then retry the **work**. Refer to [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/). |
| Works in wrangler dev, fails in production only                              | Production-only limits and cold start. Still keep package/image matched.                                                                                                              |

## Processes

| Symptom                                         | What to check                                                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| await exec “finished” but the command did not   | exec resolves on **launch**. Use output(), waitForExit(), or exitCode.                                                                         |
| No stdout as a string                           | output() defaults to bytes. Pass { encoding: "utf8" }.                                                                                         |
| getProcess is null / list is \[\]               | No container running, or ID unknown in the **current** container. Discovery does not wake a sandbox. Relaunch from stored job state if needed. |
| StaleProcessHandleError                         | Handle was from a previous container. Start a new exec from checkpointed work.                                                                 |
| Wait timed out / aborted but process still runs | Local wait only. Call kill() if you intend to stop it.                                                                                         |
| Port never becomes ready                        | Default waitForPort mode is **TCP**. Use mode: "http" for HTTP checks. Process may have exited — check status/logs.                            |
| Need interactive stdin                          | Not on the process handle. Use a [terminal](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/) or non-interactive argv/cwd/env. |

## Terminals

| Symptom                      | What to check                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------- |
| Browser still uses sessionId | Preview xterm helper expects terminalId.                                      |
| getTerminal is null          | Same lifetime rules as processes. Create again if the container was replaced. |
| Reconnect has no history     | Pass the last cursor into connect / output options.                           |

## Environment and secrets

| Symptom                                | What to check                                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Env from an earlier exec “disappeared” | No session shell. Use setEnvVars and/or per-launch env. [Environment variables](https://developers.cloudflare.com/sandbox/1-0-preview/environment/).       |
| API keys leaked into the container     | Do not put live secrets in sandbox env. Use [outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) handlers on the Worker. |

## Interpreter

| Symptom                                     | What to check                                              |
| ------------------------------------------- | ---------------------------------------------------------- |
| sandbox.createCodeContext is not a function | Attach withInterpreter and call sandbox.interpreter.\*.    |
| Python not available                        | Use the **\-python** image variant on the same @next line. |

## Bridge HTTP

| Symptom                                                                     | What to check                                                                                                                                                                         |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bridge /exec, sessions, or /pty behavior differs from @next Worker SDK docs | The self-deployed bridge is not part of the 1.0 preview. Use the [stable bridge](https://developers.cloudflare.com/sandbox/bridge/) with matching stable package and container image. |

## Agents and long-running jobs

For agents and long-running tools on `@next`:

1. Launch with `exec(argv)` (often `['/bin/bash', '-lc', script]`).
2. Wait with `waitForLog`, `waitForPort`, or `logs` — not only `await exec`.
3. Persist **job state** (command, `cwd`, `env`, checkpoint), not only `process.id`.
4. On a later request: `getProcess(id)` while the same container may still hold it; otherwise `exec` again.
5. Use a [terminal](https://developers.cloudflare.com/sandbox/1-0-preview/terminals/) only when you need a human PTY, not as a session substitute.

Refer to [Process execution](https://developers.cloudflare.com/sandbox/1-0-preview/processes/), [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/), and examples in the [sandbox-sdk ↗](https://github.com/cloudflare/sandbox-sdk/tree/next/examples) repo (`claude-code`, `codex`, `opencode`, and others).

## Related

* [Errors and recovery](https://developers.cloudflare.com/sandbox/1-0-preview/errors/)
* [Errors API](https://developers.cloudflare.com/sandbox/1-0-preview/api/errors/)
* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/1-0-preview/lifecycle/)
* [Process API](https://developers.cloudflare.com/sandbox/1-0-preview/api/processes/)
* [Terminal API](https://developers.cloudflare.com/sandbox/1-0-preview/api/terminals/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Sandbox SDK docs","description":"Common failures on @cloudflare/sandbox@next and where to fix them.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
