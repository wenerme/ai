---
title: Read-only environments
description: When an environment is read-only, versions deployed to this environment will permanently become read-only. This configuration protects sensitive environments from accidental changes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/version-management/reference/read-only-environments.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Read-only environments

When an environment is read-only, versions deployed to this environment will permanently become read-only. This configuration protects sensitive environments from accidental changes.

**Version Zero** is an exception to this rule and is always editable.

**Production** is a read-only environment by default. This means that any version associated with **Production** also becomes read-only. This configuration prevents another member of your account from accidentally editing the version associated with your live traffic. You can change this configuration by editing the environment.

  
For similar reasons, some organizations may make **Staging** a read-only environment. Otherwise, another member of your account could make changes to a version in **Staging** _after_ your organization has performed the validation tests prior to promoting to **Production**. Without having a read-only **Staging** environment, this change could be released into **Production** without testing and might cause an issue with live traffic.

To change the read-only status of an environment, [edit the environment](https://developers.cloudflare.com/version-management/how-to/environments/#edit-environment).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/version-management/","name":"Version Management"}},{"@type":"ListItem","position":3,"item":{"@id":"/version-management/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/version-management/reference/read-only-environments/","name":"Read-only environments"}}]}
```
