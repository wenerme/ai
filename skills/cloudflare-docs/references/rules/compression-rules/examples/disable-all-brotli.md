---
title: Disable Brotli compression
description: Create a compression rule to turn off Brotli compression for all incoming requests of a given zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Disable Brotli compression

Create a compression rule to turn off Brotli compression for all incoming requests of a given zone.

* [ Dashboard ](#tab-panel-7329)
* [ API ](#tab-panel-7330)

The following example rule will disable Brotli compression for all incoming requests of a given zone. The only available compression algorithm will be Gzip.

**When incoming requests match**

* All incoming requests

**Then**

* **Compression options**: Custom
* **Define a custom order for compression types**: `Gzip`

If the client does not support Gzip compression, the response will be uncompressed.

The following example sets the rules of an existing [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) (with ID `{ruleset_id}`) for the `http_response_compression` phase to a single compression rule, using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Response Compression Write`
* `Config Settings Write`
* `Dynamic URL Redirects Write`
* `Cache Settings Write`
* `Custom Errors Write`
* `Origin Write`
* `Managed headers Write`
* `Zone Transform Rules Write`
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Write`
* `Sanitize Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Bot Management Write`
* `Zone WAF Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Write`

Update a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "ref": "always_use_gzip",

            "expression": "true",

            "action": "compress_response",

            "action_parameters": {

                "algorithms": [

                    {

                        "name": "gzip"

                    }

                ]

            }

        }

    ]

  }'


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/compression-rules/","name":"Compression Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/compression-rules/examples/","name":"Compression Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/compression-rules/examples/disable-all-brotli/","name":"Disable Brotli compression"}}]}
```
