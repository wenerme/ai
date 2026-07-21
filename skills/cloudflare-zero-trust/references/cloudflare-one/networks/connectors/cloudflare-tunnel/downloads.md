---
description: Reference information for Downloads in Zero Trust networking.
title: Downloads
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

#  Downloads

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare Tunnel requires the installation of a lightweight server-side daemon, `cloudflared`, to connect your infrastructure to Cloudflare. If you are [creating a tunnel through the dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/), you can simply copy-paste the installation command shown in the dashboard.

To download and install `cloudflared` manually, use one of the following links.

## GitHub repository

`cloudflared` is an [open source project ↗](https://github.com/cloudflare/cloudflared) maintained by Cloudflare.

* [All releases ↗](https://github.com/cloudflare/cloudflared/releases)
* [Release notes ↗](https://github.com/cloudflare/cloudflared/blob/master/RELEASE%5FNOTES)

## Latest release

### Linux

You can download and install `cloudflared` via the [Cloudflare Package Repository ↗](https://pkg.cloudflare.com/).

Alternatively, download the latest release directly:

| Type   | amd64 / x86-64                                                                                                  | x86 (32-bit)                                                                                               | ARM                                                                                                        | ARM64                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Binary | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64)        | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386)     | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm)     | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64)       |
| .deb   | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb)    | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386.deb) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.deb) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb)   |
| .rpm   | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86%5F64.rpm) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386.rpm) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm.rpm) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-aarch64.rpm) |

### macOS

Download and install `cloudflared` via Homebrew:

```sh
brew install cloudflared
```

Alternatively, download the [latest Darwin arm64 release ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-arm64.tgz) or [latest Darwin amd64 release ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz) directly.

### Windows

Download the latest release from [GitHub ↗](https://github.com/cloudflare/cloudflared/releases/latest):

| Type       | 32-bit                                                                                                       | 64-bit                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Executable | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-386.exe) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe) |
| MSI        | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-386.msi) | [Download ↗](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.msi) |

Note

Instances of `cloudflared` do not automatically update on Windows. You will need to perform manual updates.

### Docker

A Docker image of `cloudflared` is [available on DockerHub ↗](https://hub.docker.com/r/cloudflare/cloudflared).

## Deprecated releases

Cloudflare supports versions of `cloudflared` that are within one year of the most recent release. Breaking changes unrelated to feature availability may be introduced that will impact versions released more than one year ago. For example, as of January 2023 Cloudflare will support `cloudflared` version 2023.1.1 to cloudflared 2022.1.1.

To update `cloudflared`, refer to [these instructions](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#page","headline":"Downloads · Cloudflare One docs","description":"Reference information for Downloads in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
