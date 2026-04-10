---
title: Build Data Loss Prevention (DLP) policies
description: In order to use Data Loss Prevention (DLP) tools within Cloudflare Zero Trust, you first need to define your DLP profiles. DLP profiles are complex objects with dictionaries, pre-built detections, and custom logic that you can reference as selectors within your Gateway policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/secure-internet-traffic/build-http-policies/data-loss-prevention.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Build Data Loss Prevention (DLP) policies

In order to use Data Loss Prevention (DLP) tools within Cloudflare Zero Trust, you first need to define your DLP profiles. [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) are complex objects with dictionaries, pre-built detections, and custom logic that you can reference as selectors within your Gateway policies.

## Configure a DLP profile

You may either use DLP profiles predefined by Cloudflare, or create your own custom profiles based on regular expressions (regex), predefined detection entries, and DLP datasets.

### Configure a predefined profile

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
4. Select **Save profile**.

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

## Build effective DLP profiles

For many Cloudflare users, Zero Trust is often one of the only measures for preventing the loss of sensitive data. For other users, Zero Trust may be the one of the early in-line measures of a complex Internet and SaaS app security strategy. No matter which model you most resemble, developing effective and appropriate DLP policies and practices starts with first-principles definitions.

### Define your sensitive data

#### Existing data patterns

If your organization is most concerned about general data patterns that fit existing classifications such as personal identifiable information (PII), protected health information (PHI), financial information, or source code, we recommend using the [default predefined profiles](#configure-a-predefined-profile).

To help this better match the needs of your organization, you can also build a complex profile that matches data to both an existing library and a custom string detection or database. For example:

* [ Dashboard ](#tab-panel-5279)
* [ API ](#tab-panel-5280)

| Selector    | Operator | Value                     | Logic | Action |
| ----------- | -------- | ------------------------- | ----- | ------ |
| DLP Profile | in       | _Credentials and Secrets_ | Or    | Block  |
| DLP Profile | in       | _AWS Key Dataset_         |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "description": "Detect secrets and AWS keys",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Secrets and AWS keys",

    "precedence": 0,

    "traffic": "any(dlp.profiles[*] in <CREDENTIALS_DLP_PROFILE_UUID>) or any(dlp.profiles[*] in <AWS_DLP_PROFILE_UUID>)"

  }'


```

Explain Code

#### Assorted data patterns

If your data patterns take many different forms and contexts, consider building a custom profile using one or multiple regexes.

Rust regular expressions

Cloudflare implements regular expressions with Rust. Make sure you account for this difference when writing expressions or using regular expression builders and generative AI.

To validate your regex, use [Rustexp ↗](https://rustexp.lpil.uk/).

For example, you can use a custom expression to detect when your users share product SKUs in the format `CF1234-56789`:

* [ Dashboard ](#tab-panel-5281)
* [ API ](#tab-panel-5282)

1. [Build a custom profile](#build-a-custom-profile) with the following custom entry:  
| Detection entry name | Value                     |  
| -------------------- | ------------------------- |  
| Product SKUs         | CF\[0-9\]{1,4}-\[0-9\]{5} |
2. Create an HTTP policy with the following expressions:  
| Selector    | Operator      | Value                        | Logic | Action |  
| ----------- | ------------- | ---------------------------- | ----- | ------ |  
| DLP Profile | in            | _Product SKUs_               | And   | Block  |  
| User Email  | matches regex | \[a-z0-9\]{0,15}@example.com |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "description": "Detect product SKUs shared by users in organization",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Detect product SKU leaks",

    "precedence": 0,

    "traffic": "any(dlp.profiles[*] in <SKU_DLP_PROFILE_UUID>)",

    "identity": "identity.email matches \"[a-z0-9]{0,15}@example.com\""

  }'


```

Explain Code

#### DLP datasets

If your data is a distinct [dataset](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/#datasets) you have defined, you can build a profile by uploading a database to use in an Exact Data Match or Custom Wordlist function. Exact Data Match and Custom Wordlist feature some key differences:

| Exact Data Match    | Custom Wordlist                                         |                                                                    |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| **Encryption**      | Hashed and compared to encrypted traffic                | Stored as plaintext                                                |
| **Payload logging** | Matches redacted in logs                                | Matches appear in logs                                             |
| **Usage**           | PII (such as names, addresses, and credit card numbers) | Non-sensitive data (such as intellectual property and SKU numbers) |

We recommend using Exact Data Match for highly sensitive datasets and Custom Wordlists for lists of keywords.

As your datasets change and grow, we recommend building a pipeline to update the data source in Cloudflare Zero Trust. For more information, contact your account team.

#### Microsoft Information Protection (MIP) labels

If your data already contains Microsoft Information Protection (MIP) labeling schema, Cloudflare can detect those values in-transit automatically. To get started, connect your Microsoft 365 account with a [CASB integration](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/). Cloudflare will automatically pull in your existing MIP definitions into Zero Trust. You can then use the MIP definitions to build DLP profiles for use in Gateway policies.

For more information, refer to [Integration profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/).

## Build DLP policies

The best way to start applying data loss prevention to your traffic, minimize the chance of false positives, and collect actionable data is to start with the known knowns in your sensitive data policies. Rather than building policies to detect sensitive data like SSNs or financial information across all of your traffic, you should start by building policies that target both sensitive data types and destinations that are known data sources or points of high risk. These sources can be inside or outside your organization.

### Example

Many organizations want to detect and log financial information egressing from user devices to critical SaaS applications. To limit the risk of false positives and to filter out logging noise, Cloudflare recommends building your first series of policies to specify both target data and target destination. For example, you can block financial information from being sent to AI chatbots, such as ChatGPT and Gemini:

* [ Dashboard ](#tab-panel-5283)
* [ API ](#tab-panel-5284)

| Selector           | Operator | Value                     | Logic | Action |
| ------------------ | -------- | ------------------------- | ----- | ------ |
| DLP Profile        | in       | _Financial Information_   | And   | Block  |
| Content Categories | in       | _Artificial Intelligence_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "description": "Prevent financial information from being shared with AI tools",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Block AI financial info",

    "precedence": 0,

    "traffic": "any(dlp.profiles[*] in <FINANCIAL_INFO_DLP_PROFILE_UUID>) and any(http.request.uri.content_category[*] in {184})"

  }'


```

Explain Code

Once you have analyzed the flow and magnitude of data from the known sources, you can begin focusing on more specialized or explicit datasets for more generalized sources. You may want to allow sources that are known internal locations where sensitive data is intentionally transferred.

After developing a level of confidence from reviewing the logs and evaluating a rate of false positives for both types of policies, you can feel more confident in experimenting more broadly with data loss prevention policies.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/","name":"Build HTTP security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/data-loss-prevention/","name":"Build Data Loss Prevention (DLP) policies"}}]}
```
