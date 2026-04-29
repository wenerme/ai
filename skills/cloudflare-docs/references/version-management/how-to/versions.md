---
title: Manage versions
description: Create, edit, and deploy configuration versions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/version-management/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage versions

A version is a collection of configurations related to your zone, such as WAF custom rules and [other optimization configurations](https://developers.cloudflare.com/version-management/reference/available-configurations/).

---

## Create version

Once you [enable](https://developers.cloudflare.com/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

* **Version Zero**, think about this as the configuration of your current zone. Once default environments are created, Version Zero is automatically deployed to them, guaranteeing no disruption in your live traffic. This Version is also permanently editable. In case you decide to disable Zone Versioning, Version Zero will become your zone again.
* **Global Configuration**, you can find all the configurations here that are not supported by Version Management.

Important

Any changes made to the **Global Configuration** will immediately apply to your zone and all versions of your zone, affecting live traffic.

On the Environments page, you can create default environments for **Production**, **Staging**, and **Development**.

If you need to test out different implementations of configurations at the same time or multiple types of changes, create a new version of your zone.**Zone Versioning** roles are not adequate for creating a new version. A **Super Administrator** or **Administrator** role is required.

To create a new version:

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and zone.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **Version Management**.
3. On an existing version, select **Clone**. This will copy over all configurations from that version.
4. If needed, you can also **Edit Description** to provide more detail about the purpose of this version.

---

## Change configurations in a version

Your zone configurations are split up into two areas: **Global Configuration** and different versions.

* Global Configuration controls the configurations of a zone that is not available for versioning and, when changed, automatically apply to all versions of your zone.
* Version configurations update configurations of a zone that is available for versioning and are:  
   * Editable when not applied to a [read-only environment](https://developers.cloudflare.com/version-management/reference/read-only-environments/).  
   * Applied when [associated with an environment](https://developers.cloudflare.com/version-management/how-to/environments/#change-environment-version).

Note

To use the API for a different version, you will need to use a different zone ID.

### Editable versions

Before making changes, make sure you are inside the correct version of your zone.

To change between different versions of your zone:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and a domain that has version management. The Global Configuration of your domain will load.
3. Go to the product or feature you wish to modify.  
   * **If the product or feature is available for versioning**: The last version you were working on will load.  
   * **If the product or feature is NOT available for versioning**: Your Global Configuration will load, and any changes you make will impact live traffic.
4. Ensure that the configuration or version displayed in the domain summary bar is the one you would like to work on. If not, select the version in the domain summary bar to open the version switcher.

Note

If you are on a product that is not available for versioning, you will not be able to switch to another version, and can only make changes under your Global Configuration.

The Domain Summary is accessible from all pages and allows you to quickly switch between versions and domains.

![Switch between versions of your configuration](https://developers.cloudflare.com/_astro/configurable-versions.BsHb-j9S_Z1DdDYI.webp) 

From within a version, you can update configurations just as you would with your normal zone configurations. Any changes are saved automatically.

Note

To change the version associated with an environment, you need to update configurations on the [Environment](https://developers.cloudflare.com/version-management/how-to/environments/#change-environment-version) itself.

### Read-only versions

**Production** is a read-only environment by default. This means that any version associated with **Production** also becomes read-only. This configuration prevents another member of your account from accidentally editing the version associated with your live traffic. You can change this configuration by editing the environment.

  
In order to change configurations in a version associated with a [read-only environment](https://developers.cloudflare.com/version-management/reference/read-only-environments/), either:

* [Change the environment version](https://developers.cloudflare.com/version-management/how-to/environments/#change-environment-version) to another version and then make changes to your version.
* [Edit](https://developers.cloudflare.com/version-management/how-to/environments/#edit-environment) the environment's configurations to remove the **Read-only environment** configuration. Then, promote a new version to this environment.

---

## View metrics

Once you begin [sending traffic](https://developers.cloudflare.com/version-management/reference/traffic-filters/) to an environment with a version applied, you can also view metrics about what happens to that traffic.

To view metrics:

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and zone.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **Version Management**.
3. On an existing version, select **View Metrics**.

Note

You will only see metrics for the specific version that is active in the Cloudflare dashboard during the time frame that you select.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/how-to/versions/","name":"Manage versions"}}]}
```
