---
description: Accept and make payments using Machine Payments Protocol (MPP) with Cloudflare Workers and the Agents SDK.
title: MPP (Machine Payments Protocol)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# MPP (Machine Payments Protocol)

Last updated Aug 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/payments/mpp/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Machine Payments Protocol (MPP) ↗](https://mpp.dev) is an open protocol for machine-to-machine payments. It standardizes the HTTP `402 Payment Required` status code with a formal authentication scheme proposed to the [IETF ↗](https://paymentauth.org). MPP gives agents, applications, and people one interface to pay for a service in the same HTTP request.

MPP is payment-method agnostic. It supports stablecoins, cards through Stripe, and custom payment methods. A service can offer more than one method.

## How it works

1. An Agent or HTTP client requests a paid resource.
2. The service returns `402 Payment Required` with a payment Challenge.
3. The client fulfills the payment.
4. The client retries with a payment Credential.
5. The service returns the resource with a payment Receipt.

HTTP services exchange payment data in authentication headers. Model Context Protocol (MCP) tools use the same flow through JSON-RPC.

## Payment intents

MPP defines three payment intents:

* **`charge`** — Collect a one-time payment.
* **`session`** — Charge for measured usage.
* **`subscription`** — Sell recurring access.

For more information, refer to [MPP payment intents ↗](https://mpp.dev/intents/).

## Compatibility with x402

MPP is backwards-compatible with [x402](https://developers.cloudflare.com/agents/tools/payments/x402/). MPP clients can consume existing x402 services without changes to those services.

## Build on Cloudflare

### [Accept payments](https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/)

Charge for a Worker route or an MCP tool

### [Pay from the Agents SDK](https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/)

Pay HTTP services and MCP tools from a Cloudflare Agent

## SDKs

MPP provides SDKs for TypeScript, Python, Rust, Go, and Ruby. The Cloudflare guides use the TypeScript [mppx SDK ↗](https://mpp.dev/sdk/typescript/).

For current packages and integrations, refer to the [MPP SDK documentation ↗](https://mpp.dev/sdk/).

## Related

* [mpp.dev ↗](https://mpp.dev) — Protocol documentation and guides
* [IETF specification ↗](https://paymentauth.org) — Payment HTTP Authentication Scheme
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Cloudflare-native web content monetization

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/tools/payments/mpp/#page","headline":"MPP (Machine Payments Protocol) · Cloudflare Agents docs","description":"Accept and make payments using Machine Payments Protocol (MPP) with Cloudflare Workers and the Agents SDK.","url":"https://developers.cloudflare.com/agents/tools/payments/mpp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
