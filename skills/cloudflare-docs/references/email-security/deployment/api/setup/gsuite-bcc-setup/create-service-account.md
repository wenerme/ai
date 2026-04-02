---
title: Create service account
description: Now that you have created a service account, proceed to adding retractions to your email.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/create-service-account.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create service account

1. On the [Google Cloud Console ↗](https://console.cloud.google.com/welcome/new), select **Credentials**.
2. Select **CREATE CREDENTIALS** \> **Service account**.
3. Fill in the details to create a service account:  
   * **Service account name**: Enter `Message Retraction Service Account`.  
   * **Service account ID**: Enter `message-retraction-service-acc`.  
   * **Service account description**: Enter `Email security Message Retraction`.  
   * Select **CREATE AND CONTINUE**.
4. In **Grant this service account access to project**, select **Select a role** \> Choose **Owner**. Select **CONTINUE**, then **DONE**.
5. Go back to **Credentials**, and select your service account under **Service Accounts**. In **Details**, take note of the **Unique ID**.
6. Select **Advanced settings** \> **VIEW GOOGLE WORKSPACE ADMIN CONSOLE**, then enter your password.
7. On the sidebar, select **Security** \> **Access and data control** \> **API controls** \> Select **MANAGE DOMAIN WIDE DELEGATION**.
8. Select **Add new** \> Add a new client ID:  
   * **Client ID**: Enter the **Unique ID** you took note of.  
   * **OAuth scopes**: Enter the following URLs:  
   ```  
   https://www.googleapis.com/auth/admin.directory.user.readonly, https://www.googleapis.com/auth/admin.directory.group.readonly, https://www.googleapis.com/auth/admin.directory.user.alias.readonly, https://www.googleapis.com/auth/gmail.labels, https://mail.google.com/  
   ```  
   * Select **AUTHORIZE**.
9. Go back to the sidebar > **Service Accounts**.
10. Select the three dots > **Manage keys** \> **ADD KEY** \> **Create new key** \> Select **JSON** \> Select **CREATE**. This downloads a `.json` file which you will use at a later stage.

## Next steps

Now that you have created a service account, proceed to [adding retractions](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/add-retraction/) to your email.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/create-service-account/","name":"Create service account"}}]}
```
