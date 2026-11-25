---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Context is everything a model is told on a request besides the conversation. This page covers the kinds of context, when each reaches the model, and how to keep the provider's prompt cache warm.
title: Context
image: https://developers.cloudflare.com/agents/concepts/context/og.png?v=5b19dd477d781ffc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Context

Context is everything the model is told on a request besides the conversation itself. The [session](https://developers.cloudflare.com/agents/concepts/sessions/) records what was said. Context is what the agent gives the model so it can answer well: its instructions, the tools it can call, the skills it can load, what it remembers about the user, and what is true right now.

## Kinds of context

**The system prompt.** Instructions, identity, and rules: who the agent is, what it must and must not do, how it should answer. It goes at the start of every request.

**Tool descriptions.** Each tool's name, description, and input schema. The model reads them to decide which tool to call, so they go in every request, and a long tool list costs tokens on every turn.

**Skills.** A [skill](https://developers.cloudflare.com/agents/concepts/agent-skills/) is a set of instructions and files for one kind of task. The request carries a short catalog, one line per skill, and the model loads a skill's instructions with a tool call only when a task needs them. For most agents, skills are the way to add knowledge and procedures: they cost little until they are used, and other agents can read the same skill files.

**Memory.** Facts the agent saves so they outlast the conversation that taught them, such as the user's time zone or the decision made last week. The agent writes them with a tool to storage you choose, such as SQLite in the Durable Object, and they reach the model again either in the system prompt or when the agent looks them up with a search tool. Memory is not the transcript: compaction can summarize the conversation that taught a fact, and the saved fact stays as it was.

**The environment.** What is true now and changes between turns: the date, the state of a workspace, the result of a background job. Because it changes, where you put it in the request matters for the cache (refer to [Prompt caching](#prompt-caching)).

**Retrieved material.** Search results, documents, and files the agent fetches for one question. They come back as tool results, so they are part of the session from then on.

## Always present or loaded on demand

Every kind of context is either in every request or loaded when the model asks for it. Always-present context is reliable, because the model always sees it, and it costs tokens on every turn. Loaded context costs nothing until the model needs it, and the model has to know to ask for it.

| Kind of context | Where it sits in the request | How often it changes |
| --- | --- | --- |
| System prompt | Start of the request | Rarely |
| Tool descriptions | With the system prompt | When you add or remove tools |
| Skill catalog | System prompt | When a skill is added or removed |
| Skill instructions | Tool result in the conversation | Loaded once, when a task needs them |
| Memory | System prompt, or a tool result | When the agent saves something |
| Environment | End of the request | Every turn |
| Retrieved material | Tool result in the conversation | Every time the agent searches |

Keep the always-present part short, and give the model a way to load the rest.

## Prompt caching

Model providers cache the start of a request. When a request begins with the same tokens as an earlier one, the provider skips the work for that prefix, and the call is faster and costs less. A request starts with the system prompt and the tool descriptions, in an order that depends on the provider, followed by the conversation from its first message. On a long conversation, nearly all of each request is the same prefix as the one before.

Any change to early tokens loses the cache from that point to the end. To keep it:

- **Put what never changes first.** Instructions and tool descriptions go at the start. What changes rarely, such as memory or the skill catalog, comes next. What changes every turn, such as the current time, goes at the end, after the latest message.
- **Do not rewrite what you already sent.** When memory or the environment changes, send the change after the latest message instead of editing the system prompt. The model reads the new value, and the prefix stays the same.
- **Refresh the system prompt on purpose.** Folding changes back into the system prompt costs one cache miss. Do it where the cache is lost anyway, such as right after compaction.
- **Expect the session to break the prefix sometimes.** Compacting a range, a [history window](https://developers.cloudflare.com/agents/concepts/sessions/#history-windows) whose start moves forward, and shortening an older message all change early tokens. Do them seldom, and make sure the same transcript always produces the same request.

To see whether you are hitting the cache, read the usage the provider returns with each response: it reports how many input tokens came from the cache. The first request of a conversation usually misses, and a prompt shorter than the provider's minimum is never cached. Each provider documents its rules and prices, for example [Workers AI](https://developers.cloudflare.com/workers-ai/features/prompt-caching/), [OpenAI ↗︎](https://platform.openai.com/docs/guides/prompt-caching), and [Anthropic ↗︎](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching).

## How each harness builds context

- **[Think](https://developers.cloudflare.com/agents/harnesses/think/context/)** builds its system prompt from context blocks that you declare: read-only instructions, memory the model can write, and knowledge it can search. It freezes the prompt after the first turn, refreshes it after compaction, and sends changes to the environment after the latest message. Its skill catalog is one of those blocks.
- **[Pi](https://developers.cloudflare.com/agents/harnesses/pi/extensions/)** builds its system prompt from sections that extensions add. Its [skills extension](https://developers.cloudflare.com/agents/harnesses/pi/extensions/#add-skills) adds the skill catalog as a section.
- **[OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/)** builds its prompt from its own configuration and the plugins you bundle.
- **Your own loop** builds the request itself. [`agents/skills`](https://developers.cloudflare.com/agents/skills/) returns a skill catalog to add to your system prompt, and the order rules in [Prompt caching](#prompt-caching) are yours to follow.

## Related

- [Sessions](https://developers.cloudflare.com/agents/concepts/sessions/): the transcript, and how it becomes a request.
- [Skills](https://developers.cloudflare.com/agents/concepts/agent-skills/): instructions and files the model loads on demand.
- [Think context](https://developers.cloudflare.com/agents/harnesses/think/context/): context blocks in Think.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/concepts/context/#page","headline":"Context","description":"Context is everything a model is told on a request besides the conversation. This page covers the kinds of context, when each reaches the model, and how to keep the provider's prompt cache warm.","url":"https://developers.cloudflare.com/agents/concepts/context/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/concepts/context/og.png?v=5b19dd477d781ffc","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
