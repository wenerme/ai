---
description: Scalar functions for manipulating arrays
title: Array functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt
> Use this file to discover all available pages before exploring further.

# Array functions

Last updated Jun 3, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/array/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

*Cloudflare Pipelines scalar function implementations are based on [Apache DataFusion ↗︎](https://arrow.apache.org/datafusion/) (via [Arroyo ↗︎](https://www.arroyo.dev/)) and these docs are derived from the DataFusion function reference.*

## `array_append`

Appends an element to the end of an array.

```plaintext
array_append(array, element)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to append to the array.

**Example**

```plaintext
> select array_append([1, 2, 3], 4);
+--------------------------------------+
| array_append(List([1,2,3]),Int64(4)) |
+--------------------------------------+
| [1, 2, 3, 4]                         |
+--------------------------------------+
```

**Aliases**

- array\_push\_back
- list\_append
- list\_push\_back

## `array_sort`

Sort array.

```plaintext
array_sort(array, desc, nulls_first)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **desc**: Whether to sort in descending order( `ASC` or `DESC`).
- **nulls\_first**: Whether to sort nulls first( `NULLS FIRST` or `NULLS LAST`).

**Example**

```plaintext
> select array_sort([3, 1, 2]);
+-----------------------------+
| array_sort(List([3,1,2]))   |
+-----------------------------+
| [1, 2, 3]                   |
+-----------------------------+
```

**Aliases**

- list\_sort

## `array_resize`

Resizes the list to contain size elements. Initializes new elements with value or empty if value is not set.

```plaintext
array_resize(array, size, value)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **size**: New size of given array.
- **value**: Defines new elements' value or empty if value is not set.

**Example**

```plaintext
> select array_resize([1, 2, 3], 5, 0);
+-------------------------------------+
| array_resize(List([1,2,3],5,0))     |
+-------------------------------------+
| [1, 2, 3, 0, 0]                     |
+-------------------------------------+
```

**Aliases**

- list\_resize

## `array_cat`

*Alias of [array\_concat](#array_concat).*

## `array_concat`

Concatenates arrays.

```plaintext
array_concat(array[, ..., array_n])
```

**Arguments**

- **array**: Array expression to concatenate. Can be a constant, column, or function, and any combination of array operators.
- **array\_n**: Subsequent array column or literal array to concatenate.

**Example**

```plaintext
> select array_concat([1, 2], [3, 4], [5, 6]);
+---------------------------------------------------+
| array_concat(List([1,2]),List([3,4]),List([5,6])) |
+---------------------------------------------------+
| [1, 2, 3, 4, 5, 6]                                |
+---------------------------------------------------+
```

**Aliases**

- array\_cat
- list\_cat
- list\_concat

## `array_contains`

*Alias of [array\_has](#array_has).*

## `array_has`

Returns true if the array contains the element

```plaintext
array_has(array, element)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Scalar or Array expression. Can be a constant, column, or function, and any combination of array operators.

**Aliases**

- list\_has

## `array_has_all`

Returns true if all elements of sub-array exist in array

```plaintext
array_has_all(array, sub-array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **sub-array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Aliases**

- list\_has\_all

## `array_has_any`

Returns true if any elements exist in both arrays

```plaintext
array_has_any(array, sub-array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **sub-array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Aliases**

- list\_has\_any

## `array_dims`

Returns an array of the array's dimensions.

```plaintext
array_dims(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_dims([[1, 2, 3], [4, 5, 6]]);
+---------------------------------+
| array_dims(List([1,2,3,4,5,6])) |
+---------------------------------+
| [2, 3]                          |
+---------------------------------+
```

**Aliases**

- list\_dims

## `array_distinct`

Returns distinct values from the array after removing duplicates.

```plaintext
array_distinct(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_distinct([1, 3, 2, 3, 1, 2, 4]);
+---------------------------------+
| array_distinct(List([1,2,3,4])) |
+---------------------------------+
| [1, 2, 3, 4]                    |
+---------------------------------+
```

**Aliases**

- list\_distinct

## `array_element`

Extracts the element with the index n from the array.

```plaintext
array_element(array, index)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **index**: Index to extract the element from the array.

**Example**

```plaintext
> select array_element([1, 2, 3, 4], 3);
+-----------------------------------------+
| array_element(List([1,2,3,4]),Int64(3)) |
+-----------------------------------------+
| 3                                       |
+-----------------------------------------+
```

**Aliases**

- array\_extract
- list\_element
- list\_extract

## `array_extract`

*Alias of [array\_element](#array_element).*

## `array_fill`

Returns an array filled with copies of the given value.

DEPRECATED: use `array_repeat` instead!

```plaintext
array_fill(element, array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to copy to the array.

## `flatten`

Converts an array of arrays to a flat array

- Applies to any depth of nested arrays
- Does not change arrays that are already flat

The flattened array contains all the elements from all source arrays.

**Arguments**

- **array**: Array expression Can be a constant, column, or function, and any combination of array operators.

```plaintext
flatten(array)
```

## `array_indexof`

*Alias of [array\_position](#array_position).*

## `array_intersect`

Returns an array of elements in the intersection of array1 and array2.

```plaintext
array_intersect(array1, array2)
```

**Arguments**

- **array1**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **array2**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_intersect([1, 2, 3, 4], [5, 6, 3, 4]);
+----------------------------------------------------+
| array_intersect([1, 2, 3, 4], [5, 6, 3, 4]);       |
+----------------------------------------------------+
| [3, 4]                                             |
+----------------------------------------------------+
> select array_intersect([1, 2, 3, 4], [5, 6, 7, 8]);
+----------------------------------------------------+
| array_intersect([1, 2, 3, 4], [5, 6, 7, 8]);       |
+----------------------------------------------------+
| []                                                 |
+----------------------------------------------------+
```

---

**Aliases**

- list\_intersect

## `array_join`

*Alias of [array\_to\_string](#array_to_string).*

## `array_length`

Returns the length of the array dimension.

```plaintext
array_length(array, dimension)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **dimension**: Array dimension.

**Example**

```plaintext
> select array_length([1, 2, 3, 4, 5]);
+---------------------------------+
| array_length(List([1,2,3,4,5])) |
+---------------------------------+
| 5                               |
+---------------------------------+
```

**Aliases**

- list\_length

## `array_ndims`

Returns the number of dimensions of the array.

```plaintext
array_ndims(array, element)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_ndims([[1, 2, 3], [4, 5, 6]]);
+----------------------------------+
| array_ndims(List([1,2,3,4,5,6])) |
+----------------------------------+
| 2                                |
+----------------------------------+
```

**Aliases**

- list\_ndims

## `array_prepend`

Prepends an element to the beginning of an array.

```plaintext
array_prepend(element, array)
```

**Arguments**

- **element**: Element to prepend to the array.
- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_prepend(1, [2, 3, 4]);
+---------------------------------------+
| array_prepend(Int64(1),List([2,3,4])) |
+---------------------------------------+
| [1, 2, 3, 4]                          |
+---------------------------------------+
```

**Aliases**

- array\_push\_front
- list\_prepend
- list\_push\_front

## `array_pop_front`

Returns the array without the first element.

```plaintext
array_pop_front(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_pop_front([1, 2, 3]);
+-------------------------------+
| array_pop_front(List([1,2,3])) |
+-------------------------------+
| [2, 3]                        |
+-------------------------------+
```

**Aliases**

- list\_pop\_front

## `array_pop_back`

Returns the array without the last element.

```plaintext
array_pop_back(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_pop_back([1, 2, 3]);
+-------------------------------+
| array_pop_back(List([1,2,3])) |
+-------------------------------+
| [1, 2]                        |
+-------------------------------+
```

**Aliases**

- list\_pop\_back

## `array_position`

Returns the position of the first occurrence of the specified element in the array.

```plaintext
array_position(array, element)
array_position(array, element, index)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to search for position in the array.
- **index**: Index at which to start searching.

**Example**

```plaintext
> select array_position([1, 2, 2, 3, 1, 4], 2);
+----------------------------------------------+
| array_position(List([1,2,2,3,1,4]),Int64(2)) |
+----------------------------------------------+
| 2                                            |
+----------------------------------------------+
```

**Aliases**

- array\_indexof
- list\_indexof
- list\_position

## `array_positions`

Searches for an element in the array, returns all occurrences.

```plaintext
array_positions(array, element)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to search for positions in the array.

**Example**

```plaintext
> select array_positions([1, 2, 2, 3, 1, 4], 2);
+-----------------------------------------------+
| array_positions(List([1,2,2,3,1,4]),Int64(2)) |
+-----------------------------------------------+
| [2, 3]                                        |
+-----------------------------------------------+
```

**Aliases**

- list\_positions

## `array_push_back`

*Alias of [array\_append](#array_append).*

## `array_push_front`

*Alias of [array\_prepend](#array_prepend).*

## `array_repeat`

Returns an array containing element `count` times.

```plaintext
array_repeat(element, count)
```

**Arguments**

- **element**: Element expression. Can be a constant, column, or function, and any combination of array operators.
- **count**: Value of how many times to repeat the element.

**Example**

```plaintext
> select array_repeat(1, 3);
+---------------------------------+
| array_repeat(Int64(1),Int64(3)) |
+---------------------------------+
| [1, 1, 1]                       |
+---------------------------------+
```

```plaintext
> select array_repeat([1, 2], 2);
+------------------------------------+
| array_repeat(List([1,2]),Int64(2)) |
+------------------------------------+
| [[1, 2], [1, 2]]                   |
+------------------------------------+
```

**Aliases**

- list\_repeat

## `array_remove`

Removes the first element from the array equal to the given value.

```plaintext
array_remove(array, element)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to be removed from the array.

**Example**

```plaintext
> select array_remove([1, 2, 2, 3, 2, 1, 4], 2);
+----------------------------------------------+
| array_remove(List([1,2,2,3,2,1,4]),Int64(2)) |
+----------------------------------------------+
| [1, 2, 3, 2, 1, 4]                           |
+----------------------------------------------+
```

**Aliases**

- list\_remove

## `array_remove_n`

Removes the first `max` elements from the array equal to the given value.

```plaintext
array_remove_n(array, element, max)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to be removed from the array.
- **max**: Number of first occurrences to remove.

**Example**

```plaintext
> select array_remove_n([1, 2, 2, 3, 2, 1, 4], 2, 2);
+---------------------------------------------------------+
| array_remove_n(List([1,2,2,3,2,1,4]),Int64(2),Int64(2)) |
+---------------------------------------------------------+
| [1, 3, 2, 1, 4]                                         |
+---------------------------------------------------------+
```

**Aliases**

- list\_remove\_n

## `array_remove_all`

Removes all elements from the array equal to the given value.

```plaintext
array_remove_all(array, element)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **element**: Element to be removed from the array.

**Example**

```plaintext
> select array_remove_all([1, 2, 2, 3, 2, 1, 4], 2);
+--------------------------------------------------+
| array_remove_all(List([1,2,2,3,2,1,4]),Int64(2)) |
+--------------------------------------------------+
| [1, 3, 1, 4]                                     |
+--------------------------------------------------+
```

**Aliases**

- list\_remove\_all

## `array_replace`

Replaces the first occurrence of the specified element with another specified element.

```plaintext
array_replace(array, from, to)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **from**: Initial element.
- **to**: Final element.

**Example**

```plaintext
> select array_replace([1, 2, 2, 3, 2, 1, 4], 2, 5);
+--------------------------------------------------------+
| array_replace(List([1,2,2,3,2,1,4]),Int64(2),Int64(5)) |
+--------------------------------------------------------+
| [1, 5, 2, 3, 2, 1, 4]                                  |
+--------------------------------------------------------+
```

**Aliases**

- list\_replace

## `array_replace_n`

Replaces the first `max` occurrences of the specified element with another specified element.

```plaintext
array_replace_n(array, from, to, max)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **from**: Initial element.
- **to**: Final element.
- **max**: Number of first occurrences to replace.

**Example**

```plaintext
> select array_replace_n([1, 2, 2, 3, 2, 1, 4], 2, 5, 2);
+-------------------------------------------------------------------+
| array_replace_n(List([1,2,2,3,2,1,4]),Int64(2),Int64(5),Int64(2)) |
+-------------------------------------------------------------------+
| [1, 5, 5, 3, 2, 1, 4]                                             |
+-------------------------------------------------------------------+
```

**Aliases**

- list\_replace\_n

## `array_replace_all`

Replaces all occurrences of the specified element with another specified element.

```plaintext
array_replace_all(array, from, to)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **from**: Initial element.
- **to**: Final element.

**Example**

```plaintext
> select array_replace_all([1, 2, 2, 3, 2, 1, 4], 2, 5);
+------------------------------------------------------------+
| array_replace_all(List([1,2,2,3,2,1,4]),Int64(2),Int64(5)) |
+------------------------------------------------------------+
| [1, 5, 5, 3, 5, 1, 4]                                      |
+------------------------------------------------------------+
```

**Aliases**

- list\_replace\_all

## `array_reverse`

Returns the array with the order of the elements reversed.

```plaintext
array_reverse(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_reverse([1, 2, 3, 4]);
+------------------------------------------------------------+
| array_reverse(List([1, 2, 3, 4]))                          |
+------------------------------------------------------------+
| [4, 3, 2, 1]                                               |
+------------------------------------------------------------+
```

**Aliases**

- list\_reverse

## `array_slice`

Returns a slice of the array based on 1-indexed start and end positions.

```plaintext
array_slice(array, begin, end)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **begin**: Index of the first element. If negative, it counts backward from the end of the array.
- **end**: Index of the last element. If negative, it counts backward from the end of the array.
- **stride**: Stride of the array slice. The default is 1.

**Example**

```plaintext
> select array_slice([1, 2, 3, 4, 5, 6, 7, 8], 3, 6);
+--------------------------------------------------------+
| array_slice(List([1,2,3,4,5,6,7,8]),Int64(3),Int64(6)) |
+--------------------------------------------------------+
| [3, 4, 5, 6]                                           |
+--------------------------------------------------------+
```

**Aliases**

- list\_slice

## `array_to_string`

Converts each element to its text representation.

```plaintext
array_to_string(array, delimiter)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **delimiter**: Array element separator.

**Example**

```plaintext
> select array_to_string([[1, 2, 3, 4], [5, 6, 7, 8]], ',');
+----------------------------------------------------+
| array_to_string(List([1,2,3,4,5,6,7,8]),Utf8(",")) |
+----------------------------------------------------+
| 1,2,3,4,5,6,7,8                                    |
+----------------------------------------------------+
```

**Aliases**

- array\_join
- list\_join
- list\_to\_string

## `array_union`

Returns an array of elements that are present in both arrays (all elements from both arrays) with out duplicates.

```plaintext
array_union(array1, array2)
```

**Arguments**

- **array1**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **array2**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_union([1, 2, 3, 4], [5, 6, 3, 4]);
+----------------------------------------------------+
| array_union([1, 2, 3, 4], [5, 6, 3, 4]);           |
+----------------------------------------------------+
| [1, 2, 3, 4, 5, 6]                                 |
+----------------------------------------------------+
> select array_union([1, 2, 3, 4], [5, 6, 7, 8]);
+----------------------------------------------------+
| array_union([1, 2, 3, 4], [5, 6, 7, 8]);           |
+----------------------------------------------------+
| [1, 2, 3, 4, 5, 6, 7, 8]                           |
+----------------------------------------------------+
```

---

**Aliases**

- list\_union

## `array_except`

Returns an array of the elements that appear in the first array but not in the second.

```plaintext
array_except(array1, array2)
```

**Arguments**

- **array1**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **array2**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select array_except([1, 2, 3, 4], [5, 6, 3, 4]);
+----------------------------------------------------+
| array_except([1, 2, 3, 4], [5, 6, 3, 4]);           |
+----------------------------------------------------+
| [1, 2]                                 |
+----------------------------------------------------+
> select array_except([1, 2, 3, 4], [3, 4, 5, 6]);
+----------------------------------------------------+
| array_except([1, 2, 3, 4], [3, 4, 5, 6]);           |
+----------------------------------------------------+
| [1, 2]                                 |
+----------------------------------------------------+
```

---

**Aliases**

- list\_except

## `cardinality`

Returns the total number of elements in the array.

```plaintext
cardinality(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select cardinality([[1, 2, 3, 4], [5, 6, 7, 8]]);
+--------------------------------------+
| cardinality(List([1,2,3,4,5,6,7,8])) |
+--------------------------------------+
| 8                                    |
+--------------------------------------+
```

## `empty`

Returns 1 for an empty array or 0 for a non-empty array.

```plaintext
empty(array)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.

**Example**

```plaintext
> select empty([1]);
+------------------+
| empty(List([1])) |
+------------------+
| 0                |
+------------------+
```

**Aliases**

- array\_empty,
- list\_empty

## `generate_series`

Similar to the range function, but it includes the upper bound.

```plaintext
generate_series(start, stop, step)
```

**Arguments**

- **start**: start of the range
- **end**: end of the range (included)
- **step**: increase by step (can not be 0)

**Example**

```plaintext
> select generate_series(1,3);
+------------------------------------+
| generate_series(Int64(1),Int64(3)) |
+------------------------------------+
| [1, 2, 3]                          |
+------------------------------------+
```

## `list_append`

*Alias of [array\_append](#array_append).*

## `list_cat`

*Alias of [array\_concat](#array_concat).*

## `list_concat`

*Alias of [array\_concat](#array_concat).*

## `list_dims`

*Alias of [array\_dims](#array_dims).*

## `list_distinct`

*Alias of [array\_dims](#array_distinct).*

## `list_element`

*Alias of [array\_element](#array_element).*

## `list_empty`

*Alias of [empty](#empty).*

## `list_except`

*Alias of [array\_element](#array_except).*

## `list_extract`

*Alias of [array\_element](#array_element).*

## `list_has`

*Alias of [array\_has](#array_has).*

## `list_has_all`

*Alias of [array\_has\_all](#array_has_all).*

## `list_has_any`

*Alias of [array\_has\_any](#array_has_any).*

## `list_indexof`

*Alias of [array\_position](#array_position).*

## `list_intersect`

*Alias of [array\_position](#array_intersect).*

## `list_join`

*Alias of [array\_to\_string](#array_to_string).*

## `list_length`

*Alias of [array\_length](#array_length).*

## `list_ndims`

*Alias of [array\_ndims](#array_ndims).*

## `list_prepend`

*Alias of [array\_prepend](#array_prepend).*

## `list_pop_back`

*Alias of [array\_pop\_back](#array_pop_back).*

## `list_pop_front`

*Alias of [array\_pop\_front](#array_pop_front).*

## `list_position`

*Alias of [array\_position](#array_position).*

## `list_positions`

*Alias of [array\_positions](#array_positions).*

## `list_push_back`

*Alias of [array\_append](#array_append).*

## `list_push_front`

*Alias of [array\_prepend](#array_prepend).*

## `list_repeat`

*Alias of [array\_repeat](#array_repeat).*

## `list_resize`

*Alias of [array\_resize](#array_resize).*

## `list_remove`

*Alias of [array\_remove](#array_remove).*

## `list_remove_n`

*Alias of [array\_remove\_n](#array_remove_n).*

## `list_remove_all`

*Alias of [array\_remove\_all](#array_remove_all).*

## `list_replace`

*Alias of [array\_replace](#array_replace).*

## `list_replace_n`

*Alias of [array\_replace\_n](#array_replace_n).*

## `list_replace_all`

*Alias of [array\_replace\_all](#array_replace_all).*

## `list_reverse`

*Alias of [array\_reverse](#array_reverse).*

## `list_slice`

*Alias of [array\_slice](#array_slice).*

## `list_sort`

*Alias of [array\_sort](#array_sort).*

## `list_to_string`

*Alias of [array\_to\_string](#array_to_string).*

## `list_union`

*Alias of [array\_union](#array_union).*

## `make_array`

Returns an Arrow array using the specified input expressions.

```plaintext
make_array(expression1[, ..., expression_n])
```

## `array_empty`

*Alias of [empty](#empty).*

**Arguments**

- **expression\_n**: Expression to include in the output array. Can be a constant, column, or function, and any combination of arithmetic or string operators.

**Example**

```plaintext
> select make_array(1, 2, 3, 4, 5);
+----------------------------------------------------------+
| make_array(Int64(1),Int64(2),Int64(3),Int64(4),Int64(5)) |
+----------------------------------------------------------+
| [1, 2, 3, 4, 5]                                          |
+----------------------------------------------------------+
```

**Aliases**

- make\_list

## `make_list`

*Alias of [make\_array](#make_array).*

## `string_to_array`

Splits a string in to an array of substrings based on a delimiter. Any substrings matching the optional `null_str` argument are replaced with NULL. `SELECT string_to_array('abc##def', '##')` or `SELECT string_to_array('abc def', ' ', 'def')`

```plaintext
starts_with(str, delimiter[, null_str])
```

**Arguments**

- **str**: String expression to split.
- **delimiter**: Delimiter string to split on.
- **null\_str**: Substring values to be replaced with `NULL`

**Aliases**

- string\_to\_list

## `string_to_list`

*Alias of [string\_to\_array](#string_to_array).*

## `trim_array`

Removes the last n elements from the array.

DEPRECATED: use `array_slice` instead!

```plaintext
trim_array(array, n)
```

**Arguments**

- **array**: Array expression. Can be a constant, column, or function, and any combination of array operators.
- **n**: Element to trim the array.

## `range`

Returns an Arrow array between start and stop with step. `SELECT range(2, 10, 3) -> [2, 5, 8]` or `SELECT range(DATE '1992-09-01', DATE '1993-03-01', INTERVAL '1' MONTH);`

The range start..end contains all values with start <= x < end. It is empty if start >= end.

Step can not be 0 (then the range will be nonsense.).

Note that when the required range is a number, it accepts (stop), (start, stop), and (start, stop, step) as parameters, but when the required range is a date, it must be 3 non-NULL parameters. For example,

```sql
SELECT range(3);
SELECT range(1,5);
SELECT range(1,5,1);
```

are allowed in number ranges

but in date ranges, only

```sql
SELECT range(DATE '1992-09-01', DATE '1993-03-01', INTERVAL '1' MONTH);
```

is allowed, and

```sql
SELECT range(DATE '1992-09-01', DATE '1993-03-01', NULL);
SELECT range(NULL, DATE '1993-03-01', INTERVAL '1' MONTH);
SELECT range(DATE '1992-09-01', NULL, INTERVAL '1' MONTH);
```

are not allowed

**Arguments**

- **start**: start of the range
- **end**: end of the range (not included)
- **step**: increase by step (can not be 0)

**Aliases**

- generate\_series

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/array/#page","headline":"Array functions","description":"Scalar functions for manipulating arrays","url":"https://developers.cloudflare.com/pipelines/sql-reference/scalar-functions/array/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
