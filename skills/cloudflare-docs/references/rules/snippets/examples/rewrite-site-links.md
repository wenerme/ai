---
title: Rewrite links on HTML pages
description: Dynamically rewrite links in HTML responses. This is useful for site migrations and branding updates.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Response modification ](https://developers.cloudflare.com/search/?tags=Response%20modification) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/rewrite-site-links.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rewrite links on HTML pages

Dynamically rewrite links in HTML responses.

JavaScript

```

export default {

  async fetch(request) {

    // Define the old hostname here.

    const OLD_URL = "oldsite.com";

    // Then add your new hostname that should replace the old one.

    const NEW_URL = "newsite.com";


    class AttributeRewriter {

      constructor(attributeName) {

        this.attributeName = attributeName;

      }

      element(element) {

        const attribute = element.getAttribute(this.attributeName);

        if (attribute) {

          element.setAttribute(

            this.attributeName,

            attribute.replace(OLD_URL, NEW_URL),

          );

        }

      }

    }


    const rewriter = new HTMLRewriter()

      .on("a", new AttributeRewriter("href"))

      .on("img", new AttributeRewriter("src"));


    const res = await fetch(request);

    if (!res.headers.has("Content-Type")) {

      return res;

    }

    const contentType = res.headers.get("Content-Type");

    if (typeof contentType !== "string") {

      return res;

    }


    // If the response is HTML, it can be transformed with

    // HTMLRewriter -- otherwise, it should pass through

    if (contentType.startsWith("text/html")) {

      return rewriter.transform(res);

    } else {

      return res;

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/rewrite-site-links/","name":"Rewrite links on HTML pages"}}]}
```
