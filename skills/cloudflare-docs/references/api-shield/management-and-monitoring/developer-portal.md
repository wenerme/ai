---
title: Build developer portals
description: Once your endpoints are saved, API Shield doubles as an API catalog. API Shield can build an interactive documentation portal with the knowledge it has of your APIs, or you can upload a new OpenAPI schema file to build a documentation portal ad-hoc.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/management-and-monitoring/developer-portal.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Build developer portals

Once your endpoints are saved, API Shield doubles as an API catalog. API Shield can build an interactive documentation portal with the knowledge it has of your APIs, or you can upload a new OpenAPI schema file to build a documentation portal ad-hoc.

To create a developer portal:

* [  New dashboard ](#tab-panel-3116)
* [ Old dashboard ](#tab-panel-3117)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **API abuse**.
3. On **Create a developer portal**, select **Create site**.
4. Upload an OpenAPI v3.0 schema file or choose to select an existing schema from API Shield.  
Note  
If you do not have a schema to upload or to select from a pre-existing schema, export your Endpoint Management schema. For best results, include the learned parameters.  
Only API schemas uploaded to Schema validation 2.0 are available when selecting existing schemas.
5. Select **Download project files** to save a local copy of the files that will be uploaded to Cloudflare Pages. Downloading the project files can be helpful if you wish to modify the project in any way and then upload the new version manually to Pages.
6. Select **Create pages project** to begin project creation. A new Pages project will be automatically created and your API schema will be automatically uploaded to the project along with other supporting static content.
7. Select **Deploy site**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield** \> **Settings**.
3. Under **Create a developer portal**, select **Create site**.
4. Upload an OpenAPI v3.0 schema file or choose to select an existing schema from API Shield.  
Note  
If you do not have a schema to upload or to select from a pre-existing schema, export your Endpoint Management schema. For best results, include the learned parameters.  
Only API schemas uploaded to Schema validation 2.0 are available when selecting existing schemas.
5. Select **Download project files** to save a local copy of the files that will be uploaded to Cloudflare Pages. Downloading the project files can be helpful if you wish to modify the project in any way and then upload the new version manually to Pages.
6. Select **Create pages project** to begin project creation. A new Pages project will be automatically created and your API schema will be automatically uploaded to the project along with other supporting static content.
7. Select **Deploy site**.

### Custom domains

To create a vanity domain instead of using the pages.dev domain, refer to the [Pages custom domain documentation](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Availability

Building developer portals is available to all API Shield subscribers. This feature uses Cloudflare Pages to host the resulting portal. Refer to [Pages](https://developers.cloudflare.com/pages/) for any limitations of your current subscription plan.

## Limitations

This feature currently uses the open source [Redoc ↗](https://github.com/Redocly/redoc) project from [Redocly ↗](https://redocly.com/). For custom theme and branding options, visit the [Redoc GitHub repository ↗](https://github.com/Redocly/redoc).

To modify the resulting page, download the project files before creating the Pages project. You can create a new Pages project with the modified files you have made to meet your branding guidelines.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/management-and-monitoring/","name":"Management and Monitoring"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/management-and-monitoring/developer-portal/","name":"Build developer portals"}}]}
```
