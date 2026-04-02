---
title: Rate limiting rules configuration using Terraform
description: This page provides examples of creating rate limiting rules in a zone or account using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/terraform/additional-configurations/rate-limiting-rules.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rate limiting rules configuration using Terraform

This page provides examples of creating [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) in a zone or account using Terraform.

If you are using the Cloudflare API, refer to the following resources:

* [Create a rate limiting rule via API](https://developers.cloudflare.com/waf/rate-limiting-rules/create-api/)
* [Create a rate limiting ruleset via API](https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-api/)

Note

For more information on configuring the previous version of rate limiting rules in Terraform, refer to the [cloudflare\_rate\_limit resource ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/rate%5Flimit) in the Terraform documentation.

## Before you start

### Obtain the necessary account or zone IDs

The Terraform configurations provided in this page need the zone ID (or account ID) of the zone/account where you will deploy rulesets.

* To retrieve the list of accounts you have access to, including their IDs, use the [List accounts](https://developers.cloudflare.com/api/resources/accounts/methods/list/) operation.
* To retrieve the list of zones you have access to, including their IDs, use the [List zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation.

### Import or delete existing rulesets

Terraform assumes that it has complete control over account and zone rulesets. If you already have rulesets configured in your account or zone, do one of the following:

* [Import existing rulesets to Terraform](https://developers.cloudflare.com/terraform/advanced-topics/import-cloudflare-resources/) using the `cf-terraforming` tool. Recent versions of the tool can generate resource definitions for existing rulesets and import their configuration to Terraform state.
* Start from scratch by [deleting existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#delete-ruleset) (account and zone rulesets with `"kind": "root"` and `"kind": "zone"`, respectively) and then defining your rulesets configuration in Terraform.

---

## Create a rate limiting rule at the zone level

This example creates a rate limiting rule in zone with ID `<ZONE_ID>` blocking traffic that exceeds the configured rate:

Note

Terraform code snippets below refer to the v4 SDK only.

```

resource "cloudflare_ruleset" "zone_rl" {

  zone_id     = "<ZONE_ID>"

  name        = "Rate limiting for my zone"

  description = ""

  kind        = "zone"

  phase       = "http_ratelimit"


  rules {

    ref         = "rate_limit_api_requests_ip"

    description = "Rate limit API requests by IP"

    expression  = "(http.request.uri.path matches \"^/api/\")"

    action      = "block"

    ratelimit {

      characteristics = ["cf.colo.id", "ip.src"]

      period = 60

      requests_per_period = 100

      mitigation_timeout = 600

    }

  }

}


```

To create another rate limiting rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

  
## Create a rate limiting rule at the account level

Notes

* [Account-level rate limiting configuration](https://developers.cloudflare.com/waf/account/) requires an Enterprise plan with a paid add-on.
* Custom rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"`.

This example defines a [custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) with a single rate limiting rule in account with ID `<ACCOUNT_ID>` that blocks traffic for the `/api/` path exceeding the configured rate. The second `cloudflare_ruleset` resource defines an `execute` rule that deploys the custom ruleset for traffic addressed at `example.com`.

Note

Terraform code snippets below refer to the v4 SDK only.

```

resource "cloudflare_ruleset" "account_rl" {

  account_id  = "<ACCOUNT_ID>"

  name        = "Rate limiting rules for APIs"

  description = ""

  kind        = "custom"

  phase       = "http_ratelimit"


  rules {

    ref         = "rate_limit_api_ip"

    description = "Rate limit API requests by IP"

    expression  = "http.request.uri.path contains \"/api/\""

    action      = "block"

    ratelimit {

      characteristics     = ["cf.colo.id", "ip.src"]

      period              = 60

      requests_per_period = 100

      mitigation_timeout  = 600

    }

  }

}


# Account-level entry point ruleset for the 'http_ratelimit' phase

resource "cloudflare_ruleset" "account_rl_entrypoint" {

  account_id  = <ACCOUNT_ID>

  name        = "Account-level rate limiting"

  description = ""

  kind        = "root"

  phase       = "http_ratelimit"


  depends_on = [cloudflare_ruleset.account_rl]


  rules {

    # Deploy the previously defined custom ruleset containing a rate limiting rule

    ref         = "deploy_rate_limit_example_com"

    description = "Deploy custom ruleset with RL rule"

    expression  = "cf.zone.name eq \"example.com\" and cf.zone.plan eq \"ENT\""

    action      = "execute"

    action_parameters {

      id = cloudflare_ruleset.account_rl.id

    }

  }

}


```

To create another rate limiting rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

  
## Create an advanced rate limiting rule

This example creates a rate limiting rule in zone with ID `<ZONE_ID>` with:

* A custom counting expression that includes a response field (`http.response.code`).
* A custom JSON response for rate limited requests.

Note

Terraform code snippets below refer to the v4 SDK only.

```

resource "cloudflare_ruleset" "zone_rl_custom_response" {

  zone_id     = "<ZONE_ID>"

  name        = "Advanced rate limiting rule for my zone"

  description = ""

  kind        = "zone"

  phase       = "http_ratelimit"


  rules {

    ref         = "rate_limit_example_com_status_404"

    description = "Rate limit requests to www.example.com when exceeding the threshold of 404 responses on /status/"

    expression  = "http.host eq \"www.example.com\" and (http.request.uri.path matches \"^/status/\")"

    action      = "block"

    action_parameters {

      response {

        status_code  = 429

        content      = "{\"response\": \"block\"}"

        content_type = "application/json"

      }

    }

    ratelimit {

      characteristics     = ["ip.src", "cf.colo.id"]

      period              = 10

      requests_per_period = 5

      mitigation_timeout  = 30

      counting_expression = "(http.host eq \"www.example.com\") and (http.request.uri.path matches \"^/status/\") and (http.response.code eq 404)"

    }

  }

}


```

To create another rate limiting rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

  

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/additional-configurations/rate-limiting-rules/","name":"Rate limiting rules configuration using Terraform"}}]}
```
