---
title: "IBM Db2 template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the IBM Db2 data source to create dynamic dashboards"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# IBM Db2 template variables

Template variables allow you to create dynamic, reusable dashboards. Instead of hard-coding values in your queries, you can use variables that users can change from the dashboard.

## Before you begin

Before using template variables, ensure you have:

- [Configured the IBM Db2 data source](/docs/plugins/grafana-ibmdb2-datasource/latest/configure/)
- Basic understanding of [Grafana template variables](/docs/grafana/latest/dashboards/variables/)

## Use variables in queries

You can use Grafana template variables in your SQL queries. Variables are replaced with their selected values before the query runs.

Use the `$variable` or `${variable}` syntax to reference a variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT EMPNO, FIRSTNME, LASTNAME, WORKDEPT, SALARY
FROM EMPLOYEE
WHERE WORKDEPT = '$department'
```

## Multi-value variables

For variables that allow multiple selections, use the `IN` operator:

SQL [Copy code to clipboard] Copy

```sql
SELECT EMPNO, FIRSTNME, LASTNAME, WORKDEPT, SALARY
FROM EMPLOYEE
WHERE WORKDEPT IN ($department)
```

Multi-value variables are automatically formatted as comma-separated quoted strings. For example, if the user selects departments A00, B01, and C01, the query becomes:

SQL [Copy code to clipboard] Copy

```sql
WHERE WORKDEPT IN ('A00','B01','C01')
```

## Create a query variable

You can populate variable options dynamically using a SQL query against your IBM Db2 database.

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select your IBM Db2 data source.
5. Enter a SQL query that returns the values you want.

### Query variable behavior

The query result determines how variable options are populated:

Expand table

| Query Returns       | Behavior                                                              |
|---------------------|-----------------------------------------------------------------------|
| One column          | The column values are used as both the display text and the value.    |
| Two or more columns | The first column is the value, the second column is the display text. |

### Example: Department variable

Create a variable that lists all departments:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT WORKDEPT FROM EMPLOYEE ORDER BY WORKDEPT
```

### Example: Department with description

Create a variable with department code as the value and a description as the display text:

SQL [Copy code to clipboard] Copy

```sql
SELECT DEPTNO, DEPTNAME FROM DEPARTMENT ORDER BY DEPTNO
```

This displays the department name to users but uses the department number in queries.

## Variable examples

### Filter by job type

Variable query:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT JOB FROM EMPLOYEE ORDER BY JOB
```

Dashboard query using the variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT EMPNO, FIRSTNME, LASTNAME, JOB, SALARY
FROM EMPLOYEE
WHERE JOB = '$job'
ORDER BY SALARY DESC
```

### Filter by salary range

Variable query (custom ranges):

SQL [Copy code to clipboard] Copy

```sql
SELECT '0-50000' AS range FROM SYSIBM.SYSDUMMY1
UNION ALL SELECT '50000-75000' FROM SYSIBM.SYSDUMMY1
UNION ALL SELECT '75000-100000' FROM SYSIBM.SYSDUMMY1
UNION ALL SELECT '100000+' FROM SYSIBM.SYSDUMMY1
```

Dashboard query using the variable:

SQL [Copy code to clipboard] Copy

```sql
SELECT EMPNO, FIRSTNME, LASTNAME, SALARY
FROM EMPLOYEE
WHERE
  CASE
    WHEN '$salary_range' = '0-50000' THEN SALARY < 50000
    WHEN '$salary_range' = '50000-75000' THEN SALARY >= 50000 AND SALARY < 75000
    WHEN '$salary_range' = '75000-100000' THEN SALARY >= 75000 AND SALARY < 100000
    WHEN '$salary_range' = '100000+' THEN SALARY >= 100000
  END
ORDER BY SALARY DESC
```
