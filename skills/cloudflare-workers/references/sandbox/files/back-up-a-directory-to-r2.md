---
description: Save a directory from a Linux sandbox to your R2 bucket, and restore it into the same sandbox after its instance or image changes.
title: Back up a directory to R2
image: https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/og.png?v=aab44210f0b32ab9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Back up a directory to R2

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `DirectoryBackup` class from `@cloudflare/sandbox` saves one directory as one object in your R2 bucket and restores it as ordinary files. A backup restores after the instance stops or after you deploy a new image. R2 keeps each backup until you delete it. In this example, the directory is a project in `/workspace/project`.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Back up and restore a directory

1. Install the package:npmyarnpnpmbun

   ```
   npm i @cloudflare/sandbox
   ```

   ```
   yarn add @cloudflare/sandbox
   ```

   ```
   pnpm add @cloudflare/sandbox
   ```

   ```
   bun add @cloudflare/sandbox
   ```

2. Copy the helper binary into your image. If your project has no `Dockerfile`, create one in your project root:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   RUN mkdir /workspace
   CMD ["sleep", "infinity"]
   ```

   Use the `cloudflare/sandbox` tag that matches the installed package version. Replace the `FROM` line with the base image your commands need.
3. Create a bucket for the backups:npmyarnpnpm

   ```
   npx wrangler r2 bucket create sandbox-backups
   ```

   ```
   yarn wrangler r2 bucket create sandbox-backups
   ```

   ```
   pnpm wrangler r2 bucket create sandbox-backups
   ```

   If Wrangler offers to add the bucket to your configuration, answer no. The next step adds the binding.
4. In `wrangler.jsonc`, add the `nodejs_compat` flag, build the `Dockerfile` as a named image in your `containers` entry, and bind the bucket:

   ```jsonc
   {
   	"compatibility_flags": ["nodejs_compat"],
   	"containers": [
   		{
   			"class_name": "MyContainer",
   			"scheduling_policy": "durable_object",
   			"images": {
   				"workspace": {
   					"dockerfile": "./Dockerfile",
   				},
   			},
   		},
   	],
   	"r2_buckets": [
   		{
   			"binding": "BACKUPS",
   			"bucket_name": "sandbox-backups",
   		},
   	],
   }
   ```

   ```toml
   compatibility_flags = [ "nodejs_compat" ]

   [[containers]]
   class_name = "MyContainer"
   scheduling_policy = "durable_object"

   [containers.images.workspace]
   dockerfile = "./Dockerfile"

   [[r2_buckets]]
   binding = "BACKUPS"
   bucket_name = "sandbox-backups"
   ```

   Then generate types:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```

5. In `src/index.ts`, export `DirectoryBackupGateway`, and update the `MyContainer` class so that its methods start the `workspace` image and create `DirectoryBackup`:

   *src/index.jsjs*



   ```js
   import { DirectoryBackup } from "@cloudflare/sandbox";
   import { DurableObject } from "cloudflare:workers";

   export { DirectoryBackupGateway } from "@cloudflare/sandbox";

   const project = "/workspace/project";
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   export class MyContainer extends DurableObject {
   	container;
   	backups;

   	constructor(ctx, env) {
   		super(ctx, env);
   		const container = ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		this.container = container;
   		this.backups = new DirectoryBackup(
   			container,
   			ctx.exports.DirectoryBackupGateway,
   			{ binding: "BACKUPS", prefix: "backups/" },
   		);

   		// A restarted Durable Object sets the timeout again.
   		if (container.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}

   	async startSandbox() {
   		if (!this.container.running) {
   			this.container.start({
   				image: this.container.images.workspace,
   				enableInternet: false,
   			});
   			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}
   	}
   }
   ```

   *src/index.tsts*



   ```ts
   import {
   	DirectoryBackup,
   	type DirectoryBackupRecord,
   } from "@cloudflare/sandbox";
   import { DurableObject } from "cloudflare:workers";

   export { DirectoryBackupGateway } from "@cloudflare/sandbox";

   const project = "/workspace/project";
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   export class MyContainer extends DurableObject<Env> {
   	private readonly container: Container;
   	private readonly backups: DirectoryBackup;

   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		this.container = container;
   		this.backups = new DirectoryBackup(
   			container,
   			ctx.exports.DirectoryBackupGateway,
   			{ binding: "BACKUPS", prefix: "backups/" },
   		);

   		// A restarted Durable Object sets the timeout again.
   		if (container.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}

   	private async startSandbox(): Promise<void> {
   		if (!this.container.running) {
   			this.container.start({
   				image: this.container.images.workspace,
   				enableInternet: false,
   			});
   			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}
   	}
   }
   ```

   The container sends the backup through `DirectoryBackupGateway`, which writes it to the `BACKUPS` bucket. The container never receives R2 credentials, and it can reach only the object of the operation in progress.

   The constructor creates one `DirectoryBackup` object for the Durable Object, because `this.ctx.container` stays the same object for as long as the Durable Object runs.
