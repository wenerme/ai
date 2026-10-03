---
description: Add tools, system prompt sections, and skills to a PiHarness with Pi Durable extensions.
title: Extensions
image: https://developers.cloudflare.com/agents/harnesses/pi/extensions/og.png?v=ff419cf17f0cd56f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Extensions

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/pi/extensions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Both tools and system prompt sections are provided to the Pi `Harness` via extensions. An extension is Pi Durable's own: a plain object with a `name`, `tools`, and `sections`, installed on the registry you pass to `Harness.open()`. [`PiHarness`](https://developers.cloudflare.com/agents/harnesses/pi/) does not wrap them, so every Pi Durable extension feature works.

Beta

`PiHarness` is in beta and will likely change as [Pi Durable ↗︎](https://earendil.com/posts/pi-durable/) matures.

## Install an extension

Create the registry with `createRegistry()` and install extensions in the `harness` factory, before `Harness.open()`:

*src/index.jsjs*

```js
import { Agent } from "agents";
import { Type } from "@earendil-works/pi-ai";
import { createModels } from "@earendil-works/pi-ai/models";
import { createRegistry, Harness } from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { createAI } from "agents/models/pi-ai";

const WordCount = Type.Object({ text: Type.String() });

const wordCount = {
	name: "word_count",
	description: "Count the words in a text.",
	parameters: WordCount,
	replay: "safe",
	// `text` is typed from `parameters`, which Pi validates first.
	async execute({ text }) {
		const words = text.split(/\s+/).filter(Boolean).length;
		return { content: [{ type: "text", text: String(words) }] };
	},
};

export class Editor extends Agent {
	ai = createAI({ binding: this.env.AI });
	registry = createRegistry();

	harness = new PiHarness({
		harness: ({ storage, context }) => {
			this.registry.install({
				name: "editor",
				sections: [
					{ key: "preamble", render: () => "You are an editor.", tag: false },
				],
				tools: [wordCount],
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry },
				context,
			);
		},
		defaults: { model: this.ai("@cf/moonshotai/kimi-k2.7-code") },
	});

	constructor(ctx, env) {
		super(ctx, env);
		this.lifecycle.use(this.harness);
	}
}
```

*src/index.tsts*

```ts
import { Agent } from "agents";
import { Type } from "@earendil-works/pi-ai";
import { createModels } from "@earendil-works/pi-ai/models";
import {
	createRegistry,
	Harness,
	type ToolRegistration,
} from "@earendil-works/pi-durable";
import { PiHarness } from "agents/harness/pi";
import { createAI } from "agents/models/pi-ai";

const WordCount = Type.Object({ text: Type.String() });

const wordCount: ToolRegistration<typeof WordCount> = {
	name: "word_count",
	description: "Count the words in a text.",
	parameters: WordCount,
	replay: "safe",
	// `text` is typed from `parameters`, which Pi validates first.
	async execute({ text }) {
		const words = text.split(/\s+/).filter(Boolean).length;
		return { content: [{ type: "text", text: String(words) }] };
	},
};

export class Editor extends Agent<Env> {
	ai = createAI({ binding: this.env.AI });
	registry = createRegistry();

	harness = new PiHarness({
		harness: ({ storage, context }) => {
			this.registry.install({
				name: "editor",
				sections: [
					{ key: "preamble", render: () => "You are an editor.", tag: false },
				],
				tools: [wordCount],
			});
			const models = createModels();
			models.setProvider(this.ai.provider);
			return Harness.open(
				storage,
				{ models, registry: this.registry },
				context,
			);
		},
		defaults: { model: this.ai("@cf/moonshotai/kimi-k2.7-code") },
	});

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.lifecycle.use(this.harness);
	}
}
```

The factory runs once per isolate, inside the object's startup, so each extension is installed once. `registry.install()` replaces an installed extension with the same name.

## Write a tool

A tool is a Pi Durable `ToolRegistration`:

- **Typed arguments.** Type a tool as `ToolRegistration<typeof Parameters>`, and `execute` gets arguments typed from the schema. Pi validates them against `parameters` before it calls `execute`. A bare `ToolRegistration` types its arguments as `unknown`.
- **What a running call can use.** `execute(args, api, context)` gets Pi's operations for the call. `api.output()` streams running output, `api.details()` sends data for a UI, and `api.memo()` stores values that survive an eviction.
- **Abort.** `context.abortSignal` is aborted when the call is. Honor it: `session.abort()` waits until every running tool returns.
- **Parallel calls.** Pi runs the tool calls in one model round at the same time by default. Set `executionMode: "sequential"` on a tool whose calls must run one after another. One sequential call makes its whole round sequential.

```ts
const FetchPage = Type.Object({ url: Type.String() });

const fetchPage: ToolRegistration<typeof FetchPage> = {
	name: "fetch_page",
	description: "Fetch a web page as text.",
	parameters: FetchPage,
	replay: "safe",
	async execute({ url }, api, context) {
		api.output(`fetching ${url}\n`);
		const response = await fetch(url, { signal: context.abortSignal });
		return { content: [{ type: "text", text: await response.text() }] };
	},
};
```

## Mark tools replay-safe

When an eviction interrupts a tool call, Pi decides what to do from the tool's `replay` setting:

- `replay: "safe"`: Pi runs the tool again after the object restarts.
- `replay: "unsafe"`, the default: Pi does not run it again. The model gets an interrupted result and decides what to do next.

Mark a tool safe when running it twice does no harm, such as a read, a search, or a whole-file write. Leave it unsafe when a second run would fail or repeat a side effect, such as an edit of text it already replaced, running code, or sending an email.

## Write a prompt section

A section's `render` runs before each model request. It receives the conversation, its agent and offered tools, and committed reads, so a section can change from one request to the next. Pi wraps the output in `<key>` tags unless `tag` is `false`:

```ts
this.registry.install({
	name: "context",
	sections: [
		{ key: "preamble", render: () => "You are an editor.", tag: false },
		{ key: "today", render: () => new Date().toDateString() },
	],
});
```

## Add skills

`skills(sources)` from `agents/harness/pi` turns [Agent Skills](https://developers.cloudflare.com/agents/runtime/execution/agent-skills/) sources from `agents/skills` into a Pi extension named `agents.skills`. It has two tools, `activate_skill` and `read_skill_resource`, and a `skills` section that lists the skills. It reads the sources, so install it in an `async` factory:

```ts
import { skills } from "agents/harness/pi";
import { fromManifest } from "agents/skills";

const handbook = fromManifest({
	id: "handbook",
	fingerprint: "v1",
	skills: [
		{
			name: "release-notes",
			description: "Write release notes.",
			body: "One line per change.",
		},
	],
});

harness = new PiHarness({
	harness: async ({ storage, context }) => {
		this.registry.install(await skills([handbook]));
		// ...models, then Harness.open()
	},
});
```

The tools match the ones [Think](https://developers.cloudflare.com/agents/harnesses/think/) offers, so a skill written for one works in the other. The model can read a skill's instructions and resources. Skill scripts do not run.

## Use more of Pi Durable

Because the registry is Pi's own, everything else Pi Durable extensions can do also works:

- Hooks on model requests, tool calls, and compaction, such as `hook(ToolTask, { beforeTool })`.
- Durable custom tasks that resume after a restart.
- Wrapping another extension's tools and sections.
- Choosing extensions per conversation.
- Extension state in typed documents.

For each, refer to the [Pi Durable README ↗︎](https://github.com/earendil-works/pi/tree/main/packages/durable).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/pi/extensions/#page","headline":"Extensions","description":"Add tools, system prompt sections, and skills to a PiHarness with Pi Durable extensions.","url":"https://developers.cloudflare.com/agents/harnesses/pi/extensions/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/pi/extensions/og.png?v=ff419cf17f0cd56f","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
