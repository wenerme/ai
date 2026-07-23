---
title: RTKStore
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RTKStore

Last updated Jul 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstore/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This module represents a single global store. The store can be accessed from the `meeting.stores` module.

**Returns**: An instance of RTKStore.
**Example**

```js
const handRaiseStore = meeting.stores.stores.get('handRaise');
```

* [RTKStore](#module%5FRTKStore) ⇒
  * [.set(key, value, \[sync\], \[emit\])](#module%5FRTKStore+set) ⇒ `Promise.<void>`
  * [.bulkSet(data)](#module%5FRTKStore+bulkSet) ⇒ `Promise.<void>`
  * [.update(key, value, \[sync\])](#module%5FRTKStore+update) ⇒ `Promise.<void>`
  * [.delete(key, \[sync\], \[emit\])](#module%5FRTKStore+delete) ⇒ `Promise.<void>`
  * [.bulkDelete(data)](#module%5FRTKStore+bulkDelete) ⇒ `Promise.<void>`
  * [.get(key)](#module%5FRTKStore+get) ⇒ `any`
  * [.getAll()](#module%5FRTKStore+getAll) ⇒ `RTKStoreData`
  * [.clear()](#module%5FRTKStore+clear)
  * [.updateRateLimits(num, period)](#module%5FRTKStore+updateRateLimits)
  * [.updateBulkRateLimits(num, period)](#module%5FRTKStore+updateBulkRateLimits)
  * [.subscribe(key, cb)](#module%5FRTKStore+subscribe) ⇒ `void`
  * [.unsubscribe(key, \[cb\])](#module%5FRTKStore+unsubscribe) ⇒ `void`
  * [.populate(data)](#module%5FRTKStore+populate)

### store.set(key, value, \[sync\], \[emit\]) ⇒ `Promise.<void>`

Sets a value in the store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `Promise.<void>` \- A promise.

| Param    | Type    | Default | Description                             |
| -------- | ------- | ------- | --------------------------------------- |
| key      | string  |         | Unique identifier used to store value.  |
| value    | any     |         | Data to be set.                         |
| \[sync\] | boolean | true    | Whether to sync change to remote store. |
| \[emit\] | boolean | false   | Whether to emit to local subscribers.   |

### store.bulkSet(data) ⇒ `Promise.<void>`

Sets multiple values in the store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `Promise.<void>` \- A promise.

| Param | Type                                |
| ----- | ----------------------------------- |
| data  | Array.<{key: string, payload: any}> |

### store.update(key, value, \[sync\]) ⇒ `Promise.<void>`

Updates an already existing value in the store. If the value stored is `['a', 'b']`, the operation `store.update(key, ['c'])` will modify the value to `['a','b','c']`.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `Promise.<void>` \- A promise.

| Param    | Type    | Default | Description                             |
| -------- | ------- | ------- | --------------------------------------- |
| key      | string  |         | Unique identifier used to store value.  |
| value    | any     |         | Data to be updated.                     |
| \[sync\] | boolean | true    | Whether to sync change to remote store. |

### store.delete(key, \[sync\], \[emit\]) ⇒ `Promise.<void>`

Deletes a key value pair form the store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `Promise.<void>` \- A promise.

| Param    | Type    | Default | Description                             |
| -------- | ------- | ------- | --------------------------------------- |
| key      | string  |         | Unique identifier used to store value.  |
| \[sync\] | boolean | true    | Whether to sync change to remote store. |
| \[emit\] | boolean | false   | Whether to emit to local subscribers.   |

### store.bulkDelete(data) ⇒ `Promise.<void>`

Deletes multiple values from the store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `Promise.<void>` \- A promise.

| Param | Type                  |
| ----- | --------------------- |
| data  | Array.<{key: string}> |

### store.get(key) ⇒ `any`

Returns value for the given key.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `any` \- Value for the given key.

| Param | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| key   | string | Unique identifier used to store value. |

### store.getAll() ⇒ `RTKStoreData`

Returns the entire store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `RTKStoreData` \- An instance of RTKStoreData.

### store.clear()

Clears all data in the store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)

### store.updateRateLimits(num, period)

**Kind**: instance method of [RTKStore](#module%5FRTKStore)

| Param  | Type   |
| ------ | ------ |
| num    | number |
| period | number |

### store.updateBulkRateLimits(num, period)

**Kind**: instance method of [RTKStore](#module%5FRTKStore)

| Param  | Type   |
| ------ | ------ |
| num    | number |
| period | number |

### store.subscribe(key, cb) ⇒ `void`

Listens for data change on a store key.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `void` \- void

| Param | Type     | Description                                                     |
| ----- | -------- | --------------------------------------------------------------- |
| key   | string   | Unique identifier used to store value.                          |
| cb    | function | The callback function that gets executed when data is modified. |

### store.unsubscribe(key, \[cb\]) ⇒ `void`

Removes all listeners for a key on the store.

**Kind**: instance method of [RTKStore](#module%5FRTKStore)
**Returns**: `void` \- void

| Param  | Type     | Description                            |
| ------ | -------- | -------------------------------------- |
| key    | string   | Unique identifier used to store value. |
| \[cb\] | function | Callback to be removed.                |

### store.populate(data)

**Kind**: instance method of [RTKStore](#module%5FRTKStore)

| Param | Type         |
| ----- | ------------ |
| data  | RTKStoreData |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstore/#page","headline":"RTKStore · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstore/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
