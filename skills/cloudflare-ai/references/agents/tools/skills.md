---
description: Give your agent Agent Skills tools to discover, load, and read skills on demand. Use Think, Pi Durable, AI SDK, or your own harness.
title: Skills
image: https://developers.cloudflare.com/agents/tools/skills/og.png?v=8c5679605e7a5dab
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Skills

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/tools/skills/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Give your agent tools to use [Agent Skills](https://developers.cloudflare.com/agents/skills/): on-demand instructions, references, and scripts stored as `SKILL.md` folders. The model sees a short catalog of skill names and descriptions, then loads a skill only when a task matches it.

Skills come from [sources](https://developers.cloudflare.com/agents/skills/sources/computer/): a Computer Workspace, an R2 bucket, or code. The tools are the same whichever source you use.

Use the supplied adapters with [Think](https://developers.cloudflare.com/agents/harnesses/think/), [Pi Durable](https://developers.cloudflare.com/agents/harnesses/pi/), or the AI SDK. For another harness, use the catalog functions in `agents/skills`.

## What the tools add

| Tool | What it does |
| --- | --- |
| `activate_skill` | Returns a skill's instructions, its folder when it has one, and the list of files bundled with it. |
| `read_skill_resource` | Returns one bundled file, by `{ name, path }` or a qualified path such as `release-notes/references/guide.md`. |
| `run_skill_script` | Runs a bundled script. Only added when you set the experimental [script runner](https://developers.cloudflare.com/agents/skills/execution/#script-runner). |

The tools only appear when at least one skill is available. `name` is limited to the skills in the catalog. Binary files are returned as base64.

Alongside the tools, the catalog provides system prompt text that lists each skill:

```txt
Available skills. When a task matches a skill, use activate_skill with its name before proceeding.

- release-notes: Turn a list of changes into release notes.
- pirate-voice: Answer in a pirate voice.
```

## Add the tools to your harness

These examples require an existing harness. For a new agent, start with [Think](https://developers.cloudflare.com/agents/harnesses/think/getting-started/) or the [Pi harness guide](https://developers.cloudflare.com/agents/harnesses/pi/).

1. Update the Agents SDK in your Worker project:npmyarnpnpmbun

   ```
   npm i agents@latest
   ```

   ```
   yarn add agents@latest
   ```

   ```
   pnpm add agents@latest
   ```

   ```
   bun add agents@latest
   ```

2. Choose a [source](https://developers.cloudflare.com/agents/skills/sources/computer/) for your skills.
3. Register the tools with your harness using one of the examples that follow.

### Think

Think adds the tools and the catalog for you. Return your sources from `getSkills()`:

```js
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

Think lists the sources again before each turn, so new and edited skills take effect on the next turn.

### Pi Durable

In your [Pi harness factory](https://developers.cloudflare.com/agents/harnesses/pi/extensions/#add-skills), install the `skills()` extension. It adds `activate_skill`, `read_skill_resource`, and a `skills` system prompt section:

```js
import { skills } from "agents/harness/pi";
import { r2 } from "agents/skills";

// Inside the harness factory, before Harness.open():
this.registry.install(
	await skills([r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })]),
);
```

```ts
import { skills } from "agents/harness/pi";
import { r2 } from "agents/skills";

// Inside the harness factory, before Harness.open():
this.registry.install(
	await skills([r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })]),
);
```

The extension reads the sources once, when the factory builds it. Both tools are marked `replay: "safe"`.

### AI SDK

Load a catalog with `loadSkillCatalog()`, then pass `createSkillTools()` to your `streamText()` or `generateText()` call. Add the catalog prompt to your system prompt:

```js
import { streamText } from "ai";
import { loadSkillCatalog, r2 } from "agents/skills";
import { createSkillTools } from "agents/skills/tools/ai-sdk";

const catalog = await loadSkillCatalog([
	r2(env.SKILLS_BUCKET, { prefix: "skills/" }),
]);

const result = streamText({
	model,
	system: [instructions, catalog.prompt()].filter(Boolean).join("\n\n"),
	tools: { ...tools, ...createSkillTools(catalog) },
	messages,
});
```

```ts
import { streamText } from "ai";
import { loadSkillCatalog, r2 } from "agents/skills";
import { createSkillTools } from "agents/skills/tools/ai-sdk";

const catalog = await loadSkillCatalog([
	r2(env.SKILLS_BUCKET, { prefix: "skills/" }),
]);

const result = streamText({
	model,
	system: [instructions, catalog.prompt()].filter(Boolean).join("\n\n"),
	tools: { ...tools, ...createSkillTools(catalog) },
	messages,
});
```

Load the catalog again to pick up changed skills, and build the tools from the new catalog. `catalog.fingerprint` changes whenever the catalog prompt changes, so compare it to decide when to rebuild a cached system prompt.

To add `run_skill_script`, pass a runner from `agents/skills/runner`: `createSkillTools(catalog, { scriptRunner: runner({ loader: env.LOADER }) })`. Refer to [Execution](https://developers.cloudflare.com/agents/skills/execution/).

### Other harnesses

Use the catalog directly inside your harness's tool handlers. `activate()` and `readResource()` return results instead of throwing, and render the same text as the supplied adapters:

```js
import {
	formatSkillDiagnostic,
	loadSkillCatalog,
	renderSkillResource,
	workspace,
} from "agents/skills";

// `computerWorkspace` is a Workspace from @cloudflare/computer.
const catalog = await loadSkillCatalog([workspace(computerWorkspace)]);

for (const diagnostic of catalog.diagnostics) {
	console.warn(formatSkillDiagnostic(diagnostic));
}

// Register these handlers with your harness's tool interface.
function activateSkill(input) {
	const activated = catalog.activate(input.name);
	// Report failures as a tool error, for example an unknown skill.
	if (!activated.ok) throw activated.error;
	return activated.value;
}

async function readSkillResource(input) {
	const read = await catalog.readResource(input);
	if (!read.ok) throw read.error;
	return renderSkillResource(read.value);
}
```

```ts
import {
	formatSkillDiagnostic,
	loadSkillCatalog,
	renderSkillResource,
	workspace,
} from "agents/skills";

// `computerWorkspace` is a Workspace from @cloudflare/computer.
const catalog = await loadSkillCatalog([workspace(computerWorkspace)]);

for (const diagnostic of catalog.diagnostics) {
	console.warn(formatSkillDiagnostic(diagnostic));
}

// Register these handlers with your harness's tool interface.
function activateSkill(input: { name: string }): string {
	const activated = catalog.activate(input.name);
	// Report failures as a tool error, for example an unknown skill.
	if (!activated.ok) throw activated.error;
	return activated.value;
}

async function readSkillResource(input: {
	name?: string;
	path: string;
}): Promise<string> {
	const read = await catalog.readResource(input);
	if (!read.ok) throw read.error;
	return renderSkillResource(read.value);
}
```

Define `name` as one of `catalog.skills.map((entry) => entry.skill.name)`. Add `catalog.prompt()` to your system prompt. It returns `null` when there are no skills.

## Handle problems

A broken skill never stops the agent. `loadSkillCatalog()` reports problems in `catalog.diagnostics` and keeps the other skills:

| Diagnostic | Cause |
| --- | --- |
| `SkillWarning` | A skill breaks a [specification rule](https://developers.cloudflare.com/agents/skills/#validation) but was loaded anyway. |
| `InvalidSkill` | A skill could not be loaded, for example because it has no `description`. It is not shown to the model. |
| `SourceFailed` | A source could not be listed, for example because the bucket was unavailable. |
| `DuplicateSkill` | Two sources provide the same skill name. The first source wins. |

Tool failures, such as an unknown skill or a missing file, are returned to the model as tool errors so it can try again. The AI SDK tools throw, and the Pi tools return `isError: true`.

## Related

- [Agent Skills concepts](https://developers.cloudflare.com/agents/concepts/agent-skills/): the open format and progressive disclosure
- [Agent Skills](https://developers.cloudflare.com/agents/skills/): sources and validation in the Agents SDK
- [Execution](https://developers.cloudflare.com/agents/skills/execution/): run skill scripts
- [File system](https://developers.cloudflare.com/agents/tools/filesystem/): give the agent a Workspace to store skills in

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/skills/#page","headline":"Skills","description":"Give your agent Agent Skills tools to discover, load, and read skills on demand. Use Think, Pi Durable, AI SDK, or your own harness.","url":"https://developers.cloudflare.com/agents/tools/skills/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/tools/skills/og.png?v=8c5679605e7a5dab","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
