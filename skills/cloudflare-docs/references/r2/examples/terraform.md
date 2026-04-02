---
title: Terraform
description: You must generate an Access Key before getting started. All examples will utilize access_key_id and access_key_secret variables which represent the Access Key ID and Secret Access Key values you generated.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/r2/examples/terraform.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Terraform

**Last reviewed:**  over 3 years ago 

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

  
This example shows how to configure R2 with Terraform using the [Cloudflare provider ↗](https://github.com/cloudflare/terraform-provider-cloudflare).

Note for using AWS provider

When using the Cloudflare Terraform provider, you can only manage buckets. To configure items such as CORS and object lifecycles, you will need to use the [AWS Provider](https://developers.cloudflare.com/r2/examples/terraform-aws/).

With [terraform ↗](https://developer.hashicorp.com/terraform/downloads) installed, create `main.tf` and copy the content below replacing with your API Token.

```

terraform {

  required_providers {

    cloudflare = {

      source = "cloudflare/cloudflare"

      version = "~> 4"

    }

  }

}


provider "cloudflare" {

  api_token = "<YOUR_API_TOKEN>"

}


resource "cloudflare_r2_bucket" "cloudflare-bucket" {

  account_id = "<YOUR_ACCOUNT_ID>"

  name       = "my-tf-test-bucket"

  location   = "WEUR"

}


```

You can then use `terraform plan` to view the changes and `terraform apply` to apply changes.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/terraform/","name":"Terraform"}}]}
```
