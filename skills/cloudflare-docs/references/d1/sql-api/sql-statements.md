---
title: SQL statements
description: Supported SQL statements, PRAGMA commands, and SQLite extensions available in D1.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/d1/sql-api/sql-statements.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# SQL statements

D1 is compatible with most SQLite's SQL convention since it leverages SQLite's query engine. D1 supports a number of database-level statements that allow you to list tables, indexes, and inspect the schema for a given table or index.

You can execute any of these statements via the D1 console in the Cloudflare dashboard, [wrangler d1 execute](https://developers.cloudflare.com/workers/wrangler/commands/d1/#d1-execute), or with the [D1 Worker Bindings API](https://developers.cloudflare.com/d1/worker-api/d1-database).

## Supported SQLite extensions

D1 supports a subset of SQLite extensions for added functionality, including:

* [FTS5 module ↗](https://www.sqlite.org/fts5.html) for full-text search (including `fts5vocab`).
* [JSON extension ↗](https://www.sqlite.org/json1.html) for JSON functions and operators.
* [Math functions ↗](https://sqlite.org/lang%5Fmathfunc.html).

Refer to the [source code ↗](https://github.com/cloudflare/workerd/blob/4c42a4a9d3390c88e9bd977091c9d3395a6cd665/src/workerd/util/sqlite.c%2B%2B#L269) for the full list of supported functions.

## Compatible PRAGMA statements

D1 supports some [SQLite PRAGMA ↗](https://www.sqlite.org/pragma.html) statements. The PRAGMA statement is an SQL extension for SQLite. PRAGMA commands can be used to:

* Modify the behavior of certain SQLite operations.
* Query the SQLite library for internal data about schemas or tables (but note that PRAGMA statements cannot query the contents of a table).
* Control [environmental variables](https://developers.cloudflare.com/workers/configuration/environment-variables/).

The PRAGMA statement examples on this page use the following SQL.

```

PRAGMA foreign_keys=off;

DROP TABLE IF EXISTS "Employee";

DROP TABLE IF EXISTS "Category";

DROP TABLE IF EXISTS "Customer";

DROP TABLE IF EXISTS "Shipper";

DROP TABLE IF EXISTS "Supplier";

DROP TABLE IF EXISTS "Order";

DROP TABLE IF EXISTS "Product";

DROP TABLE IF EXISTS "OrderDetail";

DROP TABLE IF EXISTS "CustomerCustomerDemo";

DROP TABLE IF EXISTS "CustomerDemographic";

DROP TABLE IF EXISTS "Region";

DROP TABLE IF EXISTS "Territory";

DROP TABLE IF EXISTS "EmployeeTerritory";

DROP VIEW IF EXISTS [ProductDetails_V];

CREATE TABLE IF NOT EXISTS "Employee" ( "Id" INTEGER PRIMARY KEY, "LastName" VARCHAR(8000) NULL, "FirstName" VARCHAR(8000) NULL, "Title" VARCHAR(8000) NULL, "TitleOfCourtesy" VARCHAR(8000) NULL, "BirthDate" VARCHAR(8000) NULL, "HireDate" VARCHAR(8000) NULL, "Address" VARCHAR(8000) NULL, "City" VARCHAR(8000) NULL, "Region" VARCHAR(8000) NULL, "PostalCode" VARCHAR(8000) NULL, "Country" VARCHAR(8000) NULL, "HomePhone" VARCHAR(8000) NULL, "Extension" VARCHAR(8000) NULL, "Photo" BLOB NULL, "Notes" VARCHAR(8000) NULL, "ReportsTo" INTEGER NULL, "PhotoPath" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Category" ( "Id" INTEGER PRIMARY KEY, "CategoryName" VARCHAR(8000) NULL, "Description" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Customer" ( "Id" VARCHAR(8000) PRIMARY KEY, "CompanyName" VARCHAR(8000) NULL, "ContactName" VARCHAR(8000) NULL, "ContactTitle" VARCHAR(8000) NULL, "Address" VARCHAR(8000) NULL, "City" VARCHAR(8000) NULL, "Region" VARCHAR(8000) NULL, "PostalCode" VARCHAR(8000) NULL, "Country" VARCHAR(8000) NULL, "Phone" VARCHAR(8000) NULL, "Fax" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Shipper" ( "Id" INTEGER PRIMARY KEY, "CompanyName" VARCHAR(8000) NULL, "Phone" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Supplier" ( "Id" INTEGER PRIMARY KEY, "CompanyName" VARCHAR(8000) NULL, "ContactName" VARCHAR(8000) NULL, "ContactTitle" VARCHAR(8000) NULL, "Address" VARCHAR(8000) NULL, "City" VARCHAR(8000) NULL, "Region" VARCHAR(8000) NULL, "PostalCode" VARCHAR(8000) NULL, "Country" VARCHAR(8000) NULL, "Phone" VARCHAR(8000) NULL, "Fax" VARCHAR(8000) NULL, "HomePage" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Order" ( "Id" INTEGER PRIMARY KEY, "CustomerId" VARCHAR(8000) NULL, "EmployeeId" INTEGER NOT NULL, "OrderDate" VARCHAR(8000) NULL, "RequiredDate" VARCHAR(8000) NULL, "ShippedDate" VARCHAR(8000) NULL, "ShipVia" INTEGER NULL, "Freight" DECIMAL NOT NULL, "ShipName" VARCHAR(8000) NULL, "ShipAddress" VARCHAR(8000) NULL, "ShipCity" VARCHAR(8000) NULL, "ShipRegion" VARCHAR(8000) NULL, "ShipPostalCode" VARCHAR(8000) NULL, "ShipCountry" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Product" ( "Id" INTEGER PRIMARY KEY, "ProductName" VARCHAR(8000) NULL, "SupplierId" INTEGER NOT NULL, "CategoryId" INTEGER NOT NULL, "QuantityPerUnit" VARCHAR(8000) NULL, "UnitPrice" DECIMAL NOT NULL, "UnitsInStock" INTEGER NOT NULL, "UnitsOnOrder" INTEGER NOT NULL, "ReorderLevel" INTEGER NOT NULL, "Discontinued" INTEGER NOT NULL);

CREATE TABLE IF NOT EXISTS "OrderDetail" ( "Id" VARCHAR(8000) PRIMARY KEY, "OrderId" INTEGER NOT NULL, "ProductId" INTEGER NOT NULL, "UnitPrice" DECIMAL NOT NULL, "Quantity" INTEGER NOT NULL, "Discount" DOUBLE NOT NULL);

CREATE TABLE IF NOT EXISTS "CustomerCustomerDemo" ( "Id" VARCHAR(8000) PRIMARY KEY, "CustomerTypeId" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "CustomerDemographic" ( "Id" VARCHAR(8000) PRIMARY KEY, "CustomerDesc" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Region" ( "Id" INTEGER PRIMARY KEY, "RegionDescription" VARCHAR(8000) NULL);

CREATE TABLE IF NOT EXISTS "Territory" ( "Id" VARCHAR(8000) PRIMARY KEY, "TerritoryDescription" VARCHAR(8000) NULL, "RegionId" INTEGER NOT NULL);

CREATE TABLE IF NOT EXISTS "EmployeeTerritory" ( "Id" VARCHAR(8000) PRIMARY KEY, "EmployeeId" INTEGER NOT NULL, "TerritoryId" VARCHAR(8000) NULL);

CREATE VIEW [ProductDetails_V] as select p.*, c.CategoryName, c.Description as [CategoryDescription], s.CompanyName as [SupplierName], s.Region as [SupplierRegion] from [Product] p join [Category] c on p.CategoryId = c.id join [Supplier] s on s.id = p.SupplierId;


```

Explain Code

Warning

D1 PRAGMA statements only apply to the current transaction.

### `PRAGMA table_list`

Lists the tables and views in the database. This includes the system tables maintained by D1.

#### Return values

One row per each table. Each row contains:

1. `Schema`: the schema in which the table appears (for example, `main` or `temp`)
2. `name`: the name of the table
3. `type`: the type of the object (one of `table`, `view`, `shadow`, `virtual`)
4. `ncol`: the number of columns in the table, including generated or hidden columns
5. `wr`: `1` if the table is a WITHOUT ROWID table, `0` otherwise
6. `strict`: `1` if the table is a STRICT table, `0` otherwise

Example of `PRAGMA table_list`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA table_list'


```

```

🌀 Executing on remote database [DATABASE_NAME] (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 0.5874ms

┌────────┬──────────────────────┬───────┬──────┬────┬────────┐

│ schema │ name                 │ type  │ ncol │ wr │ strict │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Territory            │ table │ 3    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ CustomerDemographic  │ table │ 2    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ OrderDetail          │ table │ 6    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ sqlite_schema        │ table │ 5    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Region               │ table │ 2    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ _cf_KV               │ table │ 2    │ 1  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ ProductDetails_V     │ view  │ 14   │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ EmployeeTerritory    │ table │ 3    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Employee             │ table │ 18   │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Category             │ table │ 3    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Customer             │ table │ 11   │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Shipper              │ table │ 3    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Supplier             │ table │ 12   │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Order                │ table │ 14   │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ CustomerCustomerDemo │ table │ 2    │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ main   │ Product              │ table │ 10   │ 0  │ 0      │

├────────┼──────────────────────┼───────┼──────┼────┼────────┤

│ temp   │ sqlite_temp_schema   │ table │ 5    │ 0  │ 0      │

└────────┴──────────────────────┴───────┴──────┴────┴────────┘


```

Explain Code

### `PRAGMA table_info("TABLE_NAME")`

Shows the schema (columns, types, null, default values) for the given `TABLE_NAME`.

#### Return values

One row for each column in the specified table. Each row contains:

1. `cid`: a row identifier
2. `name`: the name of the column
3. `type`: the data type (if provided), `''` otherwise
4. `notnull`: `1` if the column can be NULL, `0` otherwise
5. `dflt_value`: the default value of the column
6. `pk`: `1` if the column is a primary key, `0` otherwise

Example of `PRAGMA table_info`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA table_info("Order")'


```

```

🌀 Executing on remote database [DATABASE_NAME] (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 0.8502ms

┌─────┬────────────────┬───────────────┬─────────┬────────────┬────┐

│ cid │ name           │ type          │ notnull │ dflt_value │ pk │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 0   │ Id             │ INTEGER       │ 0       │            │ 1  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 1   │ CustomerId     │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 2   │ EmployeeId     │ INTEGER       │ 1       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 3   │ OrderDate      │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 4   │ RequiredDate   │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 5   │ ShippedDate    │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 6   │ ShipVia        │ INTEGER       │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 7   │ Freight        │ DECIMAL       │ 1       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 8   │ ShipName       │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 9   │ ShipAddress    │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 10  │ ShipCity       │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 11  │ ShipRegion     │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 12  │ ShipPostalCode │ VARCHAR(8000) │ 0       │            │ 0  │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┤

│ 13  │ ShipCountry    │ VARCHAR(8000) │ 0       │            │ 0  │

└─────┴────────────────┴───────────────┴─────────┴────────────┴────┘


```

Explain Code

### `PRAGMA table_xinfo("TABLE_NAME")`

Similar to `PRAGMA table_info(TABLE_NAME)` but also includes [generated columns](https://developers.cloudflare.com/d1/reference/generated-columns/).

Example of `PRAGMA table_xinfo`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA table_xinfo("Order")'


```

```

🌀 Executing on remote database [DATABASE_NAME] (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 0.3854ms

┌─────┬────────────────┬───────────────┬─────────┬────────────┬────┬────────┐

│ cid │ name           │ type          │ notnull │ dflt_value │ pk │ hidden │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 0   │ Id             │ INTEGER       │ 0       │            │ 1  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 1   │ CustomerId     │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 2   │ EmployeeId     │ INTEGER       │ 1       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 3   │ OrderDate      │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 4   │ RequiredDate   │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 5   │ ShippedDate    │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 6   │ ShipVia        │ INTEGER       │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 7   │ Freight        │ DECIMAL       │ 1       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 8   │ ShipName       │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 9   │ ShipAddress    │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 10  │ ShipCity       │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 11  │ ShipRegion     │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 12  │ ShipPostalCode │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

├─────┼────────────────┼───────────────┼─────────┼────────────┼────┼────────┤

│ 13  │ ShipCountry    │ VARCHAR(8000) │ 0       │            │ 0  │ 0      │

└─────┴────────────────┴───────────────┴─────────┴────────────┴────┴────────┘


```

Explain Code

### `PRAGMA index_list("TABLE_NAME")`

Show the indexes for the given `TABLE_NAME`.

#### Return values

One row for each index associated with the specified table. Each row contains:

1. `seq`: a sequence number for internal tracking
2. `name`: the name of the index
3. `unique`: `1` if the index is UNIQUE, `0` otherwise
4. `origin`: the origin of the index (`c` if created by `CREATE INDEX` statement, `u` if created by UNIQUE constraint, `pk` if created by a PRIMARY KEY constraint)
5. `partial`: `1` if the index is a partial index, `0` otherwise

Example of `PRAGMA index_list`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA index_list("Territory")'


```

```

🌀 Executing on remote database d1-pragma-db (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 0.2177ms

┌─────┬──────────────────────────────┬────────┬────────┬─────────┐

│ seq │ name                         │ unique │ origin │ partial │

├─────┼──────────────────────────────┼────────┼────────┼─────────┤

│ 0   │ sqlite_autoindex_Territory_1 │ 1      │ pk     │ 0       │

└─────┴──────────────────────────────┴────────┴────────┴─────────┘


```

### `PRAGMA index_info(INDEX_NAME)`

Show the indexed column(s) for the given `INDEX_NAME`.

#### Return values

One row for each key column in the specified index. Each row contains:

1. `seqno`: the rank of the column within the index
2. `cid`: the rank of the column within the table being indexed
3. `name`: the name of the column being indexed

Example of `PRAGMA index_info`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA index_info("sqlite_autoindex_Territory_1")'


```

```

🌀 Executing on remote database d1-pragma-db (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 0.2523ms

┌───────┬─────┬──────┐

│ seqno │ cid │ name │

├───────┼─────┼──────┤

│ 0     │ 0   │ Id   │

└───────┴─────┴──────┘


```

### `PRAGMA index_xinfo("INDEX_NAME")`

Similar to `PRAGMA index_info("TABLE_NAME")` but also includes hidden columns.

Example of `PRAGMA index_xinfo`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA index_xinfo("sqlite_autoindex_Territory_1")'


```

```

🌀 Executing on remote database d1-pragma-db (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 0.6034ms

┌───────┬─────┬──────┬──────┬────────┬─────┐

│ seqno │ cid │ name │ desc │ coll   │ key │

├───────┼─────┼──────┼──────┼────────┼─────┤

│ 0     │ 0   │ Id   │ 0    │ BINARY │ 1   │

├───────┼─────┼──────┼──────┼────────┼─────┤

│ 1     │ -1  │      │ 0    │ BINARY │ 0   │

└───────┴─────┴──────┴──────┴────────┴─────┘


```

Explain Code

### `PRAGMA quick_check`

Checks the formatting and consistency of the table, including:

* Incorrectly formatted records
* Missing pages
* Sections of the database which are used multiple times, or are not used at all.

#### Return values

* **If there are no errors:** a single row with the value `OK`
* **If there are errors:** a string which describes the issues flagged by the check

Example of `PRAGMA quick_check`

Terminal window

```

npx wrangler d1 execute [DATABASE_NAME] --command='PRAGMA quick_check'


```

```

🌀 Executing on remote database [DATABASE_NAME] (DATABASE_ID):

🌀 To execute on your local development database, remove the --remote flag from your wrangler command.

🚣 Executed 1 commands in 1.4073ms

┌─────────────┐

│ quick_check │

├─────────────┤

│ ok          │

└─────────────┘


```

### `PRAGMA foreign_key_check`

Checks for invalid references of foreign keys in the selected table.

### `PRAGMA foreign_key_list("TABLE_NAME")`

Lists the foreign key constraints in the selected table.

### `PRAGMA case_sensitive_like = (on|off)`

Toggles case sensitivity for LIKE operators. When `PRAGMA case_sensitive_like` is set to:

* `ON`: 'a' LIKE 'A' is false
* `OFF`: 'a' LIKE 'A' is true (this is the default behavior of the LIKE operator)

### `PRAGMA ignore_check_constraints = (on|off)`

Toggles the enforcement of CHECK constraints. When `PRAGMA ignore_check_constraints` is set to:

* `ON`: check constraints are ignored
* `OFF`: check constraints are enforced (this is the default behavior)

### `PRAGMA legacy_alter_table = (on|off)`

Toggles the ALTER TABLE RENAME command behavior before/after the legacy version of SQLite (3.24.0). When `PRAGMA legacy_alter_table` is set to:

* `ON`: ALTER TABLE RENAME only rewrites the initial occurrence of the table name in its CREATE TABLE statement and any associated CREATE INDEX and CREATE TRIGGER statements. All other occurrences are unmodified.
* `OFF`: ALTER TABLE RENAME rewrites all references to the table name in the schema (this is the default behavior).

### `PRAGMA recursive_triggers = (on|off)`

Toggles the recursive trigger capability. When `PRAGMA recursive_triggers` is set to:

* `ON`: triggers which fire can activate other triggers (a single trigger can fire multiple times over the same row)
* `OFF`: triggers which fire cannot activate other triggers

### `PRAGMA reverse_unordered_selects = (on|off)`

Toggles the order of the results of a SELECT statement without an ORDER BY clause. When `PRAGMA reverse_unordered_selects` is set to:

* `ON`: reverses the order of results of a SELECT statement
* `OFF`: returns the results of a SELECT statement in the usual order

### `PRAGMA foreign_keys = (on|off)`

Toggles the foreign key constraint enforcement. When `PRAGMA foreign_keys` is set to:

* `ON`: stops operations which violate foreign key constraints
* `OFF`: allows operations which violate foreign key constraints

### `PRAGMA defer_foreign_keys = (on|off)`

Allows you to defer the enforcement of [foreign key constraints](https://developers.cloudflare.com/d1/sql-api/foreign-keys/) until the end of the current transaction. This can be useful during [database migrations](https://developers.cloudflare.com/d1/reference/migrations/), as schema changes may temporarily violate constraints depending on the order in which they are applied.

This does not disable foreign key enforcement outside of the current transaction. If you have not resolved outstanding foreign key violations at the end of your transaction, it will fail with a `FOREIGN KEY constraint failed` error.

Note that setting `PRAGMA defer_foreign_keys = ON` does not prevent `ON DELETE CASCADE` actions from being executed. While foreign key constraint checks are deferred until the end of a transaction, `ON DELETE CASCADE` operations will remain active, consistent with SQLite's behavior.

To defer foreign key enforcement, set `PRAGMA defer_foreign_keys = on` at the start of your transaction, or ahead of changes that would violate constraints:

```

-- Defer foreign key enforcement in this transaction.

PRAGMA defer_foreign_keys = on


-- Run your CREATE TABLE or ALTER TABLE / COLUMN statements

ALTER TABLE users ...


-- This is implicit if not set by the end of the transaction.

PRAGMA defer_foreign_keys = off


```

Refer to the [foreign key documentation](https://developers.cloudflare.com/d1/sql-api/foreign-keys/) to learn more about how to work with foreign keys.

### `PRAGMA optimize`

Attempts to optimize all schemas in a database by running the `ANALYZE` command for each table, if necessary. `ANALYZE` updates an internal table which contain statistics about tables and indices. These statistics helps the query planner to execute the input query more efficiently.

When `PRAGMA optimize` runs `ANALYZE`, it sets a limit to ensure the command does not take too long to execute. Alternatively, `PRAGMA optimize` may deem it unnecessary to run `ANALYZE` (for example, if the schema has not changed significantly). In this scenario, no optimizations are made.

We recommend running this command after making any changes to the schema (for example, after [creating an index](https://developers.cloudflare.com/d1/best-practices/use-indexes/)).

Note

Currently, D1 does not support `PRAGMA optimize(-1)`.

`PRAGMA optimize(-1)` is a command which displays all optimizations that would have been performed without actually executing them.

Refer to [SQLite PRAGMA optimize documentation ↗](https://www.sqlite.org/pragma.html#pragma%5Foptimize) for more information on how `PRAGMA optimize` optimizes a database.

## Query `sqlite_master`

You can also query the `sqlite_master` table to show all tables, indexes, and the original SQL used to generate them:

```

SELECT name, sql FROM sqlite_master


```

```

      {

        "name": "users",

        "sql": "CREATE TABLE users ( user_id INTEGER PRIMARY KEY, email_address TEXT, created_at INTEGER, deleted INTEGER, settings TEXT)"

      },

      {

        "name": "idx_ordered_users",

        "sql": "CREATE INDEX idx_ordered_users ON users(created_at DESC)"

      },

      {

        "name": "Order",

        "sql": "CREATE TABLE \"Order\" ( \"Id\" INTEGER PRIMARY KEY, \"CustomerId\" VARCHAR(8000) NULL, \"EmployeeId\" INTEGER NOT NULL, \"OrderDate\" VARCHAR(8000) NULL, \"RequiredDate\" VARCHAR(8000) NULL, \"ShippedDate\" VARCHAR(8000) NULL, \"ShipVia\" INTEGER NULL, \"Freight\" DECIMAL NOT NULL, \"ShipName\" VARCHAR(8000) NULL, \"ShipAddress\" VARCHAR(8000) NULL, \"ShipCity\" VARCHAR(8000) NULL, \"ShipRegion\" VARCHAR(8000) NULL, \"ShipPostalCode\" VARCHAR(8000) NULL, \"ShipCountry\" VARCHAR(8000) NULL)"

      },

      {

        "name": "Product",

        "sql": "CREATE TABLE \"Product\" ( \"Id\" INTEGER PRIMARY KEY, \"ProductName\" VARCHAR(8000) NULL, \"SupplierId\" INTEGER NOT NULL, \"CategoryId\" INTEGER NOT NULL, \"QuantityPerUnit\" VARCHAR(8000) NULL, \"UnitPrice\" DECIMAL NOT NULL, \"UnitsInStock\" INTEGER NOT NULL, \"UnitsOnOrder\" INTEGER NOT NULL, \"ReorderLevel\" INTEGER NOT NULL, \"Discontinued\" INTEGER NOT NULL)"

      }


```

Explain Code

## Search with LIKE

You can perform a search using SQL's `LIKE` operator:

JavaScript

```

const { results } = await env.DB.prepare(

  "SELECT * FROM Customers WHERE CompanyName LIKE ?",

)

  .bind("%eve%")

  .run();

console.log("results: ", results);


```

```

results:  [...]


```

## Related resources

* Learn [how to create indexes](https://developers.cloudflare.com/d1/best-practices/use-indexes/#list-indexes) in D1.
* Use D1's [JSON functions](https://developers.cloudflare.com/d1/sql-api/query-json/) to query JSON data.
* Use [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to run your Worker and D1 locally and debug issues before deploying.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/sql-api/","name":"SQL API"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/sql-api/sql-statements/","name":"SQL statements"}}]}
```
