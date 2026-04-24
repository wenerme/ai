---
title: Vite plugin
description: A full-featured integration between Vite and the Workers runtime
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/vite-plugin/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Vite plugin

The Cloudflare Vite plugin enables a full-featured integration between [Vite ↗](https://vite.dev/) and the [Workers runtime](https://developers.cloudflare.com/workers/runtime-apis/). Your Worker code runs inside [workerd ↗](https://github.com/cloudflare/workerd), matching the production behavior as closely as possible and providing confidence as you develop and deploy your applications.

## Features

* Uses the Vite [Environment API ↗](https://vite.dev/guide/api-environment) to integrate Vite with the Workers runtime
* Provides direct access to [Workers runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/) and [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/)
* Builds your front-end assets for deployment to Cloudflare, enabling you to build static sites, SPAs, and full-stack applications
* Official support for [TanStack Start ↗](https://tanstack.com/start/) and [React Router v7 ↗](https://reactrouter.com/) with server-side rendering
* Leverages Vite's hot module replacement for consistently fast updates
* Supports `vite preview` for previewing your build output in the Workers runtime prior to deployment

## Use cases

* [TanStack Start ↗](https://tanstack.com/start/)
* [React Router v7 ↗](https://reactrouter.com/)
* Static sites, such as single-page applications, with or without an integrated backend API
* Standalone Workers
* Multi-Worker applications

## Get started

To create a new application from a ready-to-go template, refer to the [TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/), [React Router](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/), [React](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/) or [Vue](https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/) framework guides.

To create a standalone Worker from scratch, refer to [Get started](https://developers.cloudflare.com/workers/vite-plugin/get-started/).

For a more in-depth look at adapting an existing Vite project and an introduction to key concepts, refer to the [Tutorial](https://developers.cloudflare.com/workers/vite-plugin/tutorial/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}}]}
```
