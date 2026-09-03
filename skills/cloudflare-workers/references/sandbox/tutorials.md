---
description: Step-by-step Sandbox SDK tutorials for building AI agents, code executors, and testing pipelines.
title: Tutorials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Tutorials

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/tutorials/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Coming soon: Sandbox SDK 1.0

These tutorials target today's stable `@cloudflare/sandbox` package and may use sessions, string `exec`, `startProcess`, `gitCheckout`, or the stable bridge template.

For **`@next`** Worker SDK work, start from [1.0 preview](https://developers.cloudflare.com/sandbox/1-0-preview/) and [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/). Bridge deployments stay on the [stable bridge](https://developers.cloudflare.com/sandbox/bridge/).

Learn how to build applications with Sandbox SDK through step-by-step tutorials. Each tutorial takes 20-30 minutes.

[**Build an AI coding agent with OpenAI Agents SDK**Use the OpenAI Agents SDK with Cloudflare Sandbox to build a Python agent that writes, tests, and delivers code in an isolated environment.](https://developers.cloudflare.com/sandbox/tutorials/openai-agents/)

[**Code interpreter with Workers AI**Build a code interpreter using Workers AI GPT-OSS model with the official workers-ai-provider package.](https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/)

[**Data persistence with R2**Mount R2 buckets as local filesystem paths to persist data across sandbox lifecycles.](https://developers.cloudflare.com/sandbox/tutorials/persistent-storage/)

[**Run Claude Code on a Sandbox**Use Claude Code to implement a task in your GitHub repository.](https://developers.cloudflare.com/sandbox/tutorials/claude-code/)

[**Build an AI code executor**Use Claude to generate Python code from natural language and execute it securely in sandboxes.](https://developers.cloudflare.com/sandbox/tutorials/ai-code-executor/)

[**Analyze data with AI**Upload CSV files, generate analysis code with Claude, and return visualizations.](https://developers.cloudflare.com/sandbox/tutorials/analyze-data-with-ai/)

[**Automated testing pipeline**Build a testing pipeline that clones Git repositories, installs dependencies, runs tests, and reports results.](https://developers.cloudflare.com/sandbox/tutorials/automated-testing-pipeline/)

[**Build a code review bot**Clone repositories, analyze code with Claude, and post review comments to GitHub PRs.](https://developers.cloudflare.com/sandbox/tutorials/code-review-bot/)

[**Set up Claude Managed Agents**Run Claude Managed Agents on self-managed Cloudflare environments.](https://developers.cloudflare.com/sandbox/tutorials/claude-managed-agents/)

[**Run Cursor Cloud Agents on Cloudflare via self-hosted machines**Deploy Cursor self-hosted machines that run each assigned session in an isolated Cloudflare container.](https://developers.cloudflare.com/sandbox/tutorials/cursor-cloud-agents/)

[**Run Devin Outposts on Cloudflare**Deploy a Devin Outpost that runs each Devin session in an isolated Cloudflare container.](https://developers.cloudflare.com/sandbox/tutorials/devin-outposts/)

## Before you start

All tutorials assume you have:

* Completed the [Get Started guide](https://developers.cloudflare.com/sandbox/get-started/)
* Basic familiarity with [Workers](https://developers.cloudflare.com/workers/)
* [Docker ↗](https://www.docker.com/) installed and running

## Related resources

* [How-to guides](https://developers.cloudflare.com/sandbox/guides/) \- Solve specific problems
* [API reference](https://developers.cloudflare.com/sandbox/api/) \- Complete SDK reference

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/tutorials/#page","headline":"Tutorials · Cloudflare Sandbox SDK docs","description":"Step-by-step Sandbox SDK tutorials for building AI agents, code executors, and testing pipelines.","url":"https://developers.cloudflare.com/sandbox/tutorials/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
