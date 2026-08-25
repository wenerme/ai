---
description: The descriptions below detail the fields available for casb_findings.
title: CASB Findings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# CASB Findings

Last updated Jul 25, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb%5Ffindings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The descriptions below detail the fields available for `casb_findings`.

## AssetDisplayName

Type: `string`

Asset display name (for example, 'My File Name.docx').

## AssetExternalID

Type: `string`

Unique identifier for an asset of this type. Format will vary by policy vendor.

## AssetLink

Type: `string`

URL to the asset. This may not be available for some policy vendors and asset types.

## AssetMetadata

Type: `object`

Metadata associated with the asset. Structure will vary by policy vendor.

## DetectedTimestamp

Type: `int or string`

Date and time the finding was first identified (for example, '2021-07-27T00:01:07Z').

## FindingTypeDisplayName

Type: `string`

Human-readable name of the finding type (for example, 'File Publicly Accessible Read Only').

## FindingTypeID

Type: `string`

UUID of the finding type in Cloudflare's system.

## FindingTypeSeverity

Type: `string`

Severity of the finding type (for example, 'High').

## InstanceID

Type: `string`

UUID of the finding in Cloudflare's system.

## IntegrationDisplayName

Type: `string`

Human-readable name of the integration (for example, 'My Google Workspace Integration').

## IntegrationID

Type: `string`

UUID of the integration in Cloudflare's system.

## IntegrationPolicyVendor

Type: `string`

Human-readable vendor name of the integration's policy (for example, 'Google Workspace Standard Policy').

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb_findings/#page","headline":"CASB Findings · Cloudflare Logs docs","description":"The descriptions below detail the fields available for casb_findings.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/casb_findings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-07-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
