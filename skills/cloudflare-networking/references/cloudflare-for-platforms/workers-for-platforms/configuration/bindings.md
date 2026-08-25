---
description: Attach KV, R2, D1, and other resource bindings to user Workers deployed through Workers for Platforms.
title: Bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Bindings

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you deploy User Workers through Workers for Platforms, you can attach [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to give them access to resources like [KV namespaces](https://developers.cloudflare.com/kv/), [D1 databases](https://developers.cloudflare.com/d1/), [R2 buckets](https://developers.cloudflare.com/r2/), and more. This enables your end customers to build more powerful applications without you having to build the infrastructure components yourself.

With bindings, each User Worker can extend functionality to:

* **Store data** with [KV](https://developers.cloudflare.com/kv/), [R2](https://developers.cloudflare.com/r2/), [D1](https://developers.cloudflare.com/d1/), or [Durable Objects](https://developers.cloudflare.com/durable-objects/)
* **Process work asynchronously** with [Queues](https://developers.cloudflare.com/queues/) and [Workflows](https://developers.cloudflare.com/workflows/)
* **Run containers** with [Containers](https://developers.cloudflare.com/containers/) (bound as a [Durable Object](https://developers.cloudflare.com/durable-objects/))
* **Connect to private networks** with [VPC Services](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/), [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/), and [Hyperdrive](https://developers.cloudflare.com/hyperdrive/)
* **Collect metrics** with [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/)

#### Resource isolation

Each User Worker can only access the bindings that are explicitly attached to it. For complete isolation, you can create and attach a unique resource (like a D1 database or KV namespace) to every User Worker.

![Resource Isolation Model](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=585,format=svg/_astro/programmable-platforms-5.B2yd7IjV.svg "Resource Isolation Model")

Resource Isolation Model

## Adding a KV Namespace to a User Worker

This example walks through how to create a [KV namespace](https://developers.cloudflare.com/kv/) and attach it to a User Worker. The same process can be used to attach to other [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

### 1\. Create a KV namespace

Create a KV namespace using the [Cloudflare API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/methods/bulk%5Fupdate/).

### 2\. Attach the KV namespace to the User Worker

Use the [Upload User Worker API](https://developers.cloudflare.com/api/resources/workers%5Ffor%5Fplatforms/subresources/dispatch/subresources/namespaces/subresources/scripts/methods/update/) to attach the KV namespace binding to the Worker. You can do this when you're first uploading the Worker script or when updating an existing Worker.

Note

When using the API to upload scripts, bindings must be specified in the `metadata` object of your multipart upload request. You cannot upload the Wrangler configuration file as a module to configure the bindings. For more details about multipart uploads, see [Multipart upload metadata](https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/).

##### Example API request

```bash
curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/<account-id>/workers/dispatch/namespaces/<your-namespace>/scripts/<script-name>" \
  -H "Content-Type: multipart/form-data" \
  -H "Authorization: Bearer <api-token>" \
  -F 'metadata={
    "main_module": "worker.js",
    "bindings": [
      {
        "type": "kv_namespace",
        "name": "USER_KV",
        "namespace_id": "<your-namespace-id>"
      }
    ]
  }' \
  -F 'worker.js=@/path/to/worker.js'
```

Now, the User Worker can access the `USER_KV` binding through the `env` argument using `env.USER_KV.get()`, `env.USER_KV.put()`, and other KV methods.

Note: If you plan to add new bindings to the Worker, use the `keep_bindings` parameter to ensure existing bindings are preserved while adding new ones.

```bash
curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/<account-id>/workers/dispatch/namespaces/<your-namespace>/scripts/<script-name>" \
  -H "Content-Type: multipart/form-data" \
  -H "Authorization: Bearer <api-token>" \
  -F 'metadata={
    "bindings": [
      {
        "type": "r2_bucket",
        "name": "STORAGE",
        "bucket_name": "<your-bucket-name>"
      }
    ],
    "keep_bindings": ["kv_namespace"]
  }'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/#page","headline":"Bindings · Cloudflare for Platforms docs","description":"Attach KV, R2, D1, and other resource bindings to user Workers deployed through Workers for Platforms.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Bindings"]}
```
