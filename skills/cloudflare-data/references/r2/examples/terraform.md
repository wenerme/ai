---
description: Configure R2 buckets with Terraform using the Cloudflare provider.
title: Terraform
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Terraform

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/examples/terraform/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.


This example shows how to configure R2 with Terraform using the [Cloudflare provider ↗](https://github.com/cloudflare/terraform-provider-cloudflare).

Note for using AWS provider

When using the Cloudflare Terraform provider, you can only manage buckets. To configure items such as CORS and object lifecycles, you will need to use the [AWS Provider](https://developers.cloudflare.com/r2/examples/terraform-aws/).

With [terraform ↗](https://developer.hashicorp.com/terraform/downloads) installed, create `main.tf` and copy the content below replacing with your API Token.

```hcl
terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

provider "cloudflare" {
  api_token = "<YOUR_API_TOKEN>"
}

resource "cloudflare_r2_bucket" "cloudflare-bucket" {
  account_id = "<YOUR_ACCOUNT_ID>"
  name       = "my-tf-test-bucket"
  location   = "WEUR"
}
```

You can then use `terraform plan` to view the changes and `terraform apply` to apply changes.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/terraform/#page","headline":"Terraform · Cloudflare R2 docs","description":"Configure R2 buckets with Terraform using the Cloudflare provider.","url":"https://developers.cloudflare.com/r2/examples/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
