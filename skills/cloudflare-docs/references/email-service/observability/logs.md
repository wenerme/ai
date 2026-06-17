---
title: Email logs
description: View and analyze Email Service sending and routing activity logs with authentication and delivery details.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email logs

View and analyze email sending and routing activity logs with detailed authentication and delivery information

Email Service provides comprehensive logging for both email sending and routing activities. Access detailed logs through the Cloudflare dashboard to monitor email flow, troubleshoot delivery issues, and analyze authentication status.

## Activity log

The Activity log allows you to sort through all email activities and check actions taken by Email Service. In the dashboard you can filter the Activity log to a time range between 30 minutes and 30 days, or specify a custom range.

The Activity log surfaces the same per-event data that is also available programmatically through the [emailSendingAdaptive and emailRoutingAdaptive datasets](https://developers.cloudflare.com/email-service/observability/metrics-analytics/) in the GraphQL Analytics API.

For Email Routing, you can expand an individual email in the Activity log to inspect authentication results ([SPF ↗](https://datatracker.ietf.org/doc/html/rfc7208), [DKIM ↗](https://datatracker.ietf.org/doc/html/rfc6376), and [DMARC ↗](https://datatracker.ietf.org/doc/html/rfc7489)).

### Email sending logs

For outbound emails sent through Email Service:

* **Sent**: Email successfully accepted and queued for delivery.
* **Delivered**: Email successfully delivered to recipient's mail server.
* **Delivery failed**: Email bounced (hard or soft bounce). This corresponds to the `deliveryFailed` status in the [GraphQL Analytics API](https://developers.cloudflare.com/email-service/observability/metrics-analytics/).
* **Rejected**: Email was not sent because the recipient is on your account's [suppression list](https://developers.cloudflare.com/email-service/concepts/suppressions/).
* **Failed**: Email failed to send due to configuration or authentication issues.

### Email routing logs

For inbound emails processed through Email Routing:

* **Forwarded**: Email successfully forwarded to destination address.
* **Handled**: Email processed by a Worker handler.
* **Dropped**: Email dropped due to filtering rules or configuration.
* **Rejected**: Email rejected due to SPF, DKIM, or DMARC failures.
* **Delivery failed**: Email could not be delivered to the destination address.
* **Error**: Email could not be processed due to an internal error.

## Viewing email details

Select any email in the Activity log to expand its details and view authentication and delivery information.

### Authentication status

Check the status of email authentication protocols:

* **SPF status**: Shows pass/fail for Sender Policy Framework validation.
* **DKIM status**: Shows pass/fail for DomainKeys Identified Mail signature verification.
* **DMARC status**: Shows pass/fail for Domain-based Message Authentication compliance.

### Delivery information

For sent emails, see delivery details:

* Recipient mail server response.
* Delivery attempts and timestamps.
* Bounce reason codes and categories.
* Final delivery status.

## Best practices for log monitoring

### Regular review

* Monitor logs daily during initial setup
* Check weekly for ongoing operations
* Review immediately after configuration changes

### Key metrics to watch

* Authentication failure rates
* Bounce patterns and trends
* Delivery success rates

### Troubleshooting workflow

1. Identify the issue: Use logs to pinpoint failure types
2. Check authentication: Verify SPF, DKIM, DMARC configuration
3. Adjust configuration: Make necessary DNS or routing changes
4. Monitor improvement: Track metrics after changes

---

Email logs provide the visibility needed to maintain high deliverability and properly route incoming emails. Use this data to optimize your email configuration and quickly resolve any delivery issues.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/observability/logs/#page","headline":"Email logs · Cloudflare Email Service docs","description":"View and analyze Email Service sending and routing activity logs with authentication and delivery details.","url":"https://developers.cloudflare.com/email-service/observability/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/observability/","name":"Observability and logs"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/observability/logs/","name":"Email logs"}}]}
```
