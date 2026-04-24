---
title: Allow Cloudflare access
description: Grant your Cloudflare Account Team temporary editing access to your account for migrations or sensitive configuration changes.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/fundamentals/account/account-security/cloudflare-access.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Allow Cloudflare access

Occasionally, you may want to allow edit access to your Account Team. A typical use case might be migrating a complex or sensitive domain over to Cloudflare.

By default, Cloudflare does not have edit access to your account.

To enable editing access by your Account Team:

1. In the Cloudflare dashboard, go to the **Configurations** page. (You must be logged in as a **Super Administrator**).  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. For **Editing Permission**, switch the toggle to **On**.
3. Select a duration.
4. Click **Approve**.

Note

In an emergency, Cloudflare Support can override your **Editing Permissions** and make updates to your account, but your Super Administrator will receive an email and the action will be recorded in your [Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) with an **Action** of **Break glass**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/cloudflare-access/","name":"Allow Cloudflare access"}}]}
```
