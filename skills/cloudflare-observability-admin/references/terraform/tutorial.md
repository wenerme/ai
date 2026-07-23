---
description: Step-by-step Cloudflare Terraform tutorials from initialization to advanced configuration.
title: Tutorials
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# Tutorials

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/terraform/tutorial/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Before you begin, [install Terraform](https://developers.cloudflare.com/terraform/installing/). Each tutorial builds on the previous, so you should complete the tutorials in the order shown below.

Note

If you are upgrading from v4, review the [migration guide ↗](https://github.com/cloudflare/terraform-provider-cloudflare/blob/main/docs/guides/version-5-upgrade.md) for breaking changes.

## [1 – Initialize Terraform](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/)

* Brief introduction.
* Introduction of `terraform init`, `plan`, `apply`, and `show`.
* Resource covered: [cloudflare\_dns\_record ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/dns%5Frecord) (DNS record).

## [2 – Track your history](https://developers.cloudflare.com/terraform/tutorial/track-history/)

* Store Cloudflare configuration in source control.

## [3 – Configure HTTPS settings](https://developers.cloudflare.com/terraform/tutorial/configure-https-settings/)

* Modify zone settings.
* Resource covered: [cloudflare\_zone\_setting ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone%5Fsetting).

## [4 – Improve performance and reliability](https://developers.cloudflare.com/terraform/tutorial/use-load-balancing/)

* Add load balancing rules.
* Resources covered:
  * [cloudflare\_load\_balancer ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load%5Fbalancer)
  * [cloudflare\_load\_balancer\_pool ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load%5Fbalancer%5Fpool)
  * [cloudflare\_load\_balancer\_monitor ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load%5Fbalancer%5Fmonitor)

## [5 – Add exceptions with page rules](https://developers.cloudflare.com/terraform/tutorial/add-page-rules/)

* Add page rule.
* Resource covered: [cloudflare\_page\_rule ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/page%5Frule).
* Increase security level for a specific URL: `/expensive-db-call`.
* Add a redirect (URL forward) with a `301` status code from `/old-location.php` to `/expensive-db-call`.

## [6 – Revert configuration](https://developers.cloudflare.com/terraform/tutorial/revert-configuration/)

* Review change history.
* Roll back changes.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/terraform/tutorial/#page","headline":"Tutorials · Cloudflare Terraform docs","description":"Step-by-step Cloudflare Terraform tutorials from initialization to advanced configuration.","url":"https://developers.cloudflare.com/terraform/tutorial/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
