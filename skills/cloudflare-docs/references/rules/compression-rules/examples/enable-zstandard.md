---
title: Enable Zstandard compression for default content types
description: Create a compression rule to turn on Zstandard compression for response content types where Cloudflare applies compression by default.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Zstandard compression for default content types

Create a compression rule to turn on Zstandard compression for response content types where Cloudflare applies compression by default.

* [ Dashboard ](#tab-panel-7333)
* [ API ](#tab-panel-7334)

The following example rule will turn on Zstandard compression for response content types where [Cloudflare applies compression by default](https://developers.cloudflare.com/speed/optimization/content/compression/). If the client does not support Zstandard compression, it will use Brotli or Gzip compression as a fallback.

**When incoming requests match**

* Custom filter expression:  
   * _Media Type_ _is in_ `text/html, text/richtext, text/plain, text/css, text/x-script, text/x-component, text/x-java-source, text/x-markdown, application/javascript, application/x-javascript, text/javascript, text/js, image/x-icon, image/vnd.microsoft.icon, application/x-perl, application/x-httpd-cgi, text/xml, application/xml, application/rss+xml, application/vnd.api+json, application/x-protobuf, application/json, multipart/bag, multipart/mixed, application/xhtml+xml, font/ttf, font/otf, font/x-woff, image/svg+xml, application/vnd.ms-fontobject, application/ttf, application/x-ttf, application/otf, application/x-otf, application/truetype, application/opentype, application/x-opentype, application/font-woff, application/eot, application/font, application/font-sfnt, application/wasm, application/javascript-binast, application/manifest+json, application/ld+json, application/graphql+json, application/geo+json`

**Then**

* **Compression options**: Custom
* **Define a custom order for compression types**: `Zstandard`, `Brotli`, `Gzip`

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

            "ref": "use_zstd_compression",

            "expression": "(http.response.content_type.media_type in {\"text/html\" \"text/richtext\" \"text/plain\" \"text/css\" \"text/x-script\" \"text/x-component\" \"text/x-java-source\" \"text/x-markdown\" \"application/javascript\" \"application/x-javascript\" \"text/javascript\" \"text/js\" \"image/x-icon\" \"image/vnd.microsoft.icon\" \"application/x-perl\" \"application/x-httpd-cgi\" \"text/xml\" \"application/xml\" \"application/rss+xml\" \"application/vnd.api+json\" \"application/x-protobuf\" \"application/json\" \"multipart/bag\" \"multipart/mixed\" \"application/xhtml+xml\" \"font/ttf\" \"font/otf\" \"font/x-woff\" \"image/svg+xml\" \"application/vnd.ms-fontobject\" \"application/ttf\" \"application/x-ttf\" \"application/otf\" \"application/x-otf\" \"application/truetype\" \"application/opentype\" \"application/x-opentype\" \"application/font-woff\" \"application/eot\" \"application/font\" \"application/font-sfnt\" \"application/wasm\" \"application/javascript-binast\" \"application/manifest+json\" \"application/ld+json\" \"application/graphql+json\" \"application/geo+json\"})",

            "action": "compress_response",

            "action_parameters": {

                "algorithms": [

                    {

                        "name": "zstd"

                    },

                    {

                        "name": "brotli"

                    },

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/compression-rules/","name":"Compression Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/compression-rules/examples/","name":"Compression Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/compression-rules/examples/enable-zstandard/","name":"Enable Zstandard compression for default content types"}}]}
```
