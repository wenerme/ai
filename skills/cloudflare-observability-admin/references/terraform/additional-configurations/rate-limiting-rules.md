---
description: Create and configure Cloudflare rate limiting rules at the zone or account level using Terraform.
title: Rate limiting rules configuration using Terraform
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate limiting rules configuration using Terraform

Last updated Apr 29, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/terraform/additional-configurations/rate-limiting-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zone WAF Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```tf
resource "cloudflare_ruleset" "zone_rl" {
  zone_id     = var.cloudflare_zone_id
  name        = "Rate limiting for my zone"
  description = ""
  kind        = "zone"
  phase       = "http_ratelimit"

  rules = [{
    ref         = "rate_limit_api_requests_ip"
    description = "Rate limit API requests by IP"
    expression  = "(http.request.uri.path matches \"^/api/\")"
    action      = "block"
    ratelimit = {
      characteristics     = ["cf.colo.id", "ip.src"]
      period              = 60
      requests_per_period = 100
      mitigation_timeout  = 600
    }
  }]
}
```

```tf
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


Use a single ruleset resource per phase

Each zone supports one [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) per phase. Define all your rate limiting rules for a given zone within a single `cloudflare_ruleset` resource with `kind = "zone"` and `phase = "http_ratelimit"`.

## Create a rate limiting rule at the account level

Notes

* [Account-level rate limiting configuration](https://developers.cloudflare.com/waf/account/) requires an Enterprise plan with a paid add-on.
* Custom rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"`.

This example defines a [custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) with a single rate limiting rule in account with ID `<ACCOUNT_ID>` that blocks traffic for the `/api/` path exceeding the configured rate. The second `cloudflare_ruleset` resource defines an `execute` rule that deploys the custom ruleset for traffic addressed at `example.com`.

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Account WAF Write`
* `Account Rulesets Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```tf
resource "cloudflare_ruleset" "account_rl" {
  account_id  = var.cloudflare_account_id
  name        = "Rate limiting rules for APIs"
  description = ""
  kind        = "custom"
  phase       = "http_ratelimit"

  rules = [{
    ref         = "rate_limit_api_ip"
    description = "Rate limit API requests by IP"
    expression  = "http.request.uri.path contains \"/api/\""
    action      = "block"
    ratelimit = {
      characteristics     = ["cf.colo.id", "ip.src"]
      period              = 60
      requests_per_period = 100
      mitigation_timeout  = 600
    }
  }]
}

# Account-level entry point ruleset for the 'http_ratelimit' phase
resource "cloudflare_ruleset" "account_rl_entrypoint" {
  account_id  = var.cloudflare_account_id
  name        = "Account-level rate limiting"
  description = ""
  kind        = "root"
  phase       = "http_ratelimit"

  depends_on = [cloudflare_ruleset.account_rl]

  rules = [{
    # Deploy the previously defined custom ruleset containing a rate limiting rule
    ref         = "deploy_rate_limit_example_com"
    description = "Deploy custom ruleset with RL rule"
    expression  = "cf.zone.name eq \"example.com\" and cf.zone.plan eq \"ENT\""
    action      = "execute"
    action_parameters = {
      id = cloudflare_ruleset.account_rl.id
    }
  }]
}
```

```tf
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
  account_id  = "<ACCOUNT_ID>"
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

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zone WAF Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```tf
resource "cloudflare_ruleset" "zone_rl_custom_response" {
  zone_id     = var.cloudflare_zone_id
  name        = "Advanced rate limiting rule for my zone"
  description = ""
  kind        = "zone"
  phase       = "http_ratelimit"

  rules = [{
    ref         = "rate_limit_example_com_status_404"
    description = "Rate limit requests to www.example.com when exceeding the threshold of 404 responses on /status/"
    expression  = "http.host eq \"www.example.com\" and (http.request.uri.path matches \"^/status/\")"
    action      = "block"
    action_parameters = {
      response = {
        status_code  = 429
        content      = "{\"response\": \"block\"}"
        content_type = "application/json"
      }
    }
    ratelimit = {
      characteristics     = ["ip.src", "cf.colo.id"]
      period              = 10
      requests_per_period = 5
      mitigation_timeout  = 30
      counting_expression = "(http.host eq \"www.example.com\") and (http.request.uri.path matches \"^/status/\") and (http.response.code eq 404)"
    }
  }]
}
```

```tf
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


Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/additional-configurations/rate-limiting-rules/#page","headline":"Rate limiting rules configuration using Terraform · Cloudflare Terraform docs","description":"Create and configure Cloudflare rate limiting rules at the zone or account level using Terraform.","url":"https://developers.cloudflare.com/terraform/additional-configurations/rate-limiting-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
