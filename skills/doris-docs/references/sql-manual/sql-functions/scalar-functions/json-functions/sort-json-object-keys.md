---
{
    "title": "SORT_JSON_OBJECT_KEYS",
    "language": "en",
    "description": "SORTJSONOBJECTKEYS sorts the keys of a JSON object. This function takes a JSON object as input and returns a new JSON object with keys sorted in "
}
---

## Description

`SORT_JSON_OBJECT_KEYS` sorts the keys of a JSON object. This function takes a JSON object as input and returns a new JSON object with keys sorted in lexicographical order.

Note that according to the JSON standard, JSON objects are unordered collections. However, this function is useful when you need to ensure consistency in key ordering, for example, when comparing two JSON objects for identical content.

## Syntax

```sql
SORT_JSON_OBJECT_KEYS(json_value)
```

## Alias

SORT_JSONB_OBJECT_KEYS

## Parameters

**json_value** - The JSON value whose keys need to be sorted. Must be of JSON type.

## Return Value

Returns a new JSON object with keys sorted in lexicographical order. The return type matches the input JSON type.

When the input is NULL, the function returns NULL.

## Examples

### Basic key sorting

```sql
SELECT sort_json_object_keys(cast('{"b":123,"b":456,"a":789}' as json));
```

```text
+------------------------------------------------------------------+
| sort_json_object_keys(cast('{"b":123,"b":456,"a":789}' as json)) |
+------------------------------------------------------------------+
| {"a":789,"b":123}                                                |
+------------------------------------------------------------------+
```

### Handling nested JSON arrays

```sql
SELECT sort_json_object_keys(cast('[{"b":123,"b":456,"a":789},{"b":123},{"b":456},{"a":789}]' as json));
```

```text
+----------------------------------------------------------------------------------------------------+
| sort_json_object_keys(cast('[{"b":123,"b":456,"a":789} ,{"b":123},{"b":456},{"a":789} ]' as json)) |
+----------------------------------------------------------------------------------------------------+
| [{"a":789,"b":123},{"b":123},{"b":456},{"a":789}]                                                  |
+----------------------------------------------------------------------------------------------------+
```

### Handling NULL values

```sql
SELECT sort_json_object_keys(null);
```

```text
+-----------------------------+
| sort_json_object_keys(null) |
+-----------------------------+
| NULL                        |
+-----------------------------+
```

## Notes

1. `SORT_JSON_OBJECT_KEYS` function has an alias `SORT_JSONB_OBJECT_KEYS`, both functions have identical functionality.

2. This function only sorts the keys of objects, without modifying their associated values.

3. The function only sorts objects but not arrays, as the standard specifies that arrays are ordered collections.

4. Duplicate keys in JSON objects will be merged when converted to Doris JSON type, preserving only the first key-value pair.

5. This function is primarily used to ensure JSON object keys are presented in a consistent order for comparison or debugging purposes, as by default Doris JSON type does not guarantee key ordering.
