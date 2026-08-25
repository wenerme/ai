---
description: Learn how MCP connects AI agents to data.
title: What is Model Context Protocol (MCP)?
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# What is Model Context Protocol (MCP)?

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/holistic-ai-security/concepts/mcp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Model Context Protocol (MCP) ↗](https://www.cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/) is a standardized way for AI agents to get the information and tools they need to operate. Similar to how an API works, it is a protocol that allows AI programs to connect to external sources of information and take actions in the real world, going beyond the limits of their original training data.

## How does MCP work?

MCP uses a client-server architecture where an AI agent acts as the client and sends requests to a server. This allows the AI agent to connect to multiple servers at once to get the information it needs. An MCP server is a program that exposes capabilities to AI agents, giving them access to new datasets or tools — like an email service to send messages on behalf of a user.

## What are the security concerns with MCP?

MCP doesn't have native authentication, authorization, or encryption. Because it functions similarly to an API, many of the same security considerations apply. If developers do not proactively implement security measures like Transport Layer Security (TLS) and rate limiting, MCP servers can be vulnerable to attacks, data leaks, and unauthorized access. Organizations must ensure that they validate inputs and protect confidential data to secure their MCP implementations.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/concepts/mcp/#page","headline":"What is Model Context Protocol (MCP)? · Cloudflare Learning Paths","description":"Learn how MCP connects AI agents to data.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/concepts/mcp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
