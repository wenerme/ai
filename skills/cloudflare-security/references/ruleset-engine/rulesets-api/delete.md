---
description: Delete a ruleset using the Rulesets API.
title: Delete a ruleset
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete a ruleset

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You can use the API to delete all the versions of a ruleset or delete a specific version of a ruleset.

- [Delete ruleset (all versions)](#delete-ruleset)
- [Delete ruleset version](#delete-ruleset-version)

## Delete ruleset

Deletes all the versions of an existing ruleset at the account or zone level.

Use one of the following API endpoints:

- [Delete an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/delete/)
  `DELETE /accounts/{account_id}/rulesets/{ruleset_id}`
- [Delete a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/delete/)
  `DELETE /zones/{zone_id}/rulesets/{ruleset_id}`

If the delete operation succeeds, the API method call returns a `204 No Content` HTTP status code.

Note

You cannot delete a ruleset that is still referenced in other rules. For example, you cannot delete a custom ruleset that is being deployed in a rule with `execute` action.

To delete the ruleset, update or delete any rules that reference the ruleset and try again.

### Example

The following example request deletes an existing ruleset with ID `$RULESET_ID`.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Mass URL Redirects Write</code>
- <code>Magic Firewall Write</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>Transform Rules Write</code>
- <code>Select Configuration Write</code>
- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>

</details>

*Delete an account rulesetbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Delete ruleset version

Deletes a specific version of a ruleset.

Use one of the following API endpoints:

- [Delete an account ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/delete/)
  `DELETE /accounts/{account_id}/rulesets/{ruleset_id}/versions/{version_number}`
- [Delete a zone ruleset version](https://developers.cloudflare.com/api/resources/rulesets/subresources/versions/methods/delete/)
  `DELETE /zones/{zone_id}/rulesets/{ruleset_id}/versions/{version_number}`

If the delete operation succeeds, the method call returns a `204 No Content` HTTP status code.

Later updates to the ruleset will not reuse the version number of a deleted ruleset version.

Note

You cannot delete a ruleset version if it is the latest ruleset version and there is a rule with `execute` action deploying that ruleset.

To delete the ruleset version, update or delete any rules that reference the ruleset and try again.

### Example

The following example request deletes a version of an existing ruleset.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Mass URL Redirects Write</code>
- <code>Magic Firewall Write</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>Transform Rules Write</code>
- <code>Select Configuration Write</code>
- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>

</details>

*Delete an account ruleset versionbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/versions/$RULESET_VERSION" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#page","headline":"Delete a ruleset · Cloudflare Ruleset Engine docs","description":"Delete a ruleset using the Rulesets API.","url":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
