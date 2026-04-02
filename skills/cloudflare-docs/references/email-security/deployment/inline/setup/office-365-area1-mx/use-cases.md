---
title: Use cases
description: Before following our use case tutorials, read through this how-to guide related to best practices. This will show you how to prepare your Email security dashboard and enable options such as tagging and defanging emails, as well as Email Link Isolation, before setting up Office 365.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Use cases

Before following our use case tutorials, read through this how-to guide related to best practices. This will show you how to prepare your Email security dashboard and enable options such as tagging and [defanging emails](https://developers.cloudflare.com/email-security/email-configuration/email-policies/link-actions/), as well as [Email Link Isolation](https://developers.cloudflare.com/email-security/email-configuration/email-policies/link-actions/#email-link-isolation), before setting up Office 365.

1. Log in to the [Email security (formerly Area 1) dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Email Policies** \> **Link Actions**.
4. What you do next depends on if you are an Advantage or Enterprise customer:  
   1. If you are an **Advantage** customer:  
         1. In **Disposition Actions**, select **Edit**.  
         2. In the `SUSPICIOUS` disposition drop-down menu, change the action to `URL Defang`.  
   ![Defang suspicious emails](https://developers.cloudflare.com/_astro/defang-suspicious.C0Jc8Znt_2jQm0h.webp)  
         1. Select **Save Disposition Actions**.  
   2. If you are an **Enterprise** customer:  
         1. Enable **Email Link Isolation**.  
   ![Enable Email Link Isolation](https://developers.cloudflare.com/_astro/step4-enterprise-advantage-customer.BsgCme67_rnbQd.webp)
5. Under **Email Policies**, select **Text add-Ons**.
6. Select **Edit**.
7. Enable the following options under **Add Prefix To Subject**:  
   * **Malicious** \- Enabled.  
   * **Suspicious** \- Enabled.  
   * **Spam** \- Enabled.  
   * **Bulk** \- Enabled.  
   * **Spoof** \- Enabled.  
   * **Originated Outside of Company** \- Optional.  
   * **Contains Encrypted Content** \- Optional.  
   * **Subject Prefix** \- Format as desired.  
![Enable all the options mentioned in step 9](https://developers.cloudflare.com/_astro/prefix-subject.B6eO1xpn_1jfTv2.webp)
8. In the same window, scroll down and enable the following options under **Add Prefix To Body**:  
   * **Malicious** \- Enabled.  
   * **Suspicious** \- Enabled.  
   * **Spam** \- Disabled.  
   * **Bulk** \- Disabled.  
   * **Spoof** \- Enabled.  
   * **Originated Outside of Company** \- Optional.  
   * **Body Prefix** \- Format as desired. You can use the default settings. The body prefix supports HTML tags for formatting.  
![Enable all the options mentioned in step 7](https://developers.cloudflare.com/_astro/prefix-subject-enterprise.CiTYIyUq_ZtBNpl.webp)
9. Select **Update Text Add-Ons**.

### Use cases

Refer to the following use cases to learn how to set up your environment for different scenarios.

* [ 1 - Junk email and Email security (formerly Area 1) Admin Quarantine ](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/one-junk-admin-quarantine/)
* [ 2 - Junk email and user managed quarantine ](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/two-junk-user-quarantine/)
* [ 3 - Junk email and administrative quarantine ](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/three-junk-admin-quarantine/)
* [ 4 - User managed quarantine and administrative quarantine ](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/four-user-quarantine-admin-quarantine/)
* [ 5 - Junk email folder and administrative quarantine ](https://developers.cloudflare.com/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/five-junk-admin-quarantine/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/inline/","name":"Inline"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/inline/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/inline/setup/office-365-area1-mx/","name":"Office 365 - Email security (formerly Area 1) as MX Record"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/","name":"Use cases"}}]}
```
