---
title: Alert types
description: You can configure alerts for resources detected in your domain. Refer to Alerts for more information.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/alerts/alert-types.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Alert types

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/alerts/","name":"Alerts"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/alerts/alert-types/","name":"Alert types"}}]}
```
