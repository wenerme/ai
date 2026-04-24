---
title: Additional detections
description: Detection IDs for residential proxy traffic and other automated signals.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/bots/additional-configurations/detection-ids/additional-detections.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Additional detections

Cloudflare bot detection includes additional signals to catch different kinds of automated traffic.

Bot management customers automatically benefit from the residential proxy detection improvement below, which lowers the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) for matched requests. Using the detection ID in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) provides even more visibility and control over mitigating residential proxy traffic.

| Detection ID | Description                                                                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 50331651     | Observes traffic from residential proxy networks and similar commercial proxies. When the ID matches a request, Bot Management sets the bot score to 29 and uses [anomaly detection](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/#anomaly-detection-enterprise) as its score source. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/detection-ids/","name":"Detection IDs"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/additional-configurations/detection-ids/additional-detections/","name":"Additional detections"}}]}
```
