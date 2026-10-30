---
description: Define Agent Skills in code with skills.manifest(), for tests and small fixed sets of skills.
title: Code
image: https://developers.cloudflare.com/agents/skills/sources/code/og.png?v=b6c4ce52e064c334
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Code

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/skills/sources/code/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`skills.manifest()` creates a source from [Agent Skills](https://developers.cloudflare.com/agents/skills/) defined in code. It needs no Workspace or bucket, which suits tests and small sets of skills that ship with your Worker.

## Define skills

Each entry holds the `SKILL.md` fields and, optionally, its resources:

*src/server.jsjs*

```js
import { Think, skills } from "@cloudflare/think";

const handbook = skills.manifest({
	id: "handbook",
	skills: [
		{
			name: "release-notes",
			description: "Turn a list of changes into release notes.",
			body: "Read `references/style-guide.md`, then write one line per change.",
			metadata: { author: "my-team" },
			resources: [
				{
					path: "references/style-guide.md",
					content: "Start each line with a past-tense verb.",
				},
			],
		},
	],
});

export class MyAgent extends Think {
	getSkills() {
		return [handbook];
	}
}
```

*src/server.tsts*

```ts
import { Think, skills } from "@cloudflare/think";

const handbook = skills.manifest({
	id: "handbook",
	skills: [
		{
			name: "release-notes",
			description: "Turn a list of changes into release notes.",
			body: "Read `references/style-guide.md`, then write one line per change.",
			metadata: { author: "my-team" },
			resources: [
				{
					path: "references/style-guide.md",
					content: "Start each line with a past-tense verb.",
				},
			],
		},
	],
});

export class MyAgent extends Think<Env> {
	getSkills() {
		return [handbook];
	}
}
```

## Entry fields

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Skill name. Must follow the [naming rules](https://developers.cloudflare.com/agents/skills/#validation) |
| `description` | Yes | What the skill does and when to use it |
| `body` | Yes | Markdown instructions |
| `license` | No | License name or bundled license file |
| `compatibility` | No | Environment requirements |
| `metadata` | No | String key-value metadata |
| `allowedTools` | No | Space-separated list of pre-approved tools |
| `resources` | No | Files as `{ path, content }`. Use `encoding: "base64"` for binary files |

Entries pass the same [checks](https://developers.cloudflare.com/agents/skills/#validation) as `SKILL.md` files: an entry that breaks a rule loads with a warning, and one with no `description` is skipped and logged.

`skills.fromManifest()` is a deprecated alias of `skills.manifest()`.

## Combine with other sources

A manifest works next to other sources. Sources are applied in order, so put the source you want to win first:

```js
export class MyAgent extends Think {
	getSkills() {
		return [skills.workspace(this.workspace), handbook];
	}
}
```

```ts
export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace), handbook];
	}
}
```

Here, a Workspace skill named `release-notes` replaces the manifest's version.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/skills/sources/code/#page","headline":"Code","description":"Define Agent Skills in code with skills.manifest(), for tests and small fixed sets of skills.","url":"https://developers.cloudflare.com/agents/skills/sources/code/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/skills/sources/code/og.png?v=b6c4ce52e064c334","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
