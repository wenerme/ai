---
title: Durable Object ID
description: A Durable Object ID is a 64-digit hexadecimal number used to identify a Durable Object. Not all 64-digit hex numbers are valid IDs. Durable Object IDs are constructed indirectly via the DurableObjectNamespace interface.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/durable-objects/api/id.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Durable Object ID

## Description

A Durable Object ID is a 64-digit hexadecimal number used to identify a Durable Object. Not all 64-digit hex numbers are valid IDs. Durable Object IDs are constructed indirectly via the [DurableObjectNamespace](https://developers.cloudflare.com/durable-objects/api/namespace) interface.

The `DurableObjectId` interface refers to a new or existing Durable Object. This interface is most frequently used by [DurableObjectNamespace::get](https://developers.cloudflare.com/durable-objects/api/namespace/#get) to obtain a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) for submitting requests to a Durable Object. Note that creating an ID for a Durable Object does not create the Durable Object. The Durable Object is created lazily after creating a stub from a `DurableObjectId`. This ensures that objects are not constructed until they are actually accessed.

Logging

If you are experiencing an issue with a particular Durable Object, you may wish to log the `DurableObjectId` from your Worker and include it in your Cloudflare support request.

## Methods

### `toString`

`toString` converts a `DurableObjectId` to a 64 digit hex string. This string is useful for logging purposes or storing the `DurableObjectId` elsewhere, for example, in a session cookie. This string can be used to reconstruct a `DurableObjectId` via `DurableObjectNamespace::idFromString`.

JavaScript

```

// Create a new unique ID

const id = env.MY_DURABLE_OBJECT.newUniqueId();

// Convert the ID to a string to be saved elsewhere, e.g. a session cookie

const session_id = id.toString();


...

// Recreate the ID from the string

const id = env.MY_DURABLE_OBJECT.idFromString(session_id);


```

#### Parameters

* None.

#### Return values

* A 64 digit hex string.

### `equals`

`equals` is used to compare equality between two instances of `DurableObjectId`.

* [  JavaScript ](#tab-panel-4361)
* [  Python ](#tab-panel-4362)

JavaScript

```

const id1 = env.MY_DURABLE_OBJECT.newUniqueId();

const id2 = env.MY_DURABLE_OBJECT.newUniqueId();

console.assert(!id1.equals(id2), "Different unique ids should never be equal.");


```

Python

```

id1 = env.MY_DURABLE_OBJECT.newUniqueId()

id2 = env.MY_DURABLE_OBJECT.newUniqueId()

assert not id1.equals(id2), "Different unique ids should never be equal."


```

#### Parameters

* A required `DurableObjectId` to compare against.

#### Return values

* A boolean. True if equal and false otherwise.

## Properties

### `name`

`name` is an optional property of a `DurableObjectId`, which returns the name that was used to create the `DurableObjectId` via [DurableObjectNamespace::idFromName](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname). This value is undefined if the `DurableObjectId` was constructed using [DurableObjectNamespace::newUniqueId](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid).

The `name` property is available on `ctx.id` inside the Durable Object when the caller uses `idFromName()` or `getByName()`. If the caller accesses the Durable Object using `idFromString()`, `ctx.id.name` will be `undefined`, even if the ID was originally created with `idFromName()`. Names longer than 1,024 bytes are not passed through and will be `undefined` on `ctx.id`.

Note

Alarms created before 2026-03-15 do not have `name` stored. When such an alarm fires, `ctx.id.name` will be `undefined`, and any new alarm scheduled from that handler will also lack a `name`. To fix this, reschedule the alarm from a `fetch()` or RPC handler where `name` is available.

* [  JavaScript ](#tab-panel-4363)
* [  Python ](#tab-panel-4364)

JavaScript

```

const uniqueId = env.MY_DURABLE_OBJECT.newUniqueId();

const fromNameId = env.MY_DURABLE_OBJECT.idFromName("foo");

console.assert(uniqueId.name === undefined, "unique ids have no name");

console.assert(

  fromNameId.name === "foo",

  "name matches parameter to idFromName",

);


```

Python

```

unique_id = env.MY_DURABLE_OBJECT.newUniqueId()

from_name_id = env.MY_DURABLE_OBJECT.idFromName("foo")

assert unique_id.name is None, "unique ids have no name"

assert from_name_id.name == "foo", "name matches parameter to idFromName"


```

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/id/","name":"Durable Object ID"}}]}
```
