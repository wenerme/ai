---
{
    "title": "LCM",
    "language": "en",
    "description": "Calculates the least common multiple (LCM) of two integers. Note that the result may overflow."
}
---

## Description

Calculates the least common multiple (LCM) of two integers. Note that the result may overflow.

## Syntax

```sql
LCM(<a>, <b>)
```

## Parameters

| Parameter | Description |
| -- | -- |
| `<a>` | The first integer |
| `<b>` | The second integer |

## Return Value

Returns the least common multiple of `<a>` and `<b>`.
If any input is NULL, returns NULL.

## Examples

```sql
select lcm(12, 18);
```

```text
+------------+
| lcm(12,18) |
+------------+
|         36 |
+------------+
```

```sql
select lcm(0, 10);
```

```text
+-----------+
| lcm(0,10) |
+-----------+
|         0 |
+-----------+
```

```sql
select lcm(-4, 6);
```

```text
+------------+
| lcm(-4,6)  |
+------------+
|          12|
+------------+
```

```sql
select lcm(-170141183460469231731687303715884105728, 3);
```

```text
ERROR 1105 (HY000): errCode = 2, detailMessage = Can not convert to legacy literal: 510423550381407695195061911147652317184
```

```sql
select lcm(-4, NULL);
```

```text
+---------------+
| lcm(-4, NULL) |
+---------------+
|          NULL |
+---------------+
```