---
title: Remote browser isolation
description: How Remote browser isolation works in Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Debugging ](https://developers.cloudflare.com/search/?tags=Debugging) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/remote-browser-isolation/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Remote browser isolation

Note

Remote browser isolation is available as an add-on to Zero Trust Pay-as-you-go and Enterprise plans.

Cloudflare Browser Isolation complements the [Secure Web Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) (which inspects and filters HTTP/HTTPS traffic) and [Zero Trust Network Access](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) (which controls access to private applications) by executing active webpage content — executable code such as JavaScript and plugins — in a secure isolated browser. Because active content executes remotely instead of on the user's device, Browser Isolation protects users from zero-day attacks (attacks that exploit vulnerabilities with no available patch) and malware.

Browser Isolation also protects users from phishing attacks by preventing user input on risky websites and controlling data transmission to sensitive web applications. You can further filter isolated traffic with Gateway [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) and [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) policies.

Remote browsing is invisible to the user who continues to use their browser normally without changing their preferred browser and habits. Every open tab and window is automatically isolated. When the user closes the isolated browser, their session is automatically deleted.

## Privacy

Cloudflare Browser Isolation is a security product. In order to serve transparent isolated browsing and block web based threats our network decrypts Internet traffic using the [Cloudflare root CA](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/). Traffic logs are retained as per the [Zero Trust](https://developers.cloudflare.com/cloudflare-one/insights/logs/) documentation.

## Troubleshooting

For help resolving common issues with Browser Isolation, refer to [Troubleshoot Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/remote-browser-isolation/","name":"Remote browser isolation"}}]}
```
