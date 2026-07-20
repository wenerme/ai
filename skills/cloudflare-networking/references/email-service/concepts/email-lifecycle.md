---
title: Email lifecycle
description: The complete email processing flow from send request to final delivery status in Email Service.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Email lifecycle

Understand the complete email processing lifecycle from request received through final delivery status with Cloudflare Email Service

The email lifecycle describes the complete journey of an email through Cloudflare Email Service. Understanding this process helps you optimize your email implementation and troubleshoot delivery issues.

Email Sending and Email Routing follow distinct processing pipelines. The outbound flow covers emails you send through the service; the inbound flow covers emails received on domains configured with Email Routing.

## Outbound flow (Email Sending)

Every email sent through Cloudflare Email Service follows this processing pipeline:

flowchart LR
    A[Request Received] --> B["Rate Limit, Authentication & Suppression Check"] --> E[Delivery Attempt]
    E --> G{Success?}
    G -->|Yes, successfully delivered| F[Final Status & Metrics]
    G -->|No - Soft Bounce| H[Retry with Exponential Backoff]
    G -->|No - Hard Bounce| F
    H -->|Retries remaining| E
    H -->|Max retries exceeded| F

### Stage details

1. **Request received:** The system validates the email format, sender authorization, and message structure. Invalid requests are rejected immediately and do not proceed to the next stage.
2. **Rate limit check:** The system checks sending [limits](https://developers.cloudflare.com/email-service/platform/limits/) per account, domain, and recipient to prevent abuse. Requests that exceed these limits are temporarily rejected and must be retried later.
3. **Authentication and reputation**: The system performs email authentication checks and evaluates sender reputation:

  * **SPF (Sender Policy Framework)**: Verifies that the sending IP address is authorized to send emails for the domain by checking DNS TXT records. This prevents domain spoofing and improves deliverability.
  * **DKIM (DomainKeys Identified Mail)**: Validates the email's cryptographic signature to ensure message integrity and authenticate the sender domain. This builds trust with recipient servers.
  * **DMARC (Domain-based Message Authentication)**: Applies domain owner policies for handling emails that fail SPF or DKIM checks, helping prevent phishing and brand impersonation while providing feedback reports.
These authentication mechanisms work together to establish sender legitimacy and protect against email fraud. Senders with low reputation scores may experience throttling or delayed processing.
4. **Suppression list check:** The system checks the recipient against your account's suppression list, which includes bounces, complaints, and unsubscribes. Recipients found on this list are blocked from receiving the email.
5. **Delivery attempt:** The system connects to the recipient's mail server and attempts message delivery via SMTP. When delivery fails, the system applies different retry logic based on the failure type:

  * **Soft bounces (4xx responses)**: The system retries delivery using exponential backoff timing
  * **Hard bounces (5xx responses)**: The system marks the email as permanently failed with no retry attempts
6. **Server response handling:** The system processes SMTP response codes from the recipient server to determine the final email status:

  * **2xx codes**: The email was delivered successfully
  * **4xx codes**: Temporary failure occurred and the email will be retried
  * **5xx codes**: Permanent failure occurred and the email cannot be delivered
7. **Final status and metrics:** Based on the server response, the system assigns emails one of these final statuses:

  * **Delivered**: The email was successfully accepted by the recipient server
  * **Delivery failed**: The email permanently failed delivery (hard bounce) or exceeded the maximum retry attempts (soft bounce). This status appears as `deliveryFailed` when querying the [GraphQL Analytics API](https://developers.cloudflare.com/email-service/observability/metrics-analytics/).

## Inbound flow (Email Routing)

Every email received on a domain configured with Email Routing follows this processing pipeline:

flowchart LR
    A[SMTP Receipt] --> B[Authentication Check]
    B --> C{Authenticated?}
    C -->|Yes| D[Rule Match]
    C -->|No| R[Reject]
    D --> E{Action?}
    E -->|Send to email| F[ARC Sign & SRS Rewrite]
    E -->|Send to Worker| W[Worker]
    E -->|Drop| X[Drop]
    W --> Y{Worker action?}
    Y -->|forward| F
    Y -->|reply| F
    Y -->|setReject| R
    F --> G[Outbound Delivery]
    G --> H[Final Status & Metrics]

### Stage details

1. **SMTP receipt:** A sending server connects to a Cloudflare MX server and submits the message over SMTP. Messages larger than the [inbound message size limit](https://developers.cloudflare.com/email-service/platform/limits/) are rejected at this stage.
2. **Authentication check:** The system performs [SPF, DKIM, DMARC, and ARC](https://developers.cloudflare.com/email-service/concepts/email-authentication/) checks on the incoming message. Mail that fails authentication according to the sender's DMARC policy is rejected. Mail from IP addresses on a Realtime Block List is also rejected at this stage. Refer to [Postmaster information](https://developers.cloudflare.com/email-service/reference/postmaster/) for details.
3. **Rule match:** The system matches the recipient address against your configured [routing rules](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/). If [subaddressing](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#subaddressing) is enabled, sub-addressed recipients fall back to the base routing rule. If no rule matches and the [catch-all rule](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/#catch-all-rule) is enabled, the catch-all rule applies.
4. **Action:** The system applies the matched rule's action:

  * **Send to an email**: The message is forwarded to the verified destination address (stage 5).
  * **Send to a Worker**: The message is passed to your [Worker](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/). The Worker can call `forward()`, `reply()`, or `setReject()`.
  * **Drop**: The message is silently discarded. No further processing occurs.
5. **ARC sign and SRS rewrite:** For forwarded messages, the system adds an ARC seal preserving the original authentication results and rewrites the envelope sender using the [Sender Rewriting Scheme](https://developers.cloudflare.com/email-service/reference/postmaster/#sender-rewriting). This allows SPF to pass at the destination server.
6. **Outbound delivery:** The system connects to the destination mail server and delivers the message. Soft bounces are retried with exponential backoff. Hard bounces are returned to the original sender in-session as upstream SMTP errors. Refer to [Postmaster: SMTP errors](https://developers.cloudflare.com/email-service/reference/postmaster/#smtp-errors).
7. **Final status and metrics:** The final outcome is recorded and available through the [Activity log](https://developers.cloudflare.com/email-service/observability/logs/) and the [GraphQL Analytics API](https://developers.cloudflare.com/email-service/observability/metrics-analytics/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/concepts/email-lifecycle/#page","headline":"Email lifecycle · Cloudflare Email Service docs","description":"The complete email processing flow from send request to final delivery status in Email Service.","url":"https://developers.cloudflare.com/email-service/concepts/email-lifecycle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/concepts/email-lifecycle/","name":"Email lifecycle"}}]}
```
