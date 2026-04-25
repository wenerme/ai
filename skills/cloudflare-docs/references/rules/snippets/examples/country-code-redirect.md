---
title: Country code redirect
description: Redirect a response based on the country code in the header of a visitor.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Localization ](https://developers.cloudflare.com/search/?tags=Localization)[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects) 

# Country code redirect

Redirect a response based on the country code in the header of a visitor.

JavaScript

```

export default {

  async fetch(request) {

    /**

     * A map of the URLs to redirect to

     * @param {Object} countryMap

     */

    const countryMap = {

      // Replace the country codes and target URLs with ones that apply to your case.

      US: "https://example.com/us",

      EU: "https://example.com/eu",

    };


    // Use the cf object to obtain the country of the request

    // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties

    const country = request.cf.country;


    // If country is not null and is defined in the country map above, redirect.

    if (country != null && country in countryMap) {

      const url = countryMap[country];

      // Remove this logging statement from your final output.

      console.log(

        `Based on ${country}-based request, your user would go to ${url}.`,

      );

      return Response.redirect(url);


      // If request country not in map, return another page.

    } else {

      return fetch("https://example.com", request);

    }

  },

};


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/country-code-redirect/","name":"Country code redirect"}}]}
```
