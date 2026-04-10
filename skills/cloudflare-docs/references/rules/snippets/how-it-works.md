---
title: How Snippets work
description: Cloudflare Snippets are executed based on rules defined within your zone. Here is how the process works:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/how-it-works.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# How Snippets work

Cloudflare Snippets are executed based on rules defined within your zone. Here is how the process works:

![Diagram of the snippets execution workflow](https://developers.cloudflare.com/_astro/snippets-execution.Cb6ZLHBP_Z1QQkWy.webp) 

## 1\. Evaluate snippet rules

For each incoming request, Cloudflare evaluates the expression of every snippet rule defined in the zone. The evaluation checks for a match based on various request properties (such as bot score, WAF attack score, country of origin, and cookies).

## 2\. Build Snippets table

For every snippet rule in a zone that matches an incoming request, Cloudflare adds the corresponding unique snippet ID to a Snippets table.

## 3\. Execute snippets code

Once all the rules have been evaluated and the full table has been compiled, Cloudflare starts processing all the snippet IDs in the table.

The snippets are executed sequentially. Each snippet receives the modified request from the previous snippet and applies new modifications to it.

## 4\. Continue with the request execution workflow

After executing the final snippet IDs, the resulting modified request is passed back to the request execution workflow. Refer to [Execution order](https://developers.cloudflare.com/rules/snippets/#execution-order) for more information on the Rules features evaluated before and after Cloudflare Snippets.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/how-it-works/","name":"How Snippets work"}}]}
```
