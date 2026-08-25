---
description: Popular Rust crates confirmed to compile to WebAssembly and run on Cloudflare Workers.
title: Supported crates
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported crates

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/languages/rust/crates/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

Learn about popular Rust crates which have been confirmed to work on Workers when using [workers-rs ↗](https://github.com/cloudflare/workers-rs) (or in some cases just `wasm-bindgen`), to write Workers in WebAssembly. Each Rust crate example includes any custom configuration that is required.

This is not an exhaustive list, many Rust crates can be compiled to the [wasm32-unknown-unknown ↗](https://doc.rust-lang.org/rustc/platform-support/wasm64-unknown-unknown.html) target that is supported by Workers. In some cases, this may require disabling default features or enabling a Wasm-specific feature. It is important to consider the addition of new dependencies, as this can significantly increase the [size](https://developers.cloudflare.com/workers/platform/limits/#worker-size) of your Worker.

## `time`

Many crates which have been made Wasm-friendly, will use the `time` crate instead of `std::time`. For the `time` crate to work in Wasm, the `wasm-bindgen` feature must be enabled to obtain timing information from JavaScript.

## `tracing`

Tracing can be enabled by using the `tracing-web` crate and the `time` feature for `tracing-subscriber`. Due to [timing limitations](https://developers.cloudflare.com/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading) on Workers, spans will have identical start and end times unless they encompass I/O.

[Refer to the tracing example ↗](https://github.com/cloudflare/workers-rs/tree/main/examples/tracing) for more information.

## `reqwest`

The [reqwest library ↗](https://docs.rs/reqwest/latest/reqwest/) can be compiled to Wasm, and hooks into the JavaScript `fetch` API automatically using `wasm-bindgen`.

## `tokio-postgres`

`tokio-postgres` can be compiled to Wasm. It must be configured to use a `Socket` from `workers-rs`:

[Refer to the tokio-postgres example ↗](https://github.com/cloudflare/workers-rs/tree/main/examples/tokio-postgres) for more information.

## `hyper`

The `hyper` crate contains two HTTP clients, the lower-level `conn` module and the higher-level `Client`. The `conn` module can be used with Workers `Socket`, however `Client` requires timing dependencies which are not yet Wasm friendly.

[Refer to the hyper example ↗](https://github.com/cloudflare/workers-rs/tree/main/examples/hyper) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/rust/crates/#page","headline":"Supported crates · Cloudflare Workers docs","description":"Popular Rust crates confirmed to compile to WebAssembly and run on Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/languages/rust/crates/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
