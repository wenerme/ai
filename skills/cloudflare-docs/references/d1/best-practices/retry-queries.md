---
title: Retry queries
description: It is useful to retry write queries from your application when you encounter a transient error. From the list of D1_ERRORs, refer to the Recommended action column to determine if a query should be retried.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/d1/best-practices/retry-queries.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Retry queries

It is useful to retry write queries from your application when you encounter a transient [error](https://developers.cloudflare.com/d1/observability/debug-d1/#error-list). From the list of `D1_ERROR`s, refer to the Recommended action column to determine if a query should be retried.

Note

D1 automatically retries read-only queries up to two more times when it encounters a retryable error.

## Example of retrying queries

Consider the following example of a `shouldRetry(...)` function, taken from the [D1 read replication starter template ↗](https://github.com/cloudflare/templates/blob/main/d1-starter-sessions-api-template/src/index.ts#L108).

You should make sure your retries apply an exponential backoff with jitter strategy for more successful retries. You can use libraries abstracting that already like [@cloudflare/actors ↗](https://github.com/cloudflare/actors), or [copy the retry logic ↗](https://github.com/cloudflare/actors/blob/9ba112503132ddf6b5cef37ff145e7a2dd5ffbfc/packages/core/src/retries.ts#L18) in your own code directly.

TypeScript

```

import { tryWhile } from "@cloudflare/actors";


function queryD1Example(d1: D1Database, sql: string) {

  return await tryWhile(async () => {

    return await d1.prepare(sql).run();

  }, shouldRetry);

}


function shouldRetry(err: unknown, nextAttempt: number) {

  const errMsg = String(err);

  const isRetryableError =

    errMsg.includes("Network connection lost") ||

    errMsg.includes("storage caused object to be reset") ||

    errMsg.includes("reset because its code was updated");

  if (nextAttempt <= 5 && isRetryableError) {

    return true;

  }

  return false;

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/best-practices/","name":"Best practices"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/best-practices/retry-queries/","name":"Retry queries"}}]}
```
