---
description: Install Terraform and configure the Cloudflare provider on your operating system.
title: Get started
image: https://developers.cloudflare.com/terraform/installing/og.png?v=9ec0e980c476f62b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/terraform/installing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Install the latest version of the Terraform CLI from [HashiCorp's official installation guide ↗︎](https://developer.hashicorp.com/terraform/install).

Caution

Terraform maintains your configuration state, which can be broken when you make configuration changes through both Terraform and either the Cloudflare Dashboard or API.

To avoid this state, make sure you manage Terraform resources only in Terraform. For more details, refer to our [best practices](https://developers.cloudflare.com/terraform/advanced-topics/best-practices/).

## Mac

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

## Linux

Install via your distribution's package manager:

```sh
sudo apt install terraform
```

## Windows

Download the installer from [HashiCorp's installation page ↗︎](https://developer.hashicorp.com/terraform/install) and follow the setup instructions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/installing/#page","headline":"Get started","description":"Install Terraform and configure the Cloudflare provider on your operating system.","url":"https://developers.cloudflare.com/terraform/installing/","inLanguage":"en","image":"https://developers.cloudflare.com/terraform/installing/og.png?v=9ec0e980c476f62b","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
