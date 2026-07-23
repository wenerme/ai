---
description: Track the latest updates and changes to Cloudflare Turnstile.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/turnstile/changelog/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Subscribe to RSS](https://developers.cloudflare.com/turnstile/changelog/index.xml)

## 2024-08-12

* Added [\[flexible\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size) width widget size.
* Added new dimensions for Turnstile's compact size.
* Added a Feedback Report toggle on the widget's configuration.

## 2024-04-10

* Added [\[refresh-timeout\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#refresh-a-timed-out-widget) and document new automatic interactive timeout-refresh.

## 2024-03-25

* Added more [supported languages](https://developers.cloudflare.com/turnstile/reference/supported-languages).

## 2023-12-18

* Added [Pre-Clearance mode](https://developers.cloudflare.com/turnstile/concepts/pre-clearance-support/).

## 2023-08-24

* Added [Client-side errors](https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/).

## 2023-07-31

* Added [\[turnstile.isExpired\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#access-a-widgets-state).
* Added `uk` language.

## 2023-05-25

* Added idempotency support for `POST /siteverify` requests via the `idempotency_key` parameter.

## 2023-04-17

* Added references to Turnstile Public API.
* Added references for [\[after-interactive-callback\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget), [\[before-interactive-callback\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget), and [\[unsupported-callback\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget).

## 2023-03-06

* Added [\[execution\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget) and [\[appearance\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget).

## 2023-02-15

* Added the [\[turnstile.ready\]](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget) callback.

## 2023-02-01

* Added the [\[data-\]language](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) parameter.

## 2022-12-12

* [POST /siteverify](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) supports JSON requests now.

## 2022-11-11

* Added [retry and retry-interval](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) for controlling retry behavior.

## 2022-10-28

* Renamed the `[data-]expired-callback` callback to [\[data-\]timeout-callback](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) (called when the challenge times out).
* Added the [\[data-\]expired-callback](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) callback (called when the token expires).

## 2022-10-24

* Added [response-field and response-field-name](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations) for controlling the input element created by Turnstile.
* Added option for changing the [size of the Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size).

## 2022-10-13

* Added validation for action: `/^[a-z0-9_-]{0,32}$/i`
* Added validation for cData: `/^[a-z0-9_-]{0,255}$/i`

## 2022-10-11

* Added [turnstile.remove](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#remove-a-widget)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/turnstile/changelog/#page","headline":"Changelog · Cloudflare Turnstile docs","description":"Track the latest updates and changes to Cloudflare Turnstile.","url":"https://developers.cloudflare.com/turnstile/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
