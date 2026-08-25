---
description: Flagship evaluation reason values and error codes returned by binding details methods and the OpenFeature SDK.
title: Evaluation reasons and error codes
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt
> Use this file to discover all available pages before exploring further.

# Evaluation reasons and error codes

Last updated Jun 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/flagship/reference/evaluation-reasons/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you evaluate a flag using the binding's `*Details` methods or the OpenFeature SDK, the response includes a `reason` field that explains why a particular value was returned. If an error occurs, the response includes an `errorCode` field.

## Evaluation reasons

| Reason           | Description                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TARGETING\_MATCH | A targeting rule's conditions matched the evaluation context, and the rule's variant was returned.                               |
| SPLIT            | A targeting rule with a percentage rollout matched. The user fell within the rollout percentage and received the rule's variant. |
| DEFAULT          | No targeting rule matched the evaluation context. The flag's default variant was returned.                                       |
| DISABLED         | The flag is disabled. The default variant was returned regardless of targeting rules.                                            |
| CACHED           | The SDK returned a cached evaluation result.                                                                                     |
| ERROR            | Evaluation failed and the default value was returned.                                                                            |

## Error codes

When an evaluation error occurs, the method returns the default value you provided. The `*Details` methods include additional metadata about the error.

| Error code       | Description                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TYPE\_MISMATCH   | The flag's variant type does not match the requested type. For example, calling getBooleanValue on a flag whose variant is a string. The default value is returned. |
| FLAG\_NOT\_FOUND | The specified flag key does not exist in the app. The default value is returned.                                                                                    |
| INVALID\_CONTEXT | The evaluation context contains unsupported values, such as objects or arrays in HTTP evaluation. The default value is returned.                                    |
| PARSE\_ERROR     | The SDK received an invalid evaluation response. The default value is returned.                                                                                     |
| GENERAL          | An unexpected error occurred during evaluation, such as a timeout or network failure. The default value is returned.                                                |

## Example

The following example inspects evaluation details returned by `getBooleanDetails`:

```js
const details = await env.FLAGS.getBooleanDetails("my-feature", false, {
	userId: "user-42",
});

switch (details.reason) {
	case "TARGETING_MATCH":
		console.log(`Matched targeting rule, variant: ${details.variant}`);
		break;
	case "SPLIT":
		console.log(`Included in rollout, variant: ${details.variant}`);
		break;
	case "DEFAULT":
		console.log("No rule matched, using default variant");
		break;
	case "DISABLED":
		console.log("Flag is disabled");
		break;
}

if (details.errorCode) {
	console.error(`Evaluation error: ${details.errorCode}`);
}
```

```ts
const details = await env.FLAGS.getBooleanDetails("my-feature", false, {
	userId: "user-42",
});

switch (details.reason) {
	case "TARGETING_MATCH":
		console.log(`Matched targeting rule, variant: ${details.variant}`);
		break;
	case "SPLIT":
		console.log(`Included in rollout, variant: ${details.variant}`);
		break;
	case "DEFAULT":
		console.log("No rule matched, using default variant");
		break;
	case "DISABLED":
		console.log("Flag is disabled");
		break;
}

if (details.errorCode) {
	console.error(`Evaluation error: ${details.errorCode}`);
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/reference/evaluation-reasons/#page","headline":"Evaluation reasons and error codes · Cloudflare Flagship docs","description":"Flagship evaluation reason values and error codes returned by binding details methods and the OpenFeature SDK.","url":"https://developers.cloudflare.com/flagship/reference/evaluation-reasons/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
