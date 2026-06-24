---
title: Roles and permissions
description: User roles and API token permissions required to access and configure client-side security.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/client-side-security/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Roles and permissions

Cloudflare users with the following [roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/) have access to client-side security in the Cloudflare dashboard:

* Administrator
* Super Administrator - All Privileges
* Page Shield
* Page Shield Read _(read-only access)_
* Domain Page Shield
* Domain Page Shield Read _(read-only access)_

The availability of specific features depends on your client-side security bundle. Refer to [Availability](https://developers.cloudflare.com/client-side-security/#availability) for more information.

## API token permissions

To interact with the [client-side security API](https://developers.cloudflare.com/client-side-security/reference/api/) you need an API token with one of the following [permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/):

* [ Dashboard ](#tab-panel-7067)
* [ API ](#tab-panel-7068)

* Client-side security > Edit
* Client-side security > Read _(read-only access)_

* Page Shield Write
* Page Shield Read _(read-only access)_

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/client-side-security/reference/roles-and-permissions/#page","headline":"Roles and permissions · Client-side security docs","description":"User roles and API token permissions required to access and configure client-side security.","url":"https://developers.cloudflare.com/client-side-security/reference/roles-and-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/reference/roles-and-permissions/","name":"Roles and permissions"}}]}
```
