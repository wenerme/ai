---
title: Text add-ons
description: When a message receives a specific disposition from Email security (formerly Area 1), you can add additional information to the subject and body of each message.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/email-policies/text-addons.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Text add-ons

When a message receives a specific [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) from Email security (formerly Area 1), you can add additional information to the subject and body of each message.

This information provides additional context to your employees, which can help them make better decisions if you choose to have a more permissive email policy:

* **Subject prefixes**: Can tell recipients which category the message is in. Subject prefixes always state the final [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) of the message.
* **Body prefixes**: Provide more context about why the message was added to a specific category. Body prefixes include all the detections that were triggered. This information depends on the [prefixes you enable](#update-text-add-ons).

For example, an email might have the dispositions `EXTERNAL MALICIOUS` in the subject, and `EXTERNAL MALICIOUS SUSPICIOUS UCE` in its body.

Note

Text add-ons are only applicable to customers using an [inline setup](https://developers.cloudflare.com/email-security/deployment/inline/).

## Update text add-ons

To update or add a new add-on to the subject or body of a message:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** \> **Text Add-Ons**.
4. Select **Edit**.
5. For each **Disposition**, choose whether prefixes are **Enabled** and whether you want to update the **Custom Label**.
6. If desired, you can also use **Subject Prefix** or **Body Prefix** to update the text added before or after the rendered disposition:  
   * **Subject Prefix**: Includes a dynamic value for `%LABELS` that lists the disposition and can include additional text.  
   * **Body Prefix**: Includes a dynamic value for `%LABELS` that lists the disposition and `%REASONS` that lists the reasons behind an assigned disposition. Can include additional, HTML-formatted text.
7. Select **Update Text Add-Ons**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/email-policies/","name":"Email policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/email-policies/text-addons/","name":"Text add-ons"}}]}
```
