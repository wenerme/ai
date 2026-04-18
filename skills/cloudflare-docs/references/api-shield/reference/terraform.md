---
title: Terraform
description: Configure API Shield resources with Terraform, including endpoints and schemas.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/reference/terraform.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Terraform

Get started with API Shield using Terraform from the examples below. For more information on how to use Terraform with Cloudflare, refer to the [Terraform documentation](https://developers.cloudflare.com/terraform/).

The following resources are available to configure through Terraform:

**Session identifiers**

* [api\_shield ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Fshield) for configuring session identifiers in API Shield.

**Endpoint Management**

* [api\_shield\_operation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Fshield%5Foperation) for configuring endpoints in Endpoint Management.

**Schema validation**

* [cloudflare\_schema\_validation\_schemas ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/schema%5Fvalidation%5Fschemas) for configuring a schema in [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).~~[api\_shield\_schema ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Fshield%5Fschema)~~ has been deprecated and will be removed in a future version of the terraform provider.
* [cloudflare\_schema\_validation\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/schema%5Fvalidation%5Fsettings) for configuring zone-level Schema validation settings.~~[api\_shield\_schema\_validation\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Fshield%5Fschema%5Fvalidation%5Fsettings)~~ has been deprecated and will be removed in a future version of the terraform provider.
* [cloudflare\_schema\_validation\_operation\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/schema%5Fvalidation%5Foperation%5Fsettings) for configuring operation-level Schema validation settings.~~[api\_shield\_operation\_schema\_validation\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Fshield%5Foperation%5Fschema%5Fvalidation%5Fsettings)~~ has been deprecated and will be removed in a future version of the terraform provider.

**JWT Validation**

* [cloudflare\_token\_validation\_config ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/token%5Fvalidation%5Fconfig) for setting up JWT validation with specific keying material and token locations.
* [cloudflare\_token\_validation\_rules ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/token%5Fvalidation%5Frules) for setting up rules to action on the validation result.

## Manage API Shield session identifiers

Refer to the example configuration below to set up [session identifiers](https://developers.cloudflare.com/api-shield/get-started/#to-set-up-session-identifiers) on your zone.

Example configuration

```

resource "cloudflare_api_shield" "session_identifiers" {

  zone_id = var.zone_id

  auth_id_characteristics = [{

    name = "authorization"

    type = "header"

  }]

}


```

## Manage API Shield Endpoint Management

Refer to the example configuration below to [manage endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/) on your zone.

Example configuration

```

resource "cloudflare_api_shield_operation" "get_image" {

  zone_id  = var.zone_id

  method   = "GET"

  host     = "example.com"

  endpoint = "/api/images/{var1}"

}


resource "cloudflare_api_shield_operation" "post_image" {

  zone_id  = var.zone_id

  method   = "POST"

  host     = "example.com"

  endpoint = "/api/images/{var1}"

}


```

Explain Code

## Manage Schema validation

Note

It is required to configure Endpoint Management if you want to set up Schema validation using Terraform.

Refer to the example configuration below to manage [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/api/) on your zone.

Example configuration

```

# Schema that should be used for Schema validation

resource "cloudflare_schema_validation_schemas" "example_schema" {

  zone_id            = var.zone_id

  kind               = "openapi_v3"

  name               = "example-schema.yaml"

  # In this example, we assume that the `example-schema.yaml` includes `get_image` and `post_image` operations from above

  source             = file("./schemas/example-schema.yaml")

  validation_enabled = true

}


# Block all requests that violate schema by default

resource "cloudflare_schema_validation_settings" "zone_level_settings" {

  zone_id                              = var.zone_id

  validation_default_mitigation_action = "block"

}


# For endpoint post_image - only log requests that violate schema

resource "cloudflare_schema_validation_operation_settings" "post_image_log_only" {

  zone_id           = var.zone_id

  operation_id      = cloudflare_api_shield_operation.post_image.id

  mitigation_action = "log"

}


```

Explain Code

## Validate JWTs

Refer to the example configuration below to perform [JWT Validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) on your zone.

Example configuration

```

# Setting up JWT validation with specific keying material and location of the token

resource "cloudflare_token_validation_config" "example_es256_config" {

  zone_id       = var.zone_id

  token_type    = "JWT"

  title         = "ES256 Example"

  description   = "An example configuration that validates ES256 JWTs with `b0078548-c9bc-46e5-a678-06fb72443427` key ID in the authorization header"

  token_sources = ["http.request.headers[\"authorization\"][0]"]

  credentials   = {

    keys = [

      {

        alg = "ES256"

        kid = "b0078548-c9bc-46e5-a678-06fb72443427"

        kty = "EC"

        crv = "P-256"

        x   = "yl_BZSxUG5II7kJCMxDfWImiU6zkcJcBYaTgzV3Jgnk"

        y   = "0qAzLQe_YGEdotb54qWq00k74QdiTOiWnuw_YzuIqr0"

      }

    ]

  }

}


# Setting up JWT rules for all configured endpoints on `example.com` except for `get_image`

resource "cloudflare_token_validation_rules" "example_com" {

 zone_id      = var.zone_id

 title        = "Validate JWTs on example.com"

 description  = "This actions JWT validation results for requests to example.com except for the get_image endpoint"

 action       = "block"

 enabled      = true

 # Require that the JWT described through the example_es256_config is valid.

 # Reference the ID of the generated token config, this constructs: is_jwt_valid("<id>")

 # If the expression is >not true<, Cloudflare will perform the configured action on the request

 expression   = format("(is_jwt_valid(%q))", cloudflare_token_validation_config.example_es256_config.id)

 selector     = {

    # all current and future operations matching this include selector will perform the described action when the expression fails to match

    include = [

      {

        host          = ["example.com"]

      }

    ]

    exclude = [

      {

        # reference the ID of the get_image operation to exclude it

        operation_ids = ["${cloudflare_api_shield_operation.get_image.id}"]

      }

    ]

 }

}


# With JWT validation, we can also refine session identifiers to use claims from the JWT

resource "cloudflare_api_shield" "session_identifiers" {

  zone_id = var.zone_id

  auth_id_characteristics = [{

    # select the JWT's `sub` claim as an extremely stable session identifier

    # this is "<token_config_id:json_path>" format

    name = "${cloudflare_token_validation_config.example_es256_config.id}:$.sub"

    type = "jwt"

  }]

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/reference/terraform/","name":"Terraform"}}]}
```
