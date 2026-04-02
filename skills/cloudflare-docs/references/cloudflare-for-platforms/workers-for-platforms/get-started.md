---
title: Get started
description: Get started with Workers for Platforms by deploying a starter kit to your account.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-for-platforms/workers-for-platforms/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Get started

Get started with Workers for Platforms by deploying a starter kit to your account.

## Deploy a platform

Deploy the [Platform Starter Kit ↗](https://github.com/cloudflare/templates/tree/main/worker-publisher-template) to your Cloudflare account. This creates a complete Workers for Platforms setup with one click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/worker-publisher-template)

After deployment completes, open your Worker URL. You now have a platform where you can deploy code snippets.

### Try it out

1. Enter a script name, for example `my-worker`.
2. Write or paste Worker code in the editor.
3. Click **Deploy Worker**.

Once deployed, visit `/<script-name>` on your Worker URL to run your code. For example, if you named your script `my-worker`, go to `https://<your-worker>.<subdomain>.workers.dev/my-worker`.

Each script you deploy becomes its own isolated Worker. The platform calls the Cloudflare API to create the Worker and the dispatch Worker routes requests to it based on the URL path.

## Understand how it works

The template you deployed contains three components that work together:

### Dispatch namespace

A dispatch namespace is a collection of user Workers. Think of it as a container that holds all the Workers your platform deploys on behalf of your customers.

When you deployed the template, it created a dispatch namespace automatically. You can view it in the Cloudflare dashboard under **Workers for Platforms**.

### Dispatch Worker

The dispatch Worker receives incoming requests and routes them to the correct user Worker. It uses a [binding](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/) to access the dispatch namespace.

JavaScript

```

export default {

  async fetch(request, env) {

    // Get the user Worker name from the URL path

    const url = new URL(request.url);

    const workerName = url.pathname.split("/")[1];


    // Fetch the user Worker from the dispatch namespace

    const userWorker = env.DISPATCHER.get(workerName);


    // Forward the request to the user Worker

    return userWorker.fetch(request);

  },

};


```

The `env.DISPATCHER.get()` method retrieves a user Worker by name from the dispatch namespace.

### User Workers

User Workers contain the code your customers write and deploy. They run in isolated environments with no access to other customers' data or code.

In the template, user Workers are deployed programmatically through the API. In production, your platform would call the Cloudflare API or SDK to deploy user Workers when your customers save their code.

## Build your platform

Now that you understand how the components work together, customize the template for your use case:

* [Dynamic dispatch](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/) — Route requests by subdomain or hostname
* [Hostname routing](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/hostname-routing/) — Let customers use [custom domains](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) with their applications
* [Bindings](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/) — Give each customer access to their own [database](https://developers.cloudflare.com/d1/), [key-value store](https://developers.cloudflare.com/kv/), or [object storage](https://developers.cloudflare.com/r2/)
* [Outbound Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) — Configure egress policies on outgoing requests from customer code
* [Custom limits](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/) — Set CPU time and subrequest limits per customer
* [API examples](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/platform-examples/) — Examples for deploying and managing customer code programmatically

## Build an AI vibe coding platform

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/vibesdk)

Build an [AI vibe coding platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-vibe-coding-platform/) where users describe what they want and AI generates and deploys applications.

With [VibeSDK ↗](https://github.com/cloudflare/vibesdk), Cloudflare's open source vibe coding platform, you can get started with an example that handles AI code generation, code execution in secure sandboxes, live previews, and deployment at scale.

[ View demo ](https://build.cloudflare.dev) [ View on GitHub ](https://github.com/cloudflare/vibesdk) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/get-started/","name":"Get started"}}]}
```
