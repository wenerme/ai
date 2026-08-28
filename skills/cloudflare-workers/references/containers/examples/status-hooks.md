---
description: Execute Workers code in reaction to Container status changes
title: Status Hooks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Status Hooks

Execute Workers code in reaction to Container status changes

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/examples/status-hooks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When a Container starts, stops, becomes idle, and errors, it can trigger code execution in a Worker that has defined status hooks on the `Container` class. Refer to the [Container class lifecycle hooks](https://developers.cloudflare.com/containers/reference/container-class/#lifecycle-hooks) for more details.

```ts
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 4000;
	sleepAfter = "5m";

	override onStart() {
		console.log("Container successfully started");
	}

	override onStop(stopParams) {
		if (stopParams.exitCode === 0) {
			console.log("Container stopped gracefully");
		} else {
			console.log("Container stopped with exit code:", stopParams.exitCode);
		}

		console.log("Container stop reason:", stopParams.reason);
	}

	override async onActivityExpired() {
		console.log("Container became idle, stopping it now");
		await this.stop();
	}

	override onError(error: string) {
		console.log("Container error:", error);
	}
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/status-hooks/#page","headline":"Status Hooks · Cloudflare Containers docs","description":"Execute Workers code in reaction to Container status changes","url":"https://developers.cloudflare.com/containers/examples/status-hooks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
