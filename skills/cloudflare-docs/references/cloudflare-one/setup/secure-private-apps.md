---
title: Secure private apps
description: Provide browser-based access to internal web applications, SSH servers, and remote desktops without installing software on user devices.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/setup/secure-private-apps/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Secure private apps

Cloudflare Access lets users reach internal applications through a browser without a VPN or client software on their device. You connect your application to Cloudflare using a secure connection called a tunnel, then protect it with policies that control who can access it. For more background, refer to [What is clientless access?](https://developers.cloudflare.com/learning-paths/clientless-access/concepts/what-is-clientless-access/).

How you set this up depends on the type of application you are securing. Choose the scenario that matches your use case:

[Private web application](https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/private-web-app/) 

Connect an internal web application to Cloudflare and control who can access it. Best for applications like company intranets, internal wikis, or admin panels.

[Clientless SSH](https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/clientless-ssh/) 

Provide in-browser command line access to an internal server without SSH client software on the user's device.

[In-browser remote desktop](https://developers.cloudflare.com/cloudflare-one/setup/secure-private-apps/in-browser-rdp/) 

Provide in-browser remote desktop access to Windows hosts without remote desktop client software on the user's device.

Note

For in-depth guidance on clientless access and advanced configuration, refer to the [Clientless access learning path](https://developers.cloudflare.com/learning-paths/clientless-access/concepts/what-is-clientless-access/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/setup/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/setup/secure-private-apps/","name":"Secure private apps"}}]}
```
