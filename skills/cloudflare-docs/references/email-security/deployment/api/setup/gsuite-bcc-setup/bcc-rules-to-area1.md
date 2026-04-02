---
title: Add BCC rules
description: Now that you have added BCC rules on the Area 1 portal, you need to create a project on Google Cloud Console.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/bcc-rules-to-area1.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Add BCC rules

1. In the [Google Admin console ↗](https://admin.google.com/), go to **Menu** \> **Apps** \> **Google Workspace** \> **Gmail** \> **Compliance**.
2. Go to **Content Compliance** \> Select **Edit**.
3. Add a **Content Compliance** filter, and name it `Email security (Area 1) - BCC`.
4. In **Email messages to affect**, select **Inbound**.
5. Select the recipients you want to send emails to Email security (formerly Area 1) via BCC. Under **Add expressions that describe the content you want to search for in each message**:  
   * Select **If ANY of the following match the message**.  
   * Select **Add** to configure the expression.  
         * Select **Advanced content match**.  
         * In **Location**, select **Headers + Body**.  
         * In **Match type**, select **Matches regex**.  
         * In **Regexp** input `.*`. You can customize the regex as needed and test within the admin page or on sites like [Regexr ↗](https://regexr.com/).  
         * Select **SAVE**.
6. In **If the above expressions match, do the following**:  
   * Select **Modify message**.  
         * Ensure that **Envelope recipient** \> **Change envelope recipient** is unselected, to ensure that emails will not be dropped as an unintended consequence. You will select this option at a later stage.  
         * Go to **Also deliver to**, select **Add more recipients** \> **ADD** \> Choose **Advanced**.  
                  * Under **Envelope recipient**, select **Change envelope recipient** \> **Replace recipient** \> Enter the email of the recipient.  
                  * Under **Spam and delivery options**, select **Suppress bounces from this recipient**.  
                  * Under **Headers**, select **Add X-Gm-Spam and X-Gm-Phishy headers**.  
                  * Select **SAVE**.
7. In **Account types to affect**, select **Users** and **Groups**.
8. Select **SAVE**.

## Next steps

Now that you have added BCC rules on the Area 1 portal, you need to [create a project on Google Cloud Console](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/create-project-gcp/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/bcc-rules-to-area1/","name":"Add BCC rules"}}]}
```
