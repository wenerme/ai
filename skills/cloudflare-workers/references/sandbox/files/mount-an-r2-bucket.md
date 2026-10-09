---
description: Mount a prefix of an R2 bucket in a Linux sandbox without giving the sandbox your credentials.
title: Mount an R2 bucket
image: https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/og.png?v=b6b9fbc310367588
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Mount an R2 bucket

Last updated Sep 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `S3Mount` class from `@cloudflare/sandbox` mounts one prefix of a bucket as a directory with `s3fs`. Your Worker keeps the R2 credentials and signs each storage request. In this example, a command reads an input file from the mount and writes a digest next to it.

## Prerequisites

- A Worker with a Durable Object that starts a container with the [Durable Object scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy). To create one, refer to [Run a Linux command](https://developers.cloudflare.com/sandbox/get-started/).
- An R2 bucket, and an [R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with the **Object Read & Write** permission for that bucket only. The examples use a bucket named `sandbox-artifacts`.

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗︎](https://docs.docker.com/desktop/). Other tools like [Colima ↗︎](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## Mount a bucket prefix

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

2. Create a `Dockerfile` in your project root with FUSE, `s3fs`, and the `sandbox-shim` binary that `S3Mount` uses:

   *Dockerfiledockerfile*



   ```dockerfile
   FROM node:24-trixie-slim

   RUN apt-get update \
   	&& apt-get install -y --no-install-recommends ca-certificates fuse3 s3fs \
   	&& rm -rf /var/lib/apt/lists/*

   COPY --from=docker.io/cloudflare/sandbox:1.0.0 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

   CMD ["sleep", "infinity"]
   ```

   Use the `cloudflare/sandbox` tag that matches the `@cloudflare/sandbox` version you installed.
3. In `wrangler.jsonc`, turn on `nodejs_compat`, add the endpoint and name of the bucket as variables, declare the credentials as secrets, and build the `Dockerfile` as a named image. Replace `<ACCOUNT_ID>` with your Cloudflare account ID:

   ```jsonc
   {
   	"compatibility_flags": ["nodejs_compat"],
   	"vars": {
   		"S3_ENDPOINT": "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
   		"S3_BUCKET": "sandbox-artifacts",
   	},
   	"secrets": {
   		"required": ["S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"],
   	},
   	"containers": [
   		{
   			"class_name": "MyContainer",
   			"scheduling_policy": "durable_object",
   			"images": {
   				"artifacts": {
   					"dockerfile": "./Dockerfile",
   				},
   			},
   		},
   	],
   }
   ```

   ```toml
   compatibility_flags = [ "nodejs_compat" ]

   [vars]
   S3_ENDPOINT = "https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
   S3_BUCKET = "sandbox-artifacts"

   [secrets]
   required = [ "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY" ]

   [[containers]]
   class_name = "MyContainer"
   scheduling_policy = "durable_object"

   [containers.images.artifacts]
   dockerfile = "./Dockerfile"
   ```

   `secrets.required` adds the secrets to the generated types and makes `wrangler deploy` fail when they are missing. To mount a bucket from another S3-compatible service, change `S3_ENDPOINT` and `S3_BUCKET`, and use the credentials for that service.
4. Generate types, then add the Access Key ID and Secret Access Key from the R2 API token as secrets:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```

   npmyarnpnpm

   ```
   npx wrangler secret put S3_ACCESS_KEY_ID
   ```

   ```
   yarn wrangler secret put S3_ACCESS_KEY_ID
   ```

   ```
   pnpm wrangler secret put S3_ACCESS_KEY_ID
   ```

   npmyarnpnpm

   ```
   npx wrangler secret put S3_SECRET_ACCESS_KEY
   ```

   ```
   yarn wrangler secret put S3_SECRET_ACCESS_KEY
   ```

   ```
   pnpm wrangler secret put S3_SECRET_ACCESS_KEY
   ```

5. Import `S3Mount`, and export `S3Gateway` from the main module of your Worker:

   *src/index.jsjs*



   ```js
   import { S3Mount } from "@cloudflare/sandbox";

   // S3Mount sends storage requests from the sandbox to this entrypoint.
   export { S3Gateway } from "@cloudflare/sandbox";
   ```

   *src/index.tsts*



   ```ts
   import { S3Mount } from "@cloudflare/sandbox";

   // S3Mount sends storage requests from the sandbox to this entrypoint.
   export { S3Gateway } from "@cloudflare/sandbox";
   ```

   `s3fs` in the sandbox sends each storage request to an address that the container intercepts. The intercept delivers the request to `S3Gateway` in your Worker. `S3Gateway` checks that the request stays within the bucket, prefix, and access mode of the mount. Then it signs the request with your credentials and sends it to R2.
6. Add a constructor to your Durable Object. It creates one `S3Mount` object, and sets the inactivity timeout again when a restarted Durable Object finds the container running:

   *src/index.tsts*



   ```ts
   const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

   export class MyContainer extends DurableObject<Env> {
   	private readonly container: Container;
   	private readonly mounts: S3Mount;

   	constructor(ctx: DurableObjectState, env: Env) {
   		super(ctx, env);
   		const container = ctx.container;

   		if (!container) {
   			throw new Error("The container binding is not configured");
   		}

   		this.container = container;
   		this.mounts = new S3Mount(container, ctx.exports.S3Gateway);

   		if (container.running) {
   			void ctx.blockConcurrencyWhile(() =>
   				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
   			);
   		}
   	}
   }
   ```

   `this.ctx.container` stays the same object for as long as the Durable Object runs, so one `S3Mount` object serves every container that the Durable Object starts.

   Then add a method that starts the sandbox and mounts the prefix for the job:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	private async mountArtifacts(job: string) {
   		if (!this.container.running) {
   			this.container.start({
   				image: this.container.images.artifacts,
   				enableInternet: false,
   			});
   			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
   		}

   		await this.mounts.mount({
   			mountPath: "/mnt/artifacts",
   			source: {
   				type: "s3",
   				endpoint: this.env.S3_ENDPOINT,
   				region: "auto",
   				bucket: this.env.S3_BUCKET,
   				credentials: {
   					type: "static",
   					accessKeyId: this.env.S3_ACCESS_KEY_ID,
   					secretAccessKey: this.env.S3_SECRET_ACCESS_KEY,
   				},
   			},
   			keyPrefix: `jobs/${job}`,
   			access: "read-write",
   		});
   	}
   }
   ```

   Any process in the sandbox can read, change, or delete every object under the prefix. Mount the narrowest prefix the job needs, and use `access: "read-only"` when the job only reads. The sandbox receives placeholder credentials, because `s3fs` requires a key pair. The mount works with `enableInternet: false`. For short-lived credentials, refer to [Credentials](https://developers.cloudflare.com/sandbox/reference/s3-mounts/#credentials).

   Calling `mount()` again with the same settings reuses the existing mount. Each new mount adds an outbound intercept, and `unmount()` does not remove it. An instance supports a [limited number of intercepts](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttp). Give each job its own sandbox name instead of mounting a new prefix in the same instance.
7. Add a method that runs a command in the mounted directory:

   *src/index.tsts*



   ```ts
   export class MyContainer extends DurableObject<Env> {
   	// ...

   	async digest(job: string) {
   		await this.mountArtifacts(job);
   		const process = await this.container.exec(
   			// The command reads `input.txt` from R2 through the mount
   			// and writes `input.sha256` next to it
   			["sh", "-c", "sha256sum input.txt > input.sha256"],
   			{ cwd: "/mnt/artifacts" },
   		);
   		const output = await process.output();

   		return {
   			exitCode: output.exitCode,
   			stderr: new TextDecoder().decode(output.stderr),
   		};
   	}
   }
   ```

   The mount maps files to objects. Renames, locks, and permissions do not work as they do on a local disk. Write results that other systems read to the mount. Keep working files, such as dependencies and build output, on the sandbox disk. For more information, refer to [Mounted file behavior](https://developers.cloudflare.com/sandbox/reference/s3-mounts/#mounted-file-behavior).
8. Add a method that unmounts the prefix and stops the sandbox:

   *src/index.tsts*



   ```ts
   async finish() {
   	if (!this.container.running) {
   		return;
   	}

   	await this.mounts.unmount("/mnt/artifacts");
   	await this.container.destroy();
   }
   ```

   If a process still uses the directory, `unmount()` throws `SandboxS3MountError` with code `S3_MOUNT_BUSY`. Stop the process, then call `unmount()` again.
9. Add routes to your Worker that run a job and finish it:

   *src/index.jsjs*



   ```js
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);
   		const match =
   			/^\/jobs\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(\/digest)?$/.exec(
   				url.pathname,
   			);

   		if (!match) {
   			return new Response("Not found", { status: 404 });
   		}

   		const [, job, digest] = match;
   		const sandbox = env.MY_CONTAINER.getByName(job);

   		if (digest && request.method === "POST") {
   			return Response.json(await sandbox.digest(job));
   		}

   		if (!digest && request.method === "DELETE") {
   			await sandbox.finish();
   			return new Response(null, { status: 204 });
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
   		const match = /^\/jobs\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(\/digest)?$/.exec(url.pathname);

   		if (!match) {
   			return new Response("Not found", { status: 404 });
   		}

   		const [, job, digest] = match;
   		const sandbox = env.MY_CONTAINER.getByName(job);

   		if (digest && request.method === "POST") {
   			return Response.json(await sandbox.digest(job));
   		}

   		if (!digest && request.method === "DELETE") {
   			await sandbox.finish();
   			return new Response(null, { status: 204 });
   		}

   		return new Response("Method not allowed", { status: 405 });
   	},
   } satisfies ExportedHandler<Env>;
   ```

   Authenticate callers first, so other people cannot run jobs or read their results. For more information, refer to [Sandbox security](https://developers.cloudflare.com/sandbox/concepts/security/#code-can-read-what-you-put-in-its-sandbox).
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

11. Upload an input file for the job named `ada`, run the job, and read the result from R2. Replace the example hostname with the `workers.dev` URL that Wrangler prints:

    ```sh
    echo "artifact input" > input.txt
    npx wrangler r2 object put sandbox-artifacts/jobs/ada/input.txt --file input.txt --remote
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/jobs/ada/digest --request POST
    npx wrangler r2 object get sandbox-artifacts/jobs/ada/input.sha256 --remote --pipe
    ```

    The job responds with `{"exitCode":0,"stderr":""}`, and R2 has the digest:

    ```txt
    <SHA256_DIGEST>  input.txt
    ```

12. Unmount the prefix and stop the sandbox:

    ```sh
    curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/jobs/ada --request DELETE
    ```

## Develop locally

Under `wrangler dev`, the container runs in Docker on your machine, and `S3Gateway` runs in your local Worker. Point the mount at an S3-compatible server on your machine instead of R2. In this example, the server is [MinIO ↗︎](https://min.io/). FUSE needs Docker in a virtual machine, such as Docker Desktop, or rootless Linux Docker with `/dev/fuse`. For more information, refer to [FUSE support](https://developers.cloudflare.com/containers/guides/local-dev/#fuse-support).

1. Start MinIO and create a bucket:

   ```sh
   docker run --detach --name minio --publish 9000:9000 minio/minio server /data
   docker exec minio sh -c "mc alias set local http://localhost:9000 minioadmin minioadmin && mc mb local/sandbox-artifacts"
   ```

2. Create a `.dev.vars` file in your project root. Its values override the variables and secrets under `wrangler dev`:

   *.dev.varstxt*



   ```txt
   S3_ENDPOINT=http://localhost:9000
   S3_ACCESS_KEY_ID=minioadmin
   S3_SECRET_ACCESS_KEY=minioadmin
   ```

3. Start the development server:npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

4. Upload an input file, run the job, and read the result from MinIO:

   ```sh
   echo "artifact input" | docker exec --interactive minio mc pipe local/sandbox-artifacts/jobs/ada/input.txt
   curl http://localhost:8787/jobs/ada/digest --request POST
   docker exec minio mc cat local/sandbox-artifacts/jobs/ada/input.sha256
   ```

## Related resources

- [S3Mount API](https://developers.cloudflare.com/sandbox/reference/s3-mounts/): every option and error.
- [Artifact workspace example ↗︎](https://github.com/cloudflare/sandbox-sdk/tree/main/examples/artifact-workspace): a deployable Worker that mounts a prefix for each sandbox and processes a file in it.
- [Save and restore a sandbox with snapshots](https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/): keep files on the sandbox disk between instances. Snapshots do not include mounted directories.
- [S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/): the S3 operations that R2 supports.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/#page","headline":"Mount an R2 bucket","description":"Mount a prefix of an R2 bucket in a Linux sandbox without giving the sandbox your credentials.","url":"https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/","inLanguage":"en","image":"https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/og.png?v=b6b9fbc310367588","dateModified":"2026-09-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
