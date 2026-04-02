---
title: PhishNet for Google Workspace
description: PhishNet is an add-in button that helps users to submit directly to Email security (formerly Area 1) phish samples missed by Area 1’s detection. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Email security.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/phish-submissions/phishnet-gworkspace.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# PhishNet for Google Workspace

PhishNet is an add-in button that helps users to submit directly to Email security (formerly Area 1) phish samples missed by Area 1’s detection. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Email security.

## Prerequisites

To set up PhishNet with Google Workspace you need admin access to your Google Workspace account.

## Set up PhishNet for Google Workspace

1. Log in to [Google Workspace Marketplace apps ↗](https://workspace.google.com/marketplace/app/cloudflare%5Fphishnet/11369379045) using this direct link and an administrator account.
2. Select **Admin install** to install Cloudflare PhishNet. Read the warning, and select **Continue**.  
![Select Admin install to start installing Cloudflare PhishNet](https://developers.cloudflare.com/_astro/step1-phishnet-install.CfM5xhRF_1HWiOT.webp)
3. In the window that opens, choose between installing Cloudflare PhishNet for **Everyone at your organization** or **Certain groups or organizational units**. If you choose this last option, you will also have to select which users you want to install PhishNet to.  
![Select to which users you want to install PhishNet to](https://developers.cloudflare.com/_astro/step3-select-users.CCzNXpJV_Z1qLAVj.webp)
4. After choosing the groups you want to install PhishNet for, agree with Google’s terms of service, and select **Finish**.
5. Google Workspace will inform you that Cloudflare PhishNet has been installed. Select **Done** to continue.  
![If everything goes well, you will need to select Done to continue.](https://developers.cloudflare.com/_astro/step5-done.BqPJg1RK_Z1RsRLf.webp)

Cloudflare PhishNet is now installed.

## Submit phish with PhishNet

1. In your Gmail web client, open the message you would like to flag as either spam or phish.
2. (Optional) Open Gmail’s **side panel** if it is not already opened.  
![Open the side panel on Gmail's interface if you need to](https://developers.cloudflare.com/_astro/step2-side-panel.Yted0FAL_ZXevuP.webp)
3. Select the **PhishNet logo**.  
![Select PhishNet's logo](https://developers.cloudflare.com/_astro/step3-logo.BcawBXoq_ZN9LYW.webp)
4. Under **Select Submission Type**, select the type of your submission — _Spam_ or _Phish_.  
![Choose the type of submission you'd like to make](https://developers.cloudflare.com/_astro/step4-submission-type.BethMG3H_8CRIM.webp)
5. Select **Submit Report**.

PhishNet will show you a **Submission Complete** message once the email has been successfully submitted to Email security (formerly Area 1) for review.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/phish-submissions/","name":"Phish submissions"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/phish-submissions/phishnet-gworkspace/","name":"PhishNet for Google Workspace"}}]}
```