6. Add a method to `MyContainer` that adds a line to a file in the project and returns the file, so you can check what a restore brings back:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async note(line?: string) {
   		await this.startSandbox();
   		const script = line
   			? `mkdir -p ${project} && printf "%s\n" "$1" >> ${project}/notes.txt && cat ${project}/notes.txt`
   			: `cat ${project}/notes.txt`;
   		const process = await this.container.exec(["sh", "-c", script, "sh", line ?? ""]);
   		const output = await process.output();

   		return new TextDecoder().decode(output.stdout);
   	}
   }
   ```

7. Add a method to `MyContainer` that backs up the project and stores the backup record:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async backup() {
   		await this.startSandbox();
   		const backup = await this.backups.backup({ dir: project });

   		await this.ctx.storage.put(`backup:${backup.id}`, backup);
   		return { id: backup.id, size: backup.size };
   	}
   }
   ```

   `backup()` returns a record with the ID, size, and SHA-256 of the object. The package keeps no list of backups. The Durable Object stores the record and looks it up by ID, so a request cannot point a restore at another object in the bucket.

   Stop the commands that write to the directory before you call `backup()`. A file that changes during the backup can be saved partly old and partly new.
8. Add a method to `MyContainer` that looks up a record and restores it:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async restore(id: string) {
   		const backup = await this.ctx.storage.get<DirectoryBackupRecord>(
   			`backup:${id}`,
   		);

   		if (!backup) {
   			return false;
   		}

   		await this.startSandbox();
   		await this.backups.restore(backup);
   		return true;
   	}
   }
   ```

   `restore()` replaces the directory and removes files that are not in the backup. Before it replaces anything, it checks the object against the SHA-256 in the record. When `restore()` throws `SandboxFileError` or `SandboxBackupError`, it leaves the directory as it was. If the object no longer exists, `restore()` throws `SandboxBackupError` with the code `BACKUP_NOT_FOUND`. If the object does not match the record, the code is `BACKUP_INTEGRITY`. For every error, refer to [DirectoryBackup errors](https://developers.cloudflare.com/sandbox/reference/directory-backups/#errors).
9. Replace the default export of your Worker with routes that write a note, back up the project, and restore a backup:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match =
   			/^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/(notes|backups)(?:\/([0-9a-f-]{36})\/restore)?$/.exec(
   				url.pathname,
   			);

   		if (!match) {
   			return new Response("Not found", { status: 404 });
   		}

   		const [, name, resource, id] = match;
   		const sandbox = env.MY_CONTAINER.getByName(name);

   		if (resource === "notes" && !id) {
   			const line = request.method === "POST" ? await request.text() : undefined;
   			return new Response(await sandbox.note(line));
   		}

   		if (resource === "backups" && request.method === "POST") {
   			if (!id) {
   				return Response.json(await sandbox.backup(), { status: 201 });
   			}

   			return (await sandbox.restore(id))
   				? new Response(null, { status: 204 })
   				: new Response("Backup not found", { status: 404 });
   		}

   		return new Response("Method not allowed", { status: 405 });
   	},
   };
   ```

   *src/index.tsts*



   ```ts
   export default {
   	async fetch(request: Request, env: Env): Promise<Response> {
   		const url = new URL(request.url);
   		const match =
   			/^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/(notes|backups)(?:\/([0-9a-f-]{36})\/restore)?$/.exec(
   				url.pathname,
   			);

   		if (!match) {
   			return new Response("Not found", { status: 404 });
   		}

   		const [, name, resource, id] = match;
   		const sandbox = env.MY_CONTAINER.getByName(name);

   		if (resource === "notes" && !id) {
   			const line = request.method === "POST" ? await request.text() : undefined;
   			return new Response(await sandbox.note(line));
   		}

   		if (resource === "backups" && request.method === "POST") {
   			if (!id) {
   				return Response.json(await sandbox.backup(), { status: 201 });
   			}

   			return (await sandbox.restore(id))
   				? new Response(null, { status: 204 })
   				: new Response("Backup not found", { status: 404 });
   		}

   		return new Response("Method not allowed", { status: 405 });
   	},
   } satisfies ExportedHandler<Env>;
   ```

   A backup holds every file in the directory, including credentials written in the sandbox. Authenticate callers first, so other people cannot back up or restore the files of another sandbox. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#code-can-read-what-you-put-in-its-sandbox).
