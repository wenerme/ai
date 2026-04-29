---
title: Run as a service
description: Run cloudflared as a system service on Linux, macOS, or Windows.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Run as a service

You can install `cloudflared` as a system service on Linux and Windows, and as a launch agent on macOS. In most cases, we recommend running `cloudflared` as a service. Running as a service helps ensure the availability of `cloudflared` to your origin by allowing the program to start at boot and continue running while your origin is online.

Follow our guides to set up and run `cloudflared` as a service in your environment:

* [ Linux ](https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/linux/)
* [ macOS ](https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/macos/)
* [ Windows ](https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/windows/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/advanced/","name":"Advanced"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/advanced/local-management/","name":"Locally-managed tunnels"}},{"@type":"ListItem","position":5,"item":{"@id":"/tunnel/advanced/local-management/as-a-service/","name":"Run as a service"}}]}
```
