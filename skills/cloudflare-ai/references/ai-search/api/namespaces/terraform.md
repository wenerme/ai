---
description: Manage AI Search namespaces as code with the Cloudflare Terraform provider.
title: Terraform
image: https://developers.cloudflare.com/ai-search/api/namespaces/terraform/og.png?v=21a4609a22c4bc19
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Terraform

Last updated Nov 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai-search/api/namespaces/terraform/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Cloudflare Terraform provider ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) to create, update, import, and read AI Search [namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/) as code. To create instances in a namespace you manage with Terraform, use provider v5.29.0 or later.

## Create a namespace

Use the `cloudflare_ai_search_namespace` resource.

```tf
resource "cloudflare_ai_search_namespace" "support" {
  account_id  = var.account_id
  name        = "support"
  description = "Customer support content"
}
```

### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `account_id` | Yes | Your Cloudflare account ID. |
| `name` | Yes | The namespace name. Use 1 to 28 lowercase letters, digits, and hyphens. The name must start and end with a letter or digit. |
| `description` | No | A description of up to 256 characters. |
| `public_endpoint_params` | No | The namespace public endpoint configuration. Refer to [Namespace public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/namespace/). |

### Attributes

| Attribute | Description |
| --- | --- |
| `id` | The namespace name. Same value as `name`. |
| `created_at` | When the namespace was created, as an RFC 3339 timestamp. |
| `public_endpoint_id` | The identifier of the namespace public endpoint, if one exists. |

### Changes that replace the namespace

Changing `name` or `account_id` replaces the namespace. Terraform deletes the old namespace and creates a new one. Changing `description` or `public_endpoint_params` updates the namespace in place.

A namespace that still contains instances cannot be deleted. Move or delete its instances before you change its name.

## Create a namespace with an instance

Set `namespace` on a `cloudflare_ai_search_instance` to the `name` of the namespace resource. The reference makes Terraform create the namespace before the instance, and destroy the instance before the namespace.

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

AI Search rejects deleting a namespace that still contains instances. If an instance in the namespace is not managed in the same configuration, or does not reference the namespace resource, `terraform destroy` fails until you move or delete that instance.

For more instance options, refer to [Instances with Terraform](https://developers.cloudflare.com/ai-search/api/instances/terraform/).

## Import a namespace

Import an existing namespace with an ID in the format `<account_id>/<name>`:

```sh
terraform import cloudflare_ai_search_namespace.support <account_id>/support
```

You can also use an `import` block:

```tf
import {
  to = cloudflare_ai_search_namespace.support
  id = "${var.account_id}/support"
}
```

## Data sources

### Read one namespace

The `cloudflare_ai_search_namespace` data source reads one namespace. Set either `name` or a `filter` object with `search`, for example `filter = { search = "support" }`.

```tf
data "cloudflare_ai_search_namespace" "support" {
  account_id = var.account_id
  name       = "support"
}
```

### List namespaces

The `cloudflare_ai_search_namespaces` data source lists the namespaces in an account. Use the optional `search` argument to return only namespaces whose name or description contains a string, and `max_items` to limit the number of results. The namespaces are returned in `result`.

```tf
data "cloudflare_ai_search_namespaces" "all" {
  account_id = var.account_id
}
```

## Related resources

- [Instances with Terraform](https://developers.cloudflare.com/ai-search/api/instances/terraform/)
- [Namespaces REST API](https://developers.cloudflare.com/ai-search/api/namespaces/rest-api/)
- [Namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/namespaces/terraform/#page","headline":"Terraform","description":"Manage AI Search namespaces as code with the Cloudflare Terraform provider.","url":"https://developers.cloudflare.com/ai-search/api/namespaces/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-search/api/namespaces/terraform/og.png?v=21a4609a22c4bc19","dateModified":"2026-11-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
