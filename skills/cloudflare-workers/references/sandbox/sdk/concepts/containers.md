---
description: Sandbox SDK 0.x containers run isolated Linux environments with Python, Node.js, and common dev tools.
title: Container runtime
image: https://developers.cloudflare.com/sandbox/sdk/concepts/containers/og.png?v=ec5a1b87c44a0c0a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Container runtime

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/sdk/concepts/containers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This page documents Sandbox SDK 0.x for existing applications. For new applications, refer to [Sandboxes](https://developers.cloudflare.com/sandbox/). To move an existing application to `@cloudflare/sandbox` 1.0, refer to [Migrate from Sandbox SDK 0.x](https://developers.cloudflare.com/sandbox/sdk/migrate/).

Each sandbox runs in an isolated Linux container with Python, Node.js, and common development tools pre-installed. For a complete list of pre-installed software and how to customize the container image, see [Dockerfile reference](https://developers.cloudflare.com/sandbox/sdk/configuration/dockerfile/).

## Runtime software installation

Install additional software at runtime using standard package managers:

```bash
# Python packages
pip install scikit-learn tensorflow

# Node.js packages
npm install express

# System packages (requires apt-get update first)
apt-get update && apt-get install -y redis-server
```

## Filesystem

The container provides a standard Linux filesystem. You can read and write anywhere you have permissions.

**Standard directories**:

- `/workspace` - Default working directory for user code
- `/tmp` - Temporary files
- `/home` - User home directory
- `/usr/bin`, `/usr/local/bin` - Executable binaries

**Example**:

```typescript
await sandbox.writeFile('/workspace/app.py', 'print("Hello")');
await sandbox.writeFile('/tmp/cache.json', '{}');
await sandbox.exec('ls -la /workspace');
```

## Process management

Processes run as you'd expect in a regular Linux environment.

**Foreground processes** (`exec()`):

```typescript
const result = await sandbox.exec('npm test');
// Waits for completion, returns output
```

**Background processes** (`startProcess()`):

```typescript
const process = await sandbox.startProcess('node server.js');
// Returns immediately, process runs in background
```

## Network capabilities

**Outbound connections** work:

```bash
curl https://api.example.com/data
pip install requests
npm install express
```

**Inbound connections** require port exposure:

```typescript
const { hostname } = new URL(request.url);
await sandbox.startProcess('python -m http.server 8000');
const exposed = await sandbox.exposePort(8000, { hostname });
console.log(exposed.url); // Public URL
```

Local development

When using `wrangler dev`, you must add `EXPOSE` directives to your Dockerfile for each port. See [Local development with ports](https://developers.cloudflare.com/sandbox/sdk/guides/expose-services/#local-development).

**Localhost** works within sandbox:

```bash
redis-server &      # Start server
redis-cli ping      # Connect locally
```

## Security

**Between sandboxes** (isolated):

- Each sandbox is a separate container
- Filesystem, memory and network are all isolated

**Within sandbox** (shared):

- All processes see the same files
- Processes can communicate with each other
- Environment variables are session-scoped

To run untrusted code, use separate sandboxes per user:

```typescript
const sandbox = getSandbox(env.Sandbox, `user-${userId}`);
```

## Limitations

**Cannot**:

- Load kernel modules or access host hardware

## Related resources

- [Deploy a Sandbox application](https://developers.cloudflare.com/sandbox/sdk/guides/deploy/) - Deploy and keep package and image aligned
- [Deploy Containers](https://developers.cloudflare.com/containers/guides/deploy/) - Containers deploy path
- [Architecture](https://developers.cloudflare.com/sandbox/sdk/concepts/architecture/) - How containers fit in the system
- [Security model](https://developers.cloudflare.com/sandbox/sdk/concepts/security/) - Container isolation details
- [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/sdk/concepts/sandboxes/) - Container lifecycle management
- [Docker-in-Docker](https://developers.cloudflare.com/sandbox/sdk/guides/docker-in-docker/) - Run Docker containers inside a Sandbox

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/sdk/concepts/containers/#page","headline":"Container runtime","description":"Sandbox SDK 0.x containers run isolated Linux environments with Python, Node.js, and common dev tools.","url":"https://developers.cloudflare.com/sandbox/sdk/concepts/containers/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/sdk/concepts/containers/og.png?v=ec5a1b87c44a0c0a","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
