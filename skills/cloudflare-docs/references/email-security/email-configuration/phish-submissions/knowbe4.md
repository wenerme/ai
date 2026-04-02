---
title: KnowBe4
description: If you have KnowBe4 Phish Alert Button (PAB) for Microsoft Outlook, Microsoft Exchange, Microsoft 365, and Google Workspace follow the steps below to set it up with Email security and report suspicious emails.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/phish-submissions/knowbe4.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# KnowBe4

If you have KnowBe4 Phish Alert Button (PAB) for Microsoft Outlook, Microsoft Exchange, Microsoft 365, and Google Workspace follow the steps below to set it up with Email security and report suspicious emails.

1. Log in to your KnowBe4 console.
2. Select the **cog symbol** to go to your **Account Settings** screen.
3. Go to **Account Integrations** \> **Phish Alert**.
4. In **Setting Name**, give your PAB a descriptive name.
5. (Optional) If you do not want to differentiate between spam and malicious emails, enter `<ACCOUNT_NAME>+user+malicious@submission.area1reports.com` in **Send Non-Simulated Emails to** to receive spam reports.  
Note  
You can find the submission addresses in your Email Security (formerly Area 1) dashboard, in **Support** \> [**Service Addresses** ↗](https://horizon.area1security.com/support/service-addresses).
6. If you do want to differentiate between spam and malicious emails, go to **Comments and Disposition Settings**.
7. Select **Allow users to leave comments and disposition**.
8. Select **Disable Unknown Email Disposition**.
9. In **Send Dispositioned Emails to**, you need to enter the email addresses to forward spam and malicious emails. You can find these addresses in your **Email security dashboard** \> **Support** \> [**Service Addresses** ↗](https://horizon.area1security.com/support/service-addresses):  
   1. **Phishing/Suspicious**: Enter your malicious email address. For example, `<ACCOUNT_NAME>+user+malicious@submission.area1reports.com`.  
   2. **Spam/Junk**: Enter your spam email address. For example, `<ACCOUNT_NAME>+user+spam@submission.area1reports.com`.
10. Select **Save changes**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/phish-submissions/","name":"Phish submissions"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/phish-submissions/knowbe4/","name":"KnowBe4"}}]}
```
