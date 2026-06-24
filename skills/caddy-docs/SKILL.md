---
name: caddy-docs
description: "USE THIS SKILL WHEN working with the Caddy web server: Caddyfile configuration, reverse_proxy, automatic HTTPS, TLS, file_server, headers, rewrite, redir, encode, handle, route, templates, basic_auth, forward_auth, php_fastcgi, logging, metrics, tracing, try_files, map, vars, import, invoke, bind, Caddy JSON API, Caddy CLI commands, Caddy modules, extending Caddy, or any Caddy server configuration and deployment."
---

# Caddy Web Server Documentation

Official Caddy docs fetched from [caddyserver.com/docs](https://caddyserver.com/docs/). 81 pages covering configuration, directives, API, modules, and development.

## URL ↔ File Path Mapping

```
URL:  https://caddyserver.com/docs/caddyfile/directives/reverse_proxy
File: references/caddyfile/directives/reverse_proxy.md

URL:  https://caddyserver.com/docs/automatic-https
File: references/automatic-https.md

URL:  https://caddyserver.com/docs/
File: references/index.md
```

**Rule**: strip `https://caddyserver.com/docs`, drop trailing `/`, append `.md`. Subdirectories map to nested file paths.

CRITICAL: grep `references/` for keywords before answering.

## Topic Index

### Getting Started
- `index.md` — Documentation home
- `getting-started.md` — Welcome and core concepts
- `install.md` — Installation methods
- `quick-starts/` — Quick start guides (Caddyfile, API, HTTPS, static files, reverse proxy, Railway)

### Caddyfile (Primary Configuration)
- `caddyfile.md` — Caddyfile overview
- `caddyfile-tutorial.md` — Caddyfile tutorial
- `caddyfile/concepts.md` — Core Caddyfile concepts (sites, directives, matchers, placeholders)
- `caddyfile/directives.md` — Directive index and ordering
- `caddyfile/matchers.md` — Request matchers (path, host, header, method, etc.)
- `caddyfile/response-matchers.md` — Response matchers
- `caddyfile/options.md` — Global options block
- `caddyfile/patterns.md` — Common Caddyfile patterns and recipes

### Caddyfile Directives (38 directives)
- `caddyfile/directives/reverse_proxy.md` — Reverse proxy with load balancing, health checks, headers
- `caddyfile/directives/tls.md` — TLS/HTTPS certificate configuration
- `caddyfile/directives/file_server.md` — Static file server
- `caddyfile/directives/header.md` — Set/add/delete response headers
- `caddyfile/directives/redir.md` — HTTP redirects
- `caddyfile/directives/rewrite.md` — Internal URI rewriting
- `caddyfile/directives/uri.md` — URI manipulation (strip prefix/suffix, replace, path regexp)
- `caddyfile/directives/encode.md` — Response compression (gzip, zstd)
- `caddyfile/directives/handle.md` — Mutually exclusive route groups
- `caddyfile/directives/handle_path.md` — Handle with path prefix stripping
- `caddyfile/directives/handle_errors.md` — Error page handling
- `caddyfile/directives/route.md` — Explicit directive ordering
- `caddyfile/directives/log.md` — Access logging
- `caddyfile/directives/log_append.md` — Append fields to log entries
- `caddyfile/directives/log_name.md` — Override logger name
- `caddyfile/directives/log_skip.md` — Skip logging for matched requests
- `caddyfile/directives/basic_auth.md` — HTTP Basic Authentication
- `caddyfile/directives/forward_auth.md` — Forward authentication (external auth service)
- `caddyfile/directives/php_fastcgi.md` — PHP FastCGI proxy
- `caddyfile/directives/templates.md` — Server-side templates
- `caddyfile/directives/respond.md` — Static response (inline body or status)
- `caddyfile/directives/abort.md` — Abort/close connection
- `caddyfile/directives/error.md` — Trigger error handling
- `caddyfile/directives/try_files.md` — File existence check / SPA fallback
- `caddyfile/directives/map.md` — Map input to output values
- `caddyfile/directives/vars.md` — Set custom variables
- `caddyfile/directives/import.md` — Import config snippets or files
- `caddyfile/directives/invoke.md` — Invoke named routes
- `caddyfile/directives/bind.md` — Bind to specific network interface
- `caddyfile/directives/root.md` — Set site root directory
- `caddyfile/directives/method.md` — Override request method
- `caddyfile/directives/request_body.md` — Request body size limits
- `caddyfile/directives/request_header.md` — Manipulate request headers
- `caddyfile/directives/push.md` — HTTP/2 server push
- `caddyfile/directives/intercept.md` — Intercept responses from upstream
- `caddyfile/directives/metrics.md` — Prometheus metrics endpoint
- `caddyfile/directives/tracing.md` — Distributed tracing (OpenTelemetry)
- `caddyfile/directives/acme_server.md` — Built-in ACME CA server
- `caddyfile/directives/fs.md` — File system abstraction

### Core Features
- `automatic-https.md` — Automatic HTTPS (Let's Encrypt, ZeroSSL)
- `logging.md` — Structured logging configuration
- `metrics.md` — Prometheus metrics
- `running.md` — Running Caddy as a service (systemd, Docker, etc.)
- `command-line.md` — CLI commands (run, start, stop, reload, adapt, etc.)

### JSON API & Configuration
- `json.md` — Native JSON configuration structure
- `api.md` — Admin API reference
- `api-tutorial.md` — API tutorial
- `config-adapters.md` — Config adapters (Caddyfile → JSON)

### Extending Caddy (Module Development)
- `extending-caddy.md` — Module development overview
- `extending-caddy/caddyfile.md` — Adding Caddyfile support to modules
- `extending-caddy/config-adapters.md` — Custom config adapters
- `extending-caddy/namespaces.md` — Module namespaces
- `extending-caddy/placeholders.md` — Placeholder system
- `architecture.md` — Caddy architecture
- `build.md` — Building Caddy from source (xcaddy)
- `modules.md` — Module ecosystem

### Reference
- `conventions.md` — Naming and file conventions
- `examples.md` — Full configuration examples
- `faq.md` — Frequently asked questions
- `troubleshooting.md` — Troubleshooting guide
- `profiling.md` — Performance profiling
- `signature-verification.md` — Binary signature verification
- `v2-upgrade.md` — Upgrading from Caddy v1
