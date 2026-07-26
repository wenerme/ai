# ICU Extension

The `icu` extension contains an easy-to-use version of the collation/timezone part of the [ICU library](https://github.com/unicode-org/icu).

## Installing and Loading

The `icu` extension will be transparently [autoloaded](https://duckdb.org/docs/current/extensions/overview.html#autoloading-extensions) on first use from the official extension repository.
If you would like to install and load it manually, run:

```sql
INSTALL icu;
LOAD icu;
```

## Features

The `icu` extension introduces the following features:

* [Region-dependent collations](https://duckdb.org/docs/current/sql/expressions/collations.html)
* [Time zones](https://duckdb.org/docs/current/sql/data_types/timezones.html), used for [timestamp data types](https://duckdb.org/docs/current/sql/data_types/timestamp.html) and [timestamp functions](https://duckdb.org/docs/current/sql/functions/timestamptz.html)
