---
description: Manage AI Search instances as code with the Cloudflare Terraform provider.
title: Terraform
image: https://developers.cloudflare.com/ai-search/api/instances/terraform/og.png?v=21a4609a22c4bc19
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Terraform

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/api/instances/terraform/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Cloudflare Terraform provider ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) to create, update, import, and read AI Search instances as code. Namespace support for instances is available from provider v5.29.0.

To manage the namespaces themselves, refer to [Namespaces with Terraform](https://developers.cloudflare.com/ai-search/api/namespaces/terraform/).

## Create an instance

Use the `cloudflare_ai_search_instance` resource. The `id` argument is the instance name.

### Default namespace

If you omit `namespace`, Terraform creates the instance in the `default` [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/).

```tf
resource "cloudflare_ai_search_instance" "docs" {
  account_id = var.account_id
  id         = "docs"
}
```

An instance without a data source uses [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/). You can upload documents to it with the [Items API](https://developers.cloudflare.com/ai-search/api/items/rest-api/).

### Custom namespace

To create an instance in a custom namespace, set `namespace`. Reference the `name` of a `cloudflare_ai_search_namespace` resource so that Terraform creates the namespace before the instance.

```tf
resource "cloudflare_ai_search_namespace" "support" {
  account_id = var.account_id
  name       = "support"
}

resource "cloudflare_ai_search_instance" "docs" {
  account_id = var.account_id
  id         = "docs"
  namespace  = cloudflare_ai_search_namespace.support.name
}
```

### Instance with a data source

Set `type` and `source` to connect a data source. `type` accepts `r2` or `web-crawler`.

```tf
resource "cloudflare_ai_search_instance" "internal_docs" {
  account_id      = var.account_id
  id              = "internal-docs"
  namespace       = "default"
  type            = "r2"
  source          = "my-docs-bucket"
  max_num_results = 20
}
```

For more information, refer to [R2 data source](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/) and [Website data source](https://developers.cloudflare.com/ai-search/configuration/data-source/website/).

## Computed values

AI Search fills in some fields when you create an instance, for example the models (such as `aisearch_model` and `embedding_model`), `chunk_size`, and `token_id`. Terraform treats these fields as computed. If you omit them from your configuration, Terraform keeps the current value instead of planning a change.

## Changes that replace the instance

Caution

Some changes destroy the instance and create a new one. Replacing an instance permanently removes all its indexed data, including embeddings, chunks, and files uploaded to built-in storage.

The following changes replace the instance:

- Changing `id` or `account_id`.
- Changing `namespace`.
- Changing `type`.

Review `terraform plan` output for `must be replaced` before you apply these changes.

## Import an instance

Import an existing instance with an ID in the format `<account_id>/<namespace>/<id>`:

```sh
terraform import cloudflare_ai_search_instance.docs <account_id>/support/docs
```

For an instance in the default namespace, use `default` as the namespace:

```sh
terraform import cloudflare_ai_search_instance.docs <account_id>/default/docs
```

You can also use an `import` block:

```tf
import {
  to = cloudflare_ai_search_instance.docs
  id = "${var.account_id}/default/docs"
}
```

## Data sources

Set `namespace` on both data sources. Use `default` for the default namespace.

### Read one instance

The `cloudflare_ai_search_instance` data source reads one instance by `id`.

```tf
data "cloudflare_ai_search_instance" "docs" {
  account_id = var.account_id
  namespace  = "support"
  id         = "docs"
}
```

### List instances

The `cloudflare_ai_search_instances` data source returns the instances in one namespace.

```tf
data "cloudflare_ai_search_instances" "support" {
  account_id = var.account_id
  namespace  = "support"
}
```

## Related resources

- [Namespaces with Terraform](https://developers.cloudflare.com/ai-search/api/namespaces/terraform/)
- [Instances REST API](https://developers.cloudflare.com/ai-search/api/instances/rest-api/)
- [Namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/instances/terraform/#page","headline":"Terraform","description":"Manage AI Search instances as code with the Cloudflare Terraform provider.","url":"https://developers.cloudflare.com/ai-search/api/instances/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/api/instances/terraform/og.png?v=21a4609a22c4bc19","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
