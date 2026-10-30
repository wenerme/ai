---
description: Give an agent on-demand instructions, references, and scripts as Agent Skills, loaded from a Computer Workspace, R2, or code.
title: Agent Skills
image: https://developers.cloudflare.com/agents/skills/og.png?v=737c4b720e609086
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Skills

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/skills/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Agent Skills ↗︎](https://agentskills.io/) are on-demand instructions, references, and scripts for an agent. Each skill is a directory with a `SKILL.md` file. The agent sees a short catalog of skill names and descriptions. It loads a full skill only when a task matches it, so a large library of skills does not fill every prompt.

For background on the format and how agents use it, refer to [Agent Skills concepts](https://developers.cloudflare.com/agents/concepts/agent-skills/).

Note

Agent Skills are experimental. The API may change in a future release. These pages describe [Agents SDK v0.32.0 ↗︎](https://github.com/cloudflare/agents/releases/tag/agents%400.32.0) and Think v0.23.0 or later.

## What a skill looks like

A skill is a directory named after the skill. It holds a `SKILL.md` file and, optionally, other files:

```text
release-notes/
  SKILL.md
  references/style-guide.md
  scripts/format-release-notes.js
  assets/logo.png
```

`SKILL.md` starts with YAML frontmatter, followed by Markdown instructions:

```md
---
name: release-notes
description: Turn a list of changes into release notes. Use when the user asks for release notes or a changelog entry.
metadata:
  author: my-team
---

1. Read `references/style-guide.md`.
2. Group the changes under Features, Fixes, and Other.
```

The files in `scripts/`, `references/`, and `assets/` are the skill's resources. The model reads them when the instructions call for them.

## Load skills into an agent

Skills come from a source. Return sources from `getSkills()` in a [Think](https://developers.cloudflare.com/agents/harnesses/think/) agent:

*src/server.jsjs*

```js
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think {
	getSkills() {
		return [
			skills.workspace(this.workspace),
			skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" }),
		];
	}
}
```

*src/server.tsts*

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [
			skills.workspace(this.workspace),
			skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" }),
		];
	}
}
```

| Source | Reads skills from |
| --- | --- |
| [`skills.workspace()`](https://developers.cloudflare.com/agents/skills/sources/computer/) | Files in a `@cloudflare/computer` Workspace |
| [`skills.r2()`](https://developers.cloudflare.com/agents/skills/sources/r2/) | Objects in an R2 bucket |
| [`skills.manifest()`](https://developers.cloudflare.com/agents/skills/sources/code/) | Skills defined in code |

Sources are applied in order. The first source to provide a skill name wins. Later duplicates are skipped with a logged warning. Think lists every source again before each turn, so new, edited, and deleted skills take effect on the next turn.

The [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/extensions/#add-skills) takes the same sources through `skills(sources)` from `agents/harness/pi`.

## Skill tools

When at least one skill is available, the agent gets these tools:

| Tool | Purpose |
| --- | --- |
| `activate_skill` | Load a skill's instructions and its list of resources |
| `read_skill_resource` | Read a resource by `{ name, path }` or a qualified path such as `name/path` |
| `run_skill_script` | Run a bundled script, when a [script runner](https://developers.cloudflare.com/agents/skills/execution/) is set |

The catalog is added to the system prompt as its own context block, below your `getSystemPrompt()` instructions. When a skill changes mid-conversation, Think does not rebuild the system prompt, so the model provider's prompt cache stays warm. The new catalog reaches the model as a reminder on the next turn and moves into the system prompt at the next compaction or history clear.

Use `getSystemPrompt()` or a context block from `configureContext()` for instructions that apply to every turn. Use skills for procedures, references, and scripts that only some tasks need.

## Validation

Every `SKILL.md` is checked against these rules from the [Agent Skills specification ↗︎](https://agentskills.io/specification):

- `name` must be 1 to 64 lowercase letters, digits, and hyphens. It cannot start or end with a hyphen or contain `--`. It must match the skill's directory name.
- `description` is required and can be at most 1,024 characters.
- `compatibility`, when present, must be 1 to 500 characters.
- `metadata`, when present, must map string keys to string values.
- `allowed-tools`, when present, must be a space-separated string.

Skills load the way the specification's [guide for agents ↗︎](https://agentskills.io/client-implementation/adding-skills-support) recommends. Skills written for other agents often break a rule, so a skill that breaks one still loads, and the agent logs a warning:

| Problem | What happens |
| --- | --- |
| `name` breaks the format, is too long, or does not match the directory | Loads, with a warning |
| `name` is missing | Loads with the directory name, with a warning |
| `description` or `compatibility` is too long | Loads, with a warning |
| `license`, `metadata`, or `allowed-tools` is invalid | Loads without that field, with a warning |
| A value contains an unquoted `:` , so the YAML does not parse | Loads after quoting the value, with a warning |
| `description` is missing | Skipped and logged |
| `name` contains `/`, `\`, or control characters, or is `.` or `..` | Skipped and logged |
| The frontmatter is missing or still not YAML | Skipped and logged |

Skipped skills are not shown to the model. Frontmatter keys that the specification does not define are kept in `skill.extraFields`. A skill with `disable-model-invocation: true` is not shown to the model.

To check a skill before you write or publish it, parse it with `parseSkill()` from `agents/skills`. A skill follows the specification when it parses with no warnings:

```js
import { parseSkill } from "agents/skills";

const parsed = parseSkill(markdown, { directory: "release-notes" });
if (!parsed.ok) {
	console.log(parsed.error.message); // the skill cannot be used
} else {
	for (const warning of parsed.warnings) {
		console.log(warning.code, warning.message); // for example, "name-mismatch"
	}
}
```

```ts
import { parseSkill } from "agents/skills";

const parsed = parseSkill(markdown, { directory: "release-notes" });
if (!parsed.ok) {
	console.log(parsed.error.message); // the skill cannot be used
} else {
	for (const warning of parsed.warnings) {
		console.log(warning.code, warning.message); // for example, "name-mismatch"
	}
}
```

## Use skills without Think

The parser, sources, and catalog live in `agents/skills` and do not depend on Think. `loadSkillCatalog()` merges sources. `createSkillTools()` from `agents/skills/tools/ai-sdk` builds the [AI SDK ↗︎](https://ai-sdk.dev/) tools for a catalog:

```js
import { streamText } from "ai";
import { loadSkillCatalog, workspace } from "agents/skills";
import { createSkillTools } from "agents/skills/tools/ai-sdk";

// `computerWorkspace` is a Workspace from @cloudflare/computer.
const catalog = await loadSkillCatalog([workspace(computerWorkspace)]);

const result = streamText({
	model,
	system: catalog.prompt() ?? undefined,
	tools: createSkillTools(catalog),
	messages,
});
```

```ts
import { streamText } from "ai";
import { loadSkillCatalog, workspace } from "agents/skills";
import { createSkillTools } from "agents/skills/tools/ai-sdk";

// `computerWorkspace` is a Workspace from @cloudflare/computer.
const catalog = await loadSkillCatalog([workspace(computerWorkspace)]);

const result = streamText({
	model,
	system: catalog.prompt() ?? undefined,
	tools: createSkillTools(catalog),
	messages,
});
```

## Pages in this section

- [Sources](https://developers.cloudflare.com/agents/skills/sources/)
- [Execution](https://developers.cloudflare.com/agents/skills/execution/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/skills/#page","headline":"Agent Skills","description":"Give an agent on-demand instructions, references, and scripts as Agent Skills, loaded from a Computer Workspace, R2, or code.","url":"https://developers.cloudflare.com/agents/skills/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/skills/og.png?v=737c4b720e609086","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
