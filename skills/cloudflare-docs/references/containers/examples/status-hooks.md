---
title: Status Hooks
description: Execute Workers code in reaction to Container status changes
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/examples/status-hooks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Status Hooks

**Last reviewed:**  10 months ago 

Execute Workers code in reaction to Container status changes

When a Container starts, stops, becomes idle, and errors, it can trigger code execution in a Worker that has defined status hooks on the `Container` class. Refer to the [Container package docs ↗](https://github.com/cloudflare/containers/blob/main/README.md#lifecycle-hooks) for more details.

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 4000;

  sleepAfter = "5m";


  override onStart() {

    console.log("Container successfully started");

  }


  override onStop(stopParams) {

    if (stopParams.exitCode === 0) {

      console.log("Container stopped gracefully");

    } else {

      console.log("Container stopped with exit code:", stopParams.exitCode);

    }


    console.log("Container stop reason:", stopParams.reason);

  }


  override async onActivityExpired() {

    console.log("Container became idle, stopping it now");

    await this.stop();

  }


  override onError(error: string) {

    console.log("Container error:", error);

  }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/examples/status-hooks/","name":"Status Hooks"}}]}
```
