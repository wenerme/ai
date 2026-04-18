---
title: Synthetic tests
description: Synthetic tests resources and guides for Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/dex/tests/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Synthetic tests

With Digital Experience Monitoring (DEX), you can test if your devices can connect to a private or public endpoint through the Cloudflare One Client. Tests allow you to monitor availability for a given application and investigate performance issues reported by your end users.

DEX tests will only run when the Cloudflare One Client is turned on, whereas [fleet status](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/#fleet-status) metrics are always available.

To specify the target group of a test, use [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/).

* [ HTTP test ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/)
* [ Traceroute test ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/)
* [ View test results ](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/)

## Export DEX application test logs

The Cloudflare Logs documentation lists the full set of data fields available in [DEX application tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/).

The log data for all [DEX application tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) (including HTTP tests) can be exported to [R2](https://developers.cloudflare.com/r2/), a cloud bucket, or a SIEM via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/tests/","name":"Synthetic tests"}}]}
```
