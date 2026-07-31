---
description: Run a Keyless SSL key server as a container using environment variables.
title: Run with Docker
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Run with Docker

Last updated Jul 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/run-with-docker/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The `gokeyless` key server is published as a container image, and most settings can be configured with environment variables instead of a `gokeyless.yaml` file.

## Pull the image

```sh
docker pull ghcr.io/cloudflare/gokeyless:latest
```

Note

The image is published on the GitHub Container Registry (`ghcr.io`), not Docker Hub.

A complete example is available in [docker-compose.example.yaml ↗](https://github.com/cloudflare/gokeyless/blob/master/docker-compose.example.yaml) in the gokeyless repository.

## Environment variables

Each environment variable maps to the equivalent setting in `gokeyless.yaml`. When both are present, the environment variable takes precedence (the order is command-line flag, then environment variable, then configuration file).

| Environment variable          | Purpose                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| KEYLESS\_HOSTNAME             | Hostname of this key server (must match the value configured in Cloudflare).                                     |
| KEYLESS\_ZONE\_ID             | Cloudflare Zone ID.                                                                                              |
| KEYLESS\_ORIGIN\_CA\_API\_KEY | Origin CA API key used to enroll the key server and obtain its authentication certificate.                       |
| KEYLESS\_AUTH\_CERT           | Path to the key server authentication certificate (default server.pem).                                          |
| KEYLESS\_AUTH\_KEY            | Path to the authentication certificate private key (default server-key.pem).                                     |
| KEYLESS\_AUTH\_CSR            | Path to write the CSR generated during initialization (default server.csr).                                      |
| KEYLESS\_CLOUDFLARE\_CA\_CERT | Path to the Cloudflare CA certificate used to authenticate connecting key clients (default keyless\_cacert.pem). |
| KEYLESS\_PORT                 | Port the key server listens on (default 2407).                                                                   |
| KEYLESS\_METRICS\_PORT        | Port for the /metrics endpoint (default 2406).                                                                   |
| KEYLESS\_LOGLEVEL             | Log verbosity, 0 (most verbose) to 5.                                                                            |

## Configure private keys

Private key locations **cannot** be set with an environment variable. Configure them with a `private_key_stores` block in `gokeyless.yaml` (each entry sets exactly one of `dir`, `file`, or `uri`), or with the `--private-key-dirs` / `--private-key-files` flags (comma-separated), passed as arguments after the image name.

## Run the container

```sh
docker run -d \
  -e KEYLESS_HOSTNAME=<KEY_SERVER_HOSTNAME> \
  -e KEYLESS_ZONE_ID=<ZONE_ID> \
  -e KEYLESS_AUTH_CERT=/config/server.pem \
  -e KEYLESS_AUTH_KEY=/config/server-key.pem \
  -e KEYLESS_CLOUDFLARE_CA_CERT=/config/keyless_cacert.pem \
  -v /local/config:/config:ro \
  -v /local/keys:/keys:ro \
  -p 2407:2407 \
  ghcr.io/cloudflare/gokeyless:latest \
  --private-key-dirs /keys
```

The image entrypoint is `gokeyless`, so any command-line flags (such as `--private-key-dirs`) are appended after the image name.

## Serve multiple private keys

A single key server can hold private keys for multiple certificates. List several directories or files with `--private-key-dirs` / `--private-key-files` (comma-separated), or define multiple `private_key_stores` entries in `gokeyless.yaml`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/configuration/run-with-docker/#page","headline":"Run Keyless SSL with Docker · Cloudflare SSL/TLS docs","description":"Run a Keyless SSL key server as a container using environment variables.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/configuration/run-with-docker/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
