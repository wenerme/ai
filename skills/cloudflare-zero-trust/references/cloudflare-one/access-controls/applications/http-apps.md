---
description: How Add web applications works in Access.
title: Add web applications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Add web applications

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare Access allows you to secure your web applications by acting as an identity-aware proxy. Access sits in front of your application and checks each request against your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) before allowing it through. You can use signals from your existing identity providers (IdPs), device posture providers, and [other selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors) to control who can reach the application.

![Cloudflare Access verifies a user's identity before granting access to your application.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=3791,height=1399,format=webp/_astro/diagram-saas.BmFlwn8e.jpg)

You can protect the following types of web applications:

* [**SaaS applications**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) consist of applications your team relies on that are not hosted by your organization. Examples include Salesforce and Workday. To secure SaaS applications, you must integrate Cloudflare Access with the SaaS application's SSO configuration.
* **Self-hosted applications** consist of internal applications that you host in your own environment. These can be the data center versions of tools like the Atlassian suite or applications created by your own team. Setup requirements for a self-hosted application depend on whether the application is publicly accessible on the Internet or restricted to users on a private network.

  * [**Public hostname applications**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) are web applications that have public DNS records. Anyone on the Internet can access the application by entering the URL in their browser and authenticating through Cloudflare Access. Securing access to a public website requires a Cloudflare DNS [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [partial CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).
  * [**Private network applications**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) do not have public DNS records, meaning they are not reachable from the public Internet. To connect using a private IP or private hostname, the user's traffic must route through Cloudflare Gateway. The preferred method is to install the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) on the user's device. Alternative options include forwarding traffic from a [network location](https://developers.cloudflare.com/cloudflare-wan/), using [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/), or [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/).
* [**Model Context Protocol (MCP) servers**](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/) are web applications that enable generative AI tools to read and write data within your business applications. For example, Salesforce provides an [MCP server ↗](https://github.com/salesforcecli/mcp) for developers to interact with resources in their Salesforce tenant using GitHub Copilot or other AI code editors.
* [**Cloudflare Dashboard SSO**](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/) is a special type of SaaS application that manages SSO settings for the Cloudflare dashboard and has limited permissions for administrator edits.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/#page","headline":"Add web applications · Cloudflare One docs","description":"How Add web applications works in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
