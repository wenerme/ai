---
title: Create a redirect rule using Terraform
description: Create Single Redirect rules using the Terraform Cloudflare provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/single-redirects/terraform-example.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a redirect rule using Terraform

Note

Terraform code snippets below refer to the v4 SDK only.

The following example defines a single redirect rule for a zone using Terraform. The rule creates a static URL redirect for visitors requesting the contacts page using an old URL.

```

# Single Redirects resource

resource "cloudflare_ruleset" "single_redirects_example" {

  zone_id     = "<ZONE_ID>"

  name        = "redirects"

  description = "Redirects ruleset"

  kind        = "zone"

  phase       = "http_request_dynamic_redirect"


  rules {

    ref         = "redirect_old_url"

    description = "Redirect visitors still using old URL"

    expression  = "(http.request.uri.path matches \"^/contact-us/\")"

    action      = "redirect"

    action_parameters {

      from_value {

        status_code = 301

        target_url {

          value = "/contacts/"

        }

        preserve_query_string = false

      }

    }

  }

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

## Additional resources

For additional guidance on using Terraform with Cloudflare, refer to the following resources:

* [Terraform documentation](https://developers.cloudflare.com/terraform/)
* [Cloudflare Provider for Terraform ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) (reference documentation)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/single-redirects/","name":"Single Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/single-redirects/terraform-example/","name":"Create a redirect rule using Terraform"}}]}
```
