---
title: Locally-managed tunnels
description: Manage tunnels from the command line without the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Locally-managed tunnels

Cloudflare recommends creating a [remotely-managed tunnel](https://developers.cloudflare.com/tunnel/setup/) for most use cases. Remotely-managed tunnels store their configuration on Cloudflare, which allows you to manage the tunnel from any machine using the dashboard, API, or Terraform.

As an alternative workflow, you can create a locally-managed tunnel by running `cloudflared tunnel create <NAME>` on the command line. Tunnel configuration is stored in your local `cloudflared` directory. Locally-managed tunnels are intended for specific scenarios such as local development, testing, or legacy configurations.

* [ Create a locally-managed tunnel ](https://developers.cloudflare.com/tunnel/advanced/local-management/create-local-tunnel/)
* [ Configuration file ](https://developers.cloudflare.com/tunnel/advanced/local-management/configuration-file/)
* [ Run as a service ](https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/)
* [ Useful commands ](https://developers.cloudflare.com/tunnel/advanced/local-management/tunnel-useful-commands/)
* [ Tunnel permissions ](https://developers.cloudflare.com/tunnel/advanced/local-management/tunnel-permissions/)
* [ Useful terms ](https://developers.cloudflare.com/tunnel/advanced/local-management/local-tunnel-terms/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/advanced/","name":"Advanced"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/advanced/local-management/","name":"Locally-managed tunnels"}}]}
```
