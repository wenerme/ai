---
description: Run Agent Skills scripts with a Computer Workspace backend, or with the experimental skill script runner.
title: Execution
image: https://developers.cloudflare.com/agents/skills/execution/og.png?v=cea2cab4f9233616
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Execution

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/skills/execution/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Agent Skills](https://developers.cloudflare.com/agents/skills/) can bundle scripts under `scripts/`. An agent runs them in one of two ways:

| Where the skill lives | How scripts run |
| --- | --- |
| [Computer Workspace](https://developers.cloudflare.com/agents/skills/sources/computer/) | The model runs the file with the Workspace `exec` tool |
| [R2](https://developers.cloudflare.com/agents/skills/sources/r2/) or a [manifest](https://developers.cloudflare.com/agents/skills/sources/code/) | The experimental script runner, through `run_skill_script` |

## Run scripts in the Workspace

When skills are files in a Workspace, a script is a file the agent can run like any other. Give the Workspace a backend, and Think adds the `exec` tool. Refer to [Computer](https://developers.cloudflare.com/agents/skills/sources/computer/#run-skill-scripts) for the setup.

Activating a skill returns its folder as `location`, for example `/workspace/.agents/skills/release-notes`. With the JavaScript backend, the skill's instructions can tell the model to run a script from that folder:

```js
export { default } from "./scripts/format-release-notes.js";
```

The script exports a default async function. It receives the `input` that the model passes to `exec`, and can use `node:fs` to read the Workspace:

```js
import { readdir } from "node:fs/promises";

export default async function (input) {
	const entries = await readdir(input.root ?? "/workspace");
	return { count: entries.length };
}
```

## Script runner

Caution

The script runner is experimental, and its options may change. Prefer storing skills in a Computer Workspace and running scripts with `exec`.

For skills that do not live in a Workspace, `skills.runner()` runs bundled scripts in a Dynamic Worker and adds the `run_skill_script` tool. It needs a Worker Loader binding:

```jsonc
{
	"worker_loaders": [{ "binding": "LOADER" }],
}
```

```toml
[[worker_loaders]]
binding = "LOADER"
```

Return the runner from `getSkillScriptRunner()`:

*src/server.jsjs*

```js
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think {
	getSkills() {
		return [skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })];
	}

	getSkillScriptRunner() {
		return skills.runner({ loader: this.env.LOADER });
	}
}
```

*src/server.tsts*

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.r2(this.env.SKILLS_BUCKET, { prefix: "skills/" })];
	}

	getSkillScriptRunner() {
		return skills.runner({ loader: this.env.LOADER });
	}
}
```

Outside Think, import the runner from `agents/skills/runner`. It is a separate entry point because it loads `just-bash` and Code Mode:

```js
import { runner } from "agents/skills/runner";

const scriptRunner = runner({ loader: env.LOADER });
```

```ts
import { runner } from "agents/skills/runner";

const scriptRunner = runner({ loader: env.LOADER });
```

The runner runs JavaScript, Python, and Bash scripts under `scripts/`. Python runs as a Python Dynamic Worker, and Bash runs through `just-bash`. There is no bundler at runtime: a JavaScript script must be one self-contained module. Compile TypeScript and multi-file scripts, for example with esbuild, before you store the skill.

### JavaScript scripts

JavaScript scripts export a default function that takes the input and a context object:

```js
export default async function run(input, ctx) {
	const guide = ctx.files["references/style-guide.md"]; // bundled text resources
	const docs = await ctx.workspace.readFile("README.md"); // gated by permission
	const summary = await ctx.tools.call("summarize", { input }); // explicit tools
	await ctx.output.writeFile("notes.md", summary); // scratch artifact
	return { ok: true };
}
```

`ctx` is typed as `SkillRunContext` and contains:

| Field | Description |
| --- | --- |
| `skill` | The skill's name, description, and metadata |
| `files` | The skill's text resources, by relative path |
| `workspace` | Workspace reads and writes, gated by the `workspace` option |
| `tools` | Only the tools passed to the runner, as `tools.call(name, input)` or `tools.name(input)` |
| `output` | `writeFile(name, content)` returns scratch files to the model without changing the Workspace |

### Python and Bash scripts

Python and Bash scripts use files instead of a context object:

- `/input.json` holds the input.
- `/context.json` holds the skill metadata.
- `/skill` holds `SKILL.md` and the skill's resources.
- Files written to `/output` are returned to the model.

Python scripts can also define `def run(input, ctx)`.

### Runner options

| Option | Default | Description |
| --- | --- | --- |
| `loader` | Required | Worker Loader binding |
| `workspaceInstance` | None | A Computer Workspace that scripts can access |
| `workspace` | `"read"` with `workspaceInstance`, else `"none"` | `"none"`, `"read"`, or `"read-write"` |
| `tools` | None | Tools scripts can call |
| `network` | `false` | Allow outbound network access |
| `timeout` | `30000` | Timeout in milliseconds |

Scripts get no network access and no tools unless you grant them. Relative paths in `ctx.workspace` resolve against `/workspace`.

## Related

- [Think tools](https://developers.cloudflare.com/agents/harnesses/think/tools/): how skill tools merge with workspace, custom, MCP, and client tools
- [Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/): run code in a container

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/skills/execution/#page","headline":"Execution","description":"Run Agent Skills scripts with a Computer Workspace backend, or with the experimental skill script runner.","url":"https://developers.cloudflare.com/agents/skills/execution/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/skills/execution/og.png?v=cea2cab4f9233616","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
