---
description: Expression syntax for custom load balancing rules.
title: Expressions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Expressions

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Load Balancing rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/) use two kinds of expressions:

* [Simple expressions](#simple-expressions) compare a value from an HTTP request to a value defined in the expression. A simple expression is identified by the presence of a **comparison operator** (_equals_ or _less than_, for example).
* [Compound expressions](#compound-expressions) combine two or more simple expressions into a single expression. Compound expression contains a **logical operator** (_and_, _or_, for example). With compound expressions you can tailor rules to specific use cases with a high degree of accuracy and precision.

---

## Simple expressions

Simple expressions are composed of three elements:

1. A **field** that represents a property of an HTTP request.
2. A representative **value** for that field which Cloudflare compares to the actual request value.
3. A **comparison operator**, which specifies how the value defined in the expression must relate to the actual value from the request for the operator to return `true`.

When the comparison operator returns `true`, the request matches the expression.

This example expression returns true when a request URI path contains `/content`:

```sql
(http.request.uri.path contains "/content")
```

In general, simple expressions use this pattern:

```sql
<field> <operator> <value>
```

For more details, refer to [Supported fields and operators](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/).

---

## Compound expressions

A compound expression uses a **logical operator** (_and_, _or_, for example) to combine two or more expressions. Compound expressions allow you to build complex statements within a single expression.

The example expression below returns true when both the HTTP request URI path contains `/content` and the query string contains `webserver`:

```sql
(http.request.uri.path contains "/content")
and (http.request.uri.query contains "webserver")
```

In general, compound expressions use this pattern:

```sql
<expression> <logical operator> <expression>
```

A compound expression can be an operand of a logical operator. This allows multiple operators to construct a compound expression from many individual expressions.

For more details, refer to [Supported fields and operators](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/).

---

## Working with expressions

The Expression Builder’s visual interface allows you to build expressions without worrying about field names and syntax.

By comparison, the Expression Editor is text only, but it supports advanced features not available in the builder.

### Expression Builder

Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface, and the Expression Preview is a great reference for learning to write more advanced expressions.

This Expression Builder screenshot shows the example compound expression described earlier. Compound expressions are easier to scan when displayed in the Expression Builder’s visual interface.

![Example rule configuration visible in the Expression Builder](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=820,height=476,format=webp/_astro/rules-builder-1.CBdNVOoP.png)

The **Expression Preview** displays the expression in text:

```sql
(http.request.uri.path contains "/content")
and (http.request.uri.query contains "webserver")
```

For a walkthrough, refer to [Creating Load Balancing rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/create-rules/).

### Expression Editor

The Expression Editor is a text-only interface for creating Load Balancing expressions. Although it lacks the visual simplicity of the Expression Builder, the Expression Editor supports advanced features such as support for grouping symbols (parentheses).

To access the Expression Editor in the **Traffic** app, click **Edit expression** in the **Create Custom Rule** dialog.

To return to the builder, click **Use expression builder**.

### Rules lists

Load Balancing Custom Rules does not support IP list operators.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#page","headline":"Load Balancing expressions · Cloudflare Load Balancing docs","description":"Expression syntax for custom load balancing rules.","url":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
