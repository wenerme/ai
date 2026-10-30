---
description: Route requests to an Agent with routeAgentRequest(), call it from a Worker with getAgentByName(), and pass props to onStart().
title: Routing
image: https://developers.cloudflare.com/agents/agent-class/routing/og.png?v=4f8fb7776b8e581c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Routing

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/agent-class/routing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Agents use the same routing as any Durable Object with the Lifecycle. `routeAgentRequest()` sends `/agents/:binding/:name` to the Agent named `:name`. For the URL shape, routing options, authentication, and custom routes, refer to [Routing](https://developers.cloudflare.com/agents/runtime/routing/). This page covers what the `Agent` class adds.

## Route requests

*src/index.jsjs*

```js
import { Agent, getAgentByName, routeAgentRequest } from "agents";

export class Counter extends Agent {
	initialState = { count: 0 };

	async increment() {
		this.setState({ count: this.state.count + 1 });
		return this.state.count;
	}
}

export default {
	async fetch(request, env) {
		if (new URL(request.url).pathname === "/api/increment") {
			const counter = await getAgentByName(env.Counter, "global");
			return Response.json({ count: await counter.increment() });
		}

		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

*src/index.tsts*

```ts
import { Agent, getAgentByName, routeAgentRequest } from "agents";

export class Counter extends Agent<Env, { count: number }> {
	initialState = { count: 0 };

	async increment(): Promise<number> {
		this.setState({ count: this.state.count + 1 });
		return this.state.count;
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (new URL(request.url).pathname === "/api/increment") {
			const counter = await getAgentByName(env.Counter, "global");
			return Response.json({ count: await counter.increment() });
		}

		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

A request to `/agents/counter/global` reaches the `Counter` Agent named `global`. Clients connect the same way with `useAgent({ agent: "Counter", name: "global" })`.

## Call an Agent from a Worker

`getAgentByName(namespace, name, options?)` returns a stub for RPC calls. Unlike `getByName()`, it starts the Agent before it returns, so its capabilities and `onStart()` are ready. It accepts `locationHint`, `jurisdiction`, `props`, and `routingRetry`.

## Props

Props pass values to `onStart(props)` when a request or call starts the Agent:

```js
import { Agent, getAgentByName } from "agents";

export class Profile extends Agent {
	#userId;

	onStart(props) {
		this.#userId = props?.userId;
	}
}

export async function openProfile(env, userId) {
	return getAgentByName(env.Profile, userId, { props: { userId } });
}
```

```ts
import { Agent, getAgentByName } from "agents";

type Props = { userId: string };

export class Profile extends Agent<Env> {
	#userId: string | undefined;

	onStart(props?: Props) {
		this.#userId = props?.userId;
	}
}

export async function openProfile(env: Env, userId: string) {
	return getAgentByName(env.Profile, userId, { props: { userId } });
}
```

Props only reach an Agent that is starting. `routeAgentRequest()` accepts the same `props` option, and passes them to whichever Agent the URL matches. For per-Agent values, use `getAgentByName()`.

## Sub-agent URLs

`buildAgentPath()` builds the path for an Agent and its [sub-agents](https://developers.cloudflare.com/agents/agent-class/sub-agents/), with a `/sub/` segment for each level. Inside an Agent, `this.selfPath` holds its own path:

```js
import { buildAgentPath } from "agents";

const path = buildAgentPath(
	[
		{ className: "Inbox", name: "alice" },
		{ className: "Chat", name: "chat-1" },
	],
	{ leafPath: "/callbacks/job" },
);
// /agents/inbox/alice/sub/chat/chat-1/callbacks/job
```

```ts
import { buildAgentPath } from "agents";

const path = buildAgentPath(
	[
		{ className: "Inbox", name: "alice" },
		{ className: "Chat", name: "chat-1" },
	],
	{ leafPath: "/callbacks/job" },
);
// /agents/inbox/alice/sub/chat/chat-1/callbacks/job
```

## Agent options

| Static option | Default | Description |
| --- | --- | --- |
| `sendIdentityOnConnect` | `true` | Set to `false` to keep the Agent's name out of the identity frame |
| `hibernate` | `true` | Set to `false` to keep the Agent in memory while clients are connected |

```ts
import { Agent } from "agents";

class SecureAgent extends Agent {
	static options = { sendIdentityOnConnect: false };
}
```

## Next steps

### [Routing](https://developers.cloudflare.com/agents/runtime/routing/)

URL shape, routing options, authentication, and custom routes.

### [Client SDK](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/client-sdk/)

Connect from browsers with useAgent and AgentClient.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/agent-class/routing/#page","headline":"Routing","description":"Route requests to an Agent with routeAgentRequest(), call it from a Worker with getAgentByName(), and pass props to onStart().","url":"https://developers.cloudflare.com/agents/agent-class/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/agent-class/routing/og.png?v=4f8fb7776b8e581c","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
