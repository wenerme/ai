---
description: Use Cloudflare Workers in your account to adjust DLP confidence or reject matches from custom pattern entries.
title: Validate data loss prevention matches with Cloudflare Workers
image: https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/custom-validation-workers/og.png?v=d2548d04485a6ff7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Validate data loss prevention matches with Cloudflare Workers

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/custom-validation-workers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Data loss prevention (DLP) can run a Cloudflare Worker in your account when a pattern matches. Use your Worker to apply organization-specific checks, adjust confidence, or reject the match.

Custom functions appear in the entry editor when this feature is available for your account. You can attach them to custom pattern entries.

## Set up your Workers account

1. Set up Workers in the same [Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/) where you configure DLP. If you have not used Workers before, follow the [Workers getting started guide](https://developers.cloudflare.com/workers/get-started/guide/).
2. Configure a [Workers subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) for that account.

## Create a validation Worker

Deploy the Worker to the account where you configure DLP. Export a class named `DlpValidationEntrypoint` with a `validate` method. Import its base class and types from `@cloudflare/zt-types`.

npmyarnpnpmbun

```
npm i @cloudflare/zt-types
```

```
yarn add @cloudflare/zt-types
```

```
pnpm add @cloudflare/zt-types
```

```
bun add @cloudflare/zt-types
```

The method receives a `DlpValidationInput` with the entry ID, match offsets, and request method and URL. Its `excerpt` is base64-encoded and contains the match with surrounding context. The `userId` field is optional.

*src/index.jsjs*

```js
import { DlpValidation } from "@cloudflare/zt-types";

export class DlpValidationEntrypoint extends DlpValidation {
	async validate(input) {
		if (input.entryId === "entry-id-to-reject") {
			return { score: "veto" };
		}

		return { score: 0 };
	}
}
```

*src/index.tsts*

```ts
import {
	DlpValidation,
	type DlpValidationInput,
	type DlpValidationResult,
} from "@cloudflare/zt-types";

export class DlpValidationEntrypoint extends DlpValidation {
	async validate(input: DlpValidationInput): Promise<DlpValidationResult> {
		if (input.entryId === "entry-id-to-reject") {
			return { score: "veto" };
		}

		return { score: 0 };
	}
}
```

Replace the example condition with your validation logic. Return a score from `-1` to `1` to adjust confidence. Positive scores increase confidence. Negative scores decrease it. A score of `0` leaves confidence unchanged. Return `"veto"` to reject the match.

## Attach a Worker to a pattern entry

1. Log in to Cloudflare One and go to **Data loss prevention** > **Detection entries**. [Go to **Detection entries** ↗](https://one.dash.cloudflare.com/?to=/:account/dlp/detection-entries)
2. From the **Pattern** tab, add a pattern entry or edit an existing custom pattern entry.
3. In **Validators**, select **Custom functions**.
4. Select **Add custom function**.
5. Select **Create new**, or select **Use existing** and choose a saved function.
6. For a new function, enter a name and select an eligible Worker.
7. (Optional) For a new function, choose the default behavior for Worker errors or timeouts.
8. For a new function, select **Create**. Select **Save** on the pattern entry.

Default behavior options are *No fallback*, *Veto*, or *Score*. Scores range from `-1` to `1`.

To use the pattern entry in DLP scanning, add it to a [custom DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/#build-a-custom-profile).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/custom-validation-workers/#page","headline":"Validate data loss prevention matches with Cloudflare Workers","description":"Use Cloudflare Workers in your account to adjust DLP confidence or reject matches from custom pattern entries.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/custom-validation-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/custom-validation-workers/og.png?v=d2548d04485a6ff7","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
```
