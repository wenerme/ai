---
title: Errors
description: Error codes returned by the Artifacts REST API and Workers binding.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Errors

This is a list of Artifacts errors.

## Error codes

| Name                   | Code  | Description                                                               |
| ---------------------- | ----- | ------------------------------------------------------------------------- |
| ALREADY\_EXISTS        | 10201 | The target repository already exists in the namespace.                    |
| NOT\_FOUND             | 10200 | The repository or remote resource does not exist.                         |
| IMPORT\_IN\_PROGRESS   | 10302 | The repository is still being imported and is not yet available.          |
| FORK\_IN\_PROGRESS     | 10303 | The repository is still being forked and is not yet available.            |
| INVALID\_INPUT         | 10100 | A request parameter is missing, malformed, or outside the accepted range. |
| INVALID\_REPO\_NAME    | 10101 | The repository name does not meet naming requirements.                    |
| INVALID\_TTL           | 10103 | The token TTL is outside the allowed range (60–31,536,000 seconds).       |
| INVALID\_URL           | 10104 | The source URL does not point to a valid git repository.                  |
| REMOTE\_AUTH\_REQUIRED | 10106 | The remote repository requires authentication.                            |
| UPSTREAM\_UNAVAILABLE  | 10401 | The remote git server could not be reached.                               |
| MEMORY\_LIMIT          | 10402 | The operation exceeds service memory limits.                              |
| INTERNAL\_ERROR        | 10400 | An unexpected internal error occurred.                                    |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/api/errors/","name":"Errors"}}]}
```
