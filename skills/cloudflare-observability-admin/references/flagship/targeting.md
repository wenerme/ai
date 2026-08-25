---
description: Serve different Flagship flag values to different users based on attributes, conditions, and logical grouping.
title: Targeting rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Targeting rules

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/flagship/targeting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Targeting rules let you serve different flag values to different users based on their attributes. Each flag can have zero or more rules.

Rules are evaluated in sequential order, from top to bottom. The first rule whose conditions match is used, and its configured variant is returned. If no rule matches, Flagship returns the flag's default variant.

When a flag is disabled, the default variant is always returned regardless of rules.

Place more specific rules before broader rules. A broad catch-all rule can prevent later rules from running.

## How rules work

A rule consists of:

* **Conditions** — One or more attribute comparisons that must be satisfied. For example, `country equals "US"` or `plan in ["enterprise", "business"]`.
* **Serve variant** — The variant to return when the rule matches.
* **Rollout** (optional) — A percentage-based gradual release. Only the specified percentage of matching users receive the rule's variant. The rest continue to the next rule.

## Condition structure

Each condition compares an attribute from the evaluation context against a value using an operator:

* **Attribute** — The context key to evaluate (for example, `userId`, `country`, `plan`).
* **Operator** — The comparison to perform. Flagship supports [11 operators](https://developers.cloudflare.com/flagship/targeting/operators/).
* **Value** — The value to compare against. Can be a string, number, or array depending on the operator.

If the evaluation context does not include the attribute referenced by a condition, that condition does not match.

## Logical grouping

Conditions within a rule can be grouped with `AND`/`OR` operators and nested up to five levels deep.

For example, to target enterprise users in the US or Canada:

* `AND`:
  * `plan equals "enterprise"`
  * `OR`:
    * `country equals "US"`
    * `country equals "CA"`

Use the smallest set of context attributes necessary to express the rule. This keeps rule behavior easier to reason about and avoids sending unnecessary user data in evaluation context.

## Learn more

* [Operators](https://developers.cloudflare.com/flagship/targeting/operators/)
* [Percentage rollouts](https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/flagship/targeting/#page","headline":"Targeting rules · Cloudflare Flagship docs","description":"Serve different Flagship flag values to different users based on attributes, conditions, and logical grouping.","url":"https://developers.cloudflare.com/flagship/targeting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
