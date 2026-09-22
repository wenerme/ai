---
description: The descriptions below detail the fields available for magic_ids_detections.
title: Magic IDS Detections
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Magic IDS Detections

Last updated Sep 14, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_ids_detections/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `magic_ids_detections`.

## Action

Type: `string`

What action was taken on the packet. Possible values are *pass* | *block*.

## ColoCity

Type: `string`

The city where the detection occurred.

## ColoCode

Type: `string`

The IATA airport code corresponding to where the detection occurred.

## DestinationIP

Type: `string`

The destination IP of the packet which triggered the detection.

## DestinationPort

Type: `int`

The destination port of the packet which triggered the detection. It is set to 0 if the protocol field is set to *any*.

## Protocol

Type: `string`

The layer 4 protocol of the packet which triggered the detection. Possible values are *tcp* | *udp* | *any*. Variant *any* means a detection occurred at a lower layer (such as IP).

## SignatureID

Type: `int`

The signature ID of the detection.

## SignatureMessage

Type: `string`

The signature message of the detection. Describes what the packet is attempting to do.

## SignatureRevision

Type: `int`

The signature revision of the detection.

## SourceIP

Type: `string`

The source IP of packet which triggered the detection.

## SourcePort

Type: `int`

The source port of the packet which triggered the detection. It is set to 0 if the protocol field is set to *any*.

## Timestamp

Type: `int or string`

A timestamp of when the detection occurred.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_ids_detections/#page","headline":"Magic IDS Detections","description":"The descriptions below detail the fields available for magic_ids_detections.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/magic_ids_detections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
