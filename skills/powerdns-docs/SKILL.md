---
name: powerdns-docs
description: "Use when working with PowerDNS Authoritative Server: pdns.conf settings, backends, DNSSEC, primary/secondary operation, catalog zones, DNS UPDATE, TSIG, Lua records, HTTP API, pdnsutil, pdns_control, zone2sql, performance, upgrades, security advisories, and authoritative-server troubleshooting."
---

# PowerDNS Authoritative Server Docs

Official PowerDNS Authoritative Server documentation synced from [`PowerDNS/pdns/docs`](https://github.com/PowerDNS/pdns/tree/master/docs).

This skill intentionally keeps upstream reStructuredText (`.rst`) files instead of converting them to Markdown. PowerDNS uses Sphinx-specific roles and directives heavily (`:ref:`, `:doc:`, `.. code-block::`, `.. openapi::`, `.. json:schema::`, changelog directives, version directives). Keeping RST preserves anchors, cross-reference names, warning/note blocks, and API/schema directives more reliably than a lossy ad-hoc conversion.

## Scope

Use this skill for PowerDNS Authoritative Server (`pdns`) operation and configuration:

- `references/index.rst`, `indexTOC.rst` — documentation entrypoints.
- `references/installation.rst`, `running.rst`, `settings.rst`, `operating.rst`, `performance.rst`, `upgrading.rst` — install, runtime, config, ops, tuning, upgrades.
- `references/backends/` — BIND, generic SQL, MySQL, PostgreSQL, SQLite, ODBC, LDAP, LMDB, GeoIP, Lua, Pipe, Remote, TinyDNS, Random backends.
- `references/dnssec/` — DNSSEC modes, operational guidance, key rollovers, migration, PKCS#11, pdnsutil DNSSEC workflows.
- `references/http-api/` — Authoritative HTTP API, zones, cryptokeys, metadata, servers, cache, search, statistics, TSIG keys, OpenAPI YAML.
- `references/guides/` — record management, database basics, recursion, ALIAS, SVCB, virtual instances, DNSSEC rollovers.
- `references/lua-records/` — Lua records syntax, functions, examples, GeoIP, health checks, selectors, weights.
- `references/manpages/` — `pdns_server`, `pdnsutil`, `pdns_control`, `zone2sql`, `zone2json`, `ixplore`, `sdig`, and related tools.
- `references/security-advisories/`, `security.rst`, `common/security-policy.rst` — advisories and reporting policy.
- `references/http-api/openapi/authoritative-api-openapi.yaml` — raw API schema for fields and endpoint details.

This is not the full PowerDNS Recursor or dnsdist documentation set. A few utility manpages may appear because they are in the upstream `docs/` tree, but authoritative-server docs are the source of truth here.

## Hard Rules

- MUST search `references/` before answering specific PowerDNS configuration, backend, DNSSEC, API, or command questions.
- MUST preserve exact setting names, command names, metadata keys, backend launch names, and API fields from the docs.
- MUST distinguish authoritative-server behavior from Recursor and dnsdist behavior. If a question is about Recursor/dnsdist and this docs tree only has a manpage or no coverage, say so.
- MUST check version notes (`.. versionadded::`, `.. versionchanged::`, `.. deprecated::`) when answering compatibility or upgrade questions.
- MUST check backend-specific docs before giving schema, DNSSEC, primary/secondary, autoprimary, or API write behavior.
- NEVER invent defaults, SQL schema, HTTP API fields, or DNSSEC operational steps without checking the relevant reference.

## RST Notes

The reference files are RST, not Markdown. Search works normally with `rg`. When reading:

- `:ref:` and `:doc:` identify Sphinx cross-references; search the target label or nearby setting/section name.
- `.. code-block::` contains command/config/API examples.
- `.. warning::`, `.. note::`, `.. deprecated::`, `.. versionchanged::`, and `.. versionadded::` are important operational constraints.
- `.. openapi::` and `.. json:schema::` point to OpenAPI/schema content; use `references/http-api/openapi/authoritative-api-openapi.yaml` when field-level detail matters.
- Upstream `include` and `literalinclude` directives are expanded during sync where practical, so SQL schemas and backend examples are available inline.

## Fast Lookup

```bash
rg -n "setting-|allow-axfr|api-key|launch|primary|secondary|autoprimary|superslave|guardian|webserver" skills/powerdns-docs/references
rg -n "gmysql|gpgsql|gsqlite3|godbc|lmdb|bind|geoip|ldap|pipe|remote|schema" skills/powerdns-docs/references/backends
rg -n "DNSSEC|NSEC|NSEC3|rectify|pdnsutil|ksk|zsk|algorithm|presigned|secure" skills/powerdns-docs/references/dnssec skills/powerdns-docs/references
rg -n "HTTP API|X-API-Key|Zone|RRSet|metadata|cryptokey|tsigkey|PATCH|DELETE|rectify" skills/powerdns-docs/references/http-api
rg -n "pdnsutil|pdns_control|zone2sql|zone2json|pdns_server|ixplore|sdig" skills/powerdns-docs/references/manpages
rg -n "Lua|ifurlup|pickrandom|GeoIP|health|selector|weight" skills/powerdns-docs/references/lua-records
rg -n "versionadded|versionchanged|deprecated|Removed|upgrade|migration" skills/powerdns-docs/references
```

## Workflow

1. Classify the question: settings, backend, DNSSEC, HTTP API, Lua records, tool/manpage, upgrade, or security advisory.
2. Search the relevant subtree first, then broader `references/` for cross-cutting settings and version warnings.
3. Quote exact config/API/command identifiers from the docs.
4. For API answers, use both the topic page under `references/http-api/` and the OpenAPI YAML when field names or response shapes matter.
5. For backend answers, verify the backend capability matrix and any inline expanded SQL/schema examples before recommending config.
