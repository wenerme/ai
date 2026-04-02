---
title: Troubleshooting
description: Troubleshoot issues with Cloudflare Fonts
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/optimization/content/fonts/troubleshooting.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshooting

## Validate the Fonts feature is working

To test that the Fonts feature is working correctly, follow these steps:

1. With the Fonts feature disabled, navigate to your webpage and open the network panel in your browser's developer tools. For Chrome, right click on the webpage and select **Inspect**, which open the developer tools. Next, navigate to the **Network** tab within the console.
2. Reload the page.
3. In the Network tab, you should have a request to `fonts.googleapis.com`, and a request to `fonts.gstatic.com`. This means that Google Fonts are being downloaded for this page. If you do not have these requests in the list, either your webpage is not using Google Fonts, or your hosting provider might be optimizing the Google Fonts in some other way.
4. [Enable Cloudflare Fonts](https://developers.cloudflare.com/speed/optimization/content/fonts/#get-started) and wait for a few seconds.
5. In the inspect window, toggle **Disable cache** on and reload the page.
6. In the network panel, you should now have a request to your zone on the `/cf-fonts/` path prefix. The requests to `fonts.googleapis.com` and `fonts.gstatic.com` should have disappeared. This means the feature is working correctly.

## Feature is not working

For the feature to work, the response HTML (when the feature is disabled) must include a link tag with `href` pointing to `fonts.googleapis.com`. You can check this on the browser by viewing the source code of the webpage. As an example of what to look for, the following link tag is for the Roboto Google Font:

```

<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">


```

If the tag does not exist in the HTML, but you are still sure that your page is using Google Fonts, it might be that your hosting provider is optimizing your Google Fonts on the server. This can prevent Cloudflare Fonts from working properly.

## Other issues with Cloudflare Fonts

If you experience any issues or have questions while using Cloudflare Fonts, refer to the [Cloudflare Community ↗](https://community.cloudflare.com/) pages or contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) for assistance.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/optimization/","name":"Settings"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/optimization/content/","name":"Content optimizations"}},{"@type":"ListItem","position":5,"item":{"@id":"/speed/optimization/content/fonts/","name":"Cloudflare Fonts"}},{"@type":"ListItem","position":6,"item":{"@id":"/speed/optimization/content/fonts/troubleshooting/","name":"Troubleshooting"}}]}
```
