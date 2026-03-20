---
{
    "title": "EVEN",
    "language": "en",
    "description": "Round to next even number by rounding away from zero."
}
---

## Description

Round to next even number by rounding away from zero.

## Syntax

```sql
EVEN(<a>)
```

## Parameters

| Parameter | Description |
| -- | -- |
| `<a>` | A numeric expression to round to the next even integer |

## Return Value

Returns an even integer based on the following rules:

- If x > 0, round up to the closest even number.
- If x < 0, round down to the closest even number.
- If x is already an even number, return it directly.
- If x is NULL, returns NULL.

## Examples

```sql
select even(2.9);
```

```text
+----------+
| even(2.9) |
+----------+
|        4 |
+----------+
```

```sql
select even(-2.9);
```

```text
+-----------+
| even(-2.9) |
+-----------+
|       -4  |
+-----------+
```

```sql
select even(4);
```

```text
+--------+
| even(4) |
+--------+
|      4 |
+--------+
```

```sql
select even(NULL);
```

```text
+------------+
| even(NULL) |
+------------+
|       NULL |
+------------+
```