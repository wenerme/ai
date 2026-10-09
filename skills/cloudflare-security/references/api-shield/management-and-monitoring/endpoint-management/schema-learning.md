---
description: Learn Schema Profiles from qualifying operation traffic.
title: Learn request schemas
image: https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/og.png?v=d7101eeb6d9bbce0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Learn request schemas

Last updated Oct 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Schema Learning is the learned source for a Schema Profile. For the shared detection and mitigation model, refer to [Application Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/).

Learn expected request fields and constraints from qualifying operation traffic.

## Start profile learning

1. In the Cloudflare dashboard, go to **Web Assets** > **Operations**. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Open the operation overflow menu and select **Learn profile**.
3. After the profile becomes available, select **View details**.
4. Follow the [steps to review learning results](#review-learning-results).

Cloudflare runs an **always-on detection** after the learned profile becomes available. The detection does not mitigate requests by itself.

To investigate results, refer to [Analyze profile detections](https://developers.cloudflare.com/waf/detections/application-profiles/analyze-profile-detections/). To mitigate violations, refer to [Enforce profiles with Custom Rules](https://developers.cloudflare.com/waf/detections/application-profiles/enforce-profiles-with-custom-rules/).

## Meet learning requirements

Learning runs weekly using qualifying traffic from the previous seven days. Only requests that received a `2xx` response contribute.

The field-learning threshold requires 1,000 qualifying requests. The boundary-learning threshold requires 10,000 qualifying requests.

With scheduled learning, the first profile appears after the next weekly run. This can take up to seven days after meeting the relevant threshold. You can also [request a learning run manually](#run-schema-learning-manually).

For supported request components, constraints, and limitations, refer to [Schema Profiles](https://developers.cloudflare.com/waf/detections/application-profiles/schema-profiles/).

## Run schema learning manually

Request an ad-hoc learning run without waiting for the weekly schedule. For example, request a run after sending representative traffic during testing.

The run covers the entire zone, rather than one operation. It uses observed traffic and does not generate requests. Operations must be selected for profile learning and meet the [learning requirements](#meet-learning-requirements).

1. In the Cloudflare dashboard, go to **Web Assets** > **Operations**. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Open the **More options** menu for the operations table.
3. Select **Ad-hoc learn schema** to open the **Schema learning** dialog.
4. Select **Run learning** to request a zone-wide run.

The dialog shows the learning status and **Last completed run** for the zone. **Running** includes time waiting for processing. **Idle** means no run is active. **Waiting to retry** means Cloudflare is waiting to retry an existing run.

The run button is unavailable while a run is active or waiting to retry. If the button shows **Retry in**, wait before requesting another run. The countdown limits manual requests and does not predict when learning finishes.

If you have read-only access, the menu shows **Schema learning**. You can view the status but cannot request a run.

### Review learning results

Completion time depends on traffic volume. Individual operations can finish before the entire zone-wide run completes.

1. From the overflow menu for an operation, select **View details**.
2. In **Security overview** > **Schema validation**, select **View**.
3. Select **Learned schema**.
4. Review **Schema learning result** and **Last learning run** to check whether that operation has been processed.

The result shows one of these outcomes:

| Outcome | Meaning |
| --- | --- |
| **Schema learned** | Cloudflare learned a schema for the operation. |
| **No usable traffic** | The run found no usable traffic for the operation. |
| **Learning failed** | The learning attempt for the operation failed. |

**No learning result recorded** means no result is available yet. Review the learned schema before enforcing its detection.

## Export a schema

Export availability depends on your plan. Each export creates a point-in-time OpenAPI file from the current learned profile. It does not change the profile or its detection.

1. In the Cloudflare dashboard, go to the **Web Assets** page. [Go to **Web assets** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Go to the **Operations** tab.
3. Select **Export schema** and choose a hostname to export.
4. Select whether to include learned parameters and rate limit recommendations.
5. Select **Export schema** and choose a location to save the file.

Note

The schema is saved as a JSON file in OpenAPI `v3.0.0` format.

## Learned schema contents

Exported schemas include the listed hostname in the servers section. They also include operations by hostname, method, and path.

For operations that receive sufficient traffic, exported schemas also include:

- Detected path variables and formats
- Detected query parameters and formats
- Detected `POST`, `PUT`, and `PATCH` body variable names and formats for `application/json` content types

Exported schemas can optionally include API Shield rate limit recommendations.

For a fixed Schema Profile, upload the exported file through [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/#page","headline":"Learn request schemas","description":"Learn Schema Profiles from qualifying operation traffic.","url":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/","inLanguage":"en","image":"https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/schema-learning/og.png?v=d7101eeb6d9bbce0","dateModified":"2026-10-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
