---
description: Replace Container class lifecycle and routing helpers with direct container control inside a Durable Object.
title: Migrate from the Container class to the Durable Object Container API
image: https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/og.png?v=3000f6da75d6e8fa
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from the Container class to the Durable Object Container API

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `@cloudflare/containers` package is deprecated. Its `Container` class wraps the [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/) with lifecycle and routing helpers. Replace these helpers with application code that uses `this.ctx.container` inside a Durable Object.

You can migrate the implementation without replacing the Durable Object. Keep the Worker name, exported class name, binding, container image, and existing migration tags unchanged. Changing the TypeScript base class does not require a new Durable Object migration.

## Map Container class helpers

Before changing code, identify which helpers your application uses. Some helpers require application code to preserve their existing behavior.

| `Container` class | Durable Object Container API |
| --- | --- |
| `start()`, `stop()`, and `destroy()` | [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start), [`signal()`](https://developers.cloudflare.com/containers/api/durable-object-container/#signal), and [`destroy()`](https://developers.cloudflare.com/containers/api/durable-object-container/#destroy) |
| `defaultPort`, `fetch()`, and `containerFetch()` | [`getTcpPort(port).fetch()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) and your own request routing |
| `startAndWaitForPorts()` and `waitForPort()` | A readiness check with [`getTcpPort()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) in application code |
| Concurrent start handling | One shared startup promise in the Durable Object |
| `envVars` and `entrypoint` | The `env` and `entrypoint` options of [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start) |
| `sleepAfter` and `onActivityExpired()` | [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout) |
| `onStart()`, `onStop()`, and `onError()` | Application code around [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start) and [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor) |
| `schedule()` | [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) |
| `enableInternet` | The `enableInternet` option of [`start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start). The `Container` class allows Internet access by default. `start()` does not. Pass `enableInternet: true` to keep the old behavior. |
| `outbound`, `outboundByHost`, `allowedHosts`, `deniedHosts`, and `interceptHttps` | [`interceptOutboundHttp()`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttp), [`interceptAllOutboundHttp()`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptalloutboundhttp), and [`interceptOutboundHttps()`](https://developers.cloudflare.com/containers/api/durable-object-container/#interceptoutboundhttps) with a `WorkerEntrypoint`. Refer to [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/). |
| `getContainer(binding, name)` | [`binding.getByName(name)`](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname). Without a name, `getContainer(binding)` used the name `cf-singleton-container`. |
| `getRandom(binding, count)` | ``binding.getByName(`instance-${Math.floor(Math.random() * count)}`)``. Keep the `instance-` prefix to reach the same Durable Objects. Refer to [Scaling and routing](https://developers.cloudflare.com/containers/configuration/scaling-and-routing/). |

## Replace Container class helpers

1. In your Worker, change the class to extend `DurableObject` from `cloudflare:workers`. Keep the exported class name to retain its existing container definition and Durable Object binding. Do not add a new Durable Object migration solely because you changed the base class. Refer to [Wrangler configuration](https://developers.cloudflare.com/containers/configuration/wrangler/).
2. Replace `start()` calls with [`ctx.container.start()`](https://developers.cloudflare.com/containers/api/durable-object-container/#start). Pass `enableInternet: true` if the container needs Internet access. Replace `stop()` calls with [`signal()`](https://developers.cloudflare.com/containers/api/durable-object-container/#signal) or [`destroy()`](https://developers.cloudflare.com/containers/api/durable-object-container/#destroy), as appropriate. Do not assume `start()` waits for a port to become ready.
3. Replace `defaultPort`, `containerFetch()`, and automatic `fetch()` routing with [`getTcpPort(port).fetch()`](https://developers.cloudflare.com/containers/api/durable-object-container/#gettcpport) and your own request routing. Check port readiness before forwarding requests. For a complete example, refer to [Stateless instances](https://developers.cloudflare.com/containers/examples/stateless/).
4. Replace `sleepAfter` with [`setInactivityTimeout()`](https://developers.cloudflare.com/containers/api/durable-object-container/#setinactivitytimeout). Replace lifecycle hooks and `schedule()` with application code, [`monitor()`](https://developers.cloudflare.com/containers/api/durable-object-container/#monitor), and [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) where appropriate. For an example, refer to [Status hooks](https://developers.cloudflare.com/containers/examples/status-hooks/).
5. Replace outbound properties and handlers with intercepts that you register each time the container starts. Refer to [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/).
6. Replace `getContainer()` and `getRandom()` with [`getByName()`](https://developers.cloudflare.com/durable-objects/api/namespace/#getbyname) on the Durable Object namespace. Use the same names, so that requests reach the existing Durable Objects and their storage.
7. Test startup, concurrent requests, readiness, idle shutdown, alarm delivery, storage continuity, and recovery after a container restart. A container can be temporarily unavailable after `signal()` or `destroy()`. Retry allocation before checking port readiness. Then remove the `ContainerProxy` export and any other imports of `@cloudflare/containers`, and remove the package from your dependencies.

Keep the same image in the `containers` section of your Wrangler configuration unless you intend to change the container application itself. The direct API still runs the image associated with its Durable Object class.

For process handling and output, refer to [Execute commands](https://developers.cloudflare.com/containers/guides/execute-commands/) and the [`exec()` reference](https://developers.cloudflare.com/containers/api/durable-object-container/#exec).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/#page","headline":"Migrate from the Container class to the Durable Object Container API","description":"Replace Container class lifecycle and routing helpers with direct container control inside a Durable Object.","url":"https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-container-api/og.png?v=3000f6da75d6e8fa","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