10. Deploy your Worker:npmyarnpnpm

    ```
    npx wrangler deploy
    ```

    ```
    yarn wrangler deploy
    ```

    ```
    pnpm wrangler deploy
    ```

11. In the sandbox named `ada`, write a note and back up the project. Replace the example hostname with the `workers.dev` URL that Wrangler prints:

    ```sh
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/notes --data "Keep this line."
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/backups --request POST
    ```

    The backup responds with its ID and its size in bytes, such as `{"id":"<BACKUP_ID>","size":217}`.
12. Write a second note, restore the backup, then read the notes. Replace `<BACKUP_ID>` with the ID from the response:

    ```sh
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/notes --data "Lose this line."
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/backups/<BACKUP_ID>/restore --request POST
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/notes
    ```

    The restore responds with `204`, and the notes are back to the state of the backup:

    ```txt
    Keep this line.
    ```

## Leave out files

To leave out files, pass patterns in `.gitignore` syntax, relative to the directory. `node_modules/` matches a directory with that name at any depth, and `/build` matches only at the top:

*src/index.tsts*

```ts
const backup = await this.backups.backup({
	dir: project,
	exclude: ["node_modules/", "/build"],
	// Also apply the `.gitignore` files in the directory and `.git/info/exclude`,
	// without `git` in the image
	gitignore: true,
});
```

## Delete a backup

To delete a backup, delete its object and its record:

*src/index.tsts*

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async deleteBackup(id: string) {
		const backup = await this.ctx.storage.get<DirectoryBackupRecord>(
			`backup:${id}`,
		);

		if (backup) {
			// `delete()` does not need a running container
			await this.backups.delete(backup);
			await this.ctx.storage.delete(`backup:${id}`);
		}
	}
}
```

An [object lifecycle rule](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) that expires objects under `backups/` also deletes backups. The rule leaves their records, and restoring one of those backups throws `BACKUP_NOT_FOUND`.

A backup that fails does not leave an object. If the Durable Object restarts during a backup, the incomplete multipart upload stays in the bucket until the default lifecycle rule of the bucket aborts it after seven days.

## Related resources

- [DirectoryBackup API](https://developers.cloudflare.com/sandbox/reference/directory-backups/): what a backup keeps, one operation at a time per container, cancellation, and every error.
- [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/): keep the whole filesystem instead of one directory.
- [Mount an R2 bucket](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/): read and write files that other systems use.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/#page","headline":"Back up a directory to R2","description":"Save a directory from a Linux sandbox to your R2 bucket, and restore it into the same sandbox after its instance or image changes.","url":"https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/og.png?v=aab44210f0b32ab9","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
