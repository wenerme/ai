---
description: Learn Schema Profiles from qualifying operation traffic.
title: Schema learning
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema learning

Last updated Aug 19, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Schema Learning is the learned source for a Schema Profile. For the shared detection and mitigation model, refer to [Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/).

Schema Learning observes qualifying traffic for selected operations. It learns expected request fields and constraints for a Schema Profile.

## Start profile learning

1. In the Cloudflare dashboard, go to **Web Assets** \> **Operations**.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Open the operation overflow menu and select **Learn profile**.
3. After the profile becomes available, select **View details**.
4. Review the learned schema under **Security overview**.

Cloudflare runs an **always-on detection** after the learned profile becomes available. The detection does not mitigate requests by itself.

To investigate results, refer to [Analyze profile detections](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/). To mitigate violations, refer to [Enforce profiles with Custom Rules](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/).

## Meet learning requirements

Learning runs weekly using qualifying traffic from the previous seven days. Only requests that received a `2xx` response contribute.

The field-learning threshold requires 1,000 qualifying requests. The boundary-learning threshold requires 10,000 qualifying requests.

The first profile appears after the next weekly learning run. This can take up to seven days after meeting the relevant threshold.

For supported request components, constraints, and limitations, refer to [Schema Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/).

## Export a schema

Export creates a separate OpenAPI file from the current learned profile. It does not change the profile or its detection.

1. In the Cloudflare dashboard, go to the **Web Assets** page.
[Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Operations** tab.
3. Select **Export schema** and choose a hostname to export.
4. Select whether to include learned parameters and rate limit recommendations.
5. Select **Export schema** and choose a location to save the file.

Note

The schema is saved as a JSON file in OpenAPI `v3.0.0` format.

## Learned schema contents

Exported schemas include the listed hostname in the servers section. They also include operations by hostname, method, and path.

For operations that receive sufficient traffic, exported schemas also include:

* Detected path variables and formats
* Detected query parameters and formats
* Detected `POST`, `PUT`, and `PATCH` body variable names and formats for `application/json` content types

Exported schemas can optionally include API Shield rate limit recommendations.

For a fixed Schema Profile, upload the exported file through [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#page","headline":"Schema learning · Cloudflare API Shield docs","description":"Learn Schema Profiles from qualifying operation traffic.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
