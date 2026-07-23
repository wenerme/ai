---
description: Explore Cloudflare's API token templates to efficiently manage permissions. Start with a template and customize token permissions and resources as needed.
title: API token templates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# API token templates

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/api/reference/template/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below is a table of the currently available API token templates and the default [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) they grant. You can start creating a token with one of these templates and modify the permissions and resources from there.

| Template Name                           | Permission                               | Resource            |
| --------------------------------------- | ---------------------------------------- | ------------------- |
| Edit Zone DNS                           | DNS Write                                | Zone                |
| Read billing info                       | Billing Read                             | Account             |
| Account resources: Include all accounts |                                          |                     |
| Read analytics and logs                 | Analytics Read                           | Zone                |
| Logs Read                               | Zone                                     |                     |
| Edit Cloudflare Workers                 | Workers Routes Write                     | Zone                |
| Workers Scripts Write                   | Account                                  |                     |
| Workers KV Storage Write                | Account                                  |                     |
| Workers Tail Read                       | Account                                  |                     |
| Workers R2 Storage Write                | Account                                  |                     |
| Account Settings Read                   | Account                                  |                     |
| User Details Read                       | User                                     |                     |
| User Memberships Read                   | User                                     |                     |
| Edit load balancing configuration       | Load Balancing: Monitors and Pools Write | Account             |
| Load Balancers Write                    | Zone                                     |                     |
| WordPress                               | Analytics Read                           | Zone                |
| Zone Read                               | Zone                                     |                     |
| Zone Settings Write                     | Zone                                     |                     |
| Account Settings Read                   | Account                                  |                     |
| DNS Read                                | Zone                                     |                     |
| Cache Purge                             | Zone                                     |                     |
| Account resources: Include all accounts |                                          |                     |
| Zone resources: Include all zones       |                                          |                     |
| Create Additional Tokens                | API Tokens Write                         | User                |
| Read All Resources                      | _(All read permissions)_                 | Account, Zone, User |
| Account resources: Include all accounts |                                          |                     |
| Zone resources: Include all zones       |                                          |                     |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/reference/template/#page","headline":"API token templates · Cloudflare Fundamentals docs","description":"Explore Cloudflare's API token templates to efficiently manage permissions. Start with a template and customize token permissions and resources as needed.","url":"https://developers.cloudflare.com/fundamentals/api/reference/template/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
