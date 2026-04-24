---
title: Configuration guides
description: Configure Cloudflare products with Regional Services and Customer Metadata Boundary.
image: https://developers.cloudflare.com/zt-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/data-localization/how-to/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configuration guides

Learn how to use Cloudflare products with the Data Localization Suite.

* [ Zero Trust ](https://developers.cloudflare.com/data-localization/how-to/zero-trust/)
* [ Pages ](https://developers.cloudflare.com/data-localization/how-to/pages/)
* [ Cache ](https://developers.cloudflare.com/data-localization/how-to/cache/)
* [ Load Balancing ](https://developers.cloudflare.com/data-localization/how-to/load-balancing/)
* [ Cloudflare for SaaS ](https://developers.cloudflare.com/data-localization/how-to/cloudflare-for-saas/)
* [ R2 Object Storage ](https://developers.cloudflare.com/data-localization/how-to/r2/)
* [ Durable Objects ](https://developers.cloudflare.com/data-localization/how-to/durable-objects/)
* [ Workers ](https://developers.cloudflare.com/data-localization/how-to/workers/)

## Verify Regional Services behavior

In order to verify that Regional Services is working, customers can confirm the behavior by executing one of the following `curl` commands on a regionalized hostname:

Terminal window

```

curl -X GET -I https://<HOSTNAME>/ 2>&1 | grep cf-ray


```

Terminal window

```

curl -s https://<HOSTNAME>/cdn-cgi/trace | grep "colo="


```

The first command will return a three-letter IATA code in the [Cf-Ray](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ray) header, indicating the Cloudflare data center location of processing and/or TLS termination. The second command will directly return the three-letter IATA code.

For example, when a hostname is configured to use the region European Union (EU), the three-letter IATA code will always return a data center inside of the EU.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/data-localization/","name":"Data Localization Suite"}},{"@type":"ListItem","position":3,"item":{"@id":"/data-localization/how-to/","name":"Configuration guides"}}]}
```
