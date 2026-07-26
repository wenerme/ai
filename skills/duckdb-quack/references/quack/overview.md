# Quack Remote Protocol

> We released Quack on May 12, 2026. Read the [announcement blog post](https://duckdb.org/2026/05/12/quack-remote-protocol.html)!

The Quack extension turns a DuckDB instance into a server that other DuckDB instances (clients) can connect to over HTTP.

This page covers the protocol at a glance and walks through basic usage on both sides of the wire.
For the full list of functions, settings, and logging knobs, see the [Reference](https://duckdb.org/docs/current/quack/reference.html). For configuring TLS and authentication / authorization, see [Security](https://duckdb.org/docs/current/quack/security.html). For user guides, see [Guides](https://duckdb.org/docs/current/quack/setup/overview.html).

> Warning Quack is under active development and the protocol, function names, settings, and defaults are still subject to change. This page documents the beta release of Quack, available in [DuckDB v1.5.3](https://duckdb.org/2026/05/20/announcing-duckdb-153.html), shipped via the `core` repository.

## Quack in a Nutshell

In short, the Quack protocol and its interactions work as follows:

* **HTTP-based.** Quack messages travel over plain HTTP or HTTPS via a reverse proxy (see [Security](https://duckdb.org/docs/current/quack/security.html)). This means standard load balancers, firewalls, and reverse proxies handle Quack traffic the same way they handle any other HTTP service. There is no custom wire transport to operate.
* **Client-driven request and response.** Every interaction is initiated by the client. The server does not initiate interactions via pushing.
* **`application/duckdb` serialization.** Requests and responses are encoded with DuckDB's internal serialization primitives (the same code path used by the [Write-Ahead Log](https://duckdb.org/2024/10/30/analytics-optimized-concurrent-transactions.html#write-ahead-logging-and-checkpointing)). This avoids round-tripping data through an interchange format and keeps complex types (nested, decimals, intervals, ...) lossless across the wire.
* **Single round-trip per query.** After the initial connection handshake, a query needs only one request–response pair. Large results stream back in chunks via follow-up `FETCH` requests, optionally parallelized on multiple threads.
* **Default port: `9494`.** All URIs use the `quack:` scheme, e.g., `quack:hostname:port` with the port defaulting to `9494`.

## Server-Side Usage

### Starting a Server

A server is started from an existing DuckDB session. Everything that the session can see (in-memory tables, attached files, schemas) becomes reachable over the remote protocol.

To start listening on localhost, run:


```sql
CALL quack_serve('quack:localhost');
```

`quack_serve` returns the listen URI, the HTTP URL, and, when the default authentication function is in use, and the `auth_token` that clients need to connect.
This token can also be set explicitly before starting (see [Security](https://duckdb.org/docs/current/quack/security.html)).

By default the server refuses to bind anything other than a local hostname. To listen on an externally-reachable address, pass `allow_other_hostname => true`:


```sql
CALL quack_serve('quack:0.0.0.0:9494', allow_other_hostname => true);
```

When you do this you should front the server with a TLS-terminating reverse proxy. See [Securing Quack with a Reverse Proxy](https://duckdb.org/docs/current/quack/setup/reverse_proxy.html).

### URI Format

Quack endpoints use the `quack:` URI scheme and `9494` as the default port. Some examples:

| URI                 | Host        | Port   | Comment |
| ------------------- | ----------- | ------ | ------- |
| `quack:localhost`   | `localhost` | `9494` |         |
| `quack://localhost` | `localhost` | `9494` |         |
| `quack:myhost:9000` | `myhost`    | `9000` |         |
| `quack:127.0.0.1`   | `127.0.0.1` | `9494` |         |
| `quack:[::1]:1234`  | `::1`       | `1234` | (IPv6)  |

You can parse and validate a URI with the `quack_uri_parser(uri, ssl)` scalar function.

### Stopping a Server

To stop a server, run:


```sql
CALL quack_stop('quack:localhost');
```

## Client-Side Usage

There are two ways to talk to a Quack server:

1. `quack_query(uri, query)`: [stateless querying](#stateless-queries-with-quack_query).
2. `ATTACH 'quack:host' AS name`: [attach the remote as a full catalog](#attaching-a-remote-database).

In both cases, you need to [authenticate](#authentication).

The client picks plain HTTP automatically for local URIs (`localhost`, `127.0.0.1`, `::1`) and HTTPS otherwise.
Either default can be overridden with the `DISABLE_SSL` configuration option.

### Stateless Queries with `quack_query`

You can run any SQL against a server without attaching it.
To query a local database via HTTP, run:


```sql
FROM quack_query(
    'quack:localhost',
    'SELECT 42',
    token = '⟨MY_QUACK_TOKEN_01234567890ABCDEF⟩');
```

Remote databases use HTTPS by default. To override on a plain-HTTP remote, run:


```sql
FROM quack_query(
    'quack:remote.com',
    'SELECT 42',
    token = '⟨MY_QUACK_TOKEN_01234567890ABCDEF⟩',
    disable_ssl => true
);
```

The query executes remotely and the server stream the result back.
Errors occurring on the server (parse errors, missing tables, etc.) are shown locally in the DuckDB client.

### Attaching a Remote Database

To attach a local database via HTTP, simply run:


```sql
ATTACH 'quack:localhost' AS remote_db (
    TOKEN '⟨MY_QUACK_TOKEN_01234567890ABCDEF⟩'
);
```

Attaching remote databases uses HTTPS by default. To override on a plain-HTTP remote:


```sql
ATTACH 'quack:remote.com' AS remote_db (
    TOKEN '⟨MY_QUACK_TOKEN_01234567890ABCDEF⟩',
    DISABLE_SSL true
);
```

Once attached, remote tables look and behave like local ones:


```sql
CREATE TABLE remote_db.t AS FROM range(10) r(i);  -- DDL on remote
INSERT INTO remote_db.t VALUES (42);              -- remote writes
```

You can run queries against the remote database:


```sql
FROM remote_db.t;              -- scan remote table
FROM remote_db.t WHERE i = 42; -- run filter remotely
BEGIN; ...; COMMIT;            -- transactions are forwarded
DETACH quack;                  -- detach from the remote database
```

The attached catalog also exposes a `query` table macro for ad-hoc SQL scoped to that attachment:


```sql
FROM remote_db.query('SELECT 42');
```

### Authentication

Clients pass the authentication token to the server in one of two ways: a `quack` secret scoped to the server URI or an explicit `TOKEN` option on `ATTACH` / `quack_query`.
See [Security](https://duckdb.org/docs/current/quack/security.html) for the full picture.

We recommend using a [secret](https://duckdb.org/docs/current/configuration/secrets_manager.html) scoped to the server URI:


```sql
CREATE SECRET (
    TYPE quack,
    TOKEN '⟨MY_QUACK_TOKEN_01234567890ABCDEF⟩',
    SCOPE 'quack:localhost'
);

ATTACH 'quack:localhost' AS remote_db (TYPE quack);
```

Alternatively, you can pass the token directly, which overrides any matching secret:


```sql
ATTACH 'quack:localhost' AS remote_db (
    TOKEN '⟨MY_QUACK_TOKEN_01234567890ABCDEF⟩'
);
```

### HTTP Connection Caching

By default, each Quack client request opens a fresh connection to the server — a new TCP and, with SSL, a costly TLS handshake. Connection caching reuses connections across requests, reducing per-query latency on repeated requests:


```sql
SET httpfs_connection_caching = true;
```

### Node Identity (`whoami`)

Each Quack node exposes a `whoami()` table macro that surfaces basic identity and runtime info, useful when proxying to a fleet of servers or when correlating logs:


```sql
FROM remote_db.query('FROM whoami()');
```

```text
┌─────────┬──────────┬──────────┬─────────┬─────────────────┬───────────────────────────────┬────────────────────────────────────────────────────┐
│  name   │ provider │ hostname │ region  │     uptime      │            ts_now             │                        meta                        │
│ varchar │ varchar  │ varchar  │ varchar │    interval     │   timestamp with time zone    │                        json                        │
├─────────┼──────────┼──────────┼─────────┼─────────────────┼───────────────────────────────┼────────────────────────────────────────────────────┤
│ NULL    │ NULL     │ NULL     │ NULL    │ 00:04:56.832456 │ 2026-05-22 15:59:38.631715+02 │ {"duckdb_version":"v1.5.3","platform":"osx_arm64"} │
└─────────┴──────────┴──────────┴─────────┴─────────────────┴───────────────────────────────┴────────────────────────────────────────────────────┘
```

Identity fields are populated either by setting `whoami_*` options directly or by calling the `quack_identify` helper:


```sql
CALL quack_identify(
    name => 'analytics-1',
    provider => 'ec2',
    region => 'eu-west-1',
    meta => '{"role": "worker"}'
);
```

`meta` is merged with auto-computed `duckdb_version` and `platform` keys; user-supplied keys win on conflict.
`whoami_started_at` (an ISO 8601 timestamp) overrides the uptime anchor, otherwise uptime is measured from extension load.
