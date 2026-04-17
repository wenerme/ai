---
title: Debug mode
description: Enable Zaraz debug mode to inspect events in the browser console.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/web-api/debug-mode.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Debug mode

Zaraz offers a debug mode to troubleshoot the events and triggers systems. To activate debug mode you need to create a special debug cookie (`zarazDebug`) containing your debug key. You can set this cookie manually or via the `zaraz.debug` helper function available in your console.

1. In the Cloudflare dashboard, go to the **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/tag-management/settings)
2. Copy your **Debug Key**.
3. Open a web browser and access its Developer Tools. For example, to access Developer Tools in Google Chrome, select **View** \> **Developer** \> **Developer Tools**.
4. Select the **Console** pane and enter the following command to create a debug cookie:  
JavaScript  
```  
zaraz.debug("YOUR_DEBUG_KEY")  
```

Zaraz’s debug mode is now enabled. A pop-up window will show up with the debugger information. To exit debug mode, remove the cookie by typing `zaraz.debug()` in the console pane of the browser.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/web-api/","name":"Web API"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/web-api/debug-mode/","name":"Debug mode"}}]}
```
