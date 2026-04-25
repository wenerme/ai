---
title: Cloudflare Email Routing
description: Create custom email addresses for your domain and route incoming emails to your preferred mailbox.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Cloudflare Email Routing

Create custom email addresses for your domain and route incoming emails to your preferred mailbox.

Email Routing is now part of Email Service

Email Routing is now integrated into [Cloudflare Email Service](https://developers.cloudflare.com/email-service/), a complete email product suite. Email Service provides all the routing capabilities you already use, as well as the ability to send emails from Workers or external servers using a REST API.

For new projects, refer to the [Email Service documentation](https://developers.cloudflare.com/email-service/). Existing Email Routing configurations continue to work without changes.

 Available on all plans 

Cloudflare Email Routing is designed to simplify the way you create and manage email addresses, without needing to keep an eye on additional mailboxes. With Email Routing, you can create any number of custom email addresses to use in situations where you do not want to share your primary email address, such as when you subscribe to a new service or newsletter. Emails are then routed to your preferred email inbox, without you ever having to expose your primary email address.

Email Routing is free and private by design. Cloudflare will not store or access the emails routed to your inbox.

It is available to all Cloudflare customers [using Cloudflare as an authoritative nameserver](https://developers.cloudflare.com/dns/zone-setups/full-setup/), meaning Cloudflare manages your domain's DNS records.

---

## Features

###  Email Workers 

Process incoming emails with code using Cloudflare Workers. Filter by sender, auto-reply, forward based on content, or build any custom logic you need.

[ Use Email Workers ](https://developers.cloudflare.com/email-routing/email-workers/) 

###  Custom addresses 

Create separate email addresses for different purposes, such as shopping, newsletters, or work contacts, all forwarding to a single inbox.

[ Use Custom addresses ](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/) 

###  Analytics 

Email Routing includes metrics to help you check on your email traffic history.

[ Use Analytics ](https://developers.cloudflare.com/email-routing/get-started/email-routing-analytics/) 

---

## Related products

**[Email security](https://developers.cloudflare.com/cloudflare-one/email-security/)** 

Cloudflare Email security is a cloud based service that stops phishing attacks, the biggest cybersecurity threat, across all traffic vectors - email, web and network.

**[DNS](https://developers.cloudflare.com/dns/)** 

Email Routing is available to customers using Cloudflare as an authoritative nameserver.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}}]}
```
