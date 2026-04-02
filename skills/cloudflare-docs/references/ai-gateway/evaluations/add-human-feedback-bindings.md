---
title: Add human feedback using Worker Bindings
description: This guide explains how to provide human feedback for AI Gateway evaluations using Worker bindings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/evaluations/add-human-feedback-bindings.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Add human feedback using Worker Bindings

This guide explains how to provide human feedback for AI Gateway evaluations using Worker bindings.

## 1\. Run an AI Evaluation

Start by sending a prompt to the AI model through your AI Gateway.

JavaScript

```

const resp = await env.AI.run(

  "@cf/meta/llama-3.1-8b-instruct",

  {

    prompt: "tell me a joke",

  },

  {

    gateway: {

      id: "my-gateway",

    },

  },

);


const myLogId = env.AI.aiGatewayLogId;


```

Let the user interact with or evaluate the AI response. This interaction will inform the feedback you send back to the AI Gateway.

## 2\. Send Human Feedback

Use the [patchLog()](https://developers.cloudflare.com/ai-gateway/integrations/worker-binding-methods/#31-patchlog-send-feedback) method to provide feedback for the AI evaluation.

JavaScript

```

await env.AI.gateway("my-gateway").patchLog(myLogId, {

  feedback: 1, // all fields are optional; set values that fit your use case

  score: 100,

  metadata: {

    user: "123", // Optional metadata to provide additional context

  },

});


```

## Feedback parameters explanation

* `feedback`: is either `-1` for negative or `1` to positive, `0` is considered not evaluated.
* `score`: A number between 0 and 100.
* `metadata`: An object containing additional contextual information.

### patchLog: Send Feedback

The `patchLog` method allows you to send feedback, score, and metadata for a specific log ID. All object properties are optional, so you can include any combination of the parameters:

JavaScript

```

gateway.patchLog("my-log-id", {

  feedback: 1,

  score: 100,

  metadata: {

    user: "123",

  },

});


```

Returns: `Promise<void>` (Make sure to `await` the request.)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/evaluations/","name":"Evaluations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/evaluations/add-human-feedback-bindings/","name":"Add human feedback using Worker Bindings"}}]}
```
