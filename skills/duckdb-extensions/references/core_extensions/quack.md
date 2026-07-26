# Quack Extension

The `quack` extension adds support for the [Quack remote protocol](https://duckdb.org/docs/current/quack/overview.html).

## Usage

Quack is currently in a beta state. Quack will be transparently autoinstalled and [autoloaded](https://duckdb.org/docs/current/extensions/overview.html#autoloading-extension) on first use.

If you would like to install Quack explicitly, run:

```sql
INSTALL quack;
```

If you would like to load Quack explicitly, run:

```sql
LOAD quack;
```

## Limitations

> Warning As of DuckDB v1.5.3, `quack` is in an experimental state. The protocol, the function names, and implementation details are all subject to change.
> Quack is expected to reach stable status in DuckDB v2.0.0, scheduled for [September 2026](https://duckdb.org/release_calendar.html#upcoming-releases).
