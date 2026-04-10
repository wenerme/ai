---
title: Terraform example
description: The following example defines a single Cache Response Rule for a zone using Terraform. The rule strips Set-Cookie and ETag headers from JavaScript file responses before caching.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cache/how-to/cache-response-rules/terraform-example.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Terraform example

The following example defines a single Cache Response Rule for a zone using Terraform. The rule strips Set-Cookie and ETag headers from JavaScript file responses before caching.

Terraform `cloudflare_ruleset` resource

```

# Cache Response Rule to strip headers from JS responses

resource "cloudflare_ruleset" "cache_response_rules_example" {

  zone_id     = "<ZONE_ID>"

  name        = "Cache Response Rules"

  description = "Configure cache settings for origin responses"

  kind        = "zone"

  phase       = "http_response_cache_settings"


  rules {

    ref         = "strip_js_headers"

    description = "Strip caching headers from JS file responses"

    expression  = "http.request.uri.path.extension eq \"js\""

    action      = "set_cache_settings"

    action_parameters {

      strip_etags      = true

      strip_set_cookie = true

    }

  }


  rules {

    ref         = "tag_api_responses"

    description = "Tag API responses for targeted purging"

    expression  = "starts_with(http.request.uri.path, \"/api/\")"

    action      = "set_cache_tags"

    action_parameters {

      operation = "set"

      values    = ["api-response", "dynamic-content"]

    }

  }


  rules {

    ref         = "cache_control_200"

    description = "Set cache-control for successful responses"

    expression  = "http.response.code eq 200"

    action      = "set_cache_control"

    action_parameters {

      s_maxage {

        operation      = "set"

        value          = 86400

        cloudflare_only = true

      }

      must_revalidate {

        operation = "set"

      }

    }

  }

}


```

Explain Code

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

For additional guidance on using Terraform with Cloudflare, refer to [Terraform](https://developers.cloudflare.com/terraform/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-response-rules/","name":"Cache Response Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-response-rules/terraform-example/","name":"Terraform example"}}]}
```
