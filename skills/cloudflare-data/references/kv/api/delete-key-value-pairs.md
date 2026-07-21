---
description: Remove keys and their associated values from a Workers KV namespace using the delete() method.
title: Delete key-value pairs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

#  Delete key-value pairs

Last updated Jun 22, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/kv/api/delete-key-value-pairs/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

To delete a key-value pair, call the `delete()` method of the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) on any [KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) you have bound to your Worker code:

```js
env.NAMESPACE.delete(key);
```

```py
self.env.NAMESPACE.delete(key)
```

#### Example

An example of deleting a key-value pair from within a Worker:

```js
export default {
  async fetch(request, env, ctx) {
    try {
      await env.NAMESPACE.delete("first-key");

      return new Response("Successful delete", {
        status: 200
      });
    }
    catch (e)
    {
      return new Response(e.message, {status: 500});
    }
  },
};
```

```py
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        try:
            await self.env.NAMESPACE.delete("first-key")

            return Response("Successful delete", status=200)
        except Exception as e:
            return Response(str(e), status=500)
```

## Reference

The following method is provided to delete from KV:

* [delete()](#delete-method)

### `delete()` method

To delete a key-value pair, call the `delete()` method of the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) on any KV namespace you have bound to your Worker code:

```js
env.NAMESPACE.delete(key);
```

```py
await self.env.NAMESPACE.delete(key)
```

#### Parameters

* `key`: `string`
  * The key to associate with the value.

#### Response

* `response`: `Promise<void>`
  * A `Promise` that resolves if the delete is successful.

This method returns a promise that you should `await` on to verify successful deletion. Calling `delete()` on a non-existing key is returned as a successful delete.

Calling the `delete()` method will remove the key and value from your KV namespace. As with any operations, it may take some time for the key to be deleted from various points in the Cloudflare global network.

## Guidance

### Delete data in bulk

Delete more than one key-value pair at a time with Wrangler or [via the REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/keys/methods/bulk%5Fdelete/).

The bulk REST API can accept up to 10,000 KV pairs at once. Bulk writes are not supported using the [KV binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/).

## Other methods to access KV

You can also [delete key-value pairs from the command line with Wrangler](https://developers.cloudflare.com/kv/reference/kv-commands/#kv-namespace-delete) or [with the REST API](https://developers.cloudflare.com/api/resources/kv/subresources/namespaces/subresources/values/methods/delete/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/api/delete-key-value-pairs/#page","headline":"Delete key-value pairs · Cloudflare Workers KV docs","description":"Remove keys and their associated values from a Workers KV namespace using the delete() method.","url":"https://developers.cloudflare.com/kv/api/delete-key-value-pairs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
