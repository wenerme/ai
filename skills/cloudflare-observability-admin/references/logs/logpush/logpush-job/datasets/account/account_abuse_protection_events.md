---
description: The descriptions below detail the fields available for account_abuse_protection_events.
title: Account Abuse Protection Events
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Account Abuse Protection Events

Last updated Sep 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/account_abuse_protection_events/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `account_abuse_protection_events`.

## AuthenticationIdentityProvider

Type: `string`

The identity provider used for login authentication. Only populated for login events.
Possible values are *unknown* | *other* | *selfHosted* | *amazon* | *apple* | *discord* | *facebook* | *github* | *linkedin* | *microsoft*.

## AuthenticationMethod

Type: `string`

The authentication method used for login. Only populated for login events.
Possible values are *unknown* | *password* | *sso* | *magicLink* | *biometric* | *passkey*.

## AuthenticationStatus

Type: `string`

The outcome of a login attempt. Only populated for login events.
Possible values are *unknown* | *other* | *success* | *failureOther* | *failureUserNotFound* | *failureIncorrectPassword* | *failureAccountLocked* | *pendingMfa*.

## BotScore

Type: `int`

Cloudflare Bot Management score. Values from 1 (likely bot) to 99 (likely human).

## ClientASN

Type: `int`

Client AS number.

## ClientCity

Type: `string`

Approximate city of the client.

## ClientCountry

Type: `string`

2-letter ISO-3166 country code of the client IP address.

## ClientIP

Type: `string`

IP address of the client.

## Email

Type: `string`

The email address associated with the event.

## EphemeralID

Type: `string`

The Turnstile ephemeral device identifier, hex-encoded.

## EventSource

Type: `string`

The source of the Account Abuse Protection event.
Possible values are *cdn* | *api*.

## EventType

Type: `string`

The type of user action.
Possible values are *login* | *logout* | *signup* | *warpEnrollment* | *profileUpdate* | *transaction* | *unknown* | *passwordReset* | *addPaymentMethod*.

## FraudEmailRisk

Type: `string`

Risk level of the email address.
Possible values are *Unknown* | *Low* | *Medium* | *High*.

## Host

Type: `string`

The HTTP hostname requested by the visitor.

## JA4

Type: `string`

The JA4 TLS client fingerprint.

## RayID

Type: `string`

The RayID of the request.

## Timestamp

Type: `int or string`

The date and time the event occurred. To specify the timestamp format, refer to [Output types](https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#output-types).

## UserAgent

Type: `string`

The user-agent string of the visitor.

## UserID

Type: `string`

A zone-unique identifier for the user, hex-encoded. Derived from the external user identifier provided during event submission.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/account_abuse_protection_events/#page","headline":"Account Abuse Protection Events","description":"The descriptions below detail the fields available for account_abuse_protection_events.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/account_abuse_protection_events/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
