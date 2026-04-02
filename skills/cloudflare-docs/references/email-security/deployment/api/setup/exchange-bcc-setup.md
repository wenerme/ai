---
title: Exchange BCC setup
description: For customers using Microsoft Exchange, setting up Email security via BCC is quick and easy. You need to configure an inbound rule to send emails to Email security via BCC for processing and detection of potential phishing attacks. The following email flow shows how this works:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/exchange-bcc-setup.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Exchange BCC setup

**Last reviewed:**  over 3 years ago 

Area 1 has been renamed

Area 1 is now **Email Security (formerly Area 1)**.

For customers using Microsoft Exchange, setting up Email security via BCC is quick and easy. You need to configure an inbound rule to send emails to Email security via BCC for processing and detection of potential phishing attacks. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Microsoft Exchange with Email security.](https://developers.cloudflare.com/_astro/bcc-exchange-flow.0rQkIXIG_1l8HKC.webp) 

## Configure Inbound Rule

1. Access Exchange's **Management Console**, and go to **Organization Configuration** \> **Hub Transport**.  
![Access Hub transport](https://developers.cloudflare.com/_astro/step1.Cr53r8C4_1XeNup.webp)
2. On the **Actions** pane, select **New Transport Rule**.
3. Give the transport rule a name and a description and select **Next**.  
![Give transport rule a name and description](https://developers.cloudflare.com/_astro/step3.Bo-0qS8t_Zos67d.webp)
4. In the **Condition** configuration panel, select the option **from users that are inside or outside the organization** option. In the dropdown that opens, select **Outside the organization**.  
![Select scope of transport rule](https://developers.cloudflare.com/_astro/step4.CxndsEWe_ZkYidj.webp)
5. Still in the same **Condition** configuration panel, add a second condition to the transport rule. Select **sent to users that are inside or outside the organization, or partners**. Keep the default value of **Inside the organization**.  
![Select where to send emails](https://developers.cloudflare.com/_astro/step5.CFjU-V5M_1so1Xm.webp)
6. Select **Next**.
7. In the **Action** configuration panel, select **Blind carbon copy (Bcc) the message to addresses**. Edit the **addresses** variable to add the addresses you want to copy as BCC.  
![Select BCC and edit email addresses](https://developers.cloudflare.com/_astro/step7.DJeDn5tj_Z1JlsIT.webp)
8. In **Specify Recipient**, select the **down arrow** next to the **Add** button > **External E-Mail Address**.  
![Select external e-mail address](https://developers.cloudflare.com/_astro/step8.D1wRFlWS_10xDa4.webp)
9. Enter the BCC address provided by Area 1\. This address is specific to your account.  
![Enter the BCC address provided by Area 1](https://developers.cloudflare.com/_astro/step9.DnJuKcbu_Z1TY58F.webp)
10. Select **OK** \> **OK** to return to the main configuration page of the transport rule.
11. At the main configuration page of the transport rule, select **Next** to continue to the Exception configuration panel.
12. You do not need to configure an exception rule. Select **Next**.  
![You do not need to configure an exception rule](https://developers.cloudflare.com/_astro/step12.CubH_6Qs_ZbcOq.webp)
13. In **Create Rule**, select the **New** button.  
![Select the new button](https://developers.cloudflare.com/_astro/step13.Bk-qDQZk_Z1rBVF9.webp)
14. Select **Finish** to close the transport rule configuration panel. This will return you to the Exchange Management Console.  
![Select finish](https://developers.cloudflare.com/_astro/step14.FJuX6pFq_ZpkKjK.webp)

Note

If you have multiple rules, you may need to change the order of the BCC rule and move it to the right location in your rule sequence. This is needed so you can send BCC messages to Email security (formerly Area 1). Usually, the Email security BCC rule will be at the top of the ruleset. The configured conditions of the Email security BCC rule will only trigger for inbound messages.

## Email processing and reports

In BCC mode, all emails are put through automated phishing detections by Email security. Emails that trigger phishing detections are logged for reporting via product portal, email and Slack. Emails that do not trigger any detections are deleted.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/exchange-bcc-setup/","name":"Exchange BCC setup"}}]}
```
