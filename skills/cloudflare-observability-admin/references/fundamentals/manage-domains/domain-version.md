---
description: Version Management allows you to safely test, deploy, and roll back changes to your zone configurations. By default, Version Management is not enabled on a zone.
title: Change your domain version
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Change your domain version

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/manage-domains/domain-version/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Version Management](https://developers.cloudflare.com/version-management/) is available for Enterprise customers and allows you to safely test, deploy, and roll back changes to your zone configurations.

## Enable versioning

By default, Version Management is not enabled on a zone.

To enable [Version Management ↗](https://dash.cloudflare.com/?to=/:account/:zone/versioning):

1. Log in to the Cloudflare dashboard.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Enable versioning**.

Note

If you cannot enable Version Management, make sure your zone, account, and user meet the [requirements](https://developers.cloudflare.com/version-management/#requirements).

## (Optional) Create additional environments

Once you [enable](https://developers.cloudflare.com/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

* **Version Zero**, think about this as the configuration of your current zone. Once default environments are created, Version Zero is automatically deployed to them, guaranteeing no disruption in your live traffic. This Version is also permanently editable. In case you decide to disable Zone Versioning, Version Zero will become your zone again.
* **Global Configuration**, you can find all the configurations here that are not supported by Version Management.

Important

Any changes made to the **Global Configuration** will immediately apply to your zone and all versions of your zone, affecting live traffic.

On the Environments page, you can create default environments for **Production**, **Staging**, and **Development**.

These environments each serve a specific purpose and are accessed differently:
* **Development**: Meant to validate that changes work correctly. The default [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/) are that the `cf.zone.name` matches your zone name, the `Edge Server IP` is a specific value, and the request contains a cookie with `development=true`.
* **Staging**: Meant to test changes before sending them to **Production**. The default [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/) are that the `cf.zone.name` matches your zone name and the `Edge Server IP` is a specific value.
* **Production**: Meant to hold all configurations applied to your zone. You cannot edit the [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/) \- which are just that the `cf.zone.name` is equal to your zone's name - and cannot delete this environment. This environment has a read-only check enabled, so versions promoted to this environment will become read-only as well.

Based on your organization's needs, you may need to create additional environments to test and roll out changes.


For more details, refer to [Create environment](https://developers.cloudflare.com/version-management/how-to/environments/#create-environment).

## Update configurations

Before making changes, make sure you are inside the correct version of your zone.

To change between different versions of your zone:

1. Log in to the Cloudflare dashboard.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and a domain that has version management. The Global Configuration of your domain will load.
3. Go to the product or feature you wish to modify.

  * **If the product or feature is available for versioning**: The last version you were working on will load.
  * **If the product or feature is NOT available for versioning**: Your Global Configuration will load, and any changes you make will impact live traffic.
4. Ensure that the configuration or version displayed in the domain summary bar is the one you would like to work on. If not, select the version in the domain summary bar to open the version switcher.

Note

If you are on a product that is not available for versioning, you will not be able to switch to another version, and can only make changes under your Global Configuration.

The Domain Summary is accessible from all pages and allows you to quickly switch between versions and domains.

![Switch between versions of your configuration](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1688,height=934,format=webp/_astro/configurable-versions.BsHb-j9S.png)

From within a version, you can update configurations just as you would with your normal zone configurations. Any changes are saved automatically.

## Test version

Once you have made changes to a version, apply that version to your lowest-ranked environment.

1. Log in to the Cloudflare dashboard.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and zone.
3. Go to **Version Management**.
4. Go to **Environments**.
5. On your lowest-ranked environment, use the **Version** dropdown to select your desired version.

To test your version, send requests to that environment that match the pattern specified in its [traffic filters](https://developers.cloudflare.com/version-management/reference/traffic-filters/).

For more details about what happens to these requests, refer to the version's [metrics](https://developers.cloudflare.com/version-management/how-to/versions/#view-metrics).

## Promote version

Next, [promote](https://developers.cloudflare.com/version-management/how-to/environments/#change-environment-version) your version through your different environments.

To promote a version:

1. Log in to the Cloudflare dashboard.
[Go to **Account home** ↗](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On the environment in which you tested the version, select **Promote**. This option will only be available if the lower-ranked environment has a different version than the higher-ranked environment.

Promoting a version to a read-only environment will make the version permanently read-only.

After promoting to each environment, test the new version in your new environment.

## Repeat

For new changes to your zone, [create a new version](https://developers.cloudflare.com/version-management/how-to/versions/#create-version) and repeat this process.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/domain-version/#page","headline":"Change your domain version · Cloudflare Fundamentals docs","description":"Version Management allows you to safely test, deploy, and roll back changes to your zone configurations. By default, Version Management is not enabled on a zone.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/domain-version/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
