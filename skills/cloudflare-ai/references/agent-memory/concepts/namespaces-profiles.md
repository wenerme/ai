---
description: How Agent Memory isolates memory storage using namespaces for applications and profiles for individual users or agents.
title: Namespaces and profiles
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt
> Use this file to discover all available pages before exploring further.

# Namespaces and profiles

Last updated Jun 2, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Agent Memory uses a two-level isolation model: **namespaces** define memory domains, and **profiles** provide isolated memory stores for individual users, agents, teams, tenants, or application objects.

## Namespaces

A namespace is a top-level container that scopes a set of memory profiles. Use namespaces to separate applications, environments, tenants, or memory layers such as user, team, and organization memory.

## Profiles

A profile is an isolated memory store for a single entity. Each profile has its own stored memories and retrieval indexes.

## Sessions

A session groups memories that come from the same interaction or conversation. Sessions are optional, but they make it easier to identify, inspect, and manage memories created from a specific conversation.

Sessions are scoped to a profile. Two different profiles can use the same session ID without conflict.

## Isolation model

Conceptually, memories are scoped as `namespace > profile > memory`. No data crosses these boundaries:

```txt
Namespace: my-assistant-prod
  Profile: alice
    Memories
    Messages
  Profile: bob
    Memories
    Messages
```

A `recall()` on Alice's profile never returns memories from Bob's profile. Each profile is a self-contained memory system.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/#page","headline":"Namespaces and profiles · Cloudflare Agent Memory docs","description":"How Agent Memory isolates memory storage using namespaces for applications and profiles for individual users or agents.","url":"https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
