---
{
    "title": "SIGNBIT",
    "language": "en",
    "description": "Determine whether the sign bit of the given floating-point number is set."
}
---

## Description

Determine whether the sign bit of the given floating-point number is set.

## Syntax

```sql
SIGNBIT(<a>)
```

## Parameters

| Parameter | Description |
| -- | -- |
| `<a>` | Floating-point number to check the sign bit for |

## Return Value

Returns true if the sign bit of `<a>` is set (i.e., `<a>` is negative), otherwise returns false.
Specifically, it can also distinguish between positive and negative zeros in floating-point numbers.

## Examples

```sql
select signbit(-1.0);
```

```text
+-----------------------------+
| signbit(cast(-1 as DOUBLE)) |
+-----------------------------+
| true                        |
+-----------------------------+
```

```sql
select signbit(0.0);
```

```text
+----------------------------+
| signbit(cast(0 as DOUBLE)) |
+----------------------------+
| false                      |
+----------------------------+
```

```sql
select signbit(1.0);
```

```text
+----------------------------+
| signbit(cast(1 as DOUBLE)) |
+----------------------------+
| false                      |
+----------------------------+
```

```sql
select signbit(cast('+0.0' as double)) , signbit(cast('-0.0' as double));
```

```text
+---------------------------------+---------------------------------+
| signbit(cast('+0.0' as double)) | signbit(cast('-0.0' as double)) |
+---------------------------------+---------------------------------+
|                               0 |                               1 |
+---------------------------------+---------------------------------+
```