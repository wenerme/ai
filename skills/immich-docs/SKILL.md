---
name: immich-docs
description: "Immich documentation — self-hosted photo/video management. Covers installation (Docker, Kubernetes, Synology, TrueNAS, Unraid), administration (backup, OAuth, reverse proxy, storage templates), features (facial recognition, ML acceleration, hardware transcoding, mobile backup, libraries, search), and developer guides. USE THIS SKILL WHEN the user asks about Immich, immich install, immich backup, immich facial recognition, or immich transcoding."
version: 0.1.0
---

# Immich Documentation

Official docs for [Immich](https://immich.app) — high-performance self-hosted photo and video management.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (74 docs)

### Overview (4 docs)

- `references/overview/quick-start.mdx` — Quick start guide
- `references/overview/comparison.md` — Comparison with other solutions
- `references/overview/help.md` — Getting help
- `references/overview/support-the-project.md` — Supporting the project

### Installation (14 docs)

- `references/install/requirements.md` — System requirements
- `references/install/docker-compose.mdx` — Docker Compose installation
- `references/install/script.md` — Install script
- `references/install/all-in-one.md` — All-in-one setup
- `references/install/one-click.md` — One-click deployment
- `references/install/portainer.md` — Portainer installation
- `references/install/kubernetes.md` — Kubernetes/Helm deployment
- `references/install/synology.md` — Synology NAS setup
- `references/install/truenas.md` — TrueNAS setup
- `references/install/unraid.md` — Unraid setup
- `references/install/config-file.md` — Configuration file reference
- `references/install/environment-variables.md` — Environment variables
- `references/install/post-install.mdx` — Post-installation steps
- `references/install/upgrading.md` — Upgrading Immich

### Administration (13 docs)

- `references/administration/system-settings.md` — System settings reference
- `references/administration/backup-and-restore.md` — Backup and restore
- `references/administration/user-management.mdx` — User management
- `references/administration/oauth.md` — OAuth/OIDC authentication
- `references/administration/reverse-proxy.md` — Reverse proxy (Nginx, Caddy, Traefik, Apache)
- `references/administration/storage-template.mdx` — Storage template configuration
- `references/administration/jobs-workers.md` — Jobs and worker configuration
- `references/administration/email-notification.mdx` — Email notifications (SMTP)
- `references/administration/server-commands.md` — Server admin commands
- `references/administration/server-stats.md` — Server statistics
- `references/administration/maintenance-mode.md` — Maintenance mode
- `references/administration/system-integrity.md` — System integrity checks
- `references/administration/postgres-standalone.md` — Standalone PostgreSQL setup

### Features (19 docs)

- `references/features/facial-recognition.md` — Facial recognition
- `references/features/searching.md` — Smart search (CLIP)
- `references/features/hardware-transcoding.md` — Hardware transcoding (VAAPI, NVENC, QSV)
- `references/features/ml-hardware-acceleration.md` — ML hardware acceleration (CUDA, OpenVINO, ARM NN)
- `references/features/mobile-app.mdx` — Mobile app setup
- `references/features/mobile-backup.md` — Mobile backup configuration
- `references/features/libraries.md` — External libraries
- `references/features/sharing.md` — Album sharing
- `references/features/partner-sharing.md` — Partner sharing
- `references/features/tags.md` — Tags
- `references/features/folder-view.md` — Folder view
- `references/features/editing.mdx` — Photo editing
- `references/features/casting.md` — Chromecast/casting
- `references/features/command-line-interface.md` — CLI tool
- `references/features/reverse-geocoding.md` — Reverse geocoding
- `references/features/xmp-sidecars.md` — XMP sidecar support
- `references/features/supported-formats.md` — Supported file formats
- `references/features/monitoring.md` — Prometheus monitoring
- `references/features/user-settings.md` — User settings

### Guides (13 docs)

- `references/guides/external-library.md` — External library setup
- `references/guides/remote-access.md` — Remote access (Tailscale, Cloudflare, etc.)
- `references/guides/remote-machine-learning.md` — Remote ML processing
- `references/guides/scaling-immich.md` — Scaling Immich
- `references/guides/database-queries.md` — Useful database queries
- `references/guides/database-gui.md` — Database GUI tools
- `references/guides/docker-help.md` — Docker troubleshooting
- `references/guides/custom-locations.md` — Custom storage locations
- `references/guides/custom-map-styles.md` — Custom map styles
- `references/guides/better-facial-clusters.md` — Improving facial recognition clusters
- `references/guides/smtp-gmail.md` — Gmail SMTP setup
- `references/guides/template-backup-script.md` — Backup script template
- `references/guides/python-file-upload.md` — Python file upload

### Developer (9 docs)

- `references/developer/setup.md` — Development environment setup
- `references/developer/architecture.mdx` — Architecture overview
- `references/developer/directories.md` — Project directory structure
- `references/developer/database-migrations.md` — Database migrations
- `references/developer/testing.md` — Testing guide
- `references/developer/devcontainers.md` — Dev containers
- `references/developer/translations.md` — Translation guide
- `references/developer/pr-checklist.md` — PR checklist
- `references/developer/troubleshooting.md` — Developer troubleshooting

### Other (2 docs)

- `references/FAQ.mdx` — Frequently asked questions
- `references/api.md` — API documentation
