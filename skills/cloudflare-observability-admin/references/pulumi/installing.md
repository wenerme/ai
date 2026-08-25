---
description: Install the Pulumi CLI on Mac, Linux, or Windows and verify your installation.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pulumi/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pulumi/installing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Follow the recommended steps for your operating system below. For official instructions on installing Pulumi and other install options, refer to [Install Pulumi ↗](https://www.pulumi.com/docs/install/).

Note

Pulumi is free, open source, and optionally pairs with the [Pulumi Cloud ↗](https://www.pulumi.com/product/pulumi-cloud/) to make managing infrastructure secure, reliable, and hassle-free.

Caution

To avoid resource management conflicts, it’s **always** recommended to manage Pulumi-controlled resources via Pulumi.

## Installation

### Mac

Install via Homebrew package manager.

```sh
brew install pulumi/tap/pulumi
```

### Linux

Use the installation script.

```sh
curl -fsSL https://get.pulumi.com | sh
```

### Windows

1. Download the latest installer from the [Pulumi Repository ↗](https://github.com/pulumi/pulumi-winget/releases/latest)
2. Double click the MSI file and complete the wizard.

## Verify installation

To verify your installation, run the following in the terminal:

```sh
pulumi version
```

Note

For upgrades and installation alternatives, refer to [Install Pulumi ↗](https://www.pulumi.com/docs/install/).

## Next steps

Follow the [Hello World tutorial](https://developers.cloudflare.com/pulumi/tutorial/hello-world/) to write a simple Pulumi program. It takes about 10 minutes to complete.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pulumi/installing/#page","headline":"Get started · Pulumi docs","description":"Install the Pulumi CLI on Mac, Linux, or Windows and verify your installation.","url":"https://developers.cloudflare.com/pulumi/installing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
