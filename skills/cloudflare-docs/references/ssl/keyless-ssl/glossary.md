---
title: Glossary
description: Learn more about the common terms related to Keyless SSL.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/keyless-ssl/glossary.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Glossary

## Cloudflare Keyless SSL key server (“key server”)

The key server is a daemon that you run on your own infrastructure. The key server receives inbound requests from Cloudflare's keyless client on TCP port `2407` (by default) so you must make sure that your firewall and other access control lists permit these requests from [Cloudflare's IP ranges ↗](https://www.cloudflare.com/ips/).

Your key servers are contacted by Cloudflare during the TLS handshake process and must be online to terminate new TLS connections. Existing sessions can be resumed using unexpired TLS session tickets without needing to contact the key server.

## Cloudflare Keyless SSL client (“keyless client”)

The keyless client is a process that runs on Cloudflare's infrastructure. The keyless client makes outbound requests to your key server on TCP port `2407` for assistance in establishing new TLS sessions.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/glossary/","name":"Glossary"}}]}
```
