---
description: TypeScript type definitions for the Flagship binding, including Flagship, FlagshipEvaluationContext, and FlagshipEvaluationDetails.
title: Types
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Types

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/flagship/binding/types/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Flagship binding uses the following TypeScript types. These are available from the `@cloudflare/workers-types` package after running `npx wrangler types`.

## `Flagship`

The binding type. Each Flagship binding in your Wrangler configuration is typed as `Flagship` on the `Env` interface.

```ts
interface Env {
	FLAGS: Flagship;
}
```

Refer to the [methods reference](https://developers.cloudflare.com/flagship/binding/methods/) for the full list of evaluation methods available on the binding.

## `FlagshipEvaluationContext`

A record of attribute names to values passed for [targeting rules](https://developers.cloudflare.com/flagship/targeting/). Use this to provide user attributes such as user ID, country, or plan type.

```ts
type FlagshipEvaluationContext = Record<string, string | number | boolean>;
```

## `FlagshipEvaluationDetails`

Returned by the `*Details` methods. Contains the evaluated value and metadata about how Flagship resolved the flag.

```ts
interface FlagshipEvaluationDetails<T> {
	flagKey: string;
	value: T;
	variant?: string;
	reason?: string;
	errorCode?: string;
}
```

| Property  | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| flagKey   | string | The key of the evaluated flag.                                                      |
| value     | T      | The resolved flag value.                                                            |
| variant   | string | The name of the matched variant, if any.                                            |
| reason    | string | Why the flag resolved to this value (for example, "TARGETING\_MATCH" or "DEFAULT"). |
| errorCode | string | An error code if evaluation failed (for example, "TYPE\_MISMATCH" or "GENERAL").    |

Refer to [evaluation reasons and error codes](https://developers.cloudflare.com/flagship/reference/evaluation-reasons/) for the full list of possible values.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/binding/types/#page","headline":"Types · Cloudflare Flagship docs","description":"TypeScript type definitions for the Flagship binding, including Flagship, FlagshipEvaluationContext, and FlagshipEvaluationDetails.","url":"https://developers.cloudflare.com/flagship/binding/types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
