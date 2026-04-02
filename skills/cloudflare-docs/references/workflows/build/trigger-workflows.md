---
title: Trigger Workflows
description: You can trigger Workflows both programmatically and via the Workflows APIs, including:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Bindings ](https://developers.cloudflare.com/search/?tags=Bindings) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workflows/build/trigger-workflows.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Trigger Workflows

You can trigger Workflows both programmatically and via the Workflows APIs, including:

1. With [Workers](https://developers.cloudflare.com/workers) via HTTP requests in a `fetch` handler, or bindings from a `queue` or `scheduled` handler
2. Using the [Workflows REST API](https://developers.cloudflare.com/api/resources/workflows/methods/list/)
3. Via the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/commands/workflows/#workflows) in your terminal

## Workers API (Bindings)

You can interact with Workflows programmatically from any Worker script by creating a binding to a Workflow. A Worker can bind to multiple Workflows, including Workflows defined in other Workers projects (scripts) within your account.

You can interact with a Workflow:

* Directly over HTTP via the [fetch](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) handler
* From a [Queue consumer](https://developers.cloudflare.com/queues/configuration/javascript-apis/#consumer) inside a `queue` handler
* From a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) inside a `scheduled` handler
* Within a [Durable Object](https://developers.cloudflare.com/durable-objects/)

Note

New to Workflows? Start with the [Workflows tutorial](https://developers.cloudflare.com/workflows/get-started/guide/) to deploy your first Workflow and familiarize yourself with Workflows concepts.

To bind to a Workflow from your Workers code, you need to define a [binding](https://developers.cloudflare.com/workers/wrangler/configuration/) to a specific Workflow. For example, to bind to the Workflow defined in the [get started guide](https://developers.cloudflare.com/workflows/get-started/guide/), you would configure the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the below:

* [  wrangler.jsonc ](#tab-panel-8554)
* [  wrangler.toml ](#tab-panel-8555)

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "workflows-tutorial",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-04-02",

  "workflows": [

    {

      // The name of the Workflow

      "name": "workflows-tutorial",

      // The binding name, which must be a valid JavaScript variable name.  This will

      // be how you call (run) your Workflow from your other Workers handlers or

      // scripts.

      "binding": "MY_WORKFLOW",

      // Must match the class defined in your code that extends the Workflow class

      "class_name": "MyWorkflow"

    }

  ]

}


```

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "workflows-tutorial"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-04-02"


[[workflows]]

name = "workflows-tutorial"

binding = "MY_WORKFLOW"

class_name = "MyWorkflow"


```

The `binding = "MY_WORKFLOW"` line defines the JavaScript variable that our Workflow methods are accessible on, including `create` (which triggers a new instance) or `get` (which returns the status of an existing instance).

The following example shows how you can manage Workflows from within a Worker, including:

* Retrieving the status of an existing Workflow instance by its ID
* Creating (triggering) a new Workflow instance
* Returning the status of a given instance ID

src/index.ts

```

interface Env {

  MY_WORKFLOW: Workflow;

}


export default {

  async fetch(req: Request, env: Env) {

    // Get instanceId from query parameters

    const instanceId = new URL(req.url).searchParams.get("instanceId");


    // If an ?instanceId=<id> query parameter is provided, fetch the status

    // of an existing Workflow by its ID.

    if (instanceId) {

      let instance = await env.MY_WORKFLOW.get(instanceId);

      return Response.json({

        status: await instance.status(),

      });

    }


    // Else, create a new instance of our Workflow, passing in any (optional)

    // params and return the ID.

    const newId = crypto.randomUUID();

    let instance = await env.MY_WORKFLOW.create({ id: newId });

    return Response.json({

      id: instance.id,

      details: await instance.status(),

    });

  },

};


```

### Inspect a Workflow's status

You can inspect the status of any running Workflow instance by calling `status` against a specific instance ID. This allows you to programmatically inspect whether an instance is queued (waiting to be scheduled), actively running, paused, or errored.

TypeScript

```

let instance = await env.MY_WORKFLOW.get("abc-123");

let status = await instance.status(); // Returns an InstanceStatus


```

The possible values of status are as follows:

TypeScript

```

  status:

    | "queued" // means that instance is waiting to be started (see concurrency limits)

    | "running"

    | "paused"

    | "errored"

    | "terminated" // user terminated the instance while it was running

    | "complete"

    | "waiting" // instance is hibernating and waiting for sleep or event to finish

    | "waitingForPause" // instance is finishing the current work to pause

    | "unknown";

  error?: {

    name: string,

    message: string

  };

  output?: unknown;


```

### Explicitly pause a Workflow

You can explicitly pause a Workflow instance (and later resume it) by calling `pause` against a specific instance ID.

TypeScript

```

let instance = await env.MY_WORKFLOW.get("abc-123");

await instance.pause(); // Returns Promise<void>


```

### Resume a Workflow

You can resume a paused Workflow instance by calling `resume` against a specific instance ID.

TypeScript

```

let instance = await env.MY_WORKFLOW.get("abc-123");

await instance.resume(); // Returns Promise<void>


```

Calling `resume` on an instance that is not currently paused will have no effect.

Warning

If you have reached the maximum concurrent instances for your Workflow, resuming an instance may not restart it immediately. The instance will be queued until a concurrency slot becomes available.

### Stop a Workflow

You can stop/terminate a Workflow instance by calling `terminate` against a specific instance ID.

TypeScript

```

let instance = await env.MY_WORKFLOW.get("abc-123");

await instance.terminate(); // Returns Promise<void>


```

Once stopped/terminated, the Workflow instance _cannot_ be resumed.

### Restart a Workflow

TypeScript

```

let instance = await env.MY_WORKFLOW.get("abc-123");

await instance.restart(); // Returns Promise<void>


```

Restarting an instance will immediately cancel any in-progress steps, erase any intermediate state, and treat the Workflow as if it was run for the first time.

### Trigger a Workflow from another Workflow

You can create a new Workflow instance from within a step of another Workflow. The parent Workflow will not block waiting for the child Workflow to complete — it continues execution immediately after the child instance is successfully created.

* [  JavaScript ](#tab-panel-8556)
* [  TypeScript ](#tab-panel-8557)

JavaScript

```

export class ParentWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    // Perform initial work

    const result = await step.do("initial processing", async () => {

      // ... processing logic

      return { fileKey: "output.pdf" };

    });


    // Trigger a child workflow for additional processing

    const childInstance = await step.do("trigger child workflow", async () => {

      return await this.env.CHILD_WORKFLOW.create({

        id: `child-${event.instanceId}`,

        params: { fileKey: result.fileKey },

      });

    });


    // Parent continues immediately - not blocked by child workflow

    await step.do("continue with other work", async () => {

      console.log(`Started child workflow: ${childInstance.id}`);

      // This runs right away, regardless of child workflow status

    });

  }

}


```

TypeScript

```

export class ParentWorkflow extends WorkflowEntrypoint<Env, Params> {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    // Perform initial work

    const result = await step.do("initial processing", async () => {

      // ... processing logic

      return { fileKey: "output.pdf" };

    });


    // Trigger a child workflow for additional processing

    const childInstance = await step.do("trigger child workflow", async () => {

      return await this.env.CHILD_WORKFLOW.create({

        id: `child-${event.instanceId}`,

        params: { fileKey: result.fileKey },

      });

    });


    // Parent continues immediately - not blocked by child workflow

    await step.do("continue with other work", async () => {

      console.log(`Started child workflow: ${childInstance.id}`);

      // This runs right away, regardless of child workflow status

    });

  }

}


```

If the child Workflow fails to start, the step will fail and be retried according to your retry configuration. Once the child instance is successfully created, it runs independently from the parent.

## REST API (HTTP)

Refer to the [Workflows REST API documentation](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/methods/create/).

## Command line (CLI)

Refer to the [CLI quick start](https://developers.cloudflare.com/workflows/get-started/guide/) to learn more about how to manage and trigger Workflows via the command-line.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/build/","name":"Build with Workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/build/trigger-workflows/","name":"Trigger Workflows"}}]}
```
