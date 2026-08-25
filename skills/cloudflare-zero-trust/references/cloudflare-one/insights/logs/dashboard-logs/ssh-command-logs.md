---
description: Review SSH commands a user ran on a target.
title: SSH command logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# SSH command logs

Last updated May 1, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/ssh-command-logs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

SSH command logs record the commands that users run on infrastructure targets protected by [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/). Use these logs to audit user activity on your SSH servers and investigate specific sessions.

To view SSH command logs, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and go to **Insights** \> **Logs** \> **SSH command logs**.

## Prerequisites

To generate SSH command logs, you must:

1. Set up [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) for your SSH servers.
2. [Enable SSH command logging](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#ssh-command-logs) by uploading an encryption public key. Cloudflare uses this key to encrypt your logs so that only you can read their contents.

## View SSH logs

SSH command logs displayed in the dashboard are encrypted using the public key you provided during setup. The logs are not readable in the dashboard — you must download and decrypt them locally. To view the contents of the logs:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Logs** \> **SSH command logs**.
2. Filter the logs using the name of your SSH application.
3. Select the SSH session for which you want to export command logs.
4. In the side panel, scroll down to **SSH logs** and select **Download**.
5. Decrypt the log using the [SSH Logging CLI ↗](https://github.com/cloudflare/ssh-log-cli/) and the private key that corresponds to the public key you uploaded.

## Log fields

| Field                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Session ID**              | Unique identifier for the SSH session.                                                                                                                                                                                                                                                                                                                                                                                     |
| **User email**              | Email address of the user who initiated the SSH session.                                                                                                                                                                                                                                                                                                                                                                   |
| **Target ID**               | Identifier of the infrastructure target being accessed. Corresponds to the target you configured in Access for Infrastructure.                                                                                                                                                                                                                                                                                             |
| **Client address**          | Source IP address of the SSH connection.                                                                                                                                                                                                                                                                                                                                                                                   |
| **Server address**          | Destination IP address of the SSH server.                                                                                                                                                                                                                                                                                                                                                                                  |
| **Session start datetime**  | Timestamp when the SSH session started.                                                                                                                                                                                                                                                                                                                                                                                    |
| **Session finish datetime** | Timestamp when the SSH session ended.                                                                                                                                                                                                                                                                                                                                                                                      |
| **Program type**            | Type of SSH program: shell (interactive terminal), exec (single command execution), x11, direct-tcpip, or forwarded-tcpip. Note that x11, direct-tcpip, and forwarded-tcpip correspond to SSH features that are [not currently supported](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#known-limitations) by Access for Infrastructure. |
| **Payload**                 | Captured request/response data in [asciicast v2 ↗](https://docs.asciinema.org/manual/asciicast/v2/) format, a structured terminal recording format. Includes commands for exec programs.                                                                                                                                                                                                                                   |
| **Error**                   | SSH error message, if an error occurred during the session.                                                                                                                                                                                                                                                                                                                                                                |

## Export SSH logs with Logpush

Enterprise users can export SSH command logs to external storage or analysis destinations using [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). Unlike dashboard logs, Logpush payloads are not encrypted with a customer-provided public key — secure access to your storage destination accordingly.

For a list of all available fields, refer to [SSH Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh%5Flogs/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/ssh-command-logs/#page","headline":"SSH command logs · Cloudflare One docs","description":"Review SSH commands a user ran on a target.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/ssh-command-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging","SSH"]}
```
