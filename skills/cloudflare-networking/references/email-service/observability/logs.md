---
description: Email Service activity statuses, authentication details, and message fields.
title: Activity log
image: https://developers.cloudflare.com/email-service/observability/logs/og.png?v=7322ea94b0a5a48d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

# Activity log

Email sending and routing statuses, authentication details, and message fields

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/email-service/observability/logs/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Email Service Activity log lists sending and routing events. Each event includes delivery and authentication details.

The Activity log allows you to sort through all email activities and check actions taken by Email Service. In the dashboard you can filter the Activity log to a time range between 30 minutes and 30 days, or specify a custom range.

The Activity log surfaces the same per-event data that is also available programmatically through the [`emailSendingAdaptive` and `emailRoutingAdaptive` datasets](https://developers.cloudflare.com/email-service/observability/metrics-analytics/) in the GraphQL Analytics API.

For Email Routing, you can expand an individual email in the Activity log to inspect authentication results ([SPF ↗︎](https://datatracker.ietf.org/doc/html/rfc7208), [DKIM ↗︎](https://datatracker.ietf.org/doc/html/rfc6376), and [DMARC ↗︎](https://datatracker.ietf.org/doc/html/rfc7489)).

## Email sending statuses

For outbound emails sent through Email Service:

- **Sent**: Email successfully accepted and queued for delivery.
- **Delivered**: Email successfully delivered to recipient's mail server.
- **Delivery failed**: Email bounced (hard or soft bounce). This corresponds to the `deliveryFailed` status in the [GraphQL Analytics API](https://developers.cloudflare.com/email-service/observability/metrics-analytics/).
- **Rejected**: Email was not sent because the recipient is on your account's [suppression list](https://developers.cloudflare.com/email-service/concepts/suppressions/).
- **Failed**: Email failed to send due to configuration or authentication issues.

## Email routing statuses

For inbound emails processed through Email Routing:

- **Forwarded**: Email successfully forwarded to destination address.
- **Handled**: Email processed by a Worker handler.
- **Dropped**: Email dropped due to filtering rules or configuration.
- **Rejected**: Email rejected due to SPF, DKIM, or DMARC failures.
- **Delivery failed**: Email could not be delivered to the destination address.
- **Error**: Email could not be processed due to an internal error.

## Email details

Select any email in the Activity log to expand its details and view authentication and delivery information.

### Authentication status

Check the status of email authentication protocols:

- **SPF status**: Shows pass/fail for Sender Policy Framework validation.
- **DKIM status**: Shows pass/fail for DomainKeys Identified Mail signature verification.
- **DMARC status**: Shows pass/fail for Domain-based Message Authentication compliance.

### Delivery information

For sent emails, see delivery details:

- Recipient mail server response.
- Delivery attempts and timestamps.
- Bounce reason codes and categories.
- Final delivery status.

### Message preview

For sent emails, expand the email in the Activity log to open the **Preview** section and inspect the message as it was sent. The preview provides the following tabs:

- **HTML**: The rendered HTML body.
- **Text**: The plain text body.
- **Headers**: The message headers.
- **Attachments**: Files included with the message.
- **Raw**: The full raw [RFC 5322 ↗︎](https://datatracker.ietf.org/doc/html/rfc5322) message source.

To make sent messages previewable, turn on [**Email preview**](https://developers.cloudflare.com/email-service/configuration/domains/#email-preview) for the sending domain. Previews cover messages sent while the setting is turned on and are retained for about seven days. New sending domains have **Email preview** turned on automatically.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/observability/logs/#page","headline":"Activity log","description":"Email Service activity statuses, authentication details, and message fields.","url":"https://developers.cloudflare.com/email-service/observability/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/email-service/observability/logs/og.png?v=7322ea94b0a5a48d","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
