---
title: Override a Set-Cookie header with a certain value
description: Get a specific `Set-Cookie` header and update it with a certain value.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Override a Set-Cookie header with a certain value

Get a specific `Set-Cookie` header and update it with a certain value.

**JavaScript**

```js
export default {
  async fetch(request) {
    // Receive response from the origin
    const response = await fetch(request);


    // Create a new Headers object to modify response headers
    const newHeaders = new Headers(response.headers);


    // Get all Set-Cookie headers
    const cookieArray = response.headers.getSetCookie();
    if (cookieArray.length > 0) {
      const updatedCookies = cookieArray.map((cookie) => {
        // For example, replace the currency value with GBP
        if (cookie.trim().startsWith("currency=")) {
          return cookie.replace(/currency=[^;]+/, "currency=GBP");
        }
        return cookie;
      });


      // Delete the existing Set-Cookie headers
      newHeaders.delete("Set-Cookie");


      // Add the updated Set-Cookie headers individually
      updatedCookies.forEach((cookie) => {
        newHeaders.append("Set-Cookie", cookie.trim());
      });
    }


    // Return the modified response with updated headers
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  },
};
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/override-set-cookies-value/#page","headline":"Override a Set-Cookie header with a certain value · Cloudflare Rules docs","description":"Get a specific Set-Cookie header and update it with a certain value.","url":"https://developers.cloudflare.com/rules/snippets/examples/override-set-cookies-value/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-11-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Cookies","Response modification"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/override-set-cookies-value/","name":"Override a Set-Cookie header with a certain value"}}]}
```
