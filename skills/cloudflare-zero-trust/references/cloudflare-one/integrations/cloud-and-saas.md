---
description: Cloud and SaaS integrations resources and guides for Zero Trust integrations.
title: Cloud and SaaS integrations
image: https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/og.png?v=4c0bebb8f8ca984e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloud and SaaS integrations

Last updated Oct 28, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can integrate cloud environments and SaaS applications with [Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/). Once you have added an integration, you can [view and manage findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/).

You can also configure [CASB webhooks](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/) to send posture finding instances to external systems.

The workflow pages for managing findings and webhooks appear first, followed by supported integrations and troubleshooting guides:

- [Webhooks](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/)
- [Anthropic](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/)
- [Atlassian Confluence](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/atlassian-confluence/)
- [Atlassian Jira](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/atlassian-jira/)
- [Amazon Web Services (AWS) S3](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/aws-s3/)
- [Bitbucket Cloud](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/bitbucket-cloud/)
- [Box](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/box/)
- [Dropbox](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/)
- [Google Cloud Platform (GCP) Cloud Storage](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/gcp-cloud-storage/)
- [GitHub](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/github/)
- [Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/)
  - [Gmail](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gmail/)
  - [Google Admin](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-admin/)
  - [Google Calendar](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar/)
  - [Google Drive](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive/)
  - [Gmail (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gmail-fedramp/)
  - [Google Admin (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-admin-fedramp/)
  - [Google Calendar (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar-fedramp/)
  - [Google Drive (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive-fedramp/)
  - [Gemini for Google Workspace](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/)
- [Microsoft 365](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/)
  - [Admin Center](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center/)
  - [OneDrive](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/)
  - [Outlook](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook/)
  - [SharePoint](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/sharepoint/)
  - [Microsoft 365 Copilot](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot/)
  - [Admin Center (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center-fedramp/)
  - [OneDrive (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive-fedramp/)
  - [Outlook (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook-fedramp/)
  - [SharePoint (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/sharepoint-fedramp/)
  - [Microsoft 365 Copilot (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot-fedramp/)
- [OpenAI](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/)
- [Salesforce (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/salesforce-fedramp/)
- [Salesforce](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/salesforce/)
- [ServiceNow (FedRAMP)](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/servicenow-fedramp/)
- [ServiceNow](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/servicenow/)
- [Slack](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/slack/)
- [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/)
  - [CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/casb/)
  - [Troubleshoot integrations](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-integrations/)
  - [Troubleshoot compute accounts](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/troubleshoot-compute-accounts/)
- [Zoom](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/zoom/)

## Create an integration

1. In [Cloudflare One ↗︎](https://one.dash.cloudflare.com/), go to **Integrations** > **Cloud & SaaS integrations**. [Go to **Cloud & SaaS** ↗](https://one.dash.cloudflare.com/?to=/:account/integrations/cloud-and-saas/integrations)
2. Select **Connect an integration** or **Add integration**.
3. Browse the available integrations and select the application you want to add.
4. Follow the integration instructions in the dashboard.
5. To run your first scan, select **Save integration**.

Terraform supports only integrations that do not use OAuth. The `cloudflare_zero_trust_casb_integration` resource requires version 5.27.0 or later of the [Cloudflare Terraform provider](https://developers.cloudflare.com/terraform/). Version 4 is not supported.

1. Add the following permission to your [`cloudflare_api_token` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api_token):
   - `Zero Trust Write`
2. Create an integration using the [`cloudflare_zero_trust_casb_integration` ↗︎](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero_trust_casb_integration) resource. The following example creates a Google Cloud Platform integration:

   ```tf
   resource "cloudflare_zero_trust_casb_integration" "google_cloud_platform" {
     account_id = var.cloudflare_account_id
     name       = "Google Cloud Platform"
     paused     = false

     google_cloud_platform = {
       google_cloud_platform_service_account = {
         service_account_key_json = file("service-account-key.json")
       }
     }
   }
   ```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/#page","headline":"Cloud and SaaS integrations","description":"Cloud and SaaS integrations resources and guides for Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/og.png?v=4c0bebb8f8ca984e","dateModified":"2026-10-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
