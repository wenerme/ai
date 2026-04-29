---
title: Route /images to an S3 Bucket using Terraform
description: Route requests with a URI path starting with `/images` to a specific AWS S3 bucket with Cloud Connector using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Route /images to an S3 Bucket using Terraform

Route requests with a URI path starting with `/images` to a specific AWS S3 bucket with Cloud Connector using Terraform.

Note

Terraform code snippets below refer to the v4 SDK only.

The following example defines a single Cloud Connector rule for a zone using Terraform. The rule routes requests to `/images` on your domain to an AWS S3 bucket.

```

resource "cloudflare_cloud_connector_rules" "serve_images_in_aws" {

  zone_id = "<ZONE_ID>"

  rules {

    description = "Route images to AWS S3 bucket"

    enabled     = true

    expression  = "http.request.full_uri wildcard \"https://<YOUR_HOSTNAME>/images/*\""

    provider    = "aws_s3"

    parameters {

      host = "<BUCKET_NAME>.s3.amazonaws.com"

    }

  }

}


```

Explain Code

## Additional resources

For additional guidance on using Terraform with Cloudflare, refer to the following resources:

* [Terraform documentation](https://developers.cloudflare.com/terraform/)
* [Cloudflare Provider for Terraform ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) (reference documentation)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/cloud-connector/","name":"Cloud Connector"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/cloud-connector/examples/","name":"Cloud Connector examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/cloud-connector/examples/route-images-to-aws-s3-using-terraform/","name":"Route /images to an S3 Bucket using Terraform"}}]}
```
