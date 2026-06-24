---
name: mikroorm-docs
description: "MikroORM v7 documentation — TypeScript ORM for SQL and MongoDB with Data Mapper, Unit of Work, and Identity Map patterns. Covers entity definition (decorators, EntitySchema, defineEntity), relationships (1:1, M:1, 1:M, M:N), query builder (Kysely-based), migrations, seeding, caching, embeddables, inheritance mapping, serialization, virtual/view entities, composite keys, JSON properties, transactions, streaming, filters, events, folder-based discovery, NestJS/Next.js integration, and upgrading from v6 to v7. USE THIS SKILL WHEN the user asks about MikroORM entities, relationships, query builder, migrations, EntityManager, Unit of Work, or v7 upgrade."
version: 0.1.0
---

# MikroORM Documentation

Official docs for [MikroORM](https://mikro-orm.io) v7 — TypeScript ORM for Node.js based on Data Mapper, Unit of Work, and Identity Map patterns.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (78 docs)

### Getting Started Guide
- `references/guide/00-introduction.md` — Introduction
- `references/guide/01-first-entity.md` — First entity
- `references/guide/02-relationships.md` — Relationships tutorial
- `references/guide/03-project-setup.md` — Project setup
- `references/guide/04-advanced.md` — Advanced patterns
- `references/guide/05-type-safety.md` — Type safety

### Core Concepts
- `references/entity-manager.md` — EntityManager API
- `references/unit-of-work.md` — Unit of Work pattern
- `references/identity-map.md` — Identity Map
- `references/repositories.md` — Repositories
- `references/transactions.md` — Transactions
- `references/transactional-outbox.md` — Transactional outbox pattern

### Entity Definition
- `references/defining-entities.md` — Defining entities (decorators)
- `references/define-entity.md` — defineEntity() helper (v7 new)
- `references/using-decorators.md` — Decorators reference
- `references/decorators.md` — All decorators
- `references/schema-first-guide.md` — Schema-first approach
- `references/entity-constructors.md` — Entity constructors

### Relationships & Loading
- `references/relationships.md` — Relationships (all types)
- `references/collections.md` — Collections
- `references/populating-relations.md` — Populating relations
- `references/loading-strategies.md` — Loading strategies
- `references/dataloaders.md` — DataLoaders
- `references/type-safe-relations.md` — Type-safe relations

### Querying
- `references/query-builder.md` — Query builder (Kysely-based in v7)
- `references/query-conditions.md` — Query conditions / FilterQuery
- `references/raw-queries.md` — Raw SQL queries
- `references/kysely.md` — Kysely integration (v7 new)

### Schema & Migrations
- `references/migrations.md` — Migrations
- `references/schema-generator.md` — Schema generator
- `references/seeding.md` — Database seeding
- `references/entity-generator.md` — Entity generator

### Advanced
- `references/embeddables.md` — Embeddable entities
- `references/inheritance-mapping.md` — Inheritance (STI, TPT)
- `references/composite-keys.md` — Composite keys
- `references/json-properties.md` — JSON properties
- `references/custom-types.md` — Custom types
- `references/virtual-entities.md` — Virtual entities
- `references/view-entities.md` — Database views
- `references/materialized-views.md` — Materialized views
- `references/filters.md` — Entity filters
- `references/events.md` — Lifecycle events
- `references/serializing.md` — Serialization
- `references/streaming.md` — Streaming results
- `references/multiple-schemas.md` — Multiple schemas
- `references/using-bigint-pks.md` — BigInt primary keys

### Configuration & Integration
- `references/configuration.md` — Configuration reference
- `references/usage-with-nestjs.md` — NestJS integration
- `references/usage-with-nextjs.md` — Next.js integration
- `references/usage-with-sql.md` — SQL databases
- `references/usage-with-mongo.md` — MongoDB
- `references/usage-with-sqlite.md` — SQLite / libSQL / Turso
- `references/usage-with-cockroachdb.md` — CockroachDB
- `references/read-connections.md` — Read replicas

### Upgrading
- `references/upgrading-v6-to-v7.md` — v6 → v7 migration guide
- `references/upgrading-v5-to-v6.md` — v5 → v6
