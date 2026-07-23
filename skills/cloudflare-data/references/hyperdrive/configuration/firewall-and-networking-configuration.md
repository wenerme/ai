---
description: Configure firewall rules and networking to allow Hyperdrive to connect to your database.
title: Firewall and networking configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# Firewall and networking configuration

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Hyperdrive uses the [Cloudflare IP address ranges ↗](https://www.cloudflare.com/ips/) to connect to your database. If you decide to restrict the IP addresses that can access your database with firewall rules, the IP address ranges listed in this reference need to be allow-listed in your database's firewall and networking configurations.

You can connect to your database from Hyperdrive using any of the 3 following networking configurations:

1. Configure your database to allow inbound connectivity from the public Internet (all IP address ranges).
2. Configure your database to allow inbound connectivity from the public Internet, with only the IP address ranges used by Hyperdrive allow-listed in an IP access control list (ACL).
3. Configure your database to allow inbound connectivity from a private network, and run a Cloudflare Tunnel instance in your private network to enable Hyperdrive to connect from the Cloudflare network to your private network. Refer to [documentation on connecting to a private database using Tunnel](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/#page","headline":"Firewall and networking configuration · Cloudflare Hyperdrive docs","description":"Configure firewall rules and networking to allow Hyperdrive to connect to your database.","url":"https://developers.cloudflare.com/hyperdrive/configuration/firewall-and-networking-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
