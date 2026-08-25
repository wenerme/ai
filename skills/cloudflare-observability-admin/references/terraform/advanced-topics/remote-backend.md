---
description: Store Terraform state files remotely using Cloudflare R2 as an S3-compatible backend.
title: Remote R2 backend
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# Remote R2 backend

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/terraform/advanced-topics/remote-backend/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Cloudflare R2](https://developers.cloudflare.com/r2/) and [Terraform remote backends ↗](https://developer.hashicorp.com/terraform/language/settings/backends/remote) can interact with each other to provide a seamless experience for Terraform state management.

Cloudflare R2 is an object storage service that provides a highly available, scalable, and secure way to store and serve static assets, such as images, videos, and static websites. R2 has [S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/) making it easy to integrate with existing cloud infrastructure and applications.

## Prerequisites

### Create R2 bucket

Using [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), [API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/create/), or [Account View Dashboard ↗](https://dash.cloudflare.com/?to=/:account/r2/new) create an [R2 Bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/).

```sh
wrangler r2 bucket create <YOUR_BUCKET_NAME>
```

```bash
 curl https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/buckets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"name": "<YOUR_BUCKET_NAME>"}'
```

Note

Bucket names can only contain lowercase letters (`a-z`), numbers (`0-9`), and hyphens (`-`).

### Create scoped bucket API keys

Next you will need to create a [bucket scoped R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with `Object Read & Write` permissions. To create an API token, do the following:

1. In **Account Home**, select **R2**.
2. Under **Account details**, select **Manage R2 API tokens**.
3. Select [**Create API token** ↗](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).
4. Select the **R2 Token** text to edit your API token name.
5. Under **Permissions**, select the **Object Read and Write** permissions, then scope your token to your `<YOUR_BUCKET_NAME>` bucket.
6. Select **Create API Token**.

After your token has been successfully created, review your **Secret Access Key** and **Access Key ID** values.

## Define R2 backend

Update your [cloudflare.tf](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/) file to include a [backend ↗](https://developer.hashicorp.com/terraform/language/backend) for the `<YOUR_BUCKET_NAME>` bucket you created above.

Note

Terraform code snippets below refer to the v4 SDK only.

```tf
terraform {
  backend "s3" {
    bucket = "<YOUR_BUCKET_NAME>"
    key    = "/some/key/terraform.tfstate"
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
    access_key = "<YOUR_R2_ACCESS_KEY>"
    secret_key = "<YOUR_R2_ACCESS_SECRET>"
    endpoints = { s3 = "https://<YOUR_ACCOUNT_ID>.r2.cloudflarestorage.com" }
  }
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}
provider "cloudflare" {
  # token pulled from $CLOUDFLARE_API_TOKEN
}
variable "account_id" { default = "<YOUR_ACCOUNT_ID>" }
```

## Migrate state file to R2 backend

After updating your `cloudflare.tf` file you can issue the `terraform init -reconfigure` command to migrate from a local state to [remote state ↗](https://developer.hashicorp.com/terraform/language/state/remote).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/advanced-topics/remote-backend/#page","headline":"Remote R2 backend · Cloudflare Terraform docs","description":"Store Terraform state files remotely using Cloudflare R2 as an S3-compatible backend.","url":"https://developers.cloudflare.com/terraform/advanced-topics/remote-backend/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
