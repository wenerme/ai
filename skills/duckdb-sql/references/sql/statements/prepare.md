# PREPARE, EXECUTE, and DEALLOCATE Statements

The `PREPARE` statement creates a prepared statement for later execution. The `EXECUTE` statement runs it with optional arguments. The `DEALLOCATE` statement removes it.

For details about auto-incremented, positional, and named parameters, see [Prepared Statements](https://duckdb.org/docs/current/sql/query_syntax/prepared_statements.html).

## `PREPARE`

Prepare a statement named `query_person`:

```sql
PREPARE query_person AS
    SELECT *
    FROM person
    WHERE starts_with(name, $name_start)
      AND age >= $minimum_age;
```

Parameter types can be declared after the statement name:

```sql
PREPARE add_values(INTEGER, INTEGER) AS
    SELECT $1 + $2;
```

### Syntax

## `EXECUTE`

Execute a prepared statement with named arguments:

```sql
EXECUTE query_person(name_start := 'B', minimum_age := 40);
```

Execute a prepared statement with positional arguments:

```sql
EXECUTE add_values(20, 22);
```

### Syntax

## `DEALLOCATE`

Remove a prepared statement:

```sql
DEALLOCATE query_person;
```

The optional `PREPARE` keyword is accepted for PostgreSQL compatibility:

```sql
DEALLOCATE PREPARE add_values;
```

### Syntax

