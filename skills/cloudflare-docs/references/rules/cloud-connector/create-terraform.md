---
title: Configure Cloud Connector rules using Terraform
description: Create Cloud Connector rules using the Terraform Cloudflare provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/cloud-connector/create-terraform.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configure Cloud Connector rules using Terraform

You can create Cloud Connector rules using the [Terraform Cloudflare provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest).

To get started with Terraform for Cloudflare configuration, refer to [Get started](https://developers.cloudflare.com/terraform/installing/).

## Required permissions

The [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) used by Terraform must have at least the following permission:

* _Zone_ \> _Cloud Connector_ \> _Write_

## Example configuration

Note

Terraform code snippets below refer to the v4 SDK only.

The following example Terraform configuration creates Cloud Connector rules for various [supported providers](https://developers.cloudflare.com/rules/cloud-connector/providers/) to route traffic between them based on URI paths:

```

resource "cloudflare_cloud_connector_rules" "cloud_connector_rules" {

  zone_id = "<ZONE_ID>"


  rules {

    description = "Route /data to GCP bucket"

    enabled     = true

    expression  = "(http.request.uri.path wildcard \"*/data/*\")"

    provider    = "gcp_storage"

    parameters {

      host = "mystorage.storage.googleapis.com"

    }

  }


  rules {

    description = "Route /resources to AWS bucket"

    enabled     = true

    expression  = "(http.request.uri.path wildcard \"*/resources/*\")"

    provider    = "aws_s3"

    parameters {

      host = "mystorage.s3.ams.amazonaws.com"

    }

  }


  rules {

    description = "Route /files to Azure bucket"

    enabled     = true

    expression  = "(http.request.uri.path wildcard \"*/files/*\")"

    provider    = "azure_storage"

    parameters {

      host = "mystorage.blob.core.windows.net"

    }

  }


  rules {

    description = "Route /images to R2 bucket"

    enabled     = true

    expression  = "(http.request.uri.path wildcard \"*/images/*\")"

    provider    = "cloudflare_r2"

    parameters {

      host = "mybucketcustomdomain.example.com"

    }

  }

}


```

Explain Code

## More resources

Refer to the [Terraform Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) for more information on the `cloudflare_cloud_connector_rules` resource.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/cloud-connector/","name":"Cloud Connector"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/cloud-connector/create-terraform/","name":"Configure Cloud Connector rules using Terraform"}}]}
```
