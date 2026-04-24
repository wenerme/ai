---
title: Expressions
description: Write expressions that match request characteristics for rule evaluation.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/rules-language/expressions/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Expressions

The Rules language supports two kinds of expressions: simple and compound.

## Simple expressions

**Simple expressions** compare a value from an HTTP request to a value defined in the expression. For example, this simple expression matches Microsoft Exchange Autodiscover requests:

```

http.request.uri.path matches "/autodiscover\.(xml|src)$"


```

Simple expressions have the following syntax:

```

<field> <comparison_operator> <value>


```

Where:

* [Fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/) specify properties associated with an HTTP request.
* [Comparison operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) define how values must relate to actual request data for an expression to return `true`.
* [Values](https://developers.cloudflare.com/ruleset-engine/rules-language/values/) represent the data associated with fields. When evaluating a rule, Cloudflare compares these values with the actual data obtained from the request.

## Compound expressions

**Compound expressions** use [logical operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#logical-operators) such as `and` to combine two or more expressions into a single expression.

For example, this expression uses the `and` operator to target requests to `www.example.com` that are not on ports 80 or 443:

```

http.host eq "www.example.com" and not cf.edge.server_port in {80 443}


```

Compound expressions have the following general syntax:

```

<expression> <logical_operator> <expression>


```

Compound expressions allow you to generate sophisticated, highly targeted rules.

## Maximum rule expression length

The maximum length of a rule expression is 4,096 characters.

This limit applies whether you use the visual [Expression Builder](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder) to define your expression, or write the expression manually in the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).

## Additional features

You can also use the following Rules language features in your expressions:

* [Grouping symbols](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#grouping-symbols) allow you to explicitly group expressions that should be evaluated together.
* [Functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/) allow you to manipulate and validate values in expressions.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/expressions/","name":"Expressions"}}]}
```
