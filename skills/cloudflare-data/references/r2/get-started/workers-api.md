---
description: Use R2 from Cloudflare Workers with the Workers API.
title: Workers API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers API

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2/get-started/workers-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Workers](https://developers.cloudflare.com/workers/) let you run code at the edge. When you bind an R2 bucket to a Worker, you can read and write objects directly using the [Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/).

## 1\. Create a bucket

A bucket stores your objects in R2\. To create a new R2 bucket:

1. Log in to your Cloudflare account:
```sh
npx wrangler login
```
2. Create a bucket named `my-bucket`:
```sh
npx wrangler r2 bucket create my-bucket
```
If prompted, select the account you want to create the bucket in.
3. Verify the bucket was created:
```sh
npx wrangler r2 bucket list
```

1. In the Cloudflare Dashboard, go to **R2 object storage**.
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Create bucket**.
3. Enter a name for your bucket.
4. Select a [location](https://developers.cloudflare.com/r2/reference/data-location) for your bucket and a [default storage class](https://developers.cloudflare.com/r2/buckets/storage-classes/).
5. Select **Create bucket**.

## 2\. Create a Worker with an R2 binding

1. Create a new Worker project:
npmyarnpnpm
```
npm create cloudflare@latest -- r2-worker
```
```
yarn create cloudflare r2-worker
```
```
pnpm create cloudflare@latest r2-worker
```
When prompted, select **Hello World example** and **JavaScript** (or TypeScript) as your template.
2. Move into the project directory:
```sh
cd r2-worker
```
3. Add an R2 binding to your Wrangler configuration file. Replace `my-bucket` with your bucket name:
```jsonc
{
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket"
    }
  ]
}
```
```toml
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"
```
4. (Optional) If you are using TypeScript, regenerate types:
```sh
npx wrangler types
```

## 3\. Read and write objects

Use the binding to interact with your bucket. This example stores and retrieves objects based on the URL path:

```js
export default {
	async fetch(request, env) {
		// Get the object key from the URL path
		// For example: /images/cat.png → images/cat.png
		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		// PUT: Store the request body in R2
		if (request.method === "PUT") {
			await env.MY_BUCKET.put(key, request.body);
			return new Response(`Put ${key} successfully!`);
		}

		// GET: Retrieve the object from R2
		const object = await env.MY_BUCKET.get(key);
		if (object === null) {
			return new Response("Object not found", { status: 404 });
		}
		return new Response(object.body);
	},
};
```

```ts
export default {
	async fetch(request, env): Promise<Response> {
		// Get the object key from the URL path
		// For example: /images/cat.png → images/cat.png
		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		// PUT: Store the request body in R2
		if (request.method === "PUT") {
			await env.MY_BUCKET.put(key, request.body);
			return new Response(`Put ${key} successfully!`);
		}

		// GET: Retrieve the object from R2
		const object = await env.MY_BUCKET.get(key);
		if (object === null) {
			return new Response("Object not found", { status: 404 });
		}
		return new Response(object.body);
	},
} satisfies ExportedHandler<Env>;
```

## 4\. Test and deploy

1. Test your Worker locally:
```sh
npx wrangler dev
```
Local development
By default, `wrangler dev` uses a local R2 simulation. Objects you store during development exist only on your machine in the `.wrangler/state` folder and do not affect your production bucket.
To connect to your real R2 bucket during development, add `"remote": true` to your R2 binding in your Wrangler configuration file. Refer to [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings) for more information.
2. Once the dev server is running, test storing and retrieving objects:
```sh
# Store an object
curl -X PUT http://localhost:8787/my-file.txt -d 'Hello, R2!'
# Retrieve the object
curl http://localhost:8787/my-file.txt
```
3. Deploy to production:
```sh
npx wrangler deploy
```
4. After deploying, Wrangler outputs your Worker's URL (for example, `https://r2-worker.<YOUR_SUBDOMAIN>.workers.dev`). Test storing and retrieving objects:
```sh
# Store an object
curl -X PUT https://r2-worker.<YOUR_SUBDOMAIN>.workers.dev/my-file.txt -d 'Hello, R2!'
# Retrieve the object
curl https://r2-worker.<YOUR_SUBDOMAIN>.workers.dev/my-file.txt
```

Refer to the [Workers R2 API documentation](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/) for the complete API reference.

## Next steps

### [Presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)

Generate temporary URLs for private object access.

### [Public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/)

Serve files directly over HTTP with a public bucket.

### [CORS](https://developers.cloudflare.com/r2/buckets/cors/)

Configure CORS for browser-based uploads.

### [Object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/)

Set up lifecycle rules to automatically delete old objects.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/get-started/workers-api/#page","headline":"Workers API · Cloudflare R2 docs","description":"Use R2 from Cloudflare Workers with the Workers API.","url":"https://developers.cloudflare.com/r2/get-started/workers-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
