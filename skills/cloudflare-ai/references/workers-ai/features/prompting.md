---
description: Structure prompts for Workers AI text generation models using system, user, and assistant message roles.
title: Prompting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Prompting

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/features/prompting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Part of getting good results from text generation models is asking questions correctly. LLMs are usually trained with specific predefined templates, which should then be used with the model's tokenizer for better results when doing inference tasks.

There are two ways to prompt text generation models with Workers AI:

Important

We recommend using unscoped prompts for inference with LoRA.

### Scoped Prompts

This is the **recommended** method. With scoped prompts, Workers AI takes the burden of knowing and using different chat templates for different models and provides a unified interface to developers when building prompts and creating text generation tasks.

Scoped prompts are a list of messages. Each message defines two keys: the role and the content.

Typically, the role can be one of three options:

* **system** \- System messages define the AI's personality. You can use them to set rules and how you expect the AI to behave.
* **user** \- User messages are where you actually query the AI by providing a question or a conversation.
* **assistant** \- Assistant messages hint to the AI about the desired output format. Not all models support this role.

OpenAI has a [good explanation ↗](https://platform.openai.com/docs/guides/text-generation#messages-and-roles) of how they use these roles with their GPT models. Even though chat templates are flexible, other text generation models tend to follow the same conventions.

Here's an input example of a scoped prompt using system and user roles:

```js
{
  messages: [
    { role: "system", content: "you are a very funny comedian and you like emojis" },
    { role: "user", content: "tell me a joke about cloudflare" },
  ],
};
```

Here's a better example of a chat session using multiple iterations between the user and the assistant.

```js
{
  messages: [
    { role: "system", content: "you are a professional computer science assistant" },
    { role: "user", content: "what is WASM?" },
    { role: "assistant", content: "WASM (WebAssembly) is a binary instruction format that is designed to be a platform-agnostic" },
    { role: "user", content: "does Python compile to WASM?" },
    { role: "assistant", content: "No, Python does not directly compile to WebAssembly" },
    { role: "user", content: "what about Rust?" },
  ],
};
```

Note that different LLMs are trained with different templates for different use cases. While Workers AI tries its best to abstract the specifics of each LLM template from the developer through a unified API, you should always refer to the model documentation for details. For example, instruct models like Codellama are fine-tuned to respond to a user-provided instruction, while chat models expect fragments of dialogs as input.

### Unscoped Prompts

You can use unscoped prompts to send a single question to the model without worrying about providing any context. Workers AI will automatically convert your `prompt` input to a reasonable default scoped prompt internally so that you get the best possible prediction.

```js
{
  prompt: "tell me a joke about cloudflare";
}
```

You can also use unscoped prompts to construct the model chat template manually. In this case, you can use the raw parameter. Here's an input example of a [Mistral ↗](https://docs.mistral.ai/models/#chat-template) chat template prompt:

```js
{
  prompt: "<s>[INST]comedian[/INST]</s>
[INST]tell me a joke about cloudflare[/INST]",
  raw: true
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/prompting/#page","headline":"Prompting · Cloudflare Workers AI docs","description":"Structure prompts for Workers AI text generation models using system, user, and assistant message roles.","url":"https://developers.cloudflare.com/workers-ai/features/prompting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
