---
title: Recommended deployment model
description: Use API deployment for easiest email setup.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Recommended deployment model

While there are multiple deployment methods, the easiest way to get started with Email security is via the API deployment method.

The API deployment with Email security offers:

* Easy protection for complex email architectures, without requiring any change to mail flow operations.
* Agentless deployment for Microsoft 365.
* Office 365 directory integration to retrieve user and group information and prevent user impersonation.
![Microsoft 365 API deployment diagram](https://developers.cloudflare.com/_astro/M365_API_Deployment_Graph.Czbz8tQF_ZWYsK4.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/get-started/","name":"Get started with Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/get-started/recommended-deployment-model/","name":"Recommended deployment model"}}]}
```
