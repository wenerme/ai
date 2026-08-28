---
description: Runtime and user-defined environment variables available inside Container instances.
title: Environment Variables
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Environment Variables

Last updated Aug 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/configuration/environment-variables/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Runtime environment variables

The container runtime automatically sets the following variables:

* `CLOUDFLARE_APPLICATION_ID` \- the ID of the Containers application
* `CLOUDFLARE_COUNTRY_A2` \- the [ISO 3166-1 Alpha 2 code ↗](https://www.iso.org/obp/ui/#search/code/) of a country the container is placed in
* `CLOUDFLARE_LOCATION` \- a name of a location the container is placed in
* `CLOUDFLARE_REGION` \- a region name
* `CLOUDFLARE_DURABLE_OBJECT_ID` \- the ID of the Durable Object instance that the container is bound to. You can use this to identify particular container instances on the dashboard.

## User-defined environment variables

You can set environment variables when defining a Container in your Worker, or when starting a container instance.

For example:

```javascript
class MyContainer extends Container {
	defaultPort = 4000;
	envVars = {
		MY_CUSTOM_VAR: "value",
		ANOTHER_VAR: "another_value",
	};
}
```

More details about defining environment variables and secrets can be found in [this example](https://developers.cloudflare.com/containers/examples/env-vars-and-secrets).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/configuration/environment-variables/#page","headline":"Environment Variables · Cloudflare Containers docs","description":"Runtime and user-defined environment variables available inside Container instances.","url":"https://developers.cloudflare.com/containers/configuration/environment-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
