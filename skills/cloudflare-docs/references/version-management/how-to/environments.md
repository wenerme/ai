---
title: Manage environments
description: Create and configure Version Management environments.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/version-management/how-to/environments.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Manage environments

An environment is a place to test different versions of your zone configurations.

---

## Create environment

Once you [enable](https://developers.cloudflare.com/version-management/how-to/enable/) Version Management, Cloudflare will automatically create:

* **Version Zero**, think about this as the configuration of your current zone. Once default environments are created, Version Zero is automatically deployed to them, guaranteeing no disruption in your live traffic. This Version is also permanently editable. In case you decide to disable Zone Versioning, Version Zero will become your zone again.
* **Global Configuration**, you can find all the configurations here that are not supported by Version Management.

Important

Any changes made to the **Global Configuration** will immediately apply to your zone and all versions of your zone, affecting live traffic.

On the Environments page, you can create default environments for **Production**, **Staging**, and **Development**.

Based on your organization's needs, you may need to create additional environments to test and roll out changes.

  
To create a new environment:

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and zone.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **Version Management**.
3. Go to **Environments**.
4. Select **Create Environment**.
5. Provide the following information:
* **Environment Name**: A unique, descriptive name for the environment.
* [**Traffic filter**](https://developers.cloudflare.com/version-management/reference/traffic-filters/): Limits which requests are sent to this environment.
* **Initial position**: Controls where this environment should be in your testing process.
1. Select **Create**.

Note

You can only adjust the [**Read-only Environment**](https://developers.cloudflare.com/version-management/reference/read-only-environments/) configuration after an environment has been created.

---

## Edit environment

To edit an environment:

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and zone.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **Version Management**.
3. Select **Environments**.
4. On a specific environment, select **Edit**.
5. Make any required changes.
6. Select **Save**.

---

## Change environment version

To prevent accidental changes, you can only update an environment's version through the process of **Promotion** or **Roll back**.

For more details on the flow of versions and environments, refer to [How it works](https://developers.cloudflare.com/version-management/about/).

### Promote a version

Promotion moves a version from a lower-ranked environment to the next highest one.

To promote a version:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On the environment in which you tested the version, select **Promote**. This option will only be available if the lower-ranked environment has a different version than the higher-ranked environment.

Promoting a version to a read-only environment will make the version permanently read-only.

  
### Roll back a version

When you roll back a version, you revert the environment to the previous version assigned to it.

To roll back a version:

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and zone.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **Version Management**.
3. Select **Environments**.
4. On a specific environment, select **Roll back**.

---

## Delete environment

To delete an environment:

1. In the Cloudflare dashboard, go to the **Account home** page and select your account and zone.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **Version Management**.
3. Select **Environments**.
4. On a specific environment, select **Edit**.
5. Select **Delete Environment**.

Note

You cannot delete your **Production** environment.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/how-to/environments/","name":"Manage environments"}}]}
```
