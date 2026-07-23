---
description: Review how to troubleshoot issues such as certificate timeouts when using Cloudflare Universal SSL.
title: Troubleshooting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/troubleshooting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Resolve a timed out state

If a certificate issuance times out, Cloudflare tells you where in the chain of issuance the timeout occurred: Initializing, Validation, Issuance, Deployment, or Deletion.

To resolve timeout issues, try one or more of the following options:

* Change the **Proxy status** of related DNS records to **DNS only** (gray-clouded) and wait at least a minute. Then, change the **Proxy status** back to **Proxied** (orange-clouded).
* [Disable Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/disable-universal-ssl/) and wait at least a minute. Then, re-enable Universal SSL.
* Send a PATCH request to the [validation endpoint](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/edit/) using the same [DCV method](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) (API only). Make sure that the `--data` field is not empty in your request.
* Review your domain control validation (DCV). Changing the DCV method will restart certificate issuance.

## Delete certificates

You can [use the API](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/delete/) to delete certificates that you no longer want listed on the Cloudflare dashboard.

## Other issues

For additional troubleshooting help, refer to [Troubleshooting SSL errors](https://developers.cloudflare.com/ssl/troubleshooting/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/troubleshooting/#page","headline":"Troubleshooting Universal SSL · Cloudflare SSL/TLS docs","description":"Review how to troubleshoot issues such as certificate timeouts when using Cloudflare Universal SSL.","url":"https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
