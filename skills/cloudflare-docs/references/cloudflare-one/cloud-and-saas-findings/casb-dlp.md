---
title: Scan for sensitive data
description: You can use Cloudflare Data Loss Prevention (DLP) to discover if files stored in a SaaS application contain sensitive data. To perform DLP scans in a SaaS app, first configure a DLP profile (a set of patterns that define what counts as sensitive data) with the data patterns you want to detect, then add the profile to a CASB integration.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/cloud-and-saas-findings/casb-dlp.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Scan for sensitive data

Note

Requires Cloudflare CASB and Cloudflare DLP.

You can use [Cloudflare Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) to discover if files stored in a SaaS application contain sensitive data. To perform DLP scans in a SaaS app, first configure a [DLP profile](#configure-a-dlp-profile) (a set of patterns that define what counts as sensitive data) with the data patterns you want to detect, then [add the profile](#enable-dlp-scans-in-casb) to a CASB integration.

## Supported integrations

* [Amazon Web Services (AWS) S3](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/aws-s3/)
* [Box](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/box/)
* [Dropbox](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/)
* [Google Cloud Platform (GCP) Cloud Storage](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/gcp-cloud-storage)
* [Google Drive](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive/)
* [Microsoft OneDrive](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/)
* [Microsoft SharePoint](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/sharepoint/)
* [Microsoft 365 Copilot](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot/)
* [OpenAI](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/)
* [Anthropic](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/)

## Configure a DLP profile

You may either use DLP profiles predefined by Cloudflare, or create your own custom profiles based on regex, predefined detection entries, datasets, and document fingerprints.

### Configure a predefined profile

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
4. Select **Save profile**.

Your DLP profile is now ready to use with CASB.

### Build a custom profile

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Data loss prevention** \> **Profiles**.
2. Select **Create profile**.
3. Enter a name and optional description for the profile.
4. Add custom or existing detection entries.  
Add a custom entry  
   1. Select **Add custom entry** and give it a name.  
   2. In **Value**, enter a regular expression (or regex) that defines the text pattern you want to detect. For example, `test\d\d` will detect the word `test` followed by two digits.  
         * Regular expressions are written in Rust. We recommend validating your regex with [Rustexp ↗](https://rustexp.lpil.uk/).  
         * DLP detects UTF-8 characters, which can be up to 4 bytes each. Custom text pattern detections are limited to 1024 bytes in length.  
         * DLP does not support regular expressions with `+` or `*` operators because they are prone to exceeding the length limit. For example, the regex pattern `a+` can detect an infinite number of `a` characters. We recommend using `a{min,max}` instead, such as `a{1,1024}`.  
   3. To save the detection entry, select **Done**.  
Add existing entries  
Existing entries include [predefined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and [user-defined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/) detection entries.  
   1. Select **Add existing entries**.  
   2. Choose which entries you want to add, then select **Confirm**.  
   3. To save the detection entry, select **Done**.
5. (Optional) Configure [**profile settings**](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
6. Select **Save profile**.

Your DLP profile is now ready to use with CASB.

For more information, refer to [Configure a DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/).

## Enable DLP scans in CASB

### Add a new integration

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Select **Connect an integration** and choose a [supported integration](#supported-integrations).
3. During the setup process, you will be prompted to select DLP profiles for the integration.
4. Select **Save integration**.

CASB will scan every publicly accessible file in the integration for text that matches the DLP profile. The initial scan may take up to a few hours to complete.

### Modify an existing integration

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Choose a [supported integration](#supported-integrations) and select **Configure**.
3. Under **DLP profiles**, select the profiles that you want the integration to scan for.
4. Select **Save integration**.

If you enable a DLP profile from the **Manage integrations** page, CASB will only scan publicly accessible files that have had a modification event since enabling the DLP profile. Modification events include changes to the following attributes:

* Contents of the file
* Name of the file
* Visibility of the file (only if changed to publicly accessible)
* Owner of the file
* Location of the file (for example, moved to a different folder)

Warning

If you add a DLP profile to an existing integration, CASB only scans files modified after you enabled the profile. To scan all files, you must enable the DLP profile during the [integration setup flow](#add-a-new-integration).

## Limitations

DLP in CASB will only scan:

* Files less than or equal to 100 MB in size.
* Java and R source code files that are at least 5 KB. Smaller files in these languages are skipped.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/cloud-and-saas-findings/","name":"Cloud and SaaS findings"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/cloud-and-saas-findings/casb-dlp/","name":"Scan for sensitive data"}}]}
```
