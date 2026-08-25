---
description: Reference for the runWithTools and autoTrimTools methods in embedded function calling.
title: API Reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# API Reference

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/api-reference/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn more about the API reference for [embedded function calling](https://developers.cloudflare.com/workers-ai/features/function-calling/embedded).

## runWithTools

This wrapper method enables you to do embedded function calling. You pass it the AI binding, model, inputs (`messages` array and `tools` array), and optional configurations.

* `AI Binding`Ai
  * The AI binding, such as `env.AI`.
* `model`BaseAiTextGenerationModels
  * The ID of the model that supports function calling. For example, `@hf/nousresearch/hermes-2-pro-mistral-7b`.
* `input`Object
  * `messages`RoleScopedChatInput\[\]
  * `tools`AiTextGenerationToolInputWithFunction\[\]
* `config`Object
  * `streamFinalResponse`boolean optional
  * `maxRecursiveToolRuns`number optional
  * `strictValidation`boolean optional
  * `verbose`boolean optional
  * `trimFunction`boolean optional - For the `trimFunction`, you can pass it `autoTrimTools`, which is another helper method we've devised to automatically choose the correct tools (using an LLM) before sending it off for inference. This means that your final inference call will have fewer input tokens.

## createToolsFromOpenAPISpec

This method lets you automatically create tool schemas based on OpenAPI specs, so you don't have to manually write or hardcode the tool schemas. You can pass the OpenAPI spec for any API in JSON or YAML format.

`createToolsFromOpenAPISpec` has a config input that allows you to perform overrides if you need to provide headers like Authentication or User-Agent.

* `spec`string
  * The OpenAPI specification in either JSON or YAML format, or a URL to a remote OpenAPI specification.
* `config`Config optional - Configuration options for the createToolsFromOpenAPISpec function
  * `overrides`ConfigRule\[\] optional
  * `matchPatterns`RegExp\[\] optional
  * `options` Object optional { `verbose` boolean optional }

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/api-reference/#page","headline":"API Reference - Embedded function calling · Cloudflare Workers AI docs","description":"Reference for the runWithTools and autoTrimTools methods in embedded function calling.","url":"https://developers.cloudflare.com/workers-ai/features/function-calling/embedded/api-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
