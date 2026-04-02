---
title: Allowed patterns
description: When you set up allowed patterns, Email security email security exempts messages that match certain patterns from normal detection scanning.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/lists/allowed-patterns.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Allowed patterns

When you set up **allowed patterns**, Email security email security exempts messages that match certain patterns from normal detection scanning.

## Add an allowed pattern

To create a new allowed pattern:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Allow List** \> **Allowed Patterns**.
4. Select **\+ New Pattern**.
5. Enter the pattern information:  
   * **Allowed Pattern**: Enter one of the following types of pattern:  
         * **Email addresses**: Must be a valid email.  
         * **IP addresses**: Can only be IPv4\. IPv6 and CIDR are invalid entries.  
         * **Regular expressions**: Must be [valid Java expressions ↗](https://www.freeformatter.com/java-regex-tester.html).  
   * **Allow Type**: Choose one or more of the following types:  
         * **Trusted Sender**: Messages will bypass all [detections](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) and link following by Email security. Typically, only applies to phishing simulations from vendors such as KnowBe4.  
         * **Exempt Recipient**: Will exempt messages from all Email security [detections](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) intended for recipients matching this pattern (email address or regular expression only). Typically, this only applies to submission mailboxes for user reporting to security.  
         * **Acceptable Sender**: Will exempt messages from the `SPAM`, `SPOOF`, and `BULK` [dispositions](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/#available-values) (but not `MALICIOUS` or `SUSPICIOUS`). Commonly used for external domains and sources that send mail on behalf of your organization, such as marketing emails or internal tools.  
   * **Notes**: Provide additional notes about the allowed pattern.
6. If you chose _Trusted Sender_ or _Acceptable Sender_ in the previous step, you will be able to choose whether to verify the sender. When the **Verify Sender** option is selected, the allow list entry will only be honored if it aligns with a passing authentication by DMARC or SPF or DKIM.
7. Select **Save**.

### CSV uploads

You can also upload a CSV file of multiple allowed patterns. The CSV file must be smaller than 150 KB, start with a header row of all required values, and contain no additional fields.

An example file would look like this:

```

Pattern, Notes, Verify Email, Trusted Sender,

Exempt Recipient, Acceptable Sender

whale@notaphish.com, not a phish, true, true, false, true


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/lists/","name":"Allow and block lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/lists/allowed-patterns/","name":"Allowed patterns"}}]}
```
