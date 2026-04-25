---
title: Delete a ruleset
description: Delete a ruleset using the Rulesets API.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Delete a ruleset

You can use the API to delete all the versions of a ruleset or delete a specific version of a ruleset.

* [Delete ruleset (all versions)](#delete-ruleset)
* [Delete ruleset version](#delete-ruleset-version)

## Delete ruleset

Deletes all the versions of an existing ruleset at the account or zone level.

Use one of the following API endpoints:

* [Delete an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/delete/)  
`DELETE /accounts/{account_id}/rulesets/{ruleset_id}`
* [Delete a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/delete/)  
`DELETE /zones/{zone_id}/rulesets/{ruleset_id}`

If the delete operation succeeds, the API method call returns a `204 No Content` HTTP status code.

Note

You cannot delete a ruleset that is still referenced in other rules. For example, you cannot delete a custom ruleset that is being deployed in a rule with `execute` action.

To delete the ruleset, update or delete any rules that reference the ruleset and try again.

### Example

The following example request deletes an existing ruleset with ID `$RULESET_ID`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`

Delete an account ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Delete ruleset version

Deletes a specific version of a ruleset.

Use one of the following API endpoints:

* [Delete an account ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/delete/)  
`DELETE /accounts/{account_id}/rulesets/{ruleset_id}/versions/{version_number}`
* [Delete a zone ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/delete/)  
`DELETE /zones/{zone_id}/rulesets/{ruleset_id}/versions/{version_number}`

If the delete operation succeeds, the method call returns a `204 No Content` HTTP status code.

Later updates to the ruleset will not reuse the version number of a deleted ruleset version.

Note

You cannot delete a ruleset version if it is the latest ruleset version and there is a rule with `execute` action deploying that ruleset.

To delete the ruleset version, update or delete any rules that reference the ruleset and try again.

### Example

The following example request deletes a version of an existing ruleset.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`

Delete an account ruleset version

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/versions/$RULESET_VERSION" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rulesets-api/delete/","name":"Delete a ruleset"}}]}
```
