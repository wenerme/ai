---
title: Event subscriptions
description: Subscribe to Email Sending lifecycle events with Queues.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Event subscriptions

[Event subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/) allow you to receive messages when events occur across your Cloudflare account. Cloudflare products (e.g., [KV](https://developers.cloudflare.com/kv/), [Workers AI](https://developers.cloudflare.com/workers-ai/), [Workers](https://developers.cloudflare.com/workers/)) can publish structured events to a [queue](https://developers.cloudflare.com/queues/), which you can then consume with Workers or [HTTP pull consumers](https://developers.cloudflare.com/queues/configuration/pull-consumers/) to build custom workflows, integrations, or logic.

For more information on [Event Subscriptions](https://developers.cloudflare.com/queues/event-subscriptions/), refer to the [management guide](https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/).

## Available Email Sending events

Email Sending event subscriptions publish outbound transactional email lifecycle events for messages sent from an enabled sending domain. Each subscription is scoped to one sending domain: either the zone apex, such as `example.com`, or a verified sending subdomain, such as `send.example.com`.

Email Routing events, including inbound forwards, replies, Worker-emitted routing events, and deliveries to verified routing recipients, are not published as Email Sending events.

#### `message.delivered`

Triggered when the recipient mail server accepts the message.

**Example:**

```json
{
  "type": "cf.email.sending.message.delivered",
  "source": {
    "type": "email.sending",
    "zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
    "domain": "example.com"
  },
  "payload": {
    "eventId": "0190d0c4-7e9a-7b3c-9f12-1a2b3c4d5e6f",
    "messageId": "0101018f7d0c4d9a-msg-deadbeef",
    "sender": "noreply@example.com",
    "recipient": "user@example.net",
    "subject": "Welcome",
    "terminal": true,
    "delivery": {
      "status": "delivered",
      "provider": "gmail",
      "deliveryTimeMs": 1234,
      "smtpStatusCode": "250",
      "smtpEnhancedStatusCode": "2.0.0",
      "smtpResponse": "250 2.0.0 OK 1714820445 a1b2c3 - gsmtp"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-06-01T02:48:57.132Z"
  }
}
```

#### `message.deferred`

Triggered when a temporary delivery failure occurs and delivery retries are still pending.

**Example:**

```json
{
  "type": "cf.email.sending.message.deferred",
  "source": {
    "type": "email.sending",
    "zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
    "domain": "send.example.com"
  },
  "payload": {
    "eventId": "0190d0c4-7e9b-7714-9004-11f0b6d9a341",
    "messageId": "0101018f7d0c4d9a-msg-deferred",
    "sender": "receipts@send.example.com",
    "recipient": "user@example.net",
    "subject": "Your receipt",
    "terminal": false,
    "delivery": {
      "status": "deferred",
      "provider": "external_smtp",
      "deliveryTimeMs": 2143,
      "smtpStatusCode": "451",
      "smtpEnhancedStatusCode": "4.2.0",
      "smtpResponse": "451 4.2.0 Temporary mailbox error"
    },
    "bounce": {
      "type": "soft",
      "classification": "temporary_failure",
      "reason": "451 4.2.0 Temporary mailbox error"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-06-01T02:48:57.132Z"
  }
}
```

#### `message.bounced`

Triggered when a permanent bounce occurs, or when temporary delivery retries are exhausted.

**Example:**

```json
{
  "type": "cf.email.sending.message.bounced",
  "source": {
    "type": "email.sending",
    "zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
    "domain": "send.example.com"
  },
  "payload": {
    "eventId": "0190d0c4-7ea1-7af2-8b88-c1d2e3f4a5b6",
    "messageId": "0101018f7d0c4d9a-msg-bounced",
    "sender": "receipts@send.example.com",
    "recipient": "user@example.net",
    "subject": "Your receipt",
    "terminal": true,
    "delivery": {
      "status": "bounced",
      "provider": "external_smtp",
      "deliveryTimeMs": 2143,
      "smtpStatusCode": "550",
      "smtpEnhancedStatusCode": "5.1.1",
      "smtpResponse": "550 5.1.1 User unknown"
    },
    "bounce": {
      "type": "hard",
      "classification": "permanent_failure",
      "reason": "550 5.1.1 User unknown"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-06-01T02:48:57.132Z"
  }
}
```

#### `message.failed`

Triggered when an internal or non-SMTP delivery error occurs.

**Example:**

```json
{
  "type": "cf.email.sending.message.failed",
  "source": {
    "type": "email.sending",
    "zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
    "domain": "example.com"
  },
  "payload": {
    "eventId": "0190d0c4-81c1-7bc6-9344-829cd9001a12",
    "messageId": "0101018f7d0c4d9a-msg-failed",
    "sender": "noreply@example.com",
    "recipient": "user@example.net",
    "subject": "Welcome",
    "terminal": true,
    "delivery": {
      "status": "failed"
    },
    "failure": {
      "reason": "delivery_failed"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-06-01T02:48:57.132Z"
  }
}
```

#### `message.rejected`

Triggered when the message is rejected before delivery by policy, including suppression, validation rejection, or spam rejection.

**Example:**

```json
{
  "type": "cf.email.sending.message.rejected",
  "source": {
    "type": "email.sending",
    "zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
    "domain": "example.com"
  },
  "payload": {
    "eventId": "0190d0c4-830a-77e5-8fa0-8d10f4e8dc8b",
    "messageId": "0101018f7d0c4d9a-msg-rejected",
    "sender": "noreply@example.com",
    "recipient": "user@example.net",
    "subject": "Welcome",
    "terminal": true,
    "delivery": {
      "status": "rejected"
    },
    "rejection": {
      "reason": "suppressed",
      "party": "recipient",
      "detail": "Recipient is suppressed"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-06-01T02:48:57.132Z"
  }
}
```

#### `message.complained`

Triggered when a delivered message is marked as spam by the recipient through a feedback loop.

**Example:**

```json
{
  "type": "cf.email.sending.message.complained",
  "source": {
    "type": "email.sending",
    "zoneId": "023e105f4ecef8ad9ca31a8372d0c353",
    "domain": "send.example.com"
  },
  "payload": {
    "eventId": "0190d0c4-9f01-7c44-b2a1-aabbccddeeff",
    "messageId": "0101018f7d0c4d9a-msg-complained",
    "sender": "news@send.example.com",
    "recipient": "user@example.net",
    "terminal": true,
    "delivery": {
      "status": "complained"
    },
    "complaint": {
      "type": "abuse"
    }
  },
  "metadata": {
    "accountId": "f9f79265f388666de8122cfb508d7776",
    "eventSubscriptionId": "1830c4bb612e43c3af7f4cada31fbf3f",
    "eventSchemaVersion": 1,
    "eventTimestamp": "2026-06-01T02:48:57.132Z"
  }
}
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/platform/event-subscriptions/#page","headline":"Event subscriptions · Cloudflare Email Service docs","description":"Subscribe to Email Sending lifecycle events with Queues.","url":"https://developers.cloudflare.com/email-service/platform/event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/platform/event-subscriptions/","name":"Event subscriptions"}}]}
```
