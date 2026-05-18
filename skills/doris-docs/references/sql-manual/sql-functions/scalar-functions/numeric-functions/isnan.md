---
{
    "title": "ISNAN",
    "language": "en",
    "description": "Determines whether the specified value is NaN (Not a Number)."
}
---

## Description

Determines whether the specified value is NaN (Not a Number).

## Syntax

```sql
ISNAN(<value>)
```

## Parameters

| Parameter | Description |
| -- | -- |
| `<value>` | The value to be checked, which must be a DOUBLE or FLOAT type |

## Return Value

Returns 1 if the value is NaN, otherwise returns 0.
If the value is NULL, returns NULL.

## Examples

```sql
SELECT isnan(1);
```

```text
+----------+
| isnan(1) |
+----------+
|        0 |
+----------+
```

```sql
SELECT cast('nan' as double),isnan(cast('nan' as double));
```

```text
+-----------------------+------------------------------+
| cast('nan' as double) | isnan(cast('nan' as double)) |
+-----------------------+------------------------------+
|                   NaN |                            1 |
+-----------------------+------------------------------+
```

```sql
SELECT isnan(NULL)
```

```text
+-------------+
| isnan(NULL) |
+-------------+
|        NULL |
+-------------+
```
