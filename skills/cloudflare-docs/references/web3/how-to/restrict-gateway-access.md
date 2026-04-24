---
title: Restrict gateway access
description: Restrict access to your Web3 gateway with WAF custom rules.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web3/how-to/restrict-gateway-access.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Restrict gateway access

If you are using a [Web3 gateway](https://developers.cloudflare.com/web3/about/) for internal application calls, you may want to restrict gateway access to specific backend services.

You can achieve this goal by [creating general Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to block normal traffic and then [creating service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) to allow access by your backend service.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web3/","name":"Web3"}},{"@type":"ListItem","position":3,"item":{"@id":"/web3/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/web3/how-to/restrict-gateway-access/","name":"Restrict gateway access"}}]}
```
