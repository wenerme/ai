---
{
    "title": "ISINF",
    "language": "en",
    "description": "Determines whether the specified value is infinity."
}
---

## Description

Determines whether the specified value is infinity.

## Syntax

```sql
ISINF(<value>)
```

## Parameters

| Parameter | Description |
| -- | -- |
| `<value>` | The value to be checked, which must be a DOUBLE or FLOAT type |

## Return Value

Returns 1 if the value is infinity (positive or negative), otherwise returns 0.
If the value is NULL, returns NULL.

## Examples

```sql
SELECT isinf(1);
```

```text
+----------+
| isinf(1) |
+----------+
|        0 |
+----------+
```

```sql
SELECT cast('inf' as double),isinf(cast('inf' as double))
```

```text
+-----------------------+------------------------------+
| cast('inf' as double) | isinf(cast('inf' as double)) |
+-----------------------+------------------------------+
|              Infinity |                            1 |
+-----------------------+------------------------------+
```

```sql
SELECT isinf(NULL)
```

```text
+-------------+
| isinf(NULL) |
+-------------+
|        NULL |
+-------------+
```
