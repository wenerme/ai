---
title: Set up Microsoft Graph API
description: Integrate Email security with Microsoft 365.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-your-email/get-started/setup-ms-graph-api.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Set up Microsoft Graph API

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Settings**.
3. Select **Connect an integration**, choose **Microsoft CASB + EMAIL**, then select **Select Integration**.
4. Enable **Microsoft Integration**:  
   1. **Configure policy**: Choose how you wannt [CASB](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/) to access the data from your integration.  
   2. **Name integration**: Add your integration name, then select **Continue**.  
   3. **Authorize integration**:  
         * Select **Authorize**. Selecting **Authorize** will take you to the Microsoft Sign in page where you will have to enter your email address.  
         * Once you enter your email address, select **Next**.  
         * After selecting **Next**, the system will show a dialog box with a list of requested permissions. Select **Accept** to authorize Email security. Upon authorization, you will be redirected to a page where you can review details and enroll integration.  
   4. **Review details**: Review your integration details, then:  
         * Select **Complete Email security set up** where you will be able to connect your domains and configure auto-moves.  
         * Select **Continue to Email security**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/get-started/","name":"Get started with Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/get-started/setup-ms-graph-api/","name":"Set up Microsoft Graph API"}}]}
```
