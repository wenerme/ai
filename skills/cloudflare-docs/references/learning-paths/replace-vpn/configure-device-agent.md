---
title: Configure the device agent
description: Replace your VPN with Cloudflare Zero Trust.
image: https://developers.cloudflare.com/cf-twitter-card.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/replace-vpn/configure-device-agent/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configure the device agent

The Cloudflare One Client (known as the Cloudflare One Agent in mobile app stores) encrypts designated traffic from a user's device to Cloudflare's global network. In this learning path, we will first define all of your parameters and deployment rules, and then we will install and connect the client. If you prefer to start the client download now, refer to [Download the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

Note

The following steps are identical to [Configure the device agent](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/) in the Secure your Internet traffic and SaaS apps implementation guide. If you have already completed Secure your Internet traffic and SaaS apps, you can skip ahead to [Connect user devices](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-devices/).

## Objectives

By the end of this module, you will be able to:

* Define which users can connect devices to your Zero Trust instance.
* Configure global and device-specific settings for the Cloudflare One Client.
* Route user traffic through Cloudflare Gateway.
* Route domains to a private DNS server, if required.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/","name":"Configure the device agent"}}]}
```
