---
title: Disable compression for AVIF images
description: Create a compression rule to turn off compression for AVIF images, based on either the content type or the file extension specified in the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/compression-rules/examples/disable-compression-avif.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Disable compression for AVIF images

Create a compression rule to turn off compression for AVIF images, based on either the content type or the file extension specified in the request.

* [ Dashboard ](#tab-panel-5987)
* [ API ](#tab-panel-5988)

The following example rule will disable compression for AVIF images, based on either the content type or the file extension specified in the request.

**When incoming requests match**

* Custom filter expression:  
   * _Media Type_ _equals_ `image/avif` **OR**  
   * _File extension_ _equals_ `avif`

**Then**

* **Compression options** \> _Disable compression_

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

            "ref": "disable_compression_for_avif",

            "expression": "http.response.content_type.media_type eq \"image/avif\" or http.request.uri.path.extension eq \"avif\"",

            "action": "compress_response",

            "action_parameters": {

                "algorithms": [

                    {

                        "name": "none"

                    }

                ]

            }

        }

    ]

  }'


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/compression-rules/","name":"Compression Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/compression-rules/examples/","name":"Compression Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/compression-rules/examples/disable-compression-avif/","name":"Disable compression for AVIF images"}}]}
```
