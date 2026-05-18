---
{
    "title": "GCD",
    "language": "en",
    "description": "Calculates the greatest common divisor (GCD) of two integers."
}
---

## Description

Calculates the greatest common divisor (GCD) of two integers.

## Syntax

```sql
GCD(<a>, <b>)
```

## Parameters

| Parameter | Description |
| -- | -- |
| `<a>` | The first integer |
| `<b>` | The second integer |

## Return Value

Returns the greatest common divisor of `<a>` and `<b>`.
If any input is NULL, returns NULL.

## Examples

```sql
select gcd(54, 24);
```

```text
+------------+
| gcd(54,24) |
+------------+
|          6 |
+------------+
```

```sql
select gcd(-17, 31);
```

```text
+-------------+
| gcd(17,31)  |
+-------------+
|           1 |
+-------------+
```

```sql
select gcd(0, 10);
```

```text
+-----------+
| gcd(0,10) |
+-----------+
|        10 |
+-----------+
```

```sql
select gcd(54, NULL);
```

```text
+---------------+
| gcd(54, NULL) |
+---------------+
|          NULL |
+---------------+
```