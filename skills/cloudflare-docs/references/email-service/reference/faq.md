---
title: FAQ
description: Common questions about Email Service limits, sender reputation, marketing email support, and abuse reporting.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/reference/faq.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# FAQ

Common questions about Cloudflare Email Service.

## Limits and Usage

Sending limits exist to prevent abuse and spam and to ensure high deliverability for all users. If you need higher limits, you can request a limit increase by contacting support or reaching out in the [Cloudflare Developers Discord ↗](https://discord.cloudflare.com). If you exceed your limits, emails may be queued or rejected, and you will receive error responses with rate limit information.

### What is sender reputation?

Sender reputation refers to how much inbox providers trust you to send good email to their users and not spam or scam. It is influenced by factors such as your email authentication setup, bounce and complaint rates, sending volume patterns, recipient engagement, and domain and IP history.

### Can I use this for marketing emails?

Email Service is intended only for transactional emails. We plan to support marketing emails and bulk sender tooling in the future.

### Where can I report abuse or spam?

Report abuse to: [abuse@cloudflare.com](mailto:abuse@cloudflare.com)

Include:

* Full email headers
* Description of the issue
* Any relevant account information

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/reference/faq/","name":"FAQ"}}]}
```
