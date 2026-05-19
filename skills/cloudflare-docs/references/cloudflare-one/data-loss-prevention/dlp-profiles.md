---
title: DLP profiles
description: DLP profiles in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DLP profiles

A DLP profile defines what sensitive data Cloudflare should detect in your traffic. Profiles can combine [detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) with [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/) objects such as data classes, sensitivity levels, and data tags.

Cloudflare DLP provides [predefined profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) for common sensitive data types such as credit card numbers and national identifiers. You can also build custom DLP profiles specific to your data, organization, and risk tolerance by using direct detection entries, data classes, and labels.

## Configure a predefined profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences.
4. Select **Save profile**.

Most predefined profiles match when any enabled detection entry matches. The **Personally Identifiable Information (PII) Record** profile is an exception and requires at least three unique detection entries in close proximity before the profile matches.

You can now use this profile in a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy), [CASB integration](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/), or [AI Gateway DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/).

## Build a custom profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Select **Create profile**.
3. Enter a name and optional description for the profile.
4. Add new or existing detection entries to the profile.  
Add a custom entry  
   1. Select **Add custom entry**.  
   2. Choose the type of detection entry you want to create and configure its values.  
   For information on supported detection entry types, refer to [Configure detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/).  
   3. To save the detection entry, select **Done**.  
Add existing entries  
Existing entries include [predefined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/predefined-detection-entries/) and [user-defined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) detection entries that you manage from the Detection entries section.  
   1. Select **Add existing entries**.  
   2. Choose which entries you want to add, then select **Confirm**.  
   3. To save the detection entry, select **Done**.
5. (Optional) Add data classes to include reusable classification rules.  
   1. Select **Add data classes**.  
   2. Choose the data classes you want to add, then select **Confirm**.
6. (Optional) Use labels as match criteria for the profile.  
   * Select a sensitivity schema and minimum sensitivity level.  
   * Select a data tag group and one or more data tags.  
For more information on labels, templates, and data classes, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).
7. (Optional) Configure [**profile settings**](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
8. Select **Save profile**.

You can now use this profile in a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy), [CASB integration](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/), or [AI Gateway DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/","name":"DLP profiles"}}]}
```
