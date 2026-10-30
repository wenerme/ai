---
description: Store Agent Skills as files in a Computer Workspace, so skills the agent or a user writes are available on the next turn.
title: Computer
image: https://developers.cloudflare.com/agents/skills/sources/computer/og.png?v=2291c049b14437f6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Computer

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/skills/sources/computer/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`skills.workspace()` reads [Agent Skills](https://developers.cloudflare.com/agents/skills/) from files in a Workspace from [`@cloudflare/computer` ↗︎](https://github.com/cloudflare/computer). A skill is a folder in the Workspace. Writing, editing, or deleting a `SKILL.md` changes the agent's skills on its next turn, with no deploy.

## Read skills from the Workspace

By default, every `/workspace/.agents/skills/<name>/SKILL.md` is a skill. The files beside it are its resources:

```text
/workspace/.agents/skills/
  release-notes/
    SKILL.md
    references/style-guide.md
    scripts/format-release-notes.js
  pirate-voice/
    SKILL.md
```

Return the source from `getSkills()`. In [Think](https://developers.cloudflare.com/agents/harnesses/think/), `this.workspace` is already a Computer Workspace:

*src/server.jsjs*

```js
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

*src/server.tsts*

```ts
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

To read skills from another directory, pass an absolute `root`:

```ts
skills.workspace(this.workspace, { root: "/workspace/skills" });
```

If the root directory does not exist, the source lists no skills. `.git`, `node_modules`, and `.DS_Store` inside a skill directory are ignored.

## Add skills to the Workspace

Skills are plain files, so anything that writes to the Workspace can add one: the agent's own `write` tool, a user upload, or your code. For example, write the starter skills the first time the agent starts:

*src/server.jsjs*

```js
import { Think, skills } from "@cloudflare/think";

const ROOT = "/workspace/.agents/skills";

const STARTER_SKILLS = {
	"pirate-voice/SKILL.md": `---
name: pirate-voice
description: Answer in a pirate voice. Use when the user asks for a pirate tone.
---

Answer accurately, then rewrite the answer in a light pirate voice.
`,
};

export class MyAgent extends Think {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}

	async onStart() {
		for (const [path, content] of Object.entries(STARTER_SKILLS)) {
			const file = `${ROOT}/${path}`;
			await this.workspace.fs.mkdir(file.slice(0, file.lastIndexOf("/")), {
				recursive: true,
			});
			await this.workspace.fs.writeFile(file, content);
		}
	}
}
```

*src/server.tsts*

```ts
import { Think, skills } from "@cloudflare/think";

const ROOT = "/workspace/.agents/skills";

const STARTER_SKILLS: Record<string, string> = {
	"pirate-voice/SKILL.md": `---
name: pirate-voice
description: Answer in a pirate voice. Use when the user asks for a pirate tone.
---

Answer accurately, then rewrite the answer in a light pirate voice.
`,
};

export class MyAgent extends Think<Env> {
	getSkills() {
		return [skills.workspace(this.workspace)];
	}

	async onStart() {
		for (const [path, content] of Object.entries(STARTER_SKILLS)) {
			const file = `${ROOT}/${path}`;
			await this.workspace.fs.mkdir(file.slice(0, file.lastIndexOf("/")), {
				recursive: true,
			});
			await this.workspace.fs.writeFile(file, content);
		}
	}
}
```

Each skill is checked against the [specification](https://developers.cloudflare.com/agents/skills/#validation) when it is listed. A skill whose `name` does not match its folder still loads with a warning. A skill with no `description` is skipped and logged. Use `skills.parseSkill()` to check a skill before you write it: it follows the specification when it parses with no warnings.

## Run skill scripts

Skill scripts are Workspace files too. Give the Workspace a backend, and the model runs scripts with the `exec` tool. Activating a skill tells the model where the skill's folder is, so it can run a script from there:

*src/server.jsjs*

```js
import { Workspace } from "@cloudflare/computer";
import { WorkerJavaScriptBackend } from "@cloudflare/computer/backends/worker-javascript";
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think {
	workspace = new Workspace({
		storage: this.ctx.storage,
		backends: [
			new WorkerJavaScriptBackend({
				id: "js",
				loader: this.env.LOADER,
				access: "read-write",
			}),
		],
	});

	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

*src/server.tsts*

```ts
import { Workspace } from "@cloudflare/computer";
import { WorkerJavaScriptBackend } from "@cloudflare/computer/backends/worker-javascript";
import { Think, skills } from "@cloudflare/think";

export class MyAgent extends Think<Env> {
	workspace = new Workspace({
		storage: this.ctx.storage,
		backends: [
			new WorkerJavaScriptBackend({
				id: "js",
				loader: this.env.LOADER,
				access: "read-write",
			}),
		],
	});

	getSkills() {
		return [skills.workspace(this.workspace)];
	}
}
```

```jsonc
{
	"worker_loaders": [{ "binding": "LOADER" }],
}
```

```toml
[[worker_loaders]]
binding = "LOADER"
```

With the JavaScript backend, a skill can tell the model to run a script by re-exporting it, with `cwd` set to the skill's folder:

```js
export { default } from "./scripts/format-release-notes.js";
```

Refer to [Execution](https://developers.cloudflare.com/agents/skills/execution/) for the options.

## Example

The [`computer-skills` example ↗︎](https://github.com/cloudflare/agents/tree/main/examples/computer-skills) stores skills in a Workspace, runs their scripts with `exec`, and lets you add and delete skills from the UI.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/skills/sources/computer/#page","headline":"Computer","description":"Store Agent Skills as files in a Computer Workspace, so skills the agent or a user writes are available on the next turn.","url":"https://developers.cloudflare.com/agents/skills/sources/computer/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/skills/sources/computer/og.png?v=2291c049b14437f6","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
