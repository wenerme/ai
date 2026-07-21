---
description: The descriptions below detail the fields available for email_security_post_delivery_events.
title: Email Security Post-Delivery Events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

#  Email Security Post-Delivery Events

Last updated May 14, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/email%5Fsecurity%5Fpost%5Fdelivery%5Fevents/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `email_security_post_delivery_events`.

## AlertID

Type: `string`

Email Security alert ID for the original message.

## CompletedAt

Type: `int or string`

The timestamp when the post-delivery action completed. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## Destination

Type: `string`

Target folder for MOVE operations (for example, 'RecoverableItemsPurges').

## FinalDisposition

Type: `string`

Threat disposition of the original message.
Possible values are _unset_ | _none_ | _malicious_ | _suspicious_ | _spam_ | _spoof_ | _bulk_.

## Folder

Type: `string`

Resolved folder name after a successful MOVE.

## From

Type: `string`

From header address of the original message (for example, '[firstlast@cloudflare.com](mailto:firstlast@cloudflare.com)').

## FromName

Type: `string`

From header display name of the original message (for example, 'First Last').

## MessageID

Type: `string`

RFC Message-ID header of the original message.

## MessageTimestamp

Type: `int or string`

The timestamp of the original message. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## MicrosoftTenantID

Type: `string`

Microsoft 365 tenant identifier.

## Operation

Type: `string`

Post-delivery action type.
Possible values are _move_ | _submission_ | _quarantineRelease_.

## PostfixID

Type: `string`

Email Security postfix queue identifier for the original message.

## Reasons

Type: `array[string]`

Detection findings that prompted the post-delivery action (for example, 'Malicious URL').

## Recipient

Type: `string`

Email address of the targeted mailbox (for example, '[firstlast@cloudflare.com](mailto:firstlast@cloudflare.com)').

## RequestedAt

Type: `int or string`

The timestamp when the post-delivery action was requested. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## RequestedBy

Type: `string`

Identity that requested the post-delivery action; expected format is an email address.

## RequestedDisposition

Type: `string`

Requested disposition for SUBMISSION operations.

## Status

Type: `string`

Status message returned by the post-delivery provider (for example, 'OK').

## Subject

Type: `string`

Subject header of the original message.

## Success

Type: `bool`

Whether the post-delivery action succeeded.

## To

Type: `array[string]`

Recipient addresses of the original message (for example, '[firstlast@cloudflare.com](mailto:firstlast@cloudflare.com)').

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/email_security_post_delivery_events/#page","headline":"Email Security Post-Delivery Events · Cloudflare Logs docs","description":"The descriptions below detail the fields available for email_security_post_delivery_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/email_security_post_delivery_events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-14","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
