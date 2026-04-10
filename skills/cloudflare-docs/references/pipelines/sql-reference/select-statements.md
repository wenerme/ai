---
title: SELECT statements
description: Query syntax for data transformation in Cloudflare Pipelines SQL
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/pipelines/sql-reference/select-statements.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# SELECT statements

SELECT statements are used to transform data in Cloudflare Pipelines. The general form is:

```

[WITH with_query [, ...]]

SELECT select_expr [, ...]

FROM from_item

[WHERE condition]


```

## WITH clause

The WITH clause allows you to define named subqueries that can be referenced in the main query. This can improve query readability by breaking down complex transformations.

Syntax:

```

WITH query_name AS (subquery) [, ...]


```

Simple example:

```

WITH filtered_events AS

    (SELECT user_id, event_type, amount

        FROM user_events WHERE amount > 50)

SELECT user_id, amount * 1.1 as amount_with_tax

FROM filtered_events

WHERE event_type = 'purchase';


```

## SELECT clause

The SELECT clause is a comma-separated list of expressions, with optional aliases. Column names must be unique.

```

SELECT select_expr [, ...]


```

Examples:

```

-- Select specific columns

SELECT user_id, event_type, amount FROM events


-- Use expressions and aliases

SELECT

    user_id,

    amount * 1.1 as amount_with_tax,

    UPPER(event_type) as event_type_upper

FROM events


-- Select all columns

SELECT * FROM events


```

Explain Code

## FROM clause

The FROM clause specifies the data source for the query. It will be either a table name or subquery. The table name can be either a stream name or a table created in the WITH clause.

```

FROM from_item


```

Tables can be given aliases:

```

SELECT e.user_id, e.amount

FROM user_events e

WHERE e.event_type = 'purchase'


```

## WHERE clause

The WHERE clause filters data using boolean conditions. Predicates are applied to input rows.

```

WHERE condition


```

Examples:

```

-- Filter by field value

SELECT * FROM events WHERE event_type = 'purchase'


-- Multiple conditions

SELECT * FROM events

WHERE event_type = 'purchase' AND amount > 50


-- String operations

SELECT * FROM events

WHERE user_id LIKE 'user_%'


-- Null checks

SELECT * FROM events

WHERE description IS NOT NULL


```

Explain Code

## UNNEST operator

The UNNEST operator converts arrays into multiple rows. This is useful for processing list data types.

UNNEST restrictions:

* May only appear in the SELECT clause
* Only one array may be unnested per SELECT statement

Example:

```

SELECT

    UNNEST([1, 2, 3]) as numbers

FROM events;


```

This will produce:

```

+---------+

| numbers |

+---------+

|       1 |

|       2 |

|       3 |

+---------+


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/sql-reference/select-statements/","name":"SELECT statements"}}]}
```
