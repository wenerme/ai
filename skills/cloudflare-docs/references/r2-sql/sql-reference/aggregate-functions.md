---
title: Aggregate functions
description: Reference for the aggregate functions supported in R2 SQL, organized by category.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Aggregate functions

Aggregate functions collapse multiple rows into a single result. They are used with `GROUP BY` to compute summaries per group, or without `GROUP BY` to compute a single result across all rows.

Most aggregates accept a `DISTINCT` modifier, for example `COUNT(DISTINCT customer_id)` or `SUM(DISTINCT total_amount)`.

Note

On large datasets, prefer the [approximate aggregates](#approximate-aggregates) (`approx_distinct`, `approx_median`, `approx_percentile_cont`) over their exact counterparts for lower memory and compute.

---

## Basic aggregates

### COUNT

Counts rows. `COUNT(*)` counts all rows. `COUNT(column)` counts non-NULL values.

```
SELECT COUNT(*) AS total_rowsFROM my_namespace.sales_data
SELECT department, COUNT(*) AS dept_countFROM my_namespace.sales_dataGROUP BY departmentORDER BY dept_count DESC
```

### SUM

Returns the sum of values in a column.

```
SELECT SUM(total_amount) AS grand_totalFROM my_namespace.sales_data
SELECT department, SUM(total_amount) AS dept_totalFROM my_namespace.sales_dataGROUP BY departmentORDER BY dept_total DESC
```

### AVG

Returns the average of values in a column. Alias: `mean`.

```
SELECT AVG(total_amount) AS avg_amountFROM my_namespace.sales_data
SELECT department, AVG(total_amount) AS avg_amountFROM my_namespace.sales_dataGROUP BY departmentORDER BY avg_amount DESC
```

### MIN

Returns the minimum value. Works on numeric and string columns.

```
SELECT MIN(total_amount) AS min_amount, MIN(customer_id) AS first_customerFROM my_namespace.sales_data
SELECT department, MIN(total_amount) AS min_amountFROM my_namespace.sales_dataGROUP BY department
```

### MAX

Returns the maximum value. Works on numeric and string columns.

```
SELECT MAX(total_amount) AS max_amount, MAX(customer_id) AS last_customerFROM my_namespace.sales_data
SELECT department, MAX(total_amount) AS max_amountFROM my_namespace.sales_dataGROUP BY department
```

### MEDIAN

Returns the exact median value. For large datasets, use [approx\_median](#approx%5Fmedian) instead.

```
SELECT MEDIAN(total_amount) AS median_amountFROM my_namespace.sales_data
SELECT department, MEDIAN(total_amount) AS median_amountFROM my_namespace.sales_dataGROUP BY department
```

### PERCENTILE\_CONT

Returns the exact value at a given percentile using `WITHIN GROUP (ORDER BY ...)`. The percentile parameter must be between `0.0` and `1.0` inclusive. For large datasets, use [approx\_percentile\_cont](#approx%5Fpercentile%5Fcont) instead.

```
SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount) AS median,       PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY total_amount) AS p95FROM my_namespace.sales_data
```

Note

`PERCENTILE_DISC` is not supported. Use `PERCENTILE_CONT` or [approx\_percentile\_cont](#approx%5Fpercentile%5Fcont).

---

## Approximate aggregates

Approximate aggregation functions produce statistically estimated results while using significantly less memory and compute than their exact counterparts. Use them when analyzing large datasets and an approximate result is acceptable.

### approx\_percentile\_cont

Returns the approximate value at a given percentile using a T-Digest algorithm. The percentile parameter must be between `0.0` and `1.0` inclusive.

```
SELECT approx_percentile_cont(total_amount, 0.5) AS median,       approx_percentile_cont(total_amount, 0.95) AS p95FROM my_namespace.sales_data
SELECT department,       approx_percentile_cont(total_amount, 0.5) AS medianFROM my_namespace.sales_dataGROUP BY departmentORDER BY median DESC
```

### approx\_percentile\_cont\_with\_weight

Returns the approximate weighted percentile. Rows are weighted by the `weight` column.

```
SELECT approx_percentile_cont_with_weight(unit_price, quantity, 0.5) AS weighted_medianFROM my_namespace.sales_dataWHERE unit_price IS NOT NULL AND quantity IS NOT NULL
```

### approx\_median

Returns the approximate median. Equivalent to `approx_percentile_cont(column, 0.5)`.

```
SELECT approx_median(total_amount) AS median_amountFROM my_namespace.sales_data
SELECT department, approx_median(total_amount) AS medianFROM my_namespace.sales_dataGROUP BY department
```

### approx\_distinct

Returns the approximate count of distinct values using HyperLogLog.

```
SELECT approx_distinct(customer_id) AS unique_customersFROM my_namespace.sales_data
SELECT department, approx_distinct(customer_id) AS unique_customersFROM my_namespace.sales_dataGROUP BY department
```

### approx\_top\_k

Returns the _k_ most frequent values with their approximate counts.

```
SELECT approx_top_k(department, 5) AS top_departmentsFROM my_namespace.sales_data
```

---

## Statistical aggregates

### var / var\_samp

Returns the sample variance.

```
SELECT var(total_amount) AS varianceFROM my_namespace.sales_data
SELECT department, var(total_amount) AS varianceFROM my_namespace.sales_dataGROUP BY department
```

### var\_pop

Returns the population variance.

```
SELECT var_pop(total_amount) AS pop_varianceFROM my_namespace.sales_data
```

### stddev / stddev\_samp

Returns the sample standard deviation.

```
SELECT stddev(total_amount) AS std_devFROM my_namespace.sales_data
SELECT department, stddev(total_amount) AS std_devFROM my_namespace.sales_dataGROUP BY department
```

### stddev\_pop

Returns the population standard deviation.

```
SELECT stddev_pop(total_amount) AS pop_std_devFROM my_namespace.sales_data
```

### covar\_samp

Returns the sample covariance. Alias: `covar`.

```
SELECT covar_samp(total_amount, CAST(quantity AS DOUBLE)) AS covarianceFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### covar\_pop

Returns the population covariance.

```
SELECT covar_pop(total_amount, CAST(quantity AS DOUBLE)) AS pop_covarianceFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### corr

Returns the Pearson correlation coefficient between two columns.

```
SELECT corr(total_amount, CAST(quantity AS DOUBLE)) AS correlationFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_slope

Returns the slope of the linear regression line.

```
SELECT regr_slope(total_amount, CAST(quantity AS DOUBLE)) AS slopeFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_intercept

Returns the y-intercept of the linear regression line.

```
SELECT regr_intercept(total_amount, CAST(quantity AS DOUBLE)) AS interceptFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_count

Returns the count of non-NULL pairs.

```
SELECT regr_count(total_amount, CAST(quantity AS DOUBLE)) AS pair_countFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_r2

Returns the coefficient of determination (R-squared).

```
SELECT regr_r2(total_amount, CAST(quantity AS DOUBLE)) AS r_squaredFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_avgx

Returns the average of the independent variable (x) for non-NULL pairs.

```
SELECT regr_avgx(total_amount, CAST(quantity AS DOUBLE)) AS avg_qtyFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_avgy

Returns the average of the dependent variable (y) for non-NULL pairs.

```
SELECT regr_avgy(total_amount, CAST(quantity AS DOUBLE)) AS avg_amountFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_sxx

Returns the sum of squares of the independent variable.

```
SELECT regr_sxx(total_amount, CAST(quantity AS DOUBLE)) AS sxxFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_syy

Returns the sum of squares of the dependent variable.

```
SELECT regr_syy(total_amount, CAST(quantity AS DOUBLE)) AS syyFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

### regr\_sxy

Returns the sum of products of the paired variables.

```
SELECT regr_sxy(total_amount, CAST(quantity AS DOUBLE)) AS sxyFROM my_namespace.sales_dataWHERE total_amount IS NOT NULL AND quantity IS NOT NULL
```

---

## Bitwise aggregates

### bit\_and

Returns the bitwise AND of all values in a group.

```
SELECT department, bit_and(quantity) AS and_resultFROM my_namespace.sales_dataWHERE quantity IS NOT NULLGROUP BY department
```

### bit\_or

Returns the bitwise OR of all values in a group.

```
SELECT department, bit_or(quantity) AS or_resultFROM my_namespace.sales_dataWHERE quantity IS NOT NULLGROUP BY department
```

### bit\_xor

Returns the bitwise XOR of all values in a group.

```
SELECT department, bit_xor(quantity) AS xor_resultFROM my_namespace.sales_dataWHERE quantity IS NOT NULLGROUP BY department
```

---

## Boolean aggregates

### bool\_and

Returns true if all values in a group are true.

```
SELECT department, bool_and(is_completed) AS all_completedFROM my_namespace.sales_dataWHERE is_completed IS NOT NULLGROUP BY department
```

### bool\_or

Returns true if any value in a group is true.

```
SELECT department, bool_or(is_completed) AS any_completedFROM my_namespace.sales_dataWHERE is_completed IS NOT NULLGROUP BY department
```

---

## Positional aggregates

### first\_value

Returns the first value in a group according to the specified ordering.

```
SELECT department,       first_value(customer_id ORDER BY total_amount ASC) AS lowest_spenderFROM my_namespace.sales_dataWHERE total_amount IS NOT NULLGROUP BY department
```

### last\_value

Returns the last value in a group according to the specified ordering.

```
SELECT department,       last_value(customer_id ORDER BY total_amount ASC) AS highest_spenderFROM my_namespace.sales_dataWHERE total_amount IS NOT NULLGROUP BY department
```

---

## Collection aggregates

These aggregates accumulate all input values into a single result. Because they hold every value in memory, use a `WHERE` filter or `GROUP BY` to keep group sizes bounded on large datasets.

### array\_agg

Collects values from a group into an array.

```
SELECT department, array_agg(customer_id) AS customersFROM my_namespace.sales_dataGROUP BY department
```

### string\_agg

Concatenates values from a group into a single string, separated by the given delimiter.

```
SELECT department, string_agg(customer_id, ', ') AS customer_listFROM my_namespace.sales_dataGROUP BY department
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-sql/sql-reference/aggregate-functions/#page","headline":"Aggregate functions · R2 SQL docs","description":"Reference for the aggregate functions supported in R2 SQL, organized by category.","url":"https://developers.cloudflare.com/r2-sql/sql-reference/aggregate-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2-sql/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2-sql/sql-reference/aggregate-functions/","name":"Aggregate functions"}}]}
```
