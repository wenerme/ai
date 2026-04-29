---
title: Embeds
description: Embed third-party widgets like chat and support tools with Zaraz.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Embeds

Embeds are tools for incorporating external content, like social media posts, directly onto webpages, enhancing user engagement without compromising site performance and security.

Cloudflare Zaraz introduces server-side rendering for embeds, avoiding third-party JavaScript to improve security, privacy, and page speed. This method processes content on the server side, removing the need for direct communication between the user's browser and third-party servers.

To add an Embed to Your Website:

1. In the Cloudflare dashboard, go to the **Tag Setup** page.  
[ Go to **Tag setup** ](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Go to **Tools Configuration**.
3. Click "add new tool" and activate the desired tools on your Cloudflare Zaraz dashboard.
4. Add a placeholder in your HTML, specifying the necessary attributes. For a generic embed, the snippet looks like this:

```

<componentName-embedName attribute="value"></componentName-embedName>


```

Replace `componentName`, `embedName` and `attribute="value"` with the specific Managed Component requirements. Zaraz automatically detects placeholders and replaces them with the content in a secure and efficient way.

## Examples

### X (Twitter) embed

```

<twitter-post tweet-id="12345"></twitter-post>


```

Replace `tweet-id` with the actual tweet ID for the content you wish to embed.

### Instagram embed

```

<instagram-post post-url="https://www.instagram.com/p/ABC/" captions="true"></instagram-post>


```

Replace `post-url` with the actual URL for the content you wish to embed. To include posts captions set captions attribute to `true`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/embeds/","name":"Embeds"}}]}
```
