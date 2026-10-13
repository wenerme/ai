---
description: Muse Wonder 1.0 is Meta's agentic and coding model for complex software engineering, multi-step tool loops, and long-context reasoning.
title: Muse Wonder 1.0
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/llms.txt
> Use this file to discover all available pages before exploring further.

![Meta logo](https://developers.cloudflare.com/_astro/meta.CTzB_ysm.svg)

# Muse Wonder 1.0

Text Generation • Meta

Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`meta/muse-wonder-1.0`

- Third-party

Muse Wonder 1.0 is Meta's agentic and coding model for complex software engineering, multi-step tool loops, and long-context reasoning.

| Model Info | |
| --- | --- |
| More information | [link ↗](https://dev.meta.ai/docs/models) |
| Request formats | Responses |
| Pricing | <ul><li>Input (per 1M tokens)$4.00</li><li>Cached input (per 1M tokens)$0.20</li><li>Output (per 1M tokens)$20.00</li></ul> |

## Usage

```ts
const response = await env.AI.run(
  'meta/muse-wonder-1.0',
  {
    input:
      'Plan the implementation of a production-safe database migration that splits a large tenants table into tenant metadata and tenant billing tables without downtime. Include discovery, dual-write, backfill, verification, cutover, rollback, and cleanup phases. For each phase, list the invariant to verify and the signal that should stop the rollout.',
    max_output_tokens: 4096,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-wonder-1.0",
  "input": "Plan the implementation of a production-safe database migration that splits a large tenants table into tenant metadata and tenant billing tables without downtime. Include discovery, dual-write, backfill, verification, cutover, rollback, and cleanup phases. For each phase, list the invariant to verify and the signal that should stop the rollout.",
  "max_output_tokens": 4096
}'
```

```
# Production-Safe Split: `tenants` → `tenant_metadata` + `tenant_billing`

Use the **expand → migrate → contract** pattern. The old `tenants` table remains the source of truth until cutover is proven, every step is feature-flagged, and nothing destructive happens until after a bake period.

**Target shape (example):**
- `tenant_metadata`: `tenant_id (PK, same IDs as today)`, name, slug, status, region, settings, `created_at`, `updated_at`
- `tenant_billing`: `tenant_id (PK, FK → tenant_metadata)`, billing_email, payment_provider_customer_id, subscription_id, plan, currency, tax_id, billing_address, `created_at`, `updated_at`
- Keep `tenant_id` identical to the existing `tenants.id` so existing foreign keys don't need to be rewritten.

**Cross-cutting controls for all phases:** flags for `dual_write_enabled`, `read_new_pct`, `write_primary_new`; dashboards for write error rate, p99 latency, replica lag, dual-write failures, and row-diff counts; a named rollback owner; no phase transitions during month-end billing runs or peak traffic.

---

### Phase 0 — Discovery

**Actions**
- Inventory every column in `tenants` and classify it as metadata, billing, both, or dead. Resolve ambiguous columns (e.g., `plan`) to a single owner.
- Inventory every reader/writer: application code, ORMs, background jobs, cron/Lambdas, BI/ETL, admin tooling, and downstream consumers (webhooks, invoices, data warehouse) using query logs (`pg_stat_statements` or equivalent).
- Map foreign keys, triggers, unique constraints, and indexes referencing `tenants`.
- Measure table size (rows, GB, growth rate), write TPS, hot tenants, NULL/duplicate rates in billing columns, and whether a reliable PK + `updated_at` cursor exists for resumable backfill.
- Check compliance: billing fields may carry stricter access control, encryption, audit, and retention requirements once isolated.
- Rehearse the full migration in staging with production-like volume and measure DDL/backfill timing.

**Invariant to verify:** Every column is assigned to exactly one destination table, and every read/write path is known and owned.

**Stop signal:** Any undocumented writer (stray script, forgotten job), a column with unclear ownership, or an external consumer you can't observe or update. Do not proceed on an incomplete inventory.

---

### Phase 1 — Expand (create new schema, change nothing else)

**Actions**
- Create `tenant_metadata` and `tenant_billing` empty, with indexes and constraints. In Postgres use `CREATE INDEX CONCURRENTLY` and add FKs as `NOT VALID` then `VALIDATE CONSTRAINT` to avoid long locks; in MySQL require `ALGORITHM=INPLACE, LOCK=NONE` or an online-schema-change tool.
- Optionally create a compatibility view so old code can keep reading a joined shape later.
- Deploy no application changes yet; old code runs untouched against `tenants`.

**Invariant to verify:** Production behavior is unchanged — old application works exactly as before, new tables are empty, and DDL caused no lock waits or replica lag beyond baseline.

**Stop signal:** Lock wait > a few seconds, replica lag spiking during DDL, or any regression in the existing test suite against the new schema. Drop the new tables and retry off-peak.

---

### Phase 2 — Dual-Write

**Actions**
- Deploy application code (flag off, then ramp 1% → 100%) that writes to both `tenants` (still primary) and the new tables. Because both live in the same database, write them **in the same transaction** so they can't diverge on partial failure.
- Make writes idempotent (`INSERT ... ON CONFLICT (tenant_id) DO UPDATE`) so retries are safe.
- Reads still come only from `tenants`. Add metrics/alerts on dual-write failures.
- Add a safety net: a reconciliation job (Phase 4) that catches anything dual-write misses.

**Invariant to verify:** For every tenant created or updated since the flag was enabled, a corresponding row exists in both new tables, field-for-field identical to the mapped columns in `tenants`.

**Stop signal:** Dual-write failure rate > ~0.05–0.1%, any duplicate-key or constraint errors, p99 write latency up >20% over baseline for 10 minutes, or rising mismatch counts. Turn the flag off — reads are unaffected, so this rollback is trivial.

---

### Phase 3 — Backfill (historical data)

**Actions**
- Copy existing rows in small keyset-paginated chunks (`WHERE id > :last_id ORDER BY id LIMIT 1000`), checkpointing `last_id` so the job is resumable.
- Use idempotent upserts; only overwrite when the source `updated_at` is newer, so backfill never clobbers fresher dual-written data.
- Throttle: pause automatically when replica lag, CPU, or I/O crosses thresholds; run heavier chunks off-peak. Estimate total duration from a staging dry run.

**Invariant to verify:** For every completed ID range, destination row counts and per-range checksums match the source, and the job can restart from its checkpoint without loss or duplication.

**Stop signal:** Replica lag > 5–10s sustained, DB CPU/IO saturation impacting production latency, or any checksum mismatch in a completed chunk. The job should self-pause; investigate before resuming.

---

### Phase 4 — Verification

**Actions**
- Continuous comparison job: row counts, aggregate/per-tenant hashes (e.g., hash of concatenated mapped columns), orphan checks (`tenant_billing` rows with no `tenant_metadata` row and vice versa), and random sampling of ~1% of tenants plus all recently written tenants.
- **Shadow reads:** for a sample of live requests, read from the new tables and compare against the `tenants` result without serving it. Log mismatches.
- Reconcile any diffs by replaying from `tenants` (still the source of truth), then re-verify.
- Verify in-flight correctness: counts may differ momentarily due to writes in progress, so compare on a quiesced watermark (e.g., only rows with `updated_at` older than 5 minutes).

**Invariant to verify:** Zero unexplained differences in billing fields, zero orphans, and shadow-read parity at 100% (billing data tolerates no "close enough") over at least several days including a peak period.

**Stop signal:** Any persistent billing-field mismatch after replay, orphan rows, or shadow-read mismatch rate above zero for billing / >0.001% for metadata. Cutover is blocked until diffs are explained and fixed at the root cause.

---

### Phase 5 — Cutover

**Actions**
- Ramp reads to the new tables by flag: internal tenants → 1% → 5% → 25% → 50% → 100%, holding each step long enough to watch error rate, p99, and shadow-diff metrics.
- Then flip write primacy: new tables become the source of truth, but **keep reverse dual-writing back to `tenants`** for the entire bake period (recommend 2–4 weeks, spanning at least one full billing cycle).
- Announce a change freeze on billing logic during cutover; staff support/on-call for billing anomalies.

**Invariant to verify:** User-visible responses and billing operations (invoice generation, subscription changes) are identical to pre-cutover behavior, with no latency or error-budget regression at each ramp step.

**Stop signal:** 5xx/error rate > baseline +0.1%, p99 regression >20%, any confirmed billing discrepancy or relevant support tickets, or mismatch alerts firing. Execute rollback (below) — it must take <5 minutes via flag flip.

---

### Phase 6 — Rollback (standing capability, rehearsed before cutover)

**Actions**
- Before cutover: rolling back = disable dual-write flag. Nothing else needed.
- After read cutover: flip `read_new_pct` to 0. Safe because dual-write kept `tenants` current.
- After write cutover: flip write primacy back to `tenants`. Safe **only** because reverse dual-write kept `tenants` up to date during the bake period.
- Rehearse this in staging/game-day before Phase 5; test the actual flag flips and measure time-to-rollback.

**Invariant to verify:** At all times during the bake period, `tenants` is complete and no more than a few seconds behind the new tables, so it can resume serving reads/writes with no data loss.

**Stop signal (for forward progress):** Reverse-sync lag growing, a failed rollback rehearsal, or rollback time exceeding your SLO. If you cannot prove rollback works, you do not cut over.

---

### Phase 7 — Cleanup / Contract

**Actions**
- After the bake period (≥ one full billing cycle with zero rollbacks and zero diff alerts), confirm via query logs and application metrics that nothing has read the legacy billing columns for at least 14 days.
- Take a verified backup/snapshot (and test a restore) of the pre-cleanup state; set a retention window (e.g., 90 days).
- Remove dual-write code and flags, stop reverse sync, then drop the billing columns from the old table (or rename `tenants` → `tenant_metadata` and drop the now-redundant table) using online DDL. Keep a read-only archive copy until retention expires.

**Invariant to verify:** No code path, job, report, or consumer touches the legacy columns, and a tested restore point exists.

**Stop signal:** Any detected access to legacy columns, an unresolved data diff, a legal/audit hold, or an incomplete billing cycle. Delay cleanup — it is the only irreversible phase, so it is also the easiest to postpone.

---

### Quick-reference

| Phase | Invariant | Stop signal |
|---|---|---|
| Discovery | All columns + all read/write paths inventoried | Unknown writer or ambiguous column ownership |
| Expand | Old app unchanged; no locks/lag from DDL | Lock waits or replica lag during DDL |
| Dual-write | New tables mirror `tenants` for all new writes | Dual-write failures >0.1%, p99 +20% |
| Backfill | Completed ranges checksum-match; resumable | Replica lag >5–10s, any chunk mismatch |
| Verification | Zero billing diffs, zero orphans, 100% shadow parity | Any persistent mismatch |
| Cutover | Identical responses/billing; latency & errors flat | Errors +0.1%, billing discrepancy |
| Rollback | `tenants` always ≤ seconds behind; rollback <5 min | Failed rehearsal or reverse-sync lag |
| Cleanup | Zero legacy-column access for 14+ days; tested backup | Any legacy access, audit hold, open billing cycle |

**Key principles throughout:** same-database transactional dual-writes where possible, idempotency everywhere, throttled resumable backfill, billing fields held to a zero-mismatch standard, reversibility until the final cleanup, and phase gates tied to metrics — not to the calendar.
```

```json
{
  "id": "resp_6acd1aea89f8d9a1a0bb4e41",
  "object": "response",
  "created_at": 1791826666,
  "model": "muse-wonder-1.0",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6acd1aea89f8d9a1a0bb4e41:rs_df76e31a-3059-442f-a013-dd266b1c6b5c",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_4bb9f7bb-7885-4cff-9d6e-05fd786f37f2",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "# Production-Safe Split: `tenants` → `tenant_metadata` + `tenant_billing`\n\nUse the **expand → migrate → contract** pattern. The old `tenants` table remains the source of truth until cutover is proven, every step is feature-flagged, and nothing destructive happens until after a bake period.\n\n**Target shape (example):**\n- `tenant_metadata`: `tenant_id (PK, same IDs as today)`, name, slug, status, region, settings, `created_at`, `updated_at`\n- `tenant_billing`: `tenant_id (PK, FK → tenant_metadata)`, billing_email, payment_provider_customer_id, subscription_id, plan, currency, tax_id, billing_address, `created_at`, `updated_at`\n- Keep `tenant_id` identical to the existing `tenants.id` so existing foreign keys don't need to be rewritten.\n\n**Cross-cutting controls for all phases:** flags for `dual_write_enabled`, `read_new_pct`, `write_primary_new`; dashboards for write error rate, p99 latency, replica lag, dual-write failures, and row-diff counts; a named rollback owner; no phase transitions during month-end billing runs or peak traffic.\n\n---\n\n### Phase 0 — Discovery\n\n**Actions**\n- Inventory every column in `tenants` and classify it as metadata, billing, both, or dead. Resolve ambiguous columns (e.g., `plan`) to a single owner.\n- Inventory every reader/writer: application code, ORMs, background jobs, cron/Lambdas, BI/ETL, admin tooling, and downstream consumers (webhooks, invoices, data warehouse) using query logs (`pg_stat_statements` or equivalent).\n- Map foreign keys, triggers, unique constraints, and indexes referencing `tenants`.\n- Measure table size (rows, GB, growth rate), write TPS, hot tenants, NULL/duplicate rates in billing columns, and whether a reliable PK + `updated_at` cursor exists for resumable backfill.\n- Check compliance: billing fields may carry stricter access control, encryption, audit, and retention requirements once isolated.\n- Rehearse the full migration in staging with production-like volume and measure DDL/backfill timing.\n\n**Invariant to verify:** Every column is assigned to exactly one destination table, and every read/write path is known and owned.\n\n**Stop signal:** Any undocumented writer (stray script, forgotten job), a column with unclear ownership, or an external consumer you can't observe or update. Do not proceed on an incomplete inventory.\n\n---\n\n### Phase 1 — Expand (create new schema, change nothing else)\n\n**Actions**\n- Create `tenant_metadata` and `tenant_billing` empty, with indexes and constraints. In Postgres use `CREATE INDEX CONCURRENTLY` and add FKs as `NOT VALID` then `VALIDATE CONSTRAINT` to avoid long locks; in MySQL require `ALGORITHM=INPLACE, LOCK=NONE` or an online-schema-change tool.\n- Optionally create a compatibility view so old code can keep reading a joined shape later.\n- Deploy no application changes yet; old code runs untouched against `tenants`.\n\n**Invariant to verify:** Production behavior is unchanged — old application works exactly as before, new tables are empty, and DDL caused no lock waits or replica lag beyond baseline.\n\n**Stop signal:** Lock wait > a few seconds, replica lag spiking during DDL, or any regression in the existing test suite against the new schema. Drop the new tables and retry off-peak.\n\n---\n\n### Phase 2 — Dual-Write\n\n**Actions**\n- Deploy application code (flag off, then ramp 1% → 100%) that writes to both `tenants` (still primary) and the new tables. Because both live in the same database, write them **in the same transaction** so they can't diverge on partial failure.\n- Make writes idempotent (`INSERT ... ON CONFLICT (tenant_id) DO UPDATE`) so retries are safe.\n- Reads still come only from `tenants`. Add metrics/alerts on dual-write failures.\n- Add a safety net: a reconciliation job (Phase 4) that catches anything dual-write misses.\n\n**Invariant to verify:** For every tenant created or updated since the flag was enabled, a corresponding row exists in both new tables, field-for-field identical to the mapped columns in `tenants`.\n\n**Stop signal:** Dual-write failure rate > ~0.05–0.1%, any duplicate-key or constraint errors, p99 write latency up >20% over baseline for 10 minutes, or rising mismatch counts. Turn the flag off — reads are unaffected, so this rollback is trivial.\n\n---\n\n### Phase 3 — Backfill (historical data)\n\n**Actions**\n- Copy existing rows in small keyset-paginated chunks (`WHERE id > :last_id ORDER BY id LIMIT 1000`), checkpointing `last_id` so the job is resumable.\n- Use idempotent upserts; only overwrite when the source `updated_at` is newer, so backfill never clobbers fresher dual-written data.\n- Throttle: pause automatically when replica lag, CPU, or I/O crosses thresholds; run heavier chunks off-peak. Estimate total duration from a staging dry run.\n\n**Invariant to verify:** For every completed ID range, destination row counts and per-range checksums match the source, and the job can restart from its checkpoint without loss or duplication.\n\n**Stop signal:** Replica lag > 5–10s sustained, DB CPU/IO saturation impacting production latency, or any checksum mismatch in a completed chunk. The job should self-pause; investigate before resuming.\n\n---\n\n### Phase 4 — Verification\n\n**Actions**\n- Continuous comparison job: row counts, aggregate/per-tenant hashes (e.g., hash of concatenated mapped columns), orphan checks (`tenant_billing` rows with no `tenant_metadata` row and vice versa), and random sampling of ~1% of tenants plus all recently written tenants.\n- **Shadow reads:** for a sample of live requests, read from the new tables and compare against the `tenants` result without serving it. Log mismatches.\n- Reconcile any diffs by replaying from `tenants` (still the source of truth), then re-verify.\n- Verify in-flight correctness: counts may differ momentarily due to writes in progress, so compare on a quiesced watermark (e.g., only rows with `updated_at` older than 5 minutes).\n\n**Invariant to verify:** Zero unexplained differences in billing fields, zero orphans, and shadow-read parity at 100% (billing data tolerates no \"close enough\") over at least several days including a peak period.\n\n**Stop signal:** Any persistent billing-field mismatch after replay, orphan rows, or shadow-read mismatch rate above zero for billing / >0.001% for metadata. Cutover is blocked until diffs are explained and fixed at the root cause.\n\n---\n\n### Phase 5 — Cutover\n\n**Actions**\n- Ramp reads to the new tables by flag: internal tenants → 1% → 5% → 25% → 50% → 100%, holding each step long enough to watch error rate, p99, and shadow-diff metrics.\n- Then flip write primacy: new tables become the source of truth, but **keep reverse dual-writing back to `tenants`** for the entire bake period (recommend 2–4 weeks, spanning at least one full billing cycle).\n- Announce a change freeze on billing logic during cutover; staff support/on-call for billing anomalies.\n\n**Invariant to verify:** User-visible responses and billing operations (invoice generation, subscription changes) are identical to pre-cutover behavior, with no latency or error-budget regression at each ramp step.\n\n**Stop signal:** 5xx/error rate > baseline +0.1%, p99 regression >20%, any confirmed billing discrepancy or relevant support tickets, or mismatch alerts firing. Execute rollback (below) — it must take <5 minutes via flag flip.\n\n---\n\n### Phase 6 — Rollback (standing capability, rehearsed before cutover)\n\n**Actions**\n- Before c
... response truncated ...
```

## Examples

<details>

<summary>**Distributed Job Queue Redesign** — Redesign a distributed job queue while making concurrency and failure semantics explicit.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-wonder-1.0',
  {
    input:
      'Design a distributed job queue for a multi-tenant SaaS platform processing billing and notification jobs. It must preserve per-tenant ordering, support at-least-once delivery, tolerate worker crashes, allow replay for seven days, enforce tenant-specific concurrency limits, and prevent one tenant from starving others. Compare two architectures, recommend one, define the job state machine and idempotency contract, and list the metrics and alerts needed for rollout.',
    max_output_tokens: 4096,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-wonder-1.0",
  "input": "Design a distributed job queue for a multi-tenant SaaS platform processing billing and notification jobs. It must preserve per-tenant ordering, support at-least-once delivery, tolerate worker crashes, allow replay for seven days, enforce tenant-specific concurrency limits, and prevent one tenant from starving others. Compare two architectures, recommend one, define the job state machine and idempotency contract, and list the metrics and alerts needed for rollout.",
  "max_output_tokens": 4096
}'
```

````
## Architecture Comparison

| Dimension | A: Partitioned Log (e.g., Kafka) | B: Virtual Per-Tenant Queues + Fair Scheduler |
|---|---|---|
| **Design** | Hash `tenant_id` to a partition; workers consume partitions. Ordering guaranteed per partition. | Jobs stored in a durable DB (e.g., Postgres, partitioned by tenant). A dispatcher leases jobs to stateless workers using weighted fair queuing. |
| **Ordering** | Strong per partition, but a slow/poison job blocks unrelated tenants sharing that partition. Retries/delays break ordering. | Strong per tenant lane via monotonic sequence numbers; retries block only that lane. |
| **Fairness & concurrency** | Hard: partition assignment is coarse, hot tenants skew partitions, per-tenant caps require extra machinery. | Native: dispatcher enforces per-tenant in-flight caps and round-robin/weighted scheduling. |
| **Replay (7 days)** | Excellent: built-in retention and offset rewind. | Requires retaining terminal jobs for 7 days and a replay API (manageable). |
| **Crash tolerance** | Offset committed only after success gives at-least-once. | Lease/visibility timeout with expiry and requeue gives at-least-once. |
| **Scale / ops** | Very high throughput, mature ecosystem; but rebalancing pain and limited per-job control (no per-job delay/priority easily). | Throughput bounded by DB; needs sharding at high scale. Simpler per-job control, queries, and auditing. |

## Recommendation: Architecture B

Billing and notification workloads are moderate-throughput but correctness- and fairness-sensitive, so fine-grained control beats raw log throughput.

**Components:**

1. **Enqueue API + transactional outbox** — the job row is written in the same transaction as the business change, so jobs are never lost or phantom-created.
2. **Ordering** — ordering key is `tenant_id + lane` (billing, notifications are separate lanes so notifications can't block charges). Each lane gets a monotonic sequence; the dispatcher only leases the lowest unacknowledged sequences. Within a lane, execution is effectively sequential; tenant concurrency applies *across* lanes/keys.
3. **Fair dispatcher** — deficit round-robin / weighted fair queuing across tenants (weights by tier), with a hard per-tenant in-flight semaphore. Scheduling is work-conserving: idle tenants' capacity is usable by others, but a backlogged tenant always gets its guaranteed share within one scheduling round. Aging prevents low-weight tenants from waiting indefinitely. Separate worker pools for billing vs. notifications add a second isolation layer.
4. **Crash tolerance** — workers hold a lease (e.g., 30–60s visibility timeout) extended by heartbeat. Ack is a compare-and-swap on a fencing `lease_token`, so a zombie worker whose lease expired cannot ack. On expiry, the job returns to READY with `attempts++`.
5. **Replay** — terminal jobs (payload, result, attempt history) retained 7 days. Replay of a dead-lettered job resumes it at its original sequence position (the lane stays paused until it's replayed or explicitly skipped by an operator, preserving strict ordering). All replays are audit-logged.

## Job State Machine

```
QUEUED ──lease──▶ IN_FLIGHT ──ack──▶ SUCCEEDED (terminal)
  ▲                  │
  │                  ├─ failure, attempts < max ─▶ RETRY_WAIT ──backoff──▶ QUEUED
  │                  ├─ failure, attempts = max ─▶ DEAD_LETTERED ──replay──▶ QUEUED
  └── lease expiry ──┘
QUEUED/RETRY_WAIT ──cancel──▶ CANCELLED (terminal)
DEAD_LETTERED ──operator skip──▶ SKIPPED (terminal)
```

Retries use exponential backoff with jitter. `SUCCEEDED`, `CANCELLED`, `SKIPPED` are terminal; jobs are purged after 7 days.

## Idempotency Contract

**Producer side:**
- Every enqueue carries an `Idempotency-Key`. A unique constraint on `(tenant_id, idempotency_key)` means duplicate submissions return the original `job_id` instead of creating a second job. Same key with a different payload hash returns `409 Conflict`.

**Worker side:**
- Delivery is at-least-once, so handlers **must** be idempotent on the stable `job_id`/business key — never on `attempt_id`, which changes per delivery.
- External side effects must propagate a stable idempotency key downstream (e.g., to the payment processor or email provider), or record the effect and the processed `job_id` in one local transaction.
- Never ack before the effect is durably committed. Duplicate delivery of an already-succeeded job must be detected and acked as a no-op.
- Replaying a *succeeded* job requires explicit operator override, since it intentionally re-executes the effect under a new job ID.

## Metrics and Alerts for Rollout

**Metrics (tagged by tenant, lane, job type):**
- Queue depth and **age of oldest QUEUED job** per tenant/lane
- Dispatch latency, execution duration (p50/p95/p99), success/retry/DLQ rates
- Lease expirations (crash indicator), duplicate-delivery rate, in-flight vs. per-tenant cap (saturation)
- Fairness lag: difference between a tenant's expected and actual share of dispatches while backlogged
- Scheduler loop latency and DB lock contention

**Alerts:**
- Oldest billing job waiting > 5 min (notifications > 15 min) — SLO breach / starvation signal
- Any billing job entering DLQ; DLQ rate spike for notifications
- Lease-expiration rate spike — worker crashes or systemic slowness
- A tenant backlogged but receiving near-zero dispatches over 10 min — fairness bug
- Per-tenant saturation pinned at cap with growing depth — capacity or tenant abuse
- Zero throughput with non-empty queues — dispatcher outage

**Rollout:** ship behind a feature flag, canary with internal tenants, then low-risk tenants, with per-tenant kill switches and dashboards reviewed at each stage before ramping.
````

```json
{
  "id": "resp_6acd1a2a81d14cfab4cf439e",
  "object": "response",
  "created_at": 1791826474,
  "model": "muse-wonder-1.0",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6acd1a2a81d14cfab4cf439e:rs_160b5532-14ce-4f16-a184-7999a91f1657",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_95200969-0423-4c84-9c08-199e9c46ecc2",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "## Architecture Comparison\n\n| Dimension | A: Partitioned Log (e.g., Kafka) | B: Virtual Per-Tenant Queues + Fair Scheduler |\n|---|---|---|\n| **Design** | Hash `tenant_id` to a partition; workers consume partitions. Ordering guaranteed per partition. | Jobs stored in a durable DB (e.g., Postgres, partitioned by tenant). A dispatcher leases jobs to stateless workers using weighted fair queuing. |\n| **Ordering** | Strong per partition, but a slow/poison job blocks unrelated tenants sharing that partition. Retries/delays break ordering. | Strong per tenant lane via monotonic sequence numbers; retries block only that lane. |\n| **Fairness & concurrency** | Hard: partition assignment is coarse, hot tenants skew partitions, per-tenant caps require extra machinery. | Native: dispatcher enforces per-tenant in-flight caps and round-robin/weighted scheduling. |\n| **Replay (7 days)** | Excellent: built-in retention and offset rewind. | Requires retaining terminal jobs for 7 days and a replay API (manageable). |\n| **Crash tolerance** | Offset committed only after success gives at-least-once. | Lease/visibility timeout with expiry and requeue gives at-least-once. |\n| **Scale / ops** | Very high throughput, mature ecosystem; but rebalancing pain and limited per-job control (no per-job delay/priority easily). | Throughput bounded by DB; needs sharding at high scale. Simpler per-job control, queries, and auditing. |\n\n## Recommendation: Architecture B\n\nBilling and notification workloads are moderate-throughput but correctness- and fairness-sensitive, so fine-grained control beats raw log throughput.\n\n**Components:**\n\n1. **Enqueue API + transactional outbox** — the job row is written in the same transaction as the business change, so jobs are never lost or phantom-created.\n2. **Ordering** — ordering key is `tenant_id + lane` (billing, notifications are separate lanes so notifications can't block charges). Each lane gets a monotonic sequence; the dispatcher only leases the lowest unacknowledged sequences. Within a lane, execution is effectively sequential; tenant concurrency applies *across* lanes/keys.\n3. **Fair dispatcher** — deficit round-robin / weighted fair queuing across tenants (weights by tier), with a hard per-tenant in-flight semaphore. Scheduling is work-conserving: idle tenants' capacity is usable by others, but a backlogged tenant always gets its guaranteed share within one scheduling round. Aging prevents low-weight tenants from waiting indefinitely. Separate worker pools for billing vs. notifications add a second isolation layer.\n4. **Crash tolerance** — workers hold a lease (e.g., 30–60s visibility timeout) extended by heartbeat. Ack is a compare-and-swap on a fencing `lease_token`, so a zombie worker whose lease expired cannot ack. On expiry, the job returns to READY with `attempts++`.\n5. **Replay** — terminal jobs (payload, result, attempt history) retained 7 days. Replay of a dead-lettered job resumes it at its original sequence position (the lane stays paused until it's replayed or explicitly skipped by an operator, preserving strict ordering). All replays are audit-logged.\n\n## Job State Machine\n\n```\nQUEUED ──lease──▶ IN_FLIGHT ──ack──▶ SUCCEEDED (terminal)\n  ▲                  │\n  │                  ├─ failure, attempts < max ─▶ RETRY_WAIT ──backoff──▶ QUEUED\n  │                  ├─ failure, attempts = max ─▶ DEAD_LETTERED ──replay──▶ QUEUED\n  └── lease expiry ──┘\nQUEUED/RETRY_WAIT ──cancel──▶ CANCELLED (terminal)\nDEAD_LETTERED ──operator skip──▶ SKIPPED (terminal)\n```\n\nRetries use exponential backoff with jitter. `SUCCEEDED`, `CANCELLED`, `SKIPPED` are terminal; jobs are purged after 7 days.\n\n## Idempotency Contract\n\n**Producer side:**\n- Every enqueue carries an `Idempotency-Key`. A unique constraint on `(tenant_id, idempotency_key)` means duplicate submissions return the original `job_id` instead of creating a second job. Same key with a different payload hash returns `409 Conflict`.\n\n**Worker side:**\n- Delivery is at-least-once, so handlers **must** be idempotent on the stable `job_id`/business key — never on `attempt_id`, which changes per delivery.\n- External side effects must propagate a stable idempotency key downstream (e.g., to the payment processor or email provider), or record the effect and the processed `job_id` in one local transaction.\n- Never ack before the effect is durably committed. Duplicate delivery of an already-succeeded job must be detected and acked as a no-op.\n- Replaying a *succeeded* job requires explicit operator override, since it intentionally re-executes the effect under a new job ID.\n\n## Metrics and Alerts for Rollout\n\n**Metrics (tagged by tenant, lane, job type):**\n- Queue depth and **age of oldest QUEUED job** per tenant/lane\n- Dispatch latency, execution duration (p50/p95/p99), success/retry/DLQ rates\n- Lease expirations (crash indicator), duplicate-delivery rate, in-flight vs. per-tenant cap (saturation)\n- Fairness lag: difference between a tenant's expected and actual share of dispatches while backlogged\n- Scheduler loop latency and DB lock contention\n\n**Alerts:**\n- Oldest billing job waiting > 5 min (notifications > 15 min) — SLO breach / starvation signal\n- Any billing job entering DLQ; DLQ rate spike for notifications\n- Lease-expiration rate spike — worker crashes or systemic slowness\n- A tenant backlogged but receiving near-zero dispatches over 10 min — fairness bug\n- Per-tenant saturation pinned at cap with growing depth — capacity or tenant abuse\n- Zero throughput with non-empty queues — dispatcher outage\n\n**Rollout:** ship behind a feature flag, canary with internal tenants, then low-risk tenants, with per-tenant kill switches and dashboards reviewed at each stage before ramping.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 103,
    "output_tokens": 3276,
    "total_tokens": 3379,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 1975
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "auto",
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1791826474,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 8192
}
```

</details>

<details>

<summary>**WebSocket Gateway Incident Debugging** — Diagnose a production incident and propose reversible investigation and mitigation steps.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-wonder-1.0',
  {
    input:
      'A WebSocket gateway has a sudden increase in disconnects for one region. P99 handshake latency rose from 120 ms to 2.8 s, CPU is 38%, memory is stable, origin request latency is normal, and disconnects cluster around connections older than 90 seconds. No deploy occurred in the last eight hours. Analyze the evidence, rank the most likely hypotheses, specify the next five checks with expected interpretations, and propose a safe mitigation and rollback trigger. Separate facts from assumptions.',
    max_output_tokens: 4096,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-wonder-1.0",
  "input": "A WebSocket gateway has a sudden increase in disconnects for one region. P99 handshake latency rose from 120 ms to 2.8 s, CPU is 38%, memory is stable, origin request latency is normal, and disconnects cluster around connections older than 90 seconds. No deploy occurred in the last eight hours. Analyze the evidence, rank the most likely hypotheses, specify the next five checks with expected interpretations, and propose a safe mitigation and rollback trigger. Separate facts from assumptions.",
  "max_output_tokens": 4096
}'
```

```
## Facts (given)
- Disconnects increased suddenly and are isolated to one region.
- P99 handshake latency rose from 120 ms to 2.8 s.
- Gateway CPU is 38%; memory is stable.
- Origin request latency is normal.
- Disconnects cluster around connections older than ~90 seconds.
- No application deploy in the last 8 hours.

## Assumptions / unknowns
- Gateways sit behind some LB/NAT/firewall/proxy path, and clients/servers use WebSocket pings or app heartbeats. This needs verification.
- CPU 38% is an aggregate; it could hide one hot/bad host.
- We do not yet know close codes, AZ/host distribution, traffic volume, time since last frame, infra-change history, DNS/TLS/auth breakdown, or per-node limits.

## Evidence read
Regional isolation plus no deploy argues against a global application bug and toward regional infrastructure, network, config, or a subset of bad nodes. Normal CPU/memory and normal origin latency argue against simple saturation or origin slowness. The ~90-second clustering is the strongest clue: it suggests a lifetime/idle expiry or heartbeat failure. P99-only latency suggests a tail effect—retries, queueing, packet loss, or some nodes/AZs—rather than uniform slowdown.

## Ranked hypotheses
1. **Regional idle-timeout change/behavior in LB/NAT/firewall/proxy near 90 s.** Long-lived but idle connections are silently dropped or reset; reconnects then inflate handshake latency. “No deploy” does not rule out infra/config/cloud changes.
2. **One faulty AZ, gateway host, or LB target.** Packet loss, NIC errors, accept-queue overflow, or a bad NIC/driver causes some handshakes to retry and some established sessions to die.
3. **Regional connection-state limit exhaustion:** conntrack, file descriptors, ephemeral ports, LB max connections, or per-target limits. This can hurt handshakes despite low CPU/memory.
4. **Reconnect-storm amplification.** An initial drop source causes synchronized retries; TLS/auth/accept queues then raise P99 and trigger further disconnects. Likely secondary, not root cause.
5. **Regional external path issue:** ISP/route/DNS/TLS-validation problem causing retransmits for a subset of clients. Explains handshake tail less well than the 90-second age pattern.

## Next five checks, with interpretation
1. **Slice disconnects by host/AZ/LB target, close code/reason, client network, connection age, and time since last frame/ping.**
   - Only idle connections die at ~90 s across all hosts: idle timeout.
   - One host/AZ dominates: drain candidate.
   - Mostly 1006/RST: network/middlebox; graceful closes point more to client/server logic.

2. **Build an onset timeline and audit regional infra changes:** LB, NAT, firewall, security groups, DNS, certificates, autoscaling, kernel/config management, cloud incidents.
   - A change at onset strongly supports hypothesis 1/3.
   - No change shifts weight to bad node, limit growth, or external path.

3. **Break handshake latency into TCP connect, TLS, HTTP Upgrade, and auth, by node/AZ.** Also check SYN backlog drops, retransmits, accept-queue overflow.
   - TCP/TLS tail on subset: network/bad node.
   - Upgrade/auth tail: gateway/auth path despite normal origin latency.

4. **Inspect per-node and regional limits:** open FDs, conntrack count/drops, TIME_WAIT/ephemeral use, LB active connections, target connection errors, listen queues.
   - Near-limit or drops on subset confirms hypothesis 3.
   - Comfortably normal makes exhaustion less likely.

5. **Run controlled probes:** maintain test WebSockets from inside the region and externally; send traffic every 30 s on one, stay idle on another, for 3–5 minutes; capture who sends FIN/RST.
   - Idle dies ~90 s, active survives: idle timeout confirmed.
   - Both die on one AZ/path: node/network fault.

## Safe mitigation and rollback trigger
If a host/AZ is implicated, drain it first. If idle timeout is suspected, use existing config to reduce server heartbeat/keepalive to ~30 s, canaried to ~10% of regional connections, with jittered exponential reconnect backoff; optionally add temporary regional capacity to absorb reconnects. Avoid restarting all gateways or raising timeouts blindly—both can worsen a reconnect storm.

**Rollback trigger:** revert the heartbeat change and restore drained capacity if, within 10–15 minutes, canary disconnect rate or P99 handshake worsens ≥20% versus control, TLS/auth errors rise materially, or CPU exceeds ~70%. If there is no improvement after 15 minutes, roll back and escalate as a regional network/LB incident.
```

```json
{
  "id": "resp_6acd1a42cbbddaea654043e8",
  "object": "response",
  "created_at": 1791826498,
  "model": "muse-wonder-1.0",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6acd1a42cbbddaea654043e8:rs_f52de40c-8b4d-4f4c-9342-0c5d2bdeb19b",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_ad1d1b0b-444e-4df8-bc4b-c42c68d283cc",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "## Facts (given)\n- Disconnects increased suddenly and are isolated to one region.\n- P99 handshake latency rose from 120 ms to 2.8 s.\n- Gateway CPU is 38%; memory is stable.\n- Origin request latency is normal.\n- Disconnects cluster around connections older than ~90 seconds.\n- No application deploy in the last 8 hours.\n\n## Assumptions / unknowns\n- Gateways sit behind some LB/NAT/firewall/proxy path, and clients/servers use WebSocket pings or app heartbeats. This needs verification.\n- CPU 38% is an aggregate; it could hide one hot/bad host.\n- We do not yet know close codes, AZ/host distribution, traffic volume, time since last frame, infra-change history, DNS/TLS/auth breakdown, or per-node limits.\n\n## Evidence read\nRegional isolation plus no deploy argues against a global application bug and toward regional infrastructure, network, config, or a subset of bad nodes. Normal CPU/memory and normal origin latency argue against simple saturation or origin slowness. The ~90-second clustering is the strongest clue: it suggests a lifetime/idle expiry or heartbeat failure. P99-only latency suggests a tail effect—retries, queueing, packet loss, or some nodes/AZs—rather than uniform slowdown.\n\n## Ranked hypotheses\n1. **Regional idle-timeout change/behavior in LB/NAT/firewall/proxy near 90 s.** Long-lived but idle connections are silently dropped or reset; reconnects then inflate handshake latency. “No deploy” does not rule out infra/config/cloud changes.\n2. **One faulty AZ, gateway host, or LB target.** Packet loss, NIC errors, accept-queue overflow, or a bad NIC/driver causes some handshakes to retry and some established sessions to die.\n3. **Regional connection-state limit exhaustion:** conntrack, file descriptors, ephemeral ports, LB max connections, or per-target limits. This can hurt handshakes despite low CPU/memory.\n4. **Reconnect-storm amplification.** An initial drop source causes synchronized retries; TLS/auth/accept queues then raise P99 and trigger further disconnects. Likely secondary, not root cause.\n5. **Regional external path issue:** ISP/route/DNS/TLS-validation problem causing retransmits for a subset of clients. Explains handshake tail less well than the 90-second age pattern.\n\n## Next five checks, with interpretation\n1. **Slice disconnects by host/AZ/LB target, close code/reason, client network, connection age, and time since last frame/ping.**  \n   - Only idle connections die at ~90 s across all hosts: idle timeout.  \n   - One host/AZ dominates: drain candidate.  \n   - Mostly 1006/RST: network/middlebox; graceful closes point more to client/server logic.\n\n2. **Build an onset timeline and audit regional infra changes:** LB, NAT, firewall, security groups, DNS, certificates, autoscaling, kernel/config management, cloud incidents.  \n   - A change at onset strongly supports hypothesis 1/3.  \n   - No change shifts weight to bad node, limit growth, or external path.\n\n3. **Break handshake latency into TCP connect, TLS, HTTP Upgrade, and auth, by node/AZ.** Also check SYN backlog drops, retransmits, accept-queue overflow.  \n   - TCP/TLS tail on subset: network/bad node.  \n   - Upgrade/auth tail: gateway/auth path despite normal origin latency.\n\n4. **Inspect per-node and regional limits:** open FDs, conntrack count/drops, TIME_WAIT/ephemeral use, LB active connections, target connection errors, listen queues.  \n   - Near-limit or drops on subset confirms hypothesis 3.  \n   - Comfortably normal makes exhaustion less likely.\n\n5. **Run controlled probes:** maintain test WebSockets from inside the region and externally; send traffic every 30 s on one, stay idle on another, for 3–5 minutes; capture who sends FIN/RST.  \n   - Idle dies ~90 s, active survives: idle timeout confirmed.  \n   - Both die on one AZ/path: node/network fault.\n\n## Safe mitigation and rollback trigger\nIf a host/AZ is implicated, drain it first. If idle timeout is suspected, use existing config to reduce server heartbeat/keepalive to ~30 s, canaried to ~10% of regional connections, with jittered exponential reconnect backoff; optionally add temporary regional capacity to absorb reconnects. Avoid restarting all gateways or raising timeouts blindly—both can worsen a reconnect storm.\n\n**Rollback trigger:** revert the heartbeat change and restore drained capacity if, within 10–15 minutes, canary disconnect rate or P99 handshake worsens ≥20% versus control, TLS/auth errors rise materially, or CPU exceeds ~70%. If there is no improvement after 15 minutes, roll back and escalate as a regional network/LB incident.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 115,
    "output_tokens": 2976,
    "total_tokens": 3091,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 1946
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "auto",
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1791826498,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 8192
}
```

</details>

<details>

<summary>**Multi-Tenant Authorization Refactor** — Plan a staged authorization refactor with compatibility, test, and rollback guarantees.</summary>



```ts
const response = await env.AI.run(
  'meta/muse-wonder-1.0',
  {
    input:
      'Plan a zero-downtime migration from scattered role checks to a centralized policy engine in a multi-tenant API. Existing endpoints use inconsistent role names, some background jobs lack request context, and customer-specific exceptions are stored in configuration. Define the policy contract, inventory and shadow-evaluation phases, compatibility strategy, test matrix, observability, cutover criteria, and rollback plan. Identify the security invariants that must hold throughout the migration.',
    max_output_tokens: 4096,
  },
)
console.log(response)
```

```bash
curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/responses \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "model": "meta/muse-wonder-1.0",
  "input": "Plan a zero-downtime migration from scattered role checks to a centralized policy engine in a multi-tenant API. Existing endpoints use inconsistent role names, some background jobs lack request context, and customer-specific exceptions are stored in configuration. Define the policy contract, inventory and shadow-evaluation phases, compatibility strategy, test matrix, observability, cutover criteria, and rollback plan. Identify the security invariants that must hold throughout the migration.",
  "max_output_tokens": 4096
}'
```

```
# Zero-Downtime Migration Plan

## Security invariants — hold in every phase
- **Default-deny, fail-closed:** unknown role/action, missing context, engine timeout/error, or stale/malformed policy ⇒ deny.
- **Tenant isolation:** `resource.tenant_id` must be within the principal’s verified tenant scope unless an explicit cross-tenant rule applies; never trust a client-supplied tenant ID alone.
- **No privilege expansion:** role normalization or exception migration may never grant more than the legacy intent; resolve ambiguity to less privilege.
- **Authentication ≠ authorization:** the engine accepts only issuer-verified identity; it never parses raw credentials.
- Every decision is auditable to principal, tenant, resource, and policy version; exceptions are scoped, owned, approved, and expiring—no wildcard customer bypasses.

## 1. Policy contract
Versioned, deterministic, side-effect-free:

`Evaluate(Principal, Tenant, Action, Resource, Context) → {decision: Allow|Deny, reason_code, policy_version, obligations[], decision_id}`

- **Principal:** `subject_id`, type (`user|service|job`), verified `tenant_scope[]`, canonical roles, auth strength.
- **Action/Resource:** canonical actions such as `invoice.read`; resource type, ID, owner tenant, sensitivity/ownership attributes.
- **Context:** time, request/job ID, source. Background jobs carry a signed, expiring job envelope—`tenant_id`, `initiated_by` or named `system_principal`, purpose, authorized scope. No envelope ⇒ deny.

Policies are signed, immutable, versioned bundles, deployed atomically with local caching; evaluation performs no writes.

## 2. Inventory
Statically scan routes, middleware, AST/grep for role strings, and job handlers; supplement with runtime auth logs and owner review. Catalog for every endpoint/job: current check, legacy roles, tenant source, data sensitivity, and config-based customer exceptions. Normalize names explicitly, e.g. `Admin|ADMIN|tenant_admin → tenant.admin`; unmapped values deny in the new model. Convert each exception into a named policy rule with business justification, approver, and expiry.

## 3. Shadow evaluation
Deploy the engine behind flags with legacy checks still authoritative. Evaluate the same verified inputs, log only the would-be decision, and classify every divergence: intended normalization, legacy over-permission, legacy under-permission, missing attribute, or policy bug. Replay redacted production decision inputs after each fix. Cover a full business cycle, including month-end jobs.

## 4. Compatibility strategy
Use a strangler adapter at the auth boundary translating legacy claims to canonical roles; keep dual execution until bake-out completes. Gate enforcement by tenant × endpoint × policy version. Policies evolve additively—new fields optional, prior schema versions supported. Dual-read config exceptions and their policy equivalents until equivalence is proven, then freeze config writes. No destructive data/schema changes during migration.

## 5. Test matrix
- **Roles/tenancy:** each canonical role and legacy alias; unknown/missing role; same-tenant allow/deny; token-vs-URL-vs-resource tenant mismatch; cross-tenant access (must deny).
- **Principals/jobs:** interactive user, service token, job with valid/expired/replayed/missing signed envelope, retries and scheduler-triggered runs.
- **Exceptions/failures:** active vs. expired exception, wrong tenant/resource scope; engine down/timeout, malformed or stale bundle, missing attributes—all deny.
- **Methods:** policy unit tests, contract tests per endpoint, integration tests, production replay, and property/fuzz tests asserting invariants—especially, never allow cross-tenant access.

## 6. Observability
Emit structured audit events: `decision_id`, hashed subject, tenant, action, resource, legacy and new decisions, reason code, policy version, latency, enforcement mode. Dashboard and alert on decision/diff volume, deny-rate shifts, unknown roles/actions, engine errors, and p99 latency—sliced by tenant, endpoint, version, and principal type. Alert on expiring exceptions and any shadow cross-tenant would-allow.

## 7. Cutover criteria and rollout
Proceed only when: 100% of endpoints/jobs are inventoried; zero critical or unexplained divergences and <0.1% total divergence for 14 days including peak/batch windows; replay and the test matrix pass; added p99 latency is within budget (e.g., <10 ms cached); rollback has been rehearsed; security and service owners sign off.

Roll out internal tenants → low-risk endpoints at 1% → 10% → 50% → 100%, then higher-risk endpoints and jobs, baking each step. Once enforced, keep legacy in shadow briefly, then remove it in a separate release.

## 8. Rollback
A single flag per tenant/endpoint instantly returns authority to the frozen legacy path—no deploy or data migration required. Alternatively, pin the previous signed policy bundle if the bug is policy-only. After cutover, an engine outage fails closed (deny) rather than auto-falling back; operators explicitly flip the flag if legacy rollback is safer. Retain legacy code, mappings, and audit data until the bake period ends.
```

```json
{
  "id": "resp_6acd1a6b1cc0e8cd73b14849",
  "object": "response",
  "created_at": 1791826539,
  "model": "muse-wonder-1.0",
  "output": [
    {
      "type": "reasoning",
      "id": "rs_6acd1a6b1cc0e8cd73b14849:rs_1ec0edf9-e7f4-4458-a3b9-0ba182aa1df9",
      "summary": [],
      "status": "completed"
    },
    {
      "type": "message",
      "id": "msg_d0518550-0472-4883-89d4-52fd12e29a92",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "# Zero-Downtime Migration Plan\n\n## Security invariants — hold in every phase\n- **Default-deny, fail-closed:** unknown role/action, missing context, engine timeout/error, or stale/malformed policy ⇒ deny.\n- **Tenant isolation:** `resource.tenant_id` must be within the principal’s verified tenant scope unless an explicit cross-tenant rule applies; never trust a client-supplied tenant ID alone.\n- **No privilege expansion:** role normalization or exception migration may never grant more than the legacy intent; resolve ambiguity to less privilege.\n- **Authentication ≠ authorization:** the engine accepts only issuer-verified identity; it never parses raw credentials.\n- Every decision is auditable to principal, tenant, resource, and policy version; exceptions are scoped, owned, approved, and expiring—no wildcard customer bypasses.\n\n## 1. Policy contract\nVersioned, deterministic, side-effect-free:\n\n`Evaluate(Principal, Tenant, Action, Resource, Context) → {decision: Allow|Deny, reason_code, policy_version, obligations[], decision_id}`\n\n- **Principal:** `subject_id`, type (`user|service|job`), verified `tenant_scope[]`, canonical roles, auth strength.\n- **Action/Resource:** canonical actions such as `invoice.read`; resource type, ID, owner tenant, sensitivity/ownership attributes.\n- **Context:** time, request/job ID, source. Background jobs carry a signed, expiring job envelope—`tenant_id`, `initiated_by` or named `system_principal`, purpose, authorized scope. No envelope ⇒ deny.\n\nPolicies are signed, immutable, versioned bundles, deployed atomically with local caching; evaluation performs no writes.\n\n## 2. Inventory\nStatically scan routes, middleware, AST/grep for role strings, and job handlers; supplement with runtime auth logs and owner review. Catalog for every endpoint/job: current check, legacy roles, tenant source, data sensitivity, and config-based customer exceptions. Normalize names explicitly, e.g. `Admin|ADMIN|tenant_admin → tenant.admin`; unmapped values deny in the new model. Convert each exception into a named policy rule with business justification, approver, and expiry.\n\n## 3. Shadow evaluation\nDeploy the engine behind flags with legacy checks still authoritative. Evaluate the same verified inputs, log only the would-be decision, and classify every divergence: intended normalization, legacy over-permission, legacy under-permission, missing attribute, or policy bug. Replay redacted production decision inputs after each fix. Cover a full business cycle, including month-end jobs.\n\n## 4. Compatibility strategy\nUse a strangler adapter at the auth boundary translating legacy claims to canonical roles; keep dual execution until bake-out completes. Gate enforcement by tenant × endpoint × policy version. Policies evolve additively—new fields optional, prior schema versions supported. Dual-read config exceptions and their policy equivalents until equivalence is proven, then freeze config writes. No destructive data/schema changes during migration.\n\n## 5. Test matrix\n- **Roles/tenancy:** each canonical role and legacy alias; unknown/missing role; same-tenant allow/deny; token-vs-URL-vs-resource tenant mismatch; cross-tenant access (must deny).\n- **Principals/jobs:** interactive user, service token, job with valid/expired/replayed/missing signed envelope, retries and scheduler-triggered runs.\n- **Exceptions/failures:** active vs. expired exception, wrong tenant/resource scope; engine down/timeout, malformed or stale bundle, missing attributes—all deny.\n- **Methods:** policy unit tests, contract tests per endpoint, integration tests, production replay, and property/fuzz tests asserting invariants—especially, never allow cross-tenant access.\n\n## 6. Observability\nEmit structured audit events: `decision_id`, hashed subject, tenant, action, resource, legacy and new decisions, reason code, policy version, latency, enforcement mode. Dashboard and alert on decision/diff volume, deny-rate shifts, unknown roles/actions, engine errors, and p99 latency—sliced by tenant, endpoint, version, and principal type. Alert on expiring exceptions and any shadow cross-tenant would-allow.\n\n## 7. Cutover criteria and rollout\nProceed only when: 100% of endpoints/jobs are inventoried; zero critical or unexplained divergences and <0.1% total divergence for 14 days including peak/batch windows; replay and the test matrix pass; added p99 latency is within budget (e.g., <10 ms cached); rollback has been rehearsed; security and service owners sign off.\n\nRoll out internal tenants → low-risk endpoints at 1% → 10% → 50% → 100%, then higher-risk endpoints and jobs, baking each step. Once enforced, keep legacy in shadow briefly, then remove it in a separate release.\n\n## 8. Rollback\nA single flag per tenant/endpoint instantly returns authority to the frozen legacy path—no deploy or data migration required. Alternatively, pin the previous signed policy bundle if the bug is policy-only. After cutover, an engine outage fails closed (deny) rather than auto-falling back; operators explicitly flip the flag if legacy rollback is safer. Retain legacy code, mappings, and audit data until the bake period ends.",
          "annotations": [],
          "logprobs": []
        }
      ],
      "status": "completed"
    }
  ],
  "status": "completed",
  "usage": {
    "input_tokens": 100,
    "output_tokens": 5951,
    "total_tokens": 6051,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens_details": {
      "reasoning_tokens": 4863
    }
  },
  "top_logprobs": 0,
  "temperature": 1,
  "top_p": 1,
  "service_tier": "auto",
  "background": false,
  "tools": [],
  "tool_choice": "auto",
  "truncation": "disabled",
  "completed_at": 1791826539,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "parallel_tool_calls": true,
  "store": true,
  "max_output_tokens": 8192
}
```

</details>

## Parameters

▶input

`one of`required

instructions

`string`

temperature

`number`minimum: 0maximum: 2

max\_output\_tokens

`number`exclusiveMinimum: 0

top\_p

`number`minimum: 0maximum: 1

stream

`boolean`

▶tools\[]

`array`

tool\_choice

▶text{}

`object`

▶reasoning{}

`object`

id

`string`

object

`string`const: response

created\_at

`number`

model

`string`

▶output\[]

`array`

output\_text

`string`

status

`string`enum: in\_progress, completed, failed, incomplete

▶usage{}

`object`

## API Schemas (Raw)

Input [Open](https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/schema-input.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/schema-input.json)

Output [Open](https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/schema-output.json) [Download](https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/schema-output.json)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/#page","headline":"Muse Wonder 1.0","description":"Muse Wonder 1.0 is Meta's agentic and coding model for complex software engineering, multi-step tool loops, and long-context reasoning.","url":"https://developers.cloudflare.com/ai/models/meta/muse-wonder-1.0/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
