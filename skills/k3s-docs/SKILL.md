---
name: k3s-docs
description: "K3s documentation — lightweight Kubernetes for IoT/edge. Covers installation (air-gap, private registry, HA), architecture (embedded etcd, external datastore), networking (Flannel, CoreDNS, Traefik), security (secrets encryption, CIS hardening), upgrades, CLI (k3s server/agent/etcd-snapshot/certificate/token), and Helm charts. USE THIS SKILL WHEN the user asks about K3s, k3s server, k3s agent, k3s install, k3s networking, k3s hardening, or edge Kubernetes."
version: 0.1.0
---

# K3s Documentation

Official docs for [K3s](https://docs.k3s.io) — lightweight certified Kubernetes distribution built for IoT and edge computing.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (56 docs)

### Getting Started (8 docs)

- `references/introduction.md` — K3s overview and features
- `references/quick-start.md` — Quick start guide
- `references/architecture.md` — Server/agent architecture, single-server and HA
- `references/cluster-access.md` — Accessing the cluster with kubectl
- `references/advanced.md` — Advanced options and configuration
- `references/faq.md` — Frequently asked questions
- `references/known-issues.md` — Known issues and workarounds
- `references/related-projects.md` — Related projects (K3OS, Autok3s, etc.)

### Installation (9 docs)

- `references/installation/installation.md` — Installation overview
- `references/installation/requirements.md` — System requirements (OS, hardware, networking)
- `references/installation/configuration.md` — Configuration options (config file, CLI flags, env vars)
- `references/installation/private-registry.md` — Private registry configuration
- `references/installation/registry-mirror.md` — Registry mirror setup
- `references/installation/airgap.md` — Air-gap installation
- `references/installation/server-roles.md` — Server roles (control-plane, etcd, worker)
- `references/installation/packaged-components.md` — Packaged components (Flannel, CoreDNS, Traefik, etc.)
- `references/installation/uninstall.md` — Uninstalling K3s

### Datastore & HA (5 docs)

- `references/datastore/datastore.md` — Datastore overview
- `references/datastore/ha-embedded.md` — HA with embedded etcd
- `references/datastore/ha.md` — HA with external datastore (MySQL, PostgreSQL, etcd)
- `references/datastore/backup-restore.md` — Backup and restore
- `references/datastore/cluster-loadbalancer.md` — Cluster load balancer setup

### Upgrades (5 docs)

- `references/upgrades/upgrades.md` — Upgrade overview
- `references/upgrades/manual.md` — Manual upgrades
- `references/upgrades/automated.md` — Automated upgrades (system-upgrade-controller)
- `references/upgrades/killall.md` — K3s killall script
- `references/upgrades/roll-back.md` — Rollback procedures

### Security (10 docs)

- `references/security/security.md` — Security overview
- `references/security/secrets-encryption.md` — Secrets encryption at rest
- `references/security/hardening-guide.md` — CIS hardening guide
- `references/security/self-assessment-1.24.md` — CIS self-assessment v1.24
- `references/security/self-assessment-1.23.md` — CIS self-assessment v1.23
- `references/security/self-assessment-1.11.md` — CIS self-assessment v1.11
- `references/security/self-assessment-1.10.md` — CIS self-assessment v1.10
- `references/security/self-assessment-1.9.md` — CIS self-assessment v1.9
- `references/security/self-assessment-1.8.md` — CIS self-assessment v1.8
- `references/security/self-assessment-1.7.md` — CIS self-assessment v1.7

### CLI Reference (7 docs)

- `references/cli/cli.md` — CLI overview
- `references/cli/server.md` — `k3s server` flags and options
- `references/cli/agent.md` — `k3s agent` flags and options
- `references/cli/certificate.md` — `k3s certificate` management
- `references/cli/etcd-snapshot.md` — `k3s etcd-snapshot` backup/restore
- `references/cli/secrets-encrypt.md` — `k3s secrets-encrypt` management
- `references/cli/token.md` — `k3s token` management

### Networking (5 docs)

- `references/networking/networking.md` — Networking overview
- `references/networking/basic-network-options.md` — Basic network options (Flannel, Canal, custom CNI)
- `references/networking/networking-services.md` — Networking services (CoreDNS, Traefik, ServiceLB)
- `references/networking/distributed-multicloud.md` — Distributed/multicloud setup
- `references/networking/multus-ipams.md` — Multus and IPAM plugins

### Reference (4 docs)

- `references/reference/env-variables.md` — Environment variables reference
- `references/reference/flag-deprecation.md` — Deprecated flags
- `references/reference/metrics.md` — Metrics endpoints
- `references/reference/resource-profiling.md` — Resource profiling

### Add-ons (3 docs)

- `references/add-ons/helm.md` — Helm chart management (HelmChart CRD)
- `references/add-ons/import-images.md` — Importing container images
- `references/add-ons/storage.md` — Storage (local-path-provisioner, Longhorn)
