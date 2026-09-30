---
description: Run Python code or a test suite, stream command output, keep a process running after the request ends, or open an interactive shell in a Linux sandbox.
title: Run commands in a sandbox
image: https://developers.cloudflare.com/sandbox/commands/og.png?v=b1896115d4c0161a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Run commands in a sandbox

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/commands/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Each of the following guides runs a command in a sandbox with `exec()`. They differ in how the output reaches the caller and in what ends the command:

| Guide | How the output reaches the caller | The command runs until |
| --- | --- | --- |
| [Run Python code](https://developers.cloudflare.com/sandbox/commands/run-python-code/) | In the response, after the code exits | The code exits |
| [Run tests from a Git repository](https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/) | In the response, after the tests finish | The tests finish |
| [Stream command output](https://developers.cloudflare.com/sandbox/commands/stream-command-output/) | As server-sent events, while the command runs | It exits, or the client disconnects |
| [Run background processes](https://developers.cloudflare.com/sandbox/commands/run-background-processes/) | In files that later requests read | It exits, or a later request stops it |
| [Run a server in the background](https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/) | Over the server port, and in a log file | The container stops, or a request stops it |
| [Open a terminal in the browser](https://developers.cloudflare.com/sandbox/commands/open-a-terminal-in-the-browser/) | In an interactive terminal, over a WebSocket | You run `exit`, or your Worker ends the session |

For every option that `exec()` accepts, refer to [Execute commands](https://developers.cloudflare.com/containers/guides/execute-commands/) in the Containers documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/commands/#page","headline":"Run commands in a sandbox","description":"Run Python code or a test suite, stream command output, keep a process running after the request ends, or open an interactive shell in a Linux sandbox.","url":"https://developers.cloudflare.com/sandbox/commands/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/commands/og.png?v=b1896115d4c0161a","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
