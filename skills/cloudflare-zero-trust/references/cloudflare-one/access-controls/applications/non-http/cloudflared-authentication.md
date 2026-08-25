---
description: Client-side cloudflared in Access.
title: Client-side cloudflared
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Client-side cloudflared

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

With Cloudflare Zero Trust, users can connect to non-HTTP applications via a public hostname without installing the Cloudflare One Client. This method requires you to onboard a domain to Cloudflare and install `cloudflared` on both the server and the user's device.

Users log in to the application by running a `cloudflared access` command in their terminal. `cloudflared` will launch a browser window and prompt the user to authenticate with your identity provider.

Note

Automated services should only authenticate with `cloudflared` if they cannot use a [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/). Cloudflared authentication relies on WebSockets to establish a connection. WebSockets have a known limitation where persistent connections may close unexpectedly. We recommend either a [Service Auth policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) or using [Warp to Tunnel routing](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/) in these instances.

For examples of how to connect to Access applications with client-side `cloudflared`, refer to these tutorials:

* [Connect through Access using a CLI](https://developers.cloudflare.com/cloudflare-one/tutorials/cli/)
* [Connect through Access using kubectl](https://developers.cloudflare.com/cloudflare-one/tutorials/kubectl/)
* [Connect to SSH with client-side cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/)
* [Connect over RDP with cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/#connect-to-rdp-server-with-cloudflared-access)
* [Connect over SMB with cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/)
* [Connect over arbitrary TCP with cloudflared](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/arbitrary-tcp/)

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/#page","headline":"Client-side cloudflared · Cloudflare One docs","description":"Client-side cloudflared in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
