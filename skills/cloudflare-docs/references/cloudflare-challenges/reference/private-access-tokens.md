---
title: Private Access Tokens (PAT)
description: How Private Access Tokens reduce challenge steps for visitors with valid tokens.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-challenges/reference/private-access-tokens.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Private Access Tokens (PAT)

When a visitor is presented with a Challenge Page, Cloudflare evaluates various signals - including the presence of a Private Access Token (PAT) - to decide which challenges to issue. If a visitor presents a valid token, certain challenges are not issued, which reduces the number of steps required to pass.

A PAT does not automatically solve a challenge or let a visitor bypass the Challenge Page. The visitor still encounters the Challenge Page regardless of whether they have a valid PAT.

While some challenges require interactivity, most challenges served are invisible to the visitor.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/reference/private-access-tokens/","name":"Private Access Tokens (PAT)"}}]}
```
