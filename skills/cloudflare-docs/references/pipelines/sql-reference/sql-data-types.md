---
title: SQL data types
description: Supported data types in Cloudflare Pipelines SQL
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/pipelines/sql-reference/sql-data-types.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# SQL data types

Cloudflare Pipelines supports a set of primitive and composite data types for SQL transformations. These types can be used in stream schemas and SQL literals with automatic type inference.

## Primitive types

| Pipelines | SQL Types                   | Example Literals                                 |
| --------- | --------------------------- | ------------------------------------------------ |
| bool      | BOOLEAN                     | TRUE, FALSE                                      |
| int32     | INT, INTEGER                | 0, 1, \-2                                        |
| int64     | BIGINT                      | 0, 1, \-2                                        |
| float32   | FLOAT, REAL                 | 0.0, \-2.4, 1E-3                                 |
| float64   | DOUBLE                      | 0.0, \-2.4, 1E-35                                |
| string    | VARCHAR, CHAR, TEXT, STRING | "hello", "world"                                 |
| timestamp | TIMESTAMP                   | '2020-01-01', '2023-05-17T22:16:00.648662+00:00' |
| binary    | BYTEA                       | X'A123' (hex)                                    |
| json      | JSON                        | '{"event": "purchase", "amount": 29.99}'         |

## Composite types

In addition to primitive types, Pipelines SQL supports composite types for more complex data structures.

### List types

Lists group together zero or more elements of the same type. In stream schemas, lists are declared using the `list` type with an `items` field specifying the element type. In SQL, lists correspond to arrays and are declared by suffixing another type with `[]`, for example `INT[]`.

List values can be indexed using 1-indexed subscript notation (`v[1]` is the first element of `v`).

Lists can be constructed via `[]` literals:

```

SELECT [1, 2, 3] as numbers


```

Pipelines provides array functions for manipulating list values, and lists may be unnested using the `UNNEST` operator.

### Struct types

Structs combine related fields into a single value. In stream schemas, structs are declared using the `struct` type with a `fields` array. In SQL, structs can be created using the `struct` function.

Example creating a struct in SQL:

```

SELECT struct('user123', 'purchase', 29.99) as event_data FROM events


```

This creates a struct with fields `c0`, `c1`, `c2` containing the user ID, event type, and amount.

Struct fields can be accessed via `.` notation, for example `event_data.c0` for the user ID.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/sql-data-types/","name":"SQL data types"}}]}
```
