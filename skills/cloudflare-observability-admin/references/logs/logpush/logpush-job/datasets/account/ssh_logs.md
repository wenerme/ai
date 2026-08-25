---
description: The descriptions below detail the fields available for ssh_logs.
title: SSH Logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# SSH Logs

Last updated Jul 25, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh%5Flogs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `ssh_logs`.

## AccountID

Type: `string`

Cloudflare account ID.

## ClientAddress

Type: `string`

The source address of the SSH command.

## Datetime

Type: `int or string`

The timestamp in UTC of when this message is being sent.

## Error

Type: `string`

An SSH error. Only used if an error has occurred.

## PTY

Type: `string`

This is used by certain programs types to synchronize local and remote SSH terminal state.

## Payload

Type: `string`

The captured request/response data, in asciicast v2 format. This includes the command associated with the 'exec' program type.

## ProgramFinishDatetime

Type: `int or string`

The timestamp in UTC of the SSH program termination. This is empty until the program ends.

## ProgramID

Type: `string`

The SSH program ID. A single SSH session can have multiple programs running.

## ProgramStartDatetime

Type: `int or string`

The timestamp in UTC of the SSH program creation.

## ProgramType

Type: `string`

The SSH program being run. The options are 'shell': opens an interactive terminal, 'exec': execute a single specified command, 'x11': is for an interactive graphical environment, 'direct-tcpip': direct tunneling, 'forwarded-tcpip': reverse tunneling.

## ServerAddress

Type: `string`

The destination address for the SSH session.

## SessionFinishDatetime

Type: `int or string`

The timestamp in UTC of the SSH session termination. This is empty until the session ends.

## SessionID

Type: `string`

SSH session ID.

## SessionStartDatetime

Type: `int or string`

The timestamp in UTC of the SSH session creation.

## TargetID

Type: `string`

The identifier of the target being accessed.

## UserEmail

Type: `string`

User email address.

## UserID

Type: `string`

Cloudflare user ID.

## Username

Type: `string`

The principal user being accessed on SSH server's machine. This will be empty if an error was thrown when establishing the connection.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh_logs/#page","headline":"SSH Logs · Cloudflare Logs docs","description":"The descriptions below detail the fields available for ssh_logs.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh_logs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
