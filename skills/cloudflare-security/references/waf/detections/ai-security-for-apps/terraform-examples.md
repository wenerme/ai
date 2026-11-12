---
description: Configure AI Security for Apps using Terraform.
title: Terraform configuration examples
image: https://developers.cloudflare.com/waf/detections/ai-security-for-apps/terraform-examples/og.png?v=0a6682a5c188692b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Terraform configuration examples

Last updated Nov 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/terraform-examples/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The following Terraform configuration examples address common scenarios for managing, configuring, and using AI Security for Apps.

For more information, refer to the [Terraform Cloudflare provider documentation ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

If you are using the Cloudflare API, refer to [Get started](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/get-started/).

## Enable AI Security for Apps

Use the [`cloudflare_ai_security` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ai_security) resource to turn on AI Security for Apps for a zone. This resource requires Terraform Cloudflare provider version 5.29.0 or later. For example:

```tf
resource "cloudflare_ai_security" "zone_ai_security" {
  zone_id = var.cloudflare_zone_id
  enabled = true
}
```

AI Security for Apps only scans requests to endpoints with the `cf-llm` label. For more information, refer to [Add `cf-llm` label to endpoint](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/get-started/#3-add-cf-llm-label-to-endpoint).

## Define custom topics

Use the [`cloudflare_ai_security_custom_topics` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ai_security_custom_topics) resource to define the custom topics for a zone. This resource requires Terraform Cloudflare provider version 5.29.0 or later. For example:

```tf
resource "cloudflare_ai_security_custom_topics" "zone_custom_topics" {
  zone_id = var.cloudflare_zone_id

  topics = [
    {
      label = "competitors"
      topic = "seeking info on competitors"
    },
    {
      label = "financial-advice"
      topic = "seeking financial advice"
    },
    {
      label = "job-seeking"
      topic = "asking for résumé advice"
    }
  ]
}
```

Caution

This resource manages the entire custom topics list for the zone. When you apply the configuration, Terraform replaces any topics added outside Terraform, such as in the dashboard.

For more information, refer to [Custom topics](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/#custom-topics).

## Add custom rules to block harmful prompts

This example adds two [custom rules](https://developers.cloudflare.com/waf/custom-rules/) that use [AI Security for Apps fields](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/) in their expressions:

- The first rule blocks requests where Cloudflare detected personally identifiable information (PII) in the LLM prompt, using the [`cf.llm.prompt.pii_detected`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_detected/) field. The rule returns a custom JSON response.
- The second rule blocks requests where the LLM prompt is highly relevant to the `competitors` custom topic, using the [`cf.llm.prompt.custom_topic_categories`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom_topic_categories/) field. The label in the expression must match a label in your [custom topics](#define-custom-topics) list.

To use these fields you must [enable AI Security for Apps](#enable-ai-security-for-apps).

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Zone WAF Write</code>

</details>

Configure the [`cloudflare_ruleset` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```tf
resource "cloudflare_ruleset" "zone_custom_firewall_ai_security" {
  zone_id     = var.cloudflare_zone_id
  name        = "Phase entry point ruleset for custom rules in my zone"
  description = ""
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules = [
    {
      ref         = "block_llm_prompts_with_pii"
      description = "Block LLM prompts containing PII"
      expression  = "(cf.llm.prompt.pii_detected)"
      action      = "block"
      action_parameters = {
        response = {
          status_code  = 403
          content      = "{\"error\": \"Your request was blocked. Please rephrase your request.\"}"
          content_type = "application/json"
        }
      }
    },
    {
      ref         = "block_llm_prompts_about_competitors"
      description = "Block LLM prompts about competitors"
      expression  = "(cf.llm.prompt.custom_topic_categories[\"competitors\"] lt 20)"
      action      = "block"
    }
  ]
}
```

A zone has a single entry point ruleset for custom rules. If you already manage this ruleset with Terraform, add the rules to the existing `cloudflare_ruleset` resource instead of creating a new one.

For more rule examples, refer to [Example mitigation rules](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/example-rules/).

## More resources

For additional Terraform configuration examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/terraform-examples/#page","headline":"Terraform configuration examples","description":"Configure AI Security for Apps using Terraform.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/terraform-examples/","inLanguage":"en","image":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/terraform-examples/og.png?v=0a6682a5c188692b","dateModified":"2026-11-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Terraform"]}
```
