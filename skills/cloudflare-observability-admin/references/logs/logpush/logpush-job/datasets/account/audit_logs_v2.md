---
description: The descriptions below detail the fields available for audit_logs_v2.
title: Audit Logs V2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Audit Logs V2

Last updated Aug 12, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit%5Flogs%5Fv2/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `audit_logs_v2`.

## AccountID

Type: `string`

The Cloudflare account ID.

## AccountName

Type: `string`

The Cloudflare account name.

## ActionDescription

Type: `string`

Description of action taken.

## ActionResult

Type: `string`

Whether the action was successful.

## ActionTimestamp

Type: `int or string`

When the change happened.

## ActionType

Type: `string`

Type of action taken.

## ActorContext

Type: `string`

Context of the actor.

## ActorEmail

Type: `string`

Email of the actor.

## ActorID

Type: `string`

Unique identifier of the actor in Cloudflare's system.

## ActorIPAddress

Type: `string`

Physical network address of the actor.

## ActorTokenDetails

Type: `object`

Details of how the actor is authenticated.

## ActorType

Type: `string`

Type of user that started the audit trail.

## AuditLogID

Type: `string`

Unique identifier of an audit log.

## Raw

Type: `object`

Raw data.

## ResourceID

Type: `string`

Unique identifier of the resource within Cloudflare's system.

## ResourceProduct

Type: `string`

Resource product.

## ResourceRequest

Type: `object`

Resource request.

## ResourceResponse

Type: `object`

Resource response.

## ResourceScope

Type: `string`

Resource scope.

## ResourceType

Type: `string`

The type of resource that was changed.

## ResourceValue

Type: `object`

Resource value.

## ZoneID

Type: `string`

The Cloudflare zone ID.

## ZoneName

Type: `string`

The Cloudflare zone name.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs_v2/#page","headline":"Audit Logs V2 · Cloudflare Logs docs","description":"The descriptions below detail the fields available for audit_logs_v2.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit_logs_v2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-08-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
