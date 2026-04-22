---
title: Limits
description: Email Routing limits for message size, rules, addresses, and Email Workers CPU and memory usage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-routing/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Limits

## Email Workers size limits

When you process emails with Email Workers on the [Workers Free plan](https://developers.cloudflare.com/workers/platform/pricing/), your Worker may exceed its CPU or memory allocation and fail with an error. This is more likely with large emails or complex processing logic. Refer to [Worker limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) for more information.

You can use the [log functionality for Workers](https://developers.cloudflare.com/workers/observability/logs/) to look for messages related to CPU limits (such as `EXCEEDED_CPU`) and troubleshoot any issues regarding allocation errors.

If you encounter these error messages frequently, consider upgrading to the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/) for higher usage limits.

## Message size

Currently, Email Routing does not support messages bigger than 25 MiB.

## Rules and addresses

Each rule maps one custom email address (like `info@yourdomain.com`) to one destination address or an [Email Worker](https://developers.cloudflare.com/email-routing/email-workers/).

| Feature                                                                                                           | Limit |
| ----------------------------------------------------------------------------------------------------------------- | ----- |
| [Rules](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/)                           | 200   |
| [Addresses](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/#destination-addresses) | 200   |

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/ukpeZVLWLnKeixDu7). If the limit can be increased, Cloudflare will contact you with next steps.

## Email Routing summary for emails sent through Workers

Emails sent through Workers will show up in the Email Routing summary page as dropped even if they were successfully delivered.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/limits/","name":"Limits"}}]}
```
