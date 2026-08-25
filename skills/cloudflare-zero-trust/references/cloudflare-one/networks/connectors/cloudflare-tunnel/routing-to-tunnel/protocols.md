---
description: Reference information for Protocols for published applications in Zero Trust networking.
title: Protocols for published applications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Protocols for published applications

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you [add a published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application) to a Cloudflare Tunnel, you are instructing Cloudflare to proxy requests for your public hostname to a service running privately behind `cloudflared`.

The table below lists the service types you can route to a public hostname. Non-HTTP services require [installing cloudflared on the client](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/) for end users to connect.

| Service type | Description                                                                                                                                                                                                                                                                                                                                                                                                                    | Example service value               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| HTTP         | Proxies incoming HTTPS requests to your local web service over HTTP.                                                                                                                                                                                                                                                                                                                                                           | http://localhost:8000               |
| HTTPS        | Proxies incoming HTTPS requests directly to your local web service. You can [disable TLS verification](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/#notlsverify) for self-signed certificates.                                                                                                                                                  | https://localhost:8000              |
| UNIX         | Same as HTTP, but uses a Unix socket.                                                                                                                                                                                                                                                                                                                                                                                          | unix:/home/production/echo.sock     |
| UNIX + TLS   | Same as HTTPS, but uses a Unix socket.                                                                                                                                                                                                                                                                                                                                                                                         | unix+tls:/home/production/echo.sock |
| TCP          | Streams TCP over a WebSocket connection. End users run cloudflared access tcp to [connect](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/arbitrary-tcp/). For long-lived connections, use [Client-to-Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) instead.                     | tcp://localhost:2222                |
| SSH          | Streams SSH over a WebSocket connection. End users run cloudflared access ssh to [connect](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/). For long-lived connections, use [Client-to-Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) instead. | ssh://localhost:22                  |
| RDP          | Streams RDP over a WebSocket connection. For more information, refer to [Connect to RDP with client-side cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-cloudflared-authentication/).                                                                                                                                                                   | rdp://localhost:3389                |
| SMB          | Streams SMB over a WebSocket connection. For more information, refer to [Connect to SMB with client-side cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/#connect-to-smb-server-with-cloudflared-access).                                                                                                                                                    | smb://localhost:445                 |
| HTTP\_STATUS | Responds to all requests with a fixed HTTP status code.                                                                                                                                                                                                                                                                                                                                                                        | http\_status:404                    |
| BASTION      | Allows cloudflared to act as a jump host, providing access to any local address.                                                                                                                                                                                                                                                                                                                                               | bastion                             |
| HELLO\_WORLD | Test server for validating your Cloudflare Tunnel connection (for [locally managed tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/#file-structure-for-published-applications) only).                                                                                                                                 | hello\_world                        |

## IPv6 service addresses

When the service value is an IPv6 literal, wrap the address in square brackets as defined by [RFC 3986 ↗](https://datatracker.ietf.org/doc/html/rfc3986#section-3.2.2). The brackets are required so that the `:` characters in the address are not confused with the port separator.

| Service type | Example service value       |
| ------------ | --------------------------- |
| HTTP         | http://\[2001:db8::1\]:8000 |
| HTTPS        | https://\[2001:db8::1\]:443 |
| TCP          | tcp://\[2001:db8::1\]:2222  |
| SSH          | ssh://\[2001:db8::1\]:22    |
| RDP          | rdp://\[2001:db8::1\]:3389  |

Hostnames and IPv4 addresses do not need brackets — `http://localhost:8000` and `http://192.0.2.1:8000` are valid as-is.

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/#page","headline":"Protocols for published applications · Cloudflare One docs","description":"Reference information for Protocols for published applications in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
