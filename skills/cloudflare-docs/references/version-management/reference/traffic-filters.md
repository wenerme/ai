---
title: Traffic filters
description: Route traffic to specific environments with filters.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/version-management/reference/traffic-filters.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Traffic filters

When you [create an environment](https://developers.cloudflare.com/version-management/how-to/environments/#create-environment), you specify a traffic filter for that environment. This filter ensures that all traffic reaching the environment and, by extension, the configuration changes associated with the environment's version is intentional.

To send traffic to a specific environment, send requests to your zone that match the pattern specified in your filter. These could be characteristics such as **Edge Server IP**, **Cookie**, **Hostname**, or **User Agent**.

To make sure requests are reaching an environment, review the [Metrics](https://developers.cloudflare.com/version-management/how-to/versions/#view-metrics) associated with your environment. These metrics will also help you evaluate whether your configuration changes are affecting traffic in the way you expect.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/reference/traffic-filters/","name":"Traffic filters"}}]}
```
