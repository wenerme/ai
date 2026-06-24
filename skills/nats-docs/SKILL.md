---
name: nats-docs
description: "Use when working with NATS: core messaging, subjects, request-reply, queue groups, JetStream streams/consumers/KV/object store, nats CLI, server config, clustering, gateways, leaf nodes, accounts/JWT/auth/TLS, monitoring, Kubernetes/Docker, protocol, or troubleshooting NATS deployments."
---

# NATS Documentation

Official NATS docs synced from [`nats-io/nats.docs`](https://github.com/nats-io/nats.docs), branch `master`.

Use this skill when answering questions or making changes involving NATS server, NATS clients, JetStream, the `nats` CLI, NATS security, or NATS deployment/operations.

## Hard Rules

- MUST search `references/` before giving version-sensitive commands or configuration details.
- MUST prefer official docs in this skill over memory for JetStream limits, server config, auth/JWT, clustering, leaf nodes, gateways, and monitoring endpoints.
- MUST distinguish Core NATS from JetStream semantics.
- MUST call out when an answer depends on client library language/version, because this skill focuses on product docs rather than every client API.
- NEVER invent NATS subject, stream, consumer, account, or authorization syntax without checking the relevant reference.

## Fast Lookup

```bash
rg -n "JetStream|stream|consumer|KV|object store" skills/nats-docs/references
rg -n "auth|JWT|account|nkey|token|TLS" skills/nats-docs/references
rg -n "cluster|gateway|leaf|super-cluster" skills/nats-docs/references
rg -n "monitoring|/varz|/connz|/jsz|prometheus" skills/nats-docs/references
rg -n "nats CLI|nsc|nats-server|configuration" skills/nats-docs/references
```

## Reference Map

- `references/SUMMARY.md` — upstream table of contents.
- `references/README.md` / `references/overview.md` — docs entry points and overview.
- `references/nats-concepts/` — subjects, Core NATS, request-reply, queue groups, JetStream concepts, security, connectivity.
- `references/using-nats/` — CLI tools, developing with NATS, JetStream usage, tutorials.
- `references/running-a-nats-service/` — install/run/deploy, server config, clustering, gateways, leaf nodes, security, monitoring, Kubernetes/Docker.
- `references/reference/` and `references/reference-protocols.md` — FAQ, protocol references, roadmap, contribution notes.
- `references/release_notes/` — NATS release notes.

## Common Tasks

1. Start with `references/SUMMARY.md` to locate the exact topic.
2. Search the relevant subtree with `rg`.
3. Cite concrete paths or config keys from the docs in your answer.
4. For operations advice, separate development examples from production guidance.
5. For JetStream, check both concepts and running/configuration docs before recommending limits, storage, clustering, or consumer settings.
