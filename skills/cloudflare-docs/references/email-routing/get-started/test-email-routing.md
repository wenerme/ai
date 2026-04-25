---
title: Test Email Routing
description: Verify that your Email Routing configuration is working by sending a test email to your custom address.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Test Email Routing

To test that your configuration is working properly, send an email to the custom address [you set up in the dashboard](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/). You should send your test email from a different address than the one you specified as the destination address.

For example, if you set up `your-name@gmail.com` as the destination address, do not send your test email from that same email account. Send a test email to that destination address from another email account (for example, `your-name@outlook.com`).

The reason for this is that some email providers will discard what they interpret as an incoming duplicate email and will not show it in your inbox, making it seem like Email Routing is not working properly.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/get-started/test-email-routing/","name":"Test Email Routing"}}]}
```
