---
title: Mathematical functions
description: Mathematical SQL functions for Analytics Engine.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/analytics/analytics-engine/sql-reference/mathematical-functions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Mathematical functions

## intDiv

Usage:

```

intDiv(a, b)


```

Divide `a` by `b`, rounding the answer down to the nearest whole number.

## log New

Usage:

```

log(<expression>)


```

`log` returns the natural logarithm of a provided number. `ln` is also available as an alias.

Examples:

```

-- get the natural logarithm of the double1 column

log(double1)


```

## pow New

Usage:

```

pow(<expression>, <expression>)


```

`pow` returns the first argument raised to the power of the second argument.

Examples:

```

-- get the square of the double1 column

pow(double1, 2)


```

## round New

Usage:

```

round(<expression>[, n])


```

`round` returns a number rounded to the nearest whole number, or to a given number of decimal points specified by the second argument.

Examples:

```

-- round 5.5 to 6

round(5.5)

-- round 3.14 to 3.1

round(3.14, 1)


```

## floor New

Usage:

```

floor(<expression>[, n])


```

`floor` returns a number rounded down to a whole number, or rounded down to a given number of decimal points specified by the second argument.

Examples:

```

-- round down 5.5 to 5

floor(5.5)

-- round down 3.14 to 3.1

floor(3.14, 1)


```

## ceil New

Usage:

```

ceil(<expression>[, n])


```

`ceil` returns a number rounded up to a whole number, or rounded up to a given number of decimal points specified by the second argument.

Examples:

```

-- round up 5.5 to 6

ceil(5.5)

-- round up 3.14 to 3.2

ceil(3.14, 1)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/sql-reference/","name":"SQL Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/analytics-engine/sql-reference/mathematical-functions/","name":"Mathematical functions"}}]}
```
