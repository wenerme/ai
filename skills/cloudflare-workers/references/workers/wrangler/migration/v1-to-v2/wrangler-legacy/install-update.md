---
description: Install or update Wrangler v1 using npm or Cargo. Now deprecated in favor of the latest Wrangler release.
title: Install / Update
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Install / Update

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/install-update/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Caution

This page is for Wrangler v1, which has been deprecated. [Learn how to update to the latest version of Wrangler](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/).

## Install

### Install with `npm`

```sh
npm i @cloudflare/wrangler -g
```

EACCESS error

You may have already installed npm. It is possible that an `EACCES` error may be thrown while installing Wrangler. This is related to how many systems install the npm binary. It is recommended that you reinstall npm using a Node version manager like [nvm ↗](https://github.com/nvm-sh/nvm#installing-and-updating) or [Volta ↗](https://volta.sh/).

### Install with `cargo`

Assuming you have Rust’s package manager, [Cargo ↗](https://github.com/rust-lang/cargo), installed, run:

```sh
cargo install wrangler
```

Otherwise, to install Cargo, you must first install rustup. On Linux and macOS systems, `rustup` can be installed as follows:

```sh
curl https://sh.rustup.rs -sSf | sh
```

Additional installation methods are available [on the Rust site ↗](https://forge.rust-lang.org/other-installation-methods.html).

Windows users will need to install Perl as a dependency for `openssl-sys` — [Strawberry Perl ↗](https://www.perl.org/get.html) is recommended.

After Cargo is installed, you may now install Wrangler:

```sh
cargo install wrangler
```

Customize OpenSSL

By default, a copy of OpenSSL is included to make things easier during installation, but this can make the binary size larger. If you want to use your system's OpenSSL installation, provide the feature flag `sys-openssl` when running install:

```sh
cargo install wrangler --features sys-openssl
```

### Manual install

1. Download the binary tarball for your platform from the [releases page ↗](https://github.com/cloudflare/wrangler-legacy/releases). You do not need the `wranglerjs-*.tar.gz` download – Wrangler will install that for you.
2. Unpack the tarball and place the Wrangler binary somewhere on your `PATH`, preferably `/usr/local/bin` for Linux/macOS or `Program Files` for Windows.

## Update

To update [Wrangler ↗](https://github.com/cloudflare/wrangler-legacy), run one of the following:

### Update with `npm`

```sh
npm update -g @cloudflare/wrangler
```

### Update with `cargo`

```sh
cargo install wrangler --force
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/#page","headline":"Install / Update · Cloudflare Workers docs","description":"Install or update Wrangler v1 using npm or Cargo. Now deprecated in favor of the latest Wrangler release.","url":"https://developers.cloudflare.com/workers/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
