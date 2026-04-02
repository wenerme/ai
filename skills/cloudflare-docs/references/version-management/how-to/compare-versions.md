---
title: Compare versions
description: Quickly view differences between versions to make sure your configurations are correct before promoting a version to a new environment.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/version-management/how-to/compare-versions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Compare versions

Quickly view differences between versions to make sure your configurations are correct before [promoting a version](https://developers.cloudflare.com/version-management/how-to/environments/#change-environment-version) to a new environment.

A common use case would be to compare the versions in staging and production to verify the changes before promoting the staging version to production.

To compare versions:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select your account and zone.
3. Go to **Version Management** \> **Comparisons**.
4. Select two different versions.
5. Select **Compare**.

After a few seconds, the page will update automatically with a comparison on a per-product basis. The lower numbered version will always be presented on the left and the top will show you which environments the versions are assigned to so that you can ensure you are comparing the right versions.

![View changes side-by-side between versions](https://developers.cloudflare.com/_astro/compare-versions.AiuozF29_1XIryy.webp) 

Changes will be highlighted for new additions and removals for that service. Based on the comparison, you can then decide if more changes are necessary or if that new version is ready to be rolled out.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/how-to/compare-versions/","name":"Compare versions"}}]}
```
