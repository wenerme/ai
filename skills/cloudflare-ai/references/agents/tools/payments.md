---
description: Let AI agents pay for services with x402 or Machine Payments Protocol (MPP) through Cloudflare's Agents SDK.
title: Agentic Payments
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Agentic Payments

Last updated Aug 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/tools/payments/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI agents need to discover, pay for, and consume resources and services programmatically. Traditional onboarding requires account creation, a payment method, and an API key before an agent can pay for a service. Agentic payments let AI agents purchase resources and services directly through the HTTP `402 Payment Required` response code.

Cloudflare's [Agents SDK](https://developers.cloudflare.com/agents/) supports agentic payments through two protocols built on the HTTP `402 Payment Required` status code: **x402** and **Machine Payments Protocol (MPP)**. Both follow the same core flow:

1. A client requests a resource or calls a tool.
2. The server returns a payment Challenge describing what to pay, how much, and where.
3. The client fulfills the payment and retries the request with a payment credential.
4. The server verifies the payment (optionally through a facilitator service) and returns the resource along with a receipt.

No pre-created service account or pre-shared API key is required. Agents handle the payment exchange programmatically.

## x402 and Machine Payments Protocol

### x402

[x402 ↗](https://www.x402.org/) is a payment standard created by Coinbase. It uses on-chain stablecoin payments (USDC on Base, Ethereum, Solana, and other networks) and defines three HTTP headers — `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE`, and `PAYMENT-RESPONSE` — to carry challenges, credentials, and receipts. Servers can offload verification and settlement to a **facilitator** service so they do not need direct blockchain connectivity. It is governed by Coinbase and Cloudflare, two of the founding members of the x402 Foundation.

The Agents SDK provides first-class x402 integration:

* **Server-side**: `withX402` and `paidTool` for Model Context Protocol (MCP) servers, plus `x402-hono` middleware for HTTP Workers.
* **Client-side**: `withX402Client` wraps MCP connections with automatic `402` handling and optional human approval.

### Machine Payments Protocol

[Machine Payments Protocol (MPP) ↗](https://mpp.dev) is an open payment protocol. It adds the `WWW-Authenticate: Payment` and `Authorization: Payment` headers to HTTP `402` responses.

MPP supports multiple payment methods beyond blockchains, including cards (via Stripe) and stablecoins. The `mppx` SDK supports one-time, usage-based, and recurring payments. MPP is also backwards-compatible with x402: MPP clients can consume existing x402 services without modification.

## Build with agentic payments

### [HTTP content (x402)](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/)

Gate APIs, web pages, and files with a Worker proxy

### [HTTP content (MPP)](https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/)

Gate APIs, web pages, and files with the mpp-proxy Worker

### [Accept payments (MPP)](https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/)

Accept MPP from an origin, Worker route, or MCP tool

### [Pay from the Agents SDK](https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/)

Give an Agent MPP-aware HTTP fetch and MCP clients

## Related

* [x402.org ↗](https://x402.org) — x402 protocol specification
* [mpp.dev ↗](https://mpp.dev) — MPP protocol specification
* [Pay Per Crawl](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/) — Cloudflare-native monetization for web content
* [x402 examples ↗](https://github.com/cloudflare/agents/tree/main/examples) — Complete working code

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/tools/payments/#page","headline":"Agentic Payments · Cloudflare Agents docs","description":"Let AI agents pay for services with x402 or Machine Payments Protocol (MPP) through Cloudflare's Agents SDK.","url":"https://developers.cloudflare.com/agents/tools/payments/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
