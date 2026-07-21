---
title: Write key-value pairs
description: Store data in a Workers KV namespace using the put() method, with options for expiration and metadata.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Write key-value pairs

To create a new key-value pair, or to update the value for a particular key, call the `put()` method of the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) on any [KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) you have bound to your Worker code:

* [  JavaScript ](#tab-panel-9787)
* [  Python ](#tab-panel-9788)

**JavaScript**

```js
env.NAMESPACE.put(key, value);
```

**Python**

```py
self.env.NAMESPACE.put(key, value)
```

#### Example

An example of writing a key-value pair from within a Worker:

* [  JavaScript ](#tab-panel-9789)
* [  Python ](#tab-panel-9790)

**JavaScript**

```js
export default {
  async fetch(request, env, ctx) {
    try {
      await env.NAMESPACE.put("first-key", "This is the value for the key");


      return new Response("Successful write", {
        status: 201,
      });
    } catch (e) {
      return new Response(e.message, { status: 500 });
    }
  },
};
```

**Python**

```py
from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        try:
            await self.env.NAMESPACE.put("first-key", "This is the value for the key")


            return Response("Successful write", status=201)
        except Exception as e:
            return Response(str(e), status=500)
```

## Reference

The following method is provided to write to KV:

* [put()](#put-method)

### `put()` method

To create a new key-value pair, or to update the value for a particular key, call the `put()` method on any KV namespace you have bound to your Worker code:

* [  JavaScript ](#tab-panel-9791)
* [  Python ](#tab-panel-9792)

**JavaScript**

```js
env.NAMESPACE.put(key, value, options?);
```

**Python**

```py
self.env.NAMESPACE.put(key, value, options)
```

#### Parameters

* `key`: `string`

  * The key to associate with the value. A key cannot be empty or be exactly equal to `.` or `..`. All other keys are valid. Keys have a maximum length of 512 bytes.
* `value`: `string` | `ReadableStream` | `ArrayBuffer`

  * The value to store. The type is inferred. The maximum size of a value is 25 MiB.
* `options`: `{ expiration?: number, expirationTtl?: number, metadata?: object }`

  * Optional. An object containing the `expiration` (optional), `expirationTtl` (optional), and `metadata` (optional) attributes.
    * `expiration` is the number that represents when to expire the key-value pair in seconds since epoch.
    * `expirationTtl` is the number that represents when to expire the key-value pair in seconds from now. The minimum value is 60.
    * `metadata` is an object that must serialize to JSON. The maximum size of the serialized JSON representation of the metadata object is 1024 bytes.

#### Response

* `response`: `Promise<void>`
  * A `Promise` that resolves if the update is successful.

The put() method returns a Promise that you should `await` on to verify a successful update.

## Guidance

### Concurrent writes to the same key

Due to the eventually consistent nature of KV, concurrent writes to the same key can end up overwriting one another. It is a common pattern to write data from a single process with Wrangler, Durable Objects, or the API. This avoids competing concurrent writes because of the single stream. All data is still readily available within all Workers bound to the namespace.

If concurrent writes are made to the same key, the last write will take precedence.

Writes are immediately visible to other requests in the same global network location, but can take up to 60 seconds (or the value of the `cacheTtl` parameter of the `get()` or `getWithMetadata()` methods) to be visible in other parts of the world.

Refer to [How KV works](https://developers.cloudflare.com/kv/concepts/how-kv-works/) for more information on this topic.

### Write data in bulk

Write more than one key-value pair at a time with Wrangler or [via the REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fupdate/).

The bulk API can accept up to 10,000 KV pairs at once.

A `key` and a `value` are required for each KV pair. The entire request size must be less than 100 megabytes. Bulk writes are not supported using the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/).

### Expiring keys

KV offers the ability to create keys that automatically expire. You may configure expiration to occur either at a particular point in time (using the `expiration` option), or after a certain amount of time has passed since the key was last modified (using the `expirationTtl` option).

Once the expiration time of an expiring key is reached, it will be deleted from the system. After its deletion, attempts to read the key will behave as if the key does not exist. The deleted key will not count against the KV namespace’s storage usage for billing purposes.

Note

An `expiration` setting on a key will result in that key being deleted, even in cases where the `cacheTtl` is set to a higher (longer duration) value. Expiration always takes precedence.

There are two ways to specify when a key should expire:

* Set a key's expiration using an absolute time specified in a number of [seconds since the UNIX epoch ↗](https://en.wikipedia.org/wiki/Unix%5Ftime). For example, if you wanted a key to expire at 12:00AM UTC on April 1, 2019, you would set the key’s expiration to `1554076800`.
* Set a key's expiration time to live (TTL) using a relative number of seconds from the current time. For example, if you wanted a key to expire 10 minutes after creating it, you would set its expiration TTL to `600`.

Expiration targets that are less than 60 seconds into the future are not supported. This is true for both expiration methods.

#### Create expiring keys

To create expiring keys, set `expiration` in the `put()` options to a number representing the seconds since epoch, or set `expirationTtl` in the `put()` options to a number representing the seconds from now:

* [  JavaScript ](#tab-panel-9793)
* [  Python ](#tab-panel-9794)

**JavaScript**

```js
await env.NAMESPACE.put(key, value, {
  expiration: secondsSinceEpoch,
});


await env.NAMESPACE.put(key, value, {
  expirationTtl: secondsFromNow,
});
```

**Python**

```py
await self.env.NAMESPACE.put(key, value, expiration=seconds_since_epoch)


await self.env.NAMESPACE.put(key, value, expirationTtl=seconds_from_now)
```

These assume that `secondsSinceEpoch`/`seconds_since_epoch` and `secondsFromNow`/`seconds_from_now` are variables defined elsewhere in your Worker code.

### Metadata

To associate metadata with a key-value pair, set `metadata` in the `put()` options to an object (serializable to JSON):

* [  JavaScript ](#tab-panel-9795)
* [  Python ](#tab-panel-9796)

**JavaScript**

```js
await env.NAMESPACE.put(key, value, {
  metadata: { someMetadataKey: "someMetadataValue" },
});
```

**Python**

```py
await self.env.NAMESPACE.put(key, value, metadata={"someMetadataKey": "someMetadataValue"})
```

### Limits to KV writes to the same key

Workers KV has a maximum of 1 write to the same key per second. Writes made to the same key within 1 second will cause rate limiting (`429`) errors to be thrown.

You should not write more than once per second to the same key. Consider consolidating your writes to a key within a Worker invocation to a single write, or wait at least 1 second between writes.

The following example serves as a demonstration of how multiple writes to the same key may return errors by forcing concurrent writes within a single Worker invocation. This is not a pattern that should be used in production.

* [  TypeScript ](#tab-panel-9797)
* [  Python ](#tab-panel-9798)

**TypeScript**

```typescript
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Rest of code omitted
    const key = "common-key";
    const parallelWritesCount = 20;


    // Helper function to attempt a write to KV and handle errors
    const attemptWrite = async (i: number) => {
      try {
        await env.YOUR_KV_NAMESPACE.put(key, `Write attempt #${i}`);
        return { attempt: i, success: true };
      } catch (error) {
        // An error may be thrown if a write to the same key is made within 1 second with a message. For example:
        // error: {
        //  "message": "KV PUT failed: 429 Too Many Requests"
        // }


        return {
          attempt: i,
          success: false,
          error: { message: (error as Error).message },
        };
      }
    };


    // Send all requests in parallel and collect results
    const results = await Promise.all(
      Array.from({ length: parallelWritesCount }, (_, i) =>
        attemptWrite(i + 1),
      ),
    );
    // Results will look like:
    // [
    //     {
    //       "attempt": 1,
    //       "success": true
    //     },
    //    {
    //       "attempt": 2,
    //       "success": false,
    //       "error": {
    //         "message": "KV PUT failed: 429 Too Many Requests"
    //       }
    //     },
    //     ...
    // ]


    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
```

**Python**

```py
from workers import WorkerEntrypoint, Response
import asyncio


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        key = "common-key"
        parallel_writes_count = 20


        async def attempt_write(i):
            try:
                await self.env.YOUR_KV_NAMESPACE.put(key, f"Write attempt #{i}")
                return {"attempt": i, "success": True}
            except Exception as error:
                # An error may be thrown if a write to the same key is made
                # within 1 second with a message like:
                # "KV PUT failed: 429 Too Many Requests"
                return {"attempt": i, "success": False, "error": {"message": str(error)}}


        results = await asyncio.gather(
            *[attempt_write(i + 1) for i in range(parallel_writes_count)]
        )


        # Results will look like:
        # [
        #     {
        #         "attempt": 1,
        #         "success": True
        #     },
        #     {
        #         "attempt": 2,
        #         "success": False,
        #         "error": {
        #             "message": "KV PUT failed: 429 Too Many Requests"
        #         }
        #     },
        #     ...
        # ]


        return Response.json(list(results))
```

To handle these errors, we recommend implementing a retry logic, with exponential backoff. Here is a simple approach to add retries to the above code.

* [  TypeScript ](#tab-panel-9799)
* [  Python ](#tab-panel-9800)

**TypeScript**

```typescript
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Rest of code omitted
    const key = "common-key";
    const parallelWritesCount = 20;


    // Helper function to attempt a write to KV with retries
    const attemptWrite = async (i: number) => {
      return await retryWithBackoff(async () => {
        await env.YOUR_KV_NAMESPACE.put(key, `Write attempt #${i}`);
        return { attempt: i, success: true };
      });
    };


    // Send all requests in parallel and collect results
    const results = await Promise.all(
      Array.from({ length: parallelWritesCount }, (_, i) =>
        attemptWrite(i + 1),
      ),
    );


    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  },
};


async function retryWithBackoff(
  fn: Function,
  maxAttempts = 5,
  initialDelay = 1000,
) {
  let attempts = 0;
  let delay = initialDelay;


  while (attempts < maxAttempts) {
    try {
      // Attempt the function
      return await fn();
    } catch (error) {
      // Check if the error is a rate limit error
      if (
        (error as Error).message.includes(
          "KV PUT failed: 429 Too Many Requests",
        )
      ) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw new Error("Max retry attempts reached");
        }


        // Wait for the backoff period
        console.warn(`Attempt ${attempts} failed. Retrying in ${delay} ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));


        // Exponential backoff
        delay *= 2;
      } else {
        // If it's a different error, rethrow it
        throw error;
      }
    }
  }
}
```

**Python**

```py
from workers import WorkerEntrypoint, Response
import asyncio


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        key = "common-key"
        parallel_writes_count = 20


        async def attempt_write(i):
            return await retry_with_backoff(
                lambda: self.env.YOUR_KV_NAMESPACE.put(key, f"Write attempt #{i}"),
                success_result={"attempt": i, "success": True},
            )


        results = await asyncio.gather(
            *[attempt_write(i + 1) for i in range(parallel_writes_count)]
        )


        return Response.json(list(results))


async def retry_with_backoff(fn, success_result, max_attempts=5, initial_delay=1.0):
    attempts = 0
    delay = initial_delay


    while attempts < max_attempts:
        try:
            await fn()
            return success_result
        except Exception as error:
            if "KV PUT failed: 429 Too Many Requests" in str(error):
                attempts += 1
                if attempts >= max_attempts:
                    raise Exception("Max retry attempts reached")


                print(f"Attempt {attempts} failed. Retrying in {delay}s...")
                await asyncio.sleep(delay)


                delay *= 2
            else:
                raise
```

## Other methods to access KV

You can also [write key-value pairs from the command line with Wrangler](https://developers.cloudflare.com/kv/reference/kv-commands/#kv-namespace-create) and [write data via the REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/values/methods/update/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/api/write-key-value-pairs/#page","headline":"Write key-value pairs · Cloudflare Workers KV docs","description":"Store data in a Workers KV namespace using the put() method, with options for expiration and metadata.","url":"https://developers.cloudflare.com/kv/api/write-key-value-pairs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/kv/api/write-key-value-pairs/","name":"Write key-value pairs"}}]}
```
