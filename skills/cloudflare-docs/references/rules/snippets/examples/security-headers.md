---
title: Set security headers
description: Set common security headers such as X-XSS-Protection, X-Frame-Options, and X-Content-Type-Options.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Headers ](https://developers.cloudflare.com/search/?tags=Headers)[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

# Set security headers

Set common security headers such as X-XSS-Protection, X-Frame-Options, and X-Content-Type-Options.

JavaScript

```

export default {

  async fetch(request) {

    // Define an object with the security headers you want to set.

    // Refer to https://developers.cloudflare.com/rules/snippets/examples/security-headers/#other-common-security-headers for more options.

    const DEFAULT_SECURITY_HEADERS = {

      "X-Content-Type-Options": "nosniff",

      "Referrer-Policy": "strict-origin-when-cross-origin",

      "Cross-Origin-Embedder-Policy": 'require-corp; report-to="default";',

      "Cross-Origin-Opener-Policy": 'same-site; report-to="default";',

      "Cross-Origin-Resource-Policy": "same-site",

    };


    // You can also define headers to be deleted.

    const BLOCKED_HEADERS = [

      "Public-Key-Pins",

      "X-Powered-By",

      "X-AspNet-Version",

    ];


    // Receive response from the origin.

    let response = await fetch(request);


    // Create a new Headers object to modify response headers

    let newHeaders = new Headers(response.headers);


    // This sets the headers for HTML responses:

    if (

      newHeaders.has("Content-Type") &&

      !newHeaders.get("Content-Type").includes("text/html")

    ) {

      return new Response(response.body, {

        status: response.status,

        statusText: response.statusText,

        headers: newHeaders,

      });

    }


    // Use DEFAULT_SECURITY_HEADERS object defined above to set the new security headers.

    Object.keys(DEFAULT_SECURITY_HEADERS).map((name) => {

      newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name]);

    });


    // Use the BLOCKED_HEADERS object defined above to delete headers you wish to block.

    BLOCKED_HEADERS.forEach((name) => {

      newHeaders.delete(name);

    });


    return new Response(response.body, {

      status: response.status,

      statusText: response.statusText,

      headers: newHeaders,

    });

  },

};


```

Explain Code

## Other common security headers

* Content-Security-Policy headers: Enabling these headers will permit content from a trusted domain and all its subdomains. Refer to [Content-Security-Policy ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) for details.

JavaScript

```

"Content-Security-Policy": "default-src 'self' example.com *.example.com",


```

* Strict-Transport-Security headers: These are not automatically set because your website might get added to Chrome's HSTS preload list.

JavaScript

```

"Strict-Transport-Security" : "max-age=63072000; includeSubDomains; preload",


```

* Permissions-Policy header: Allow or deny the use of browser features, such as opting out of FLoC.

JavaScript

```

"Permissions-Policy": "interest-cohort=()",


```

* X-XSS-Protection header: Prevents a page from loading if an XSS attack is detected. Refer to [X-XSS-Protection ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection) for details.

JavaScript

```

"X-XSS-Protection": "0",


```

* X-Frame-Options header: Prevents click-jacking attacks. Refer to [X-Frame-Options ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options).

JavaScript

```

"X-Frame-Options": "DENY",


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/security-headers/","name":"Set security headers"}}]}
```
