---
title: Get the Roughtime
description: The &#34;Hello, world!&#34; of Roughtime is very simple: the client sends a request over UDP to the server and the server responds with a signed timestamp.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/time-services/roughtime/usage.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get the Roughtime

The "Hello, world!" of Roughtime is very simple: the client sends a request over UDP to the server and the server responds with a signed timestamp.

You just need the server's address and public key to run the protocol:

* **Server address**: `roughtime.cloudflare.com:2003` (resolves to an IP address in our [anycast IP range ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/)). You can use either IPv4 or IPv6.
* **Public key**: `0GD7c3yP8xEc4Zl2zeuN2SlLvDVVocjsPSL8/Rl/7zg=`

To get started, download and run Cloudflare's [Go client ↗](https://github.com/cloudflare/roughtime):

```

go install github.com/cloudflare/roughtime/cmd/getroughtime@latest

getroughtime -ping roughtime.cloudflare.com:2003 -pubkey 0GD7c3yP8xEc4Zl2zeuN2SlLvDVVocjsPSL8/Rl/7zg=


```

## Beta notice

Cloudflare Roughtime is currently in beta. As such, our root public key may change in the future. We will keep this page up-to-date with the most current public key.

You can also obtain it programmatically using DNS. For example:

Terminal window

```

dig TXT roughtime.cloudflare.com | grep -oP 'TXT\s"\K.*?(?=")'


```

## Next steps

Beyond just getting the Roughtime from Cloudflare, you may want to use it to [keep your clock in sync](https://developers.cloudflare.com/time-services/roughtime/recipes/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/time-services/","name":"Time Services"}},{"@type":"ListItem","position":3,"item":{"@id":"/time-services/roughtime/","name":"Roughtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/time-services/roughtime/usage/","name":"Get the Roughtime"}}]}
```
