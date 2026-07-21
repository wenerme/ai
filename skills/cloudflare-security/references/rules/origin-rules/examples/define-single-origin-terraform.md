---
description: Create an origin rule using Terraform to override the `Host` header, the resolved hostname, and the destination port of API requests.
title: Define a single origin rule using Terraform
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Define a single origin rule using Terraform

Create an origin rule using Terraform to override the `Host` header, the resolved hostname, and the destination port of API requests.

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/origin-rules/examples/define-single-origin-terraform/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Note

Terraform code snippets below refer to the v4 SDK only.

The following example defines a single origin rule for a zone using Terraform. The rule overrides the `Host` header, the resolved hostname, and the destination port of API requests.

```tf
# Change origin for API requests
resource "cloudflare_ruleset" "http_origin_example" {
  zone_id     = "<ZONE_ID>"
  name        = "Change origin"
  description = ""
  kind        = "zone"
  phase       = "http_request_origin"

  rules {
	  ref         = "change_api_origin"
    description = "Change origin of API requests"
    expression  = "(http.request.uri.path matches \"^/api/\")"
    action      = "route"
    action_parameters {
      host_header = "example.net"
      origin {
        host = "example.net"
        port = 8000
      }
    }
  }
}
```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

## Additional resources

For additional guidance on using Terraform with Cloudflare, refer to the following resources:

* [Terraform documentation](https://developers.cloudflare.com/terraform/)
* [Cloudflare Provider for Terraform ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) (reference documentation)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/origin-rules/examples/define-single-origin-terraform/#page","headline":"Define a single origin rule using Terraform · Cloudflare Rules docs","description":"Create an origin rule using Terraform to override the Host header, the resolved hostname, and the destination port of API requests.","url":"https://developers.cloudflare.com/rules/origin-rules/examples/define-single-origin-terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform","Headers"]}
```
