---
title: Bindings
description: Attach KV, R2, D1, and other resource bindings to user Workers deployed through Workers for Platforms.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Bindings ](https://developers.cloudflare.com/search/?tags=Bindings) 

# Bindings

When you deploy User Workers through Workers for Platforms, you can attach [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to give them access to resources like [KV namespaces](https://developers.cloudflare.com/kv/), [D1 databases](https://developers.cloudflare.com/d1/), [R2 buckets](https://developers.cloudflare.com/r2/), and more. This enables your end customers to build more powerful applications without you having to build the infrastructure components yourself.

With bindings, each of your users can have their own:

* [KV namespace](https://developers.cloudflare.com/kv/) that they can use to store and retrieve data
* [R2 bucket](https://developers.cloudflare.com/r2/) that they can use to store files and assets
* [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) dataset that they can use to collect observability data
* [Durable Objects](https://developers.cloudflare.com/durable-objects/) class that they can use for stateful coordination

#### Resource isolation

Each User Worker can only access the bindings that are explicitly attached to it. For complete isolation, you can create and attach a unique resource (like a D1 database or KV namespace) to every User Worker.

![Resource Isolation Model](https://developers.cloudflare.com/_astro/programmable-platforms-5.B2yd7IjV_Z1IMWex.svg "Resource Isolation Model")

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

Terminal window

```

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

Now, the User Worker has can access the `USER_KV` binding through the `env` argument using `env.USER_DATA.get()`, `env.USER_DATA.put()`, and other KV methods.

Note: If you plan to add new bindings to the Worker, use the `keep_bindings` parameter to ensure existing bindings are preserved while adding new ones.

Terminal window

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-for-platforms/","name":"Cloudflare for Platforms"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/","name":"Workers for Platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/","name":"Configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-for-platforms/workers-for-platforms/configuration/bindings/","name":"Bindings"}}]}
```
