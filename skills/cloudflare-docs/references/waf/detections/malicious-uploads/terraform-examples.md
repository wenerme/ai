---
title: Terraform configuration examples
description: The following Terraform configuration examples address common scenarios for managing, configuring, and using WAF content scanning.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/detections/malicious-uploads/terraform-examples.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Terraform configuration examples

The following Terraform configuration examples address common scenarios for managing, configuring, and using WAF content scanning.

For more information, refer to the [Terraform Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

If you are using the Cloudflare API, refer to [Common API calls](https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/).

## Enable WAF content scanning

Use the `cloudflare_content_scanning` resource to enable content scanning for a zone. For example:

```

resource "cloudflare_content_scanning" "zone_content_scanning_example" {

  zone_id = "<ZONE_ID>"

  enabled = true

}


```

## Configure a custom scan expression

Use the `cloudflare_content_scanning_expression` resource to add a custom scan expression. For example:

```

resource "cloudflare_content_scanning_expression" "my_custom_scan_expression" {

  zone_id = <ZONE_ID>

  payload = "lookup_json_string(http.request.body.raw, \"file\")"

}


```

For more information, refer to [Custom scan expressions](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions).

## Add a custom rule to block malicious uploads

This example adds a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) that blocks requests with one or more content objects considered malicious by using one of the [content scanning fields](https://developers.cloudflare.com/waf/detections/malicious-uploads/#content-scanning-fields) in the rule expression.

To use the [cf.waf.content\_scan.has\_malicious\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Fmalicious%5Fobj/) field you must [enable content scanning](#enable-waf-content-scanning).

Note

Terraform code snippets below refer to the v4 SDK only.

```

resource "cloudflare_ruleset" "zone_custom_firewall_malicious_uploads" {

  zone_id     = "<ZONE_ID>"

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules {

    ref         = "block_malicious_uploads"

    description = "Block requests uploading malicious content objects"

    expression  = "(cf.waf.content_scan.has_malicious_obj and http.request.uri.path eq \"/upload.php\")"

    action      = "block"

  }

}


```

Explain Code

## More resources

For additional Terraform configuration examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/malicious-uploads/","name":"Malicious uploads detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/malicious-uploads/terraform-examples/","name":"Terraform configuration examples"}}]}
```
