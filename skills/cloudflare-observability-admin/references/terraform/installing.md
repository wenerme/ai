---
description: Install Terraform and configure the Cloudflare provider on your operating system.
title: Get started
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/terraform/installing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Terraform ships as a single binary file. The examples below include installation information for popular operating systems.

For official instructions on installing Terraform, refer to [Install Terraform ↗](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli).

Caution

Terraform maintains your configuration state, which can be broken when you make configuration changes through both Terraform and either the Cloudflare Dashboard or API.

To avoid this state, make sure you manage Terraform resources only in Terraform. For more details, refer to our [best practices](https://developers.cloudflare.com/terraform/advanced-topics/best-practices/).

## Mac

The easiest way to install Terraform on macOS is with Homebrew.

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

## Linux

You can install the `terraform` binary via your distribution's package manager. For example:

```sh
sudo apt install terraform
```

Alternatively, you can fetch a specific version directly and place the binary in your `PATH`:

```sh
wget -q https://releases.hashicorp.com/terraform/1.4.5/terraform_1.4.5_linux_amd64.zip

unzip terraform_1.4.5_linux_amd64.zip
```

```sh
Archive:  terraform_1.4.5_linux_amd64.zip
  inflating: terraform
```

```sh
sudo mv terraform /usr/local/bin/terraform

terraform version
```

```sh
Terraform v1.4.5
```

## Windows

1. Download the 32 or 64-bit executable from the [Download Terraform ↗](https://developer.hashicorp.com/terraform/downloads) page.
2. Unzip and place `terraform.exe` somewhere in your path.

## Other

For additional installers, refer to the [Download Terraform ↗](https://developer.hashicorp.com/terraform/downloads) page.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/installing/#page","headline":"Install Terraform · Cloudflare Terraform docs","description":"Install Terraform and configure the Cloudflare provider on your operating system.","url":"https://developers.cloudflare.com/terraform/installing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
