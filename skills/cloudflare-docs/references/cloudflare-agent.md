---
title: Cloudflare Agent
description: With Cloudflare Agent, you can:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-agent/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Agent

An AI-powered assistant that helps you navigate, configure, and take actions on Cloudflare services directly from the dashboard.

Beta

Cloudflare Agent is currently in beta and only available to accounts on a Free plan. Features and behaviors may change.

With Cloudflare Agent, you can:

* Get answers to questions about Cloudflare products and your account configurations
* Execute Cloudflare API operations with approval flows for write actions
* Run network diagnostics like DNS lookups, certificate checks, and connectivity tests
* Search Cloudflare documentation for relevant information

Cloudflare Agent is built with the [Agents SDK](https://developers.cloudflare.com/agents/), the same framework you can use to build your own AI agents on Cloudflare.

---

## Capabilities

### Documentation search

Search Cloudflare documentation to find answers about products, features, and best practices.

### Cloudflare API operations

Execute operations against the Cloudflare API using natural language. You can ask the agent to perform tasks like creating DNS records, managing firewall rules, or checking your account settings.

Write operations require your approval before execution.

### Network diagnostics

Run network diagnostic commands to troubleshoot connectivity and configuration issues:

* **DNS lookups** \- Query DNS records for any domain
* **HTTP requests** \- Test endpoints and inspect responses
* **Domain information** \- Look up WHOIS and RDAP registration data
* **Certificate checks** \- Inspect TLS/SSL certificates
* **Connectivity tests** \- Verify network reachability

---

## Limitations

During the beta period:

* Features and behaviors may change without notice
* Write operations will always require explicit approval before execution

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-agent/","name":"Cloudflare Agent"}}]}
```
