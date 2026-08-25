---
description: Available alert types for client-side resource detection, including new and malicious scripts.
title: Alert types
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

# Alert types

Last updated Apr 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/client-side-security/alerts/alert-types/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure alerts for resources detected in your domain. Refer to [Alerts](https://developers.cloudflare.com/client-side-security/alerts/) for more information.

## New resource alerts

Note

Requires a Business plan or higher.

New resource alerts notify you about new resources detected on your domain, resources detected from new host domains, or issues with the URL length of newly detected resources.

Client-side security New Resources Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when new resources appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm that it is an expected change.

**Additional information**

Triggered daily. If configured with a zone filter, the alert is triggered immediately.

Client-side security New Domain Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when resources from new host domains appear in their domain.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Investigate to confirm that it is an expected change.

**Additional information**

Triggered hourly. If configured with a zone filter, the alert is triggered immediately.

Client-side security New Resource Exceeds Max URL Length Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when a resource's URL exceeds the maximum allowed length.

**Other options / filters**

None.

**Included with**

Business plans or higher.

**What should you do if you receive one?**

Manually check the resource.

## Code change alert

Note

Only available to customers with Client-Side Security Advanced.

This alert notifies you about [code changes](https://developers.cloudflare.com/client-side-security/detection/review-changed-scripts/) in previously detected scripts.

Client-side security New Code Change Detection Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when JavaScript dependencies change in the pages of their domain.

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Investigate to confirm that it is an expected change.

**Additional information**

Triggered daily. If configured with a zone filter, the alert is triggered immediately.

## Malicious resource alerts

Note

Only available to customers with Client-Side Security Advanced.

Malicious resource alerts notify you about [resources considered malicious](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/), based on their [domain](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/#malicious-domain-checks), [URL](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/#malicious-url-checks), or [script content](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/#malicious-script-detection).

Client-side security New Malicious Domain Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when resources from a known malicious domain appear in their domain. For more information, refer to [Malicious script and connection detection](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Review the information in the client-side security dashboard about the detected malicious resources, then update the pages where those resources were detected.

For more information, refer to [Review scripts and connections considered malicious](https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/).

Client-side security New Malicious URL Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when resources from a known malicious URL appear in their domain. For more information, refer to [Malicious script and connection detection](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Review the information in the client-side security dashboard about the detected malicious resources, then update the pages where those resources were detected.

For more information, refer to [Review scripts and connections considered malicious](https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/).

Client-side security New Malicious Script Alert

**Who is it for?**

[Client-side security](https://developers.cloudflare.com/client-side-security/) customers who want to receive a notification when Cloudflare classifies JavaScript dependencies in their domain as malicious. For more information, refer to [Malicious script and connection detection](https://developers.cloudflare.com/client-side-security/how-it-works/malicious-script-detection/).

**Other options / filters**

None.

**Included with**

Customers with Client-Side Security Advanced.

**What should you do if you receive one?**

Review the information in the client-side security dashboard about the detected malicious resources, then update the pages where those resources were detected.

For more information, refer to [Review scripts and connections considered malicious](https://developers.cloudflare.com/client-side-security/detection/review-malicious-scripts/).

Malicious resource alerts will only include resources with an _Active_ status. Refer to [Script and connection statuses](https://developers.cloudflare.com/client-side-security/reference/script-statuses/) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/alerts/alert-types/#page","headline":"Alert types · Client-side security docs","description":"Available alert types for client-side resource detection, including new and malicious scripts.","url":"https://developers.cloudflare.com/client-side-security/alerts/alert-types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
