---
title: Troubleshoot Page Rules - General
description: Resolve common issues with Page Rules configuration.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/page-rules/troubleshooting/general.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Troubleshoot Page Rules - General

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Why is a page rule not working?

The most common reason that a page rule is not working — such as URL forwarding — is that the page rule you created is on a record that is not proxied by Cloudflare in your [DNS settings](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Consider an example where you have a page rule that redirects a subdomain (`subdomain.yoursitename.com`) back to your apex domain (`yoursitename.com`). If you do not have that record proxied in your DNS settings for the subdomain record, Cloudflare's proxy is not running over the record and a page rule will not work because it is going direct to your server.

## Error 500 (Internal server error)

### Root cause

This may be due to a configuration issue on a page rule. When creating a page rule that uses two wildcards, like a _Forwarding URL_ rule, it is possible to create a rule that mentions the second wildcard with the `$2` placeholder. Refer to the example below:

![Example Page Rule configuration with two wildcards. The forwarding URL contains a $2 placeholder, which will be replaced with the content matched by the second ](https://developers.cloudflare.com/_astro/page-rule-create.G2sl-mqe_wuqS2.webp) 

When updating the same rule, you can remove one of the wildcard in the **If the URL matches** field and save it. Refer to the example below:

![Incorrect Page Rule configuration with a single wildcard, but still using the $2 placeholder in the forwarding URL. This configuration causes ](https://developers.cloudflare.com/_astro/page-rule-update.C2mx06CJ_Z1ECvOK.webp) 

If you do so, the `$2` placeholder reference a wildcard that does not exist anymore, and as such, an `Error 500 (Internal server error)` is thrown when a URL triggers the page rule.

### Resolution

Update the page rule and remove the reference `$2` to the second wildcard. If there is only one wildcard, then you can only use `$1`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/page-rules/","name":"Page Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/page-rules/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/page-rules/troubleshooting/general/","name":"Troubleshoot Page Rules - General"}}]}
```
