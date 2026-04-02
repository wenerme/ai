---
title: Create a project on Google Cloud Console
description: Now that you have created a project on Google Cloud Console, you need to create a service account on Google Cloud Console.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/create-project-gcp.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Create a project on Google Cloud Console

1. Log in to the [Google Cloud Console ↗](https://console.cloud.google.com/welcome/new). From the dashboard, select **CREATE OR SELECT PROJECT**.
2. Provide the details for the new project, and select **CREATE** to start your new project.
3. Once the new project has been created, the Google Cloud Platform console will automatically redirect you to the Project console. If not, you can use the Project selector to change to the project you created.
4. In **Getting Started**, select **Explore and enable APIs** \> Select **ENABLE APIs & SERVICES**.
5. On search bar, search for `Admin SDK API`. Select **Admin SDK API**, then select **ENABLE**.
6. Go back to the sidebar, select **Library**, and search for Gmail API. Select **Gmail API**, then select **ENABLE**.

## Next steps

Now that you have created a project on Google Cloud Console, you need to [create a service account](https://developers.cloudflare.com/email-security/deployment/api/setup/gsuite-bcc-setup/create-service-account/) on Google Cloud Console.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/create-project-gcp/","name":"Create a project on Google Cloud Console"}}]}
```
