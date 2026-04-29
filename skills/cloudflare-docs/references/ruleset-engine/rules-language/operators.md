---
title: Operators and grouping symbols
description: Learn about comparison, logical operators, and grouping symbols in Cloudflare's Rules language. Understand precedence and how to structure expressions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Operators and grouping symbols

The Cloudflare Rules language supports comparison and logical operators:

* [Comparison operators](#comparison-operators) specify how values defined in an expression must relate to the actual HTTP request value for the expression to return `true`.
* [Logical operators](#logical-operators) combine two expressions to form a compound expression and use order of precedence to determine how an expression is evaluated.

[Grouping symbols](#grouping-symbols) allow you to organize expressions, enforce precedence, and nest expressions.

## Comparison operators

Comparison operators return `true` when a value from an HTTP request matches a value defined in an expression.

This is the general pattern for using comparison operators:

```

<field> <comparison_operator> <value>


```

The Rules language supports these comparison operators:

| Name                                                  | Operator Notation | Supported Data Types |    |        |                                                                      |                                                             |
| ----------------------------------------------------- | ----------------- | -------------------- | -- | ------ | -------------------------------------------------------------------- | ----------------------------------------------------------- |
| English                                               | C-like            | String1              | IP | Number | Example (operator in bold)                                           |                                                             |
| Equal                                                 | eq                | \==                  | ✅  | ✅      | ✅                                                                    | http.request.uri.path **eq** "/articles/2008/"              |
| Not equal                                             | ne                | !=                   | ✅  | ✅      | ✅                                                                    | ip.src **ne** 203.0.113.0                                   |
| Less than                                             | lt                | <                    | ✅  | ❌      | ✅                                                                    | cf.waf.score **lt** 10                                      |
| Less thanor equal                                     | le                | <=                   | ✅  | ❌      | ✅                                                                    | cf.waf.score **le** 20                                      |
| Greater than                                          | gt                | \>                   | ✅  | ❌      | ✅                                                                    | cf.waf.score **gt** 25                                      |
| Greater thanor equal                                  | ge                | \>=                  | ✅  | ❌      | ✅                                                                    | cf.waf.score **ge** 60                                      |
| Contains                                              | contains          | ✅                    | ❌  | ❌      | http.request.uri.path **contains** "/articles/"                      |                                                             |
| [Wildcard](#wildcard-matching)(case-insensitive)      | wildcard          | ✅                    | ❌  | ❌      | http.request.uri.path **wildcard** "/articles/\*"                    |                                                             |
| [Strict wildcard](#wildcard-matching)(case-sensitive) | strict wildcard   | ✅                    | ❌  | ❌      | http.request.uri.path **strict wildcard** "/AdminTeam/\*"            |                                                             |
| [Matches regex](#regular-expression-matching)2        | matches           | \~                   | ✅  | ❌      | ❌                                                                    | http.request.uri.path **matches** "^/articles/200\[7-8\]/$" |
| Is in set of values / list3                           | in                | ✅                    | ✅  | ✅      | ip.src **in** { 203.0.113.0 203.0.113.1 }ip.src.asnum **in** $<LIST> |                                                             |

1 All string operators are case-sensitive unless explicitly stated as case-insensitive, such as the `wildcard` operator.  
2 Access to the `matches` operator requires a Cloudflare Business or Enterprise plan.  
3 Currently, not all Cloudflare products support lists in their expressions. For more information on lists, refer to [Inline lists](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#inline-lists) and [Lists](https://developers.cloudflare.com/waf/tools/lists/).

Warning

Comparison operators entered using English notation (such as `eq`, `lt`, and `gt`) must be written in lowercase.

### Additional operators in the Cloudflare dashboard

The Cloudflare dashboard may show the following additional operators, depending on the exact field and the type of rule:

* _starts with_ (corresponding to the [starts\_with()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#starts%5Fwith) function): Returns `true` when a string starts with a given substring, and `false` otherwise.
* _ends with_ (corresponding to the [ends\_with()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#ends%5Fwith) function): Returns `true` when a string ends with a given substring, and `false` otherwise.
* _is in list_ (corresponding to `<FIELD> in $<LIST_NAME>`): Returns `true` when the field value is present in the specified [list](https://developers.cloudflare.com/waf/tools/lists/), and `false` otherwise. For more information, refer to [Use lists in expressions](https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/).
* _is not in list_ (corresponding to `not <FIELD> in $<LIST_NAME>`): Returns `true` when the field value is not present in the specified [list](https://developers.cloudflare.com/waf/tools/lists/), and `false` otherwise. For more information, refer to [Use lists in expressions](https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/).

Note

When writing your own custom expressions, you must use the `starts_with()` and `ends_with()` functions in function calls, not as operators. For example:

```

# Valid function call

ends_with(http.request.uri.path, ".html")


# Invalid use of ends_with function

http.request.uri.path ends_with ".html"


```

### Comparing string values

String comparison in rule expressions is case-sensitive. To account for possible variations of string capitalization in an expression, you can use the [lower()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#lower) function and compare the result with a lowercased string, like in the following example:

```

lower(http.request.uri.path) contains "/wp-login.php"


```

[Wildcard matching](#wildcard-matching) is only supported with the `wildcard` and `strict wildcard` operators, and [regular expression matching](#regular-expression-matching) is only supported with the `matches` operator.

### Wildcard matching

The `wildcard` operator performs a case-insensitive match between a field value and a literal string containing zero or more `*` metacharacters. Each `*` metacharacter represents zero or more characters. The `strict wildcard` operator performs a similar match, but is case-sensitive.

When using the `wildcard`/`strict wildcard` operator, the entire field value must match the literal string with wildcards (the literal after the operator).

Example A

```

# The following expression:

http.request.full_uri wildcard "http*://example.com/a/*"


# Would match the following URIs:

# - https://example.com/a/           (the '*' matches zero characters)

# - http://example.com/a/

# - https://example.com/a/page.html

# - https://example.com/a/sub/folder/?name=value


# Would NOT match the following URIs:

# - https://example.com/ab/

# - https://example.com/b/page.html

# - https://sub.example.com/a/


```

Explain Code

Example B

```

# The following expression:

http.request.full_uri wildcard "*.example.com/*/page.html"


# Would match the following URIs:

# - http://sub.example.com/folder/page.html

# - https://admin.example.com/team/page.html

# - https://admin.example.com/team/subteam/page.html


# Would NOT match the following URIs:

# - https://example.com/ab/page.html                   ('*.example.com' matches only subdomains)

# - https://sub.example.com/folder2/page.html?s=value  (http.request.full_uri includes the query string and its full value does not match)

# - https://sub.example.com/a/                         ('page.html' is missing)


```

Explain Code

Slashes (`/`) have no special meaning in wildcard matches. In this example, the second `*` metacharacter in the expression `http.request.full_uri wildcard "*.example.com/*/page.html"` matched `folder`, `team`, and `team/subteam`.

Example C

```

# The following expression:

http.request.full_uri wildcard "*.example.com/*" or http.request.full_uri wildcard "http*://example.com/*"


# Would match the following URIs:

# - https://example.com/folder/list.htm

# - https://admin.example.com/folder/team/app1/

# - https://admin.example.com/folder/team/app1/?s=foobar


```

The matching algorithm used by the `wildcard` operator is case-insensitive. To perform case-sensitive wildcard matching, use the `strict wildcard` operator.

To enter a literal `*` character in a literal string with wildcards you must escape it using `\*`. Additionally, you must also escape `\` using `\\`. Two unescaped `*` characters in a row (`**`) in a wildcard literal string are considered invalid and cannot be used. If you need to perform character escaping, it is recommended that you use the [raw string syntax](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#raw-string-syntax) to specify a literal string with wildcards.

Wildcard matching versus regex matching

The `wildcard`/`strict wildcard` operators always consider the entire field value (left-side operand) when determining if there is a match. The `matches` operator can match a partial value.

### Regular expression matching

Customers on Business and Enterprise plans have access to the `matches` operator. Regular expression matching is performed using the Rust regular expression engine.

If you are using a regular expression, you can test it using a tool like [Regular Expressions 101 ↗](https://regex101.com/?flavor=rust&regex=) or [Rustexp ↗](https://rustexp.lpil.uk/).

For more information on regular expressions, refer to [String values and regular expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#string-values-and-regular-expressions).

## Logical operators

Logical operators combine two or more expressions into a single compound expression. A compound expression has this general syntax:

```

<expression> <logical_operator> <expression>


```

### Supported logical operators

Each logical operator has an [order of precedence](#order-of-precedence). The order of precedence (along with [grouping symbols](#grouping-symbols)) determines the order in which Cloudflare evaluates logical operators in an expression. The `not` operator ranks first in order of precedence.

| Name                      | EnglishNotation | C-likeNotation | Example                                                                        | Order of Precedence |
| ------------------------- | --------------- | -------------- | ------------------------------------------------------------------------------ | ------------------- |
| Logical NOT               | not             | !              | **not** ( http.host eq "www​.cloudflare​.com" and ip.src in {203.0.113.0/24} ) | 1                   |
| Logical AND               | and             | &&             | http.host eq "www​.cloudflare​.com" **and** ip.src in {203.0.113.0/24}         | 2                   |
| Logical XOR(exclusive OR) | xor             | ^^             | http.host eq "www​.cloudflare​.com" **xor** ip.src in {203.0.113.0/24}         | 3                   |
| Logical OR                | or              | \||            | http.host eq "www​.cloudflare​.com" **or** ip.src in 203.0.113.0/24            | 4                   |

Warning

Logical operators entered using English notation (such as `not`, `and`, and `or`) must be written in lowercase.

### Order of precedence

When writing compound expressions, it is important to be aware of the precedence of logical operators so that your expression is evaluated the way you expect.

For example, consider the following generic expression, which uses `and` and `or` operators:

```

Expression1 and Expression2 or Expression3


```

If these operators had no order of precedence, it would not be clear which of two interpretations is correct:

1. Match when Expression 1 and Expression 2 are both true **or** when Expression 3 is true.
2. Match when Expression 1 is true **and** either Expression 2 or Expression 3 is true.

Since the logical `and` operator has precedence over logical `or`, the `and` operator must be evaluated first. Interpretation 1 is correct.

To avoid ambiguity when working with logical operators, use grouping symbols so that the order of evaluation is explicit.

## Grouping symbols

The Rules language supports parentheses (`(`,`)`) as grouping symbols. Grouping symbols allow you to organize expressions, enforce precedence, and nest expressions.

Only the [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) and the [Cloudflare API](https://developers.cloudflare.com/api/) support grouping symbols. The [Expression Builder](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder) does not.

### Group expressions

Use parentheses to explicitly group expressions that should be evaluated together. In this example, the parentheses do not alter the evaluation of the expression, but they unambiguously call out which logical operators to evaluate first.

```

(Expression1 and Expression2) or Expression3


```

Because grouping symbols are so explicit, you are less likely to make errors when you use them to write compound expressions.

### Enforce precedence

Grouping symbols are a powerful tool to enforce precedence for grouped elements of a compound expression. In this example, parentheses force the logical `or` operator to be evaluated before the logical `and`:

```

Expression1 and (Expression2 or Expression3)


```

Without parentheses, the logical `and` operator would take precedence.

### Nest expressions

You can nest expressions grouped by parentheses inside other groups to create very precise, sophisticated expressions, such as this example for a rule designed to block access to a domain:

```

(

 (http.host eq "api.example.com" and http.request.uri.path eq "/api/v2/auth") or

 (http.host matches "^(www|store|blog)\.example\.com" and http.request.uri.path contains "wp-login.php") or

 ip.src.country in {"CN" "TH" "US" "ID" "KR" "MY" "IT" "SG" "GB"} or ip.src.asnum in {12345 54321 11111}

) and not ip.src in {11.22.33.0/24}


```

Note that when evaluating the precedence of logical operators, parentheses inside strings delimited by quotes are ignored, such as those in the following regular expression, drawn from the example above:

```

"^(www|store|blog)\.example\.com"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/operators/","name":"Operators and grouping symbols"}}]}
```
