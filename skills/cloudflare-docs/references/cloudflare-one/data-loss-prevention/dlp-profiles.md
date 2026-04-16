---
title: DLP profiles
description: A DLP profile defines what sensitive data looks like so that DLP can detect it in your traffic. Each profile contains one or more detection entries — patterns such as uploaded datasets, document fingerprints, and AI prompt topic classifiers that match specific types of data.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Compliance ](https://developers.cloudflare.com/search/?tags=Compliance) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/data-loss-prevention/dlp-profiles/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DLP profiles

A DLP profile defines what sensitive data looks like so that DLP can detect it in your traffic. Each profile contains one or more [detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/) — patterns such as uploaded datasets, document fingerprints, and AI prompt topic classifiers that match specific types of data.

Cloudflare DLP provides [predefined profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) for common sensitive data types such as credit card numbers and national identifiers. You can also build custom DLP profiles specific to your data, organization, and risk tolerance.

## Configure a predefined profile

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
4. Select **Save profile**.

You can now use this profile in a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy), [CASB integration](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/), or [AI Gateway DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/).

## Build a custom profile

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

You can now use this profile in a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy), [CASB integration](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/), or [AI Gateway DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/","name":"DLP profiles"}}]}
```
