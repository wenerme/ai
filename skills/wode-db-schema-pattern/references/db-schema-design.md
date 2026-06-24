# Wode DB Schema Design — Full Reference

> PostgreSQL table structure design principles and conventions.

## Project Modules

- Use PostgreSQL schema for logical separation
- NEVER put application tables in `public` schema
- Each module/domain uses its own schema: `agent`, `crm`, `auth`

## Complete Field Template

```sql
create table table_example
(
    -- Primary Identifiers
    id                   text        not null default 'prefix_' || uuidv7(),
    tid                  bigint      not null default current_tenant_id(),
    uid                  uuid        not null default gen_random_uuid(),
    sid                  bigint      not null default (next_entity_sid('Type')),

    -- Timestamps
    created_at           timestamptz not null default current_timestamp,
    updated_at           timestamptz not null default current_timestamp,
    deleted_at           timestamptz,

    -- External System Integration
    eid                  text        null,    -- External ID for data import
    cid                  text,                -- External system tenant identifier (vendor)
    rid                  text,                -- External system resource identifier

    -- Name Fields (avoid bare 'name')
    login_name           text,
    display_name         text,
    full_name            text,
    title                text,
    description          text,
    code                 text,                -- Code, tid+code generally unique

    -- State Machine
    state                text,                -- Coarse-grained system state
    status               text,                -- Fine-grained business status
    status_reason        text,                -- Status change reason
    status_updated_at    timestamptz,         -- Status update time
    status_updated_by_id text,                -- Status updater

    -- Auxiliary Fields
    notes                text,
    tags                 text[],
    metadata             jsonb       not null default '{}',
    raw                  jsonb,               -- For imported data

    -- Polymorphic Association
    entity_id            text,
    entity_type          text,
    customer_id          text,
    customer_type        text,                -- Account, Contact
    user_id              text,

    -- Audit Trail
    created_by_id        text                 default current_user_id(),
    updated_by_id        text                 default current_user_id(),
    deleted_by_id        text,

    -- Extension Data
    attributes           jsonb       not null default '{}',  -- Client read/write
    properties           jsonb       not null default '{}',  -- Server managed, client read-only
    extensions           jsonb       not null default '{}',  -- Internal use, hidden from client
    -- Ownership (CRM/ERP scenarios)
    owner_uid            uuid,
    owner_id             text,
    owner_type           text,                -- User, Team, Department
    owner_user_id        text generated always as ( case owner_type when 'User' then owner_id end ) stored,
    owner_team_id        text generated always as ( case owner_type when 'Team' then owner_id end ) stored,
    owner_department_id  text,

    -- Constraints
    primary key (tid, id),
    unique (tid, sid),
    unique (tid, uid)
);
```

## Field Categories

### Identifiers

| Field | Description |
|-------|-------------|
| `id` | Primary key, UUIDv7 with type prefix |
| `tid` | Tenant ID |
| `uid` | Globally unique UUID for cross-tenant references |
| `sid` | Sequential number within tenant, for display |

### External Integration

| Field | Description |
|-------|-------------|
| `eid` | External ID for data import, maps to other internal system IDs |
| `cid` | External system tenant identifier (vendor) |
| `rid` | External system resource identifier |

### State Management

| Field | Description |
|-------|-------------|
| `state` | Coarse-grained system state: `Active`, `Inactive`, `Suspended` |
| `status` | Fine-grained business status: `Draft`, `Pending`, `Approved` |
| `status_reason` | Reason for status change |
| `status_updated_at` | When status was last updated |
| `status_updated_by_id` | Who updated the status |

### Extension Data

| Field | Description |
|-------|-------------|
| `attributes` | Client read/write |
| `properties` | Server managed, client read-only |
| `extensions` | Internal use, hidden from client |
| `metadata` | Supplementary descriptive content |
| `raw` | Raw imported data |

## Multi-Tenant Pattern

```sql
-- Standard tenant isolation
CREATE TABLE example_table (
    -- ... fields ...
    tid bigint NOT NULL DEFAULT current_tenant_id(),
    PRIMARY KEY (tid, id),
    UNIQUE (tid, uid)
);

-- Usage
SELECT set_config('tenant.id', '1', true);
```

## Naming Conventions

### Table Naming
- Prefer singular: `user`, `order`
- System tables may use plural: `users`, `groups`
- Avoid reserved keywords, or use prefix: `app_user`

### Enum Values — MUST use PascalCase

```sql
-- Correct
owner_type  text,  -- User, Team, Department
state       text,  -- Active, Inactive, Suspended
status      text,  -- Draft, Pending, Approved, Rejected

-- Wrong
owner_type  text,  -- user, team, department (lowercase)
state       text,  -- ACTIVE, INACTIVE (uppercase)
```

### Index Naming

- Use `table_column_idx` format
- Always add `IF NOT EXISTS`

```sql
CREATE INDEX IF NOT EXISTS user_profile_user_id_idx ON user_profile USING btree (user_id);
CREATE INDEX IF NOT EXISTS user_profile_display_name_idx ON user_profile USING gin (to_tsvector('english', display_name));
```

## Foreign Keys

- Use foreign keys for data integrity
- Helps improve query performance
- Balance against insert/update overhead
