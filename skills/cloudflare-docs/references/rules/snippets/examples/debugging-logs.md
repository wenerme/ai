---
title: Debugging logs
description: Send debugging information in an errored response to a logging service.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Debugging logs

Send debugging information in an errored response to a logging service.

JavaScript

```
// Replace with your actual logging service endpointconst loggingEndpoint = "https://your-logging-endpoint";
export default {  async fetch(request) {    try {      // Attempt to fetch the request from the origin server      const response = await fetch(request.clone());
      // Check if the response status indicates an error (for example, 4xx or 5xx)      if (!response.ok) {        // Prepare error details and context for logging        const errorDetails = {          status: response.status,          statusText: response.statusText,          url: request.url,          method: request.method,          headers: Object.fromEntries(request.headers),        };
        // Log error details to your logging service        await logError(errorDetails);
        // Return the original response with status and statusText intact        return new Response(response.body, {          status: response.status,          statusText: response.statusText,          headers: response.headers,        });      }
      // Return the successful response from the origin server      return response;    } catch (error) {      // Handle any exceptions that occur during fetch      const errorDetails = {        message: error.message,        stack: error.stack,        url: request.url,        method: request.method,        headers: Object.fromEntries(request.headers),      };
      // Log error details to your logging service      await logError(errorDetails);
      // Return a generic error response      return new Response("Internal Server Error", {        status: 500,      });    }  },};
// Function to log error details to your logging serviceasync function logError(details) {  try {    const response = await fetch(loggingEndpoint, {      method: "POST",      headers: {        "Content-Type": "application/json",      },      body: JSON.stringify(details),    });
    if (!response.ok) {      console.error("Failed to log error:", response.statusText);    }  } catch (error) {    console.error("Error logging error:", error.message);  }}
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/debugging-logs/#page","headline":"Debugging logs · Cloudflare Rules docs","description":"Send debugging information in an errored response to a logging service.","url":"https://developers.cloudflare.com/rules/snippets/examples/debugging-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging","Response modification"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/snippets/examples/","name":"Snippets examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/snippets/examples/debugging-logs/","name":"Debugging logs"}}]}
```
