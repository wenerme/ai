---
title: Roughtime
description: Roughtime is a simple, flexible, and secure authenticated time protocol developed by Google.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/time-services/roughtime/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Roughtime

[Roughtime ↗](https://roughtime.googlesource.com/roughtime) is a simple, flexible, and secure authenticated time protocol developed by Google.

## Background

Endpoints on the Internet often synchronize their clocks using the [Network Time Protocol (NTP)](https://developers.cloudflare.com/time-services/ntp/). NTP provides precise synchronization, but is frequently deployed without a means of authentication. This is due to a [combination of issues ↗](https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/dowling).

As a result, a man-in-the-middle attacker can easily influence a victim’s clock. By moving them back in time, the attacker can, for example, force a victim to accept an expired (and possibly compromised) TLS certificate or session ticket.

For many applications, _precise_ network time is not essential. It is sufficient to have _accurate_ time to mitigate these kinds of attacks, such as within 10 seconds of real time. This observation is the primary motivation behind Roughtime.

## Next steps

For more technical details on Roughtime, refer to the [introductory blog post ↗](https://blog.cloudflare.com/roughtime/).

To get started, refer to [Get the Roughtime](https://developers.cloudflare.com/time-services/roughtime/usage/). For more practical guidance on using the Roughtime, refer to our [how-to guide](https://developers.cloudflare.com/time-services/roughtime/recipes/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/time-services/","name":"Time Services"}},{"@type":"ListItem","position":3,"item":{"@id":"/time-services/roughtime/","name":"Roughtime"}}]}
```
