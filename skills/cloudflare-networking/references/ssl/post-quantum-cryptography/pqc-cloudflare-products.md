---
description: Track which Cloudflare products support post-quantum key agreement and post-quantum signatures.
title: PQC in Cloudflare products
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# PQC in Cloudflare products

Last updated Jul 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-cloudflare-products/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare is [targeting 2029 ↗](https://blog.cloudflare.com/post-quantum-roadmap/) to be fully post-quantum secure across its entire product suite.

This page shows the status of the migration. Each section below groups Cloudflare products by the underlying secure communication channel. Once a channel supports PQC, every product built on top inherits PQC support.

Each section captures the classes of post-quantum algorithms deployed in the secure communication channel: [key agreement](https://developers.cloudflare.com/ssl/post-quantum-cryptography/#hybrid-key-agreement) (sometimes called post-quantum encryption, which protects against [harvest-now, decrypt-later ↗](https://en.wikipedia.org/wiki/Harvest%5Fnow,%5Fdecrypt%5Flater) attacks) and [signatures](https://developers.cloudflare.com/ssl/post-quantum-cryptography/#post-quantum-signatures) (sometimes called post-quantum authentication, which protects live systems against unauthorized access by quantum adversaries [after Q-Day ↗](https://blog.cloudflare.com/post-quantum-roadmap/)).

A Cloudflare-side ✅ entry only delivers end-to-end post-quantum protection when **the party on the other side of the connection also supports the same post-quantum algorithms**. Refer to [PQC support](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-support/) for the list of browsers, libraries, and servers that support the algorithms Cloudflare has deployed.

For an end-to-end walkthrough of how Cloudflare One on-ramps and off-ramps fit together, refer to [PQC and Cloudflare One](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/).

## Visitor to Cloudflare

Inbound TLS 1.3 (including QUIC) from end-user clients to Cloudflare's edge.

| Protection    | Status                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| Key agreement | ✅ X25519MLKEM768                                                                                                   |
| Signatures    | 📝 Planned via [Merkle Tree Certificates ↗](https://datatracker.ietf.org/doc/draft-ietf-plants-merkle-tree-certs/) |

Reference: [PQC for all websites and APIs ↗](https://blog.cloudflare.com/post-quantum-for-all/).

**Products covered:** any proxied hostname or HTTPS application behind Cloudflare, including:

* The Cloudflare developer platform: [Workers](https://developers.cloudflare.com/workers/) custom domains, `*.workers.dev`, [Pages](https://developers.cloudflare.com/pages/), [R2](https://developers.cloudflare.com/r2/) public buckets, [Stream](https://developers.cloudflare.com/stream/), and [Images](https://developers.cloudflare.com/images/).
* [API Shield](https://developers.cloudflare.com/api-shield/)\-protected APIs.
* The Cloudflare API and dashboard.
* [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) self-hosted applications (browser-to-edge leg).

This section only covers the inbound TLS connection from the end-user client to Cloudflare's edge. When a Worker fetches data from a backend storage service ([D1](https://developers.cloudflare.com/d1/), [KV](https://developers.cloudflare.com/kv/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), [R2](https://developers.cloudflare.com/r2/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Hyperdrive](https://developers.cloudflare.com/hyperdrive/), and similar), that connection is governed by the [Cloudflare internal network](#cloudflare-internal-network) section. When a Worker calls out to a third-party origin via `fetch()`, it is governed by the [Cloudflare to origin](#cloudflare-to-origin) section.

## Cloudflare internal network

Service-to-service TLS connections between Cloudflare data centers and internal services.

| Protection    | Status            |
| ------------- | ----------------- |
| Key agreement | 🚧 X25519MLKEM768 |
| Signatures    | Not yet           |

Reference: [PQC generally available ↗](https://blog.cloudflare.com/post-quantum-cryptography-ga/), [Roadmap ↗](https://blog.cloudflare.com/post-quantum-roadmap/).

Most internal connections have been migrated to X25519MLKEM768\. A long tail of services is still in the process of being upgraded.

## Cloudflare to origin

Outbound TLS 1.3 connections from Cloudflare's edge to customer origin servers.

| Protection    | Status                                                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Key agreement | ✅ X25519MLKEM768                                                                                                                                                                                                                                        |
| Signatures    | ✅ ML-DSA via [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) and [Custom Origin Trust Store](https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/) |

Reference: [PQC to your origin](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-to-origin/).

**Products covered:** any Cloudflare-proxied zone's origin pull, and the egress leg of [Cloudflare Gateway](#cloudflare-gateway) (SWG, HTTPS inspection) when Gateway fetches third-party origin content on behalf of the client. Gateway's post-quantum support on this leg is independent of which on-ramp the client uses to reach Cloudflare.

Note

If your origin server does not yet support PQC, you can onboard it to Cloudflare's network with a PQC connection by putting it behind [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## Cloudflare Tunnel

Outbound TLS 1.3 tunnel from `cloudflared` on a customer origin to Cloudflare's global network.

| Protection    | Status           |
| ------------- | ---------------- |
| Key agreement | ✅ X25519MLKEM768 |
| Signatures    | Not yet          |

Reference: [PQ Cloudflare Tunnel ↗](https://blog.cloudflare.com/post-quantum-tunnel/), [PQC and Cloudflare One](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/).

**Products covered:** [Workers VPC](https://developers.cloudflare.com/workers-vpc/) private-network access and any [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/) off-ramp that egresses via `cloudflared` (for example, [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) self-hosted applications).

## Cloudflare One

The sections below cover the connections and services that make up [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/). For an end-to-end walkthrough of how on-ramps and off-ramps fit together, refer to [PQC and Cloudflare One](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/).

### Cloudflare One Client

MASQUE tunnel (TLS 1.3) from an end-user device to Cloudflare's global network, established by the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) (formerly WARP).

| Protection    | Status           |
| ------------- | ---------------- |
| Key agreement | ✅ X25519MLKEM768 |
| Signatures    | Not yet          |

Reference: [PQC and Cloudflare One: Cloudflare One Client](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/#cloudflare-one-client).

This connection also serves as a post-quantum on-ramp for traffic that traverses [Cloudflare Gateway](#cloudflare-gateway).

### Cloudflare Mesh

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) provides private IP connectivity between devices and servers using the Cloudflare One Client on each Mesh node and client device.

Mesh inherits its post-quantum protection from the [Cloudflare One Client](#cloudflare-one-client) connection, which is used as both the on-ramp and the off-ramp for Mesh traffic.

### Cloudflare Gateway

[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#post-quantum-support) is a Secure Web Gateway that runs on Cloudflare's edge and filters HTTPS traffic egressing to the public Internet. Gateway has no client-side component; clients reach Gateway via one of several post-quantum on-ramps:

* The [Cloudflare One Client](#cloudflare-one-client).
* A [Cloudflare IPsec](#cloudflare-ipsec) tunnel.

The egress leg from Gateway to third-party origin servers is covered by [Cloudflare to origin](#cloudflare-to-origin) and is independent of the on-ramp.

Reference: [PQC and Cloudflare One: Secure Web Gateway](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/#secure-web-gateway).

### Cloudflare IPsec

IKEv2 key exchange for IPsec tunnels between third-party branch connectors and Cloudflare's global network.

| Protection           | Status                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Key agreement        | ✅ ML-KEM-768/1024 + DH Group 20 (P-384) in IKEv2                                                                                               |
| Downgrade protection | 🚧 [IKE\_SA\_INIT\_FULL\_TRANSCRIPT\_AUTH](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/#downgrade-protection) |
| Signatures           | Not yet                                                                                                                                        |

Reference: [PQC SASE ↗](https://blog.cloudflare.com/post-quantum-sase/), [GRE and IPsec tunnels](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/#tested-third-party-vendor-interoperability), [draft-ietf-ipsecme-ikev2-mlkem ↗](https://datatracker.ietf.org/doc/draft-ietf-ipsecme-ikev2-mlkem/), [draft-ietf-ipsecme-ikev2-downgrade-prevention ↗](https://datatracker.ietf.org/doc/draft-ietf-ipsecme-ikev2-downgrade-prevention/).

The IPsec ESP dataplane can alternatively be keyed using the [Cloudflare One Appliance](#cloudflare-one-appliance) control plane instead of IKEv2.

### Cloudflare One Appliance

TLS 1.3 control-plane connection used by the [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/reference/) (formerly Magic WAN Connector) to establish keys for its IPsec ESP dataplane tunnels.

| Protection    | Status           |
| ------------- | ---------------- |
| Key agreement | ✅ X25519MLKEM768 |
| Signatures    | Not yet          |

Reference: [PQC SASE ↗](https://blog.cloudflare.com/post-quantum-sase/), [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/reference/), [PQC and Cloudflare One](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/#cloudflare-ipsec).

## Contributing

This listing is maintained alongside the rest of the Cloudflare SSL/TLS documentation. If you spot an inaccuracy or have an update after a product announcement, [contributions](https://developers.cloudflare.com/style-guide/contributions/) are welcome.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-cloudflare-products/#page","headline":"PQC in Cloudflare products · Cloudflare SSL/TLS docs","description":"Track which Cloudflare products support post-quantum key agreement and post-quantum signatures.","url":"https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-cloudflare-products/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Post-quantum"]}
```
