---
title: Validate JSON web tokens (JWT)
description: Extract the JWT token from a header, decode it, and implement validation checks to verify it.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Authentication ](https://developers.cloudflare.com/search/?tags=Authentication)[ Request modification ](https://developers.cloudflare.com/search/?tags=Request%20modification) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/snippets/examples/jwt-validation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Validate JSON web tokens (JWT)

Extract the JWT token from a header, decode it, and implement validation checks to verify it.

JavaScript

```

export default {

  async fetch(request) {

    // Extract JWT token from "Authorization: Bearer" header

    function getJWTToken(request) {

      const authorizationHeader = request.headers.get("Authorization");

      if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {

        return authorizationHeader.substring(7, authorizationHeader.length);

      }

      return null;

    }


    // Validate that JWT token has correct format: header.payload.signature (for example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjI0OTkyMDAwLCJleHAiOjE2MjI1MDAwMDB9.TldRGokRHJvG69SefbxIqAlQ6nnco6aLa3y7jsYXHMI")

    function validateJWT(token) {

      const [header, payload, signature] = token.split(".");


      if (!header || !payload || !signature) {

        throw new Error("Invalid JWT format");

      }


      // Decode the JWT payload and header to JSON

      const decodedHeader = JSON.parse(atob(header));

      const decodedPayload = JSON.parse(atob(payload));


      // Here you would implement the logic to verify the JWT signature.

      // This example assumes a simple validation that just checks the payload.

      // Replace the following lines with your actual validation logic.


      // Ensure that JWT token hasn't expired (to test, try sending a request with an expired token "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjI0OTkyMDAwLCJleHAiOjE2MjI1MDAwMDB9.TldRGokRHJvG69SefbxIqAlQ6nnco6aLa3y7jsYXHMI")

      if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {

        throw new Error("JWT has expired");

      }


      // Optionally, you could add more validation checks here (issuer, audience, etc.).

      // Also, implement actual signature validation with a custom function.


      return true;

    }


    // Execute the function to extract JWT token

    const jwtToken = getJWTToken(request);


    // If the token is not provided, serve 401 Forbidden

    if (!jwtToken) {

      return new Response("Missing JWT token", { status: 401 });

    }


    // Execute the function to validate the token

    try {

      const validToken = await validateJWT(jwtToken);

      if (validToken) {

        // If the token is valid, serve actual response

        // An example of a valid token that will expire in 2033 is "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjI0OTkyMDAwLCJleHAiOjIwMDExMjAwMDB9._qgQ_TMrGfYgOoA8HtTZwEGoj8zAPWxsz8CT1jEAGzo"

        return fetch(request);

      } else {

        return new Response("Invalid JWT token", { status: 401 });

      }

    } catch (error) {

      return new Response("Error validating token: " + error.message, {

        status: 500,

      });

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/jwt-validation/","name":"Validate JSON web tokens (JWT)"}}]}
```
