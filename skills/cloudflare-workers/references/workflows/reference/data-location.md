---
description: Restrict a Workflow to a jurisdiction to control where its instances run and store data.
title: Data location
image: https://developers.cloudflare.com/workflows/reference/data-location/og.png?v=3aaef27a8dc1f7d3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt
> Use this file to discover all available pages before exploring further.

# Data location

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workflows/reference/data-location/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Restrict Workflows to a jurisdiction

Jurisdictions are used to create Workflows whose instances only run and store data within a region to comply with data localization regulations such as [GDPR ↗︎](https://gdpr-info.eu/) or [FedRAMP ↗︎](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers can still create and manage instances of a Workflow restricted to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Workflow instances themselves run and persist data. Consider using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

Settings

A Workflow's settings are stored outside of the specified jurisdiction.

To restrict a Workflow to a jurisdiction, set `jurisdiction` on its `workflows` binding in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/#workflows):

```jsonc
{
	"workflows": [
		{
			"name": "my-workflow",
			"binding": "MY_WORKFLOW",
			"class_name": "MyWorkflow",
			"jurisdiction": "eu",
		},
	],
}
```

```toml
[[workflows]]
name = "my-workflow"
binding = "MY_WORKFLOW"
class_name = "MyWorkflow"
jurisdiction = "eu"
```

You can also set `jurisdiction` on a Workflow declared in [`exports`](https://developers.cloudflare.com/workflows/build/workers-api/#declare-workflows-in-exports). When you run `wrangler deploy`, Wrangler creates the Workflow in that jurisdiction. Setting a jurisdiction requires Wrangler 4.152.0 or above.

- A Workflow's jurisdiction is set when the Workflow is created, and cannot be changed afterwards. If an existing Workflow has a different jurisdiction, `wrangler deploy` and `wrangler versions upload` stop before uploading your Worker.
- To use a different jurisdiction, give the Workflow a new name, or delete the existing Workflow first. Deleting a Workflow also deletes its instances.
- If you remove `jurisdiction` from your configuration, the Workflow keeps its existing jurisdiction.
- `jurisdiction` cannot be combined with `script_name`. To bind to a Workflow defined in another Worker, set `jurisdiction` on the Worker that defines the Workflow.
- [Local development](https://developers.cloudflare.com/workflows/build/local-development/) ignores `jurisdiction`.
- [`wrangler workflows describe`](https://developers.cloudflare.com/workers/wrangler/commands/workflows/#workflows-describe) shows the jurisdiction of a Workflow.

### Supported locations

The following jurisdictions are supported:

| Parameter | Location |
| --- | --- |
| eu | The European Union |
| us | The United States |
| fedramp | FedRAMP-Moderate data centers |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/reference/data-location/#page","headline":"Data location","description":"Restrict a Workflow to a jurisdiction to control where its instances run and store data.","url":"https://developers.cloudflare.com/workflows/reference/data-location/","inLanguage":"en","image":"https://developers.cloudflare.com/workflows/reference/data-location/og.png?v=3aaef27a8dc1f7d3","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
