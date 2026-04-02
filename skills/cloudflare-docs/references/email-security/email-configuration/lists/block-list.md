---
title: Block lists
description: When you add blocked senders, Email security automatically marks all messages from these senders with a MALICIOUS disposition.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/lists/block-list.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Block lists

When you add **blocked senders**, Email security automatically marks all messages from these senders with a `MALICIOUS` [disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/).

## Add a blocked sender

To create a new blocked pattern:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Block List** \> **Blocked Senders**.
4. Select **\+ New Sender**.
5. Enter the pattern information:  
   * **Sender**: Enter one of the following types of pattern:  
         * **Email addresses**: Must be a valid email.  
         * **IP addresses**: Can only be IPv4\. IPv6 and CIDR are invalid entries.  
         * **Regular expressions**: Must be [valid Java expressions ↗](https://www.freeformatter.com/java-regex-tester.html). Regular expressions are matched with fields related to the sender email address (`envelope from`, `header from`, `reply-to`), the originating IP address, and the server name for the email.  
   * **Notes**: Provide additional notes about the blocked sender pattern.
6. Select **Save**.

### CSV uploads

You can also upload a CSV file of multiple allowed patterns. The CSV file must be smaller than 150 KB, start with a header row of all required values, and contain no additional fields.

An example file would look like this:

```

Blocked_Sender, Notes

john.smith@email.com, John Smith

melanie.turner@email.com, Melanie Turner


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/lists/","name":"Allow and block lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/lists/block-list/","name":"Block lists"}}]}
```
