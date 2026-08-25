---
description: Configure how Cloudflare selects TLS 1.3 key agreement algorithms for connections to your origin servers.
title: Automatic key exchange to origins
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Automatic key exchange to origins

Last updated Jul 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/origin-configuration/automatic-key-exchange/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Automatic key exchange allows Cloudflare to establish faster connections to origin servers by predicting which key agreements origins support. When establishing a TLS 1.3 connection to the origin, Cloudflare sends a key share for the predicted key agreement in the initial ClientHello, which can remove one network round trip by avoiding a [HelloRetryRequest ↗](https://www.rfc-editor.org/rfc/rfc8446.html#section-4.1.4).

This feature is separate from your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/). The encryption mode controls whether Cloudflare uses HTTPS and validates your origin certificate. Automatic key exchange controls the [key shares ↗](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8) sent when starting an HTTPS connection. The same preference is applied for all of a zone's origins.

## Requirements and scope

Automatic key exchange applies when the connection meets these requirements:

* Your zone uses **Full**, **Full (strict)**, or **Strict (SSL-Only Origin Pull)** mode.
* Your origin negotiates TLS 1.3 with Cloudflare.
* Your zone does not connect through Cloudflare Tunnel.

Automatic key exchange is available on all plans. It only affects new TLS connections. Requests that reuse an existing connection do not perform another key exchange.

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) uses a separate post-quantum connection between `cloudflared` and Cloudflare.

The setting applies to all outbound connections for the zone, including `fetch()` requests from [Workers](https://developers.cloudflare.com/workers/). If the zone has multiple active origins, Cloudflare derives one preference from their traffic-weighted results.

## How automatic selection works

Cloudflare scans active origins approximately every 24 hours. The scan checks the TLS key agreements that each origin supports and prefers.

When an origin supports both classical and post-quantum key agreements, Cloudflare prefers a post-quantum key agreement.

Cloudflare then applies the selected preference in stages:

1. Cloudflare sends the selected key share to 1% of traffic.
2. Cloudflare monitors connection failures and HelloRetryRequest rates.
3. A healthy change increases through 10%, 25%, 50%, 75%, and 100% of traffic.
4. An unhealthy change rolls back to the previous setting.

For each connection, Cloudflare sends the preferred key share first. Cloudflare also advertises the other key agreements allowed by your compliance requirements. An origin can request another advertised key share with a HelloRetryRequest. This adds one round trip but does not break the connection.

After a successful rollout, Cloudflare keeps the preference until a later scan finds a better option. Cloudflare selects `X25519MLKEM768` when the origin supports it and compliance requirements allow it. Otherwise, Cloudflare selects a supported classical key agreement.

Cloudflare uses standardized `X25519MLKEM768` for automatic post-quantum selection.

## Configuration options

To configure automatic key exchange in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Under **Origin connection & post-quantum encryption**, turn **Automatic key exchange** on or off.
3. Select any **Compliance requirements**. These requirements apply only to TLS 1.3 connections. Leave both options unselected to allow all supported key agreements.

The settings provide two separate controls. **Automatic key exchange** controls whether Cloudflare scans and reorders preferred key agreements. **Compliance requirements** control which key agreements Cloudflare may use for automatic selection on TLS 1.3 connections.

### Automatic key exchange

Automatic key exchange is on for all existing zones and on by default for new zones.

The setting has these options:

| Setting | Behavior                                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| On      | Cloudflare scans your origins and sends the zone's preferred key share.                                              |
| Off     | Cloudflare does not scan or reorder key shares. It uses the default order for your selected compliance requirements. |

Turning off automatic key exchange does not change your compliance requirements.

### Compliance requirements

Compliance requirements apply only to TLS 1.3 connections. They filter the key agreements that Cloudflare can advertise or select. Automatic key exchange never selects an algorithm outside this allowed set.

The available selections are:

| Selection                                       | API value         | Behavior                                                    |
| ----------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| No selection                                    | \[\]              | Allows supported classical and post-quantum key agreements. |
| Post-quantum hybrid                             | \["pqh"\]         | Allows only hybrid post-quantum key agreements.             |
| Federal Information Processing Standards (FIPS) | \["fips"\]        | Allows only key agreements that meet FIPS requirements.     |
| Post-quantum hybrid and FIPS                    | \["pqh", "fips"\] | Allows only key agreements that satisfy both requirements.  |

Cloudflare rejects a combination if the selected requirements have no key agreement in common. Changing a compliance requirement stops any active rollout. A later scan selects from the new allowed set.

## Origin Post-Quantum Encryption API

The [Origin Post-Quantum Encryption API](https://developers.cloudflare.com/api/resources/origin%5Fpost%5Fquantum%5Fencryption/methods/update/) remains available. Requests to this API are no-ops and do not change a zone's post-quantum key agreement behavior. Cloudflare plans to deprecate this API, but a deprecation date has not been established.

Use **Automatic key exchange** and **Compliance requirements** to configure post-quantum key agreement behavior.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/automatic-key-exchange/#page","headline":"Automatic key exchange to origins · Cloudflare SSL/TLS docs","description":"Configure how Cloudflare selects TLS 1.3 key agreement algorithms for connections to your origin servers.","url":"https://developers.cloudflare.com/ssl/origin-configuration/automatic-key-exchange/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Post-quantum"]}
```
