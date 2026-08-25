---
description: Attach optional Sandbox capabilities on @cloudflare/sandbox@next.
title: Extensions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Extensions

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/1-0-preview/extensions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Path to Sandbox SDK 1.0

This page documents extensions on `@cloudflare/sandbox@next`, the preview of Sandbox SDK 1.0.

Extensions add optional capabilities to your `Sandbox` subclass as nested namespaces (for example `sandbox.interpreter.*`). They are not free-floating globals on every app.

## Attach pattern

```js
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox {
	interpreter = withInterpreter(this);
}
```

```ts
import { Sandbox as BaseSandbox } from "@cloudflare/sandbox";
import { withInterpreter } from "@cloudflare/sandbox/interpreter";

export class Sandbox extends BaseSandbox<Env> {
	interpreter = withInterpreter(this);
}
```

Export that class from your Worker. Call extension methods through the nested property from application code.

## First-party extensions

The following first-party extensions are available on the preview package:

| Extension        | Package                         | Docs                                                                                                                                                                              |
| ---------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code interpreter | @cloudflare/sandbox/interpreter | [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/), [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/) |
| OpenCode         | @cloudflare/sandbox/opencode    | Confirm exports in your installed @next version (for example withOpenCode and client/proxy helpers).                                                                              |

For the interpreter, attach once, then use the same method names as the stable package (`createCodeContext`, `runCode`, and related calls) on `sandbox.interpreter`. Python needs the **`-python`** image variant. For the full how-to, refer to [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/).

## Custom extensions

Application-defined extensions are experimental. Helpers exist under `@cloudflare/sandbox/extensions`, but preview documentation does not yet cover authoring or publishing a custom extension. Prefer the first-party extensions in the table, or keep any custom code inside your application until a supported authoring guide ships.

## Related

* [Code interpreter](https://developers.cloudflare.com/sandbox/1-0-preview/interpreter/)
* [Interpreter API](https://developers.cloudflare.com/sandbox/1-0-preview/api/interpreter/)
* [API reference](https://developers.cloudflare.com/sandbox/1-0-preview/api/)
* [Migrate](https://developers.cloudflare.com/sandbox/1-0-preview/migrate/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/1-0-preview/extensions/#page","headline":"Extensions · Cloudflare Sandbox SDK docs","description":"Attach optional Sandbox capabilities on @cloudflare/sandbox@next.","url":"https://developers.cloudflare.com/sandbox/1-0-preview/extensions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
