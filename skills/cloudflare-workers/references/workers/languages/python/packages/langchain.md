---
description: Use LangChain Python packages to build AI applications on Cloudflare Workers.
title: Langchain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Langchain

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/languages/python/packages/langchain/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[LangChain ↗](https://www.langchain.com/) is the most popular framework for building AI applications powered by large language models (LLMs).

LangChain publishes multiple Python packages. The following are provided by the Workers runtime:

* [langchain ↗](https://pypi.org/project/langchain/) (version `0.1.8`)
* [langchain-core ↗](https://pypi.org/project/langchain-core/) (version `0.1.25`)
* [langchain-openai ↗](https://pypi.org/project/langchain-openai/) (version `0.0.6`)

## Get Started

Clone the `cloudflare/python-workers-examples` repository and run the LangChain example:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd 05-langchain
uv run pywrangler dev
```

### Example code

```python
from workers import WorkerEntrypoint, Response
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        prompt = PromptTemplate.from_template("Complete the following sentence: I am a {profession} and ")
        llm = OpenAI(api_key=self.env.API_KEY)
        chain = prompt | llm

        res = await chain.ainvoke({"profession": "electrician"})
        return Response(res.split(".")[0].strip())
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/languages/python/packages/langchain/#page","headline":"Langchain · Cloudflare Workers docs","description":"Use LangChain Python packages to build AI applications on Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/languages/python/packages/langchain/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
