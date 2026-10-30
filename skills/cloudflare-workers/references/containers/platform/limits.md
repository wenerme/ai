---
description: Available Container instance types and limits for memory, vCPU, disk, image storage, and snapshots.
title: Limits and Instance Types
image: https://developers.cloudflare.com/containers/platform/limits/og.png?v=976edb39343c58ee
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits and Instance Types

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/platform/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

All instance size maximums and account limits on this page are defaults and can be increased. To request higher limits, contact your account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

## Instance Types

The memory, vCPU, and disk space for Containers are set through instance types. You can use one of six predefined instance types or configure a [custom instance type](#custom-instance-types).

| Instance Type | vCPU | Memory | Disk |
| --- | --- | --- | --- |
| lite | 1/16 | 256 MiB | 2 GB |
| basic | 1/4 | 1 GiB | 4 GB |
| standard-1 | 1/2 | 4 GiB | 8 GB |
| standard-2 | 1 | 6 GiB | 12 GB |
| standard-3 | 2 | 8 GiB | 16 GB |
| standard-4 | 4 | 12 GiB | 20 GB |

For an application that uses the [`default` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/), specify the size with the [`instance_type` property](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) in your Worker's Wrangler configuration file. For the `durable_object` policy, pass the named size to `ctx.container.start()` with the runtime `instance` property.

Note

The `dev` and `standard` instance types are preserved for backward compatibility and are aliases for `lite` and `standard-1`, respectively.

### Custom Instance Types

In addition to the predefined instance types, you can configure custom instance types. Field names depend on where you configure the size. Wrangler configuration for the `default` policy uses `vcpu`, `memory_mib`, and `disk_mb`. A `ctx.container.start()` call for the `durable_object` policy uses `vcpu`, `memoryMib`, and `diskMb`.

Refer to the [Wrangler configuration documentation](https://developers.cloudflare.com/workers/wrangler/configuration/#custom-instance-types) or [scheduling policy documentation](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#choose-an-instance-size-at-runtime) for examples.

Custom instance types have the following constraints:

| Resource | Limit |
| --- | --- |
| Minimum vCPU | 1 |
| Maximum vCPU | 4 |
| Maximum Memory | 12 GiB |
| Maximum Disk | 20 GB |
| Memory to vCPU ratio | Minimum 3 GiB memory per vCPU |

For workloads requiring less than 1 vCPU, use the predefined instance types such as `lite` or `basic`.

## Account limits

The following limits apply per account:

| Resource | Limit |
| --- | --- |
| Concurrent memory | 6 TiB |
| Concurrent vCPU | 1,500 |
| Concurrent disk | 30 TB |
| Image size | Same as [instance disk space](#instance-types) |
| Total image storage per account | 50 GB <sup>[1](#user-content-fn-1)</sup> |

## Outbound HTTP request body size

Cloudflare limits each HTTP request body forwarded from a Container to an external service through an [outbound handler](https://developers.cloudflare.com/containers/configuration/outbound-traffic/) to **100 MiB by default**.

| Limit | Default |
| --- | --- |
| Outbound HTTP request body size | 100 MiB (104,857,600 bytes) |

This limit applies to each request body, including encoding and multipart form fields. It does not limit the total size of a file uploaded through separate requests. The destination service can impose additional limits.

The **Maximum Upload Size** setting for your application's custom domain does not control this limit. A larger upload accepted by your domain can still be rejected when your Container or Durable Object sends it to another service.

For larger uploads, use the destination's multipart or resumable upload API. Keep each request body below the limit. If you already use multipart uploads, reduce the part size. Streaming, HTTP chunked transfer encoding, and `multipart/form-data` do not bypass the limit on a single request body.

To request a higher outbound limit, contact your account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/). Specify that the request concerns outbound HTTP uploads from Containers or Durable Objects. Increases are subject to review.

Include the following information:

- The account ID and Worker name for the affected workload.
- The Container instance ID or Durable Object namespace and ID.
- The destination hostname.
- The failing request body size in bytes and the requested limit.
- The failure timestamp, relevant error logs, and a minimal reproduction.

For upload failures, refer to [Troubleshoot outbound uploads](https://developers.cloudflare.com/containers/configuration/outbound-traffic/#troubleshoot-outbound-uploads).

## Snapshot limits

The following limits apply to [Container snapshots](https://developers.cloudflare.com/containers/guides/snapshots/):

| Resource | Limit |
| --- | --- |
| Maximum snapshot size | 20 GB |
| Snapshot retention | 30 days from creation or the most recent restore |

Restoring a snapshot refreshes its 30-day time-to-live.

## Footnotes

1. Delete container images with `wrangler containers delete` to free up space. If you delete a container image and then [roll back](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) your Worker to a previous version, this version may no longer work. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform/limits/#page","headline":"Limits and Instance Types","description":"Available Container instance types and limits for memory, vCPU, disk, image storage, and snapshots.","url":"https://developers.cloudflare.com/containers/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/platform/limits/og.png?v=976edb39343c58ee","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
