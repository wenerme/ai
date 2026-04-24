---
title: Required firewall rule changes to enable URL normalization
description: On 2021-04-08, Cloudflare announced URL normalization, a feature that protects zones by normalizing HTTP request URI paths.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/troubleshooting/required-changes-to-enable-url-normalization.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Required firewall rule changes to enable URL normalization

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

On 2021-04-08, Cloudflare announced [URL normalization](https://developers.cloudflare.com/rules/normalization/), a feature that protects zones by normalizing HTTP request URI paths.

Malicious users can craft specific URIs that could be interpreted differently by firewall systems and origin systems. When you enable **Normalize incoming URLs**, all rules filtering on the URI path will receive the URL in a canonical form, which provides an extra layer of protection against these malicious users.

Cloudflare gradually enabled URL normalization for all Cloudflare zones except for those that could be impacted by this change. We determined the impacted zones by analyzing all firewall rules, looking for patterns in HTTP fields that would no longer match when using URL normalization techniques.

These fields are the following:

* `http.request.uri.path`
* `http.request.full_uri`
* `http.request.uri`

Cloudflare did not enable URL normalization automatically for zones that would be impacted by these changes to prevent any change in behavior of your existing firewall rules.

## Why URL normalization is important

Cloudflare strongly recommends that you enable **Normalize incoming URLs** in **Rules** \> **Overview** \> **URL Normalization** to strengthen your zone's security posture. Not doing so leaves your zone at greater risk of a successful attack. Malicious parties could craft the URL in a way that the rules are not accounting for.

For example, a firewall rule with an expression such as `http.request.uri.path contains "/login"` could be bypassed if the malicious actor has encoded the `l` character as `%6C`. In this scenario, and with URL normalization disabled, traffic would not be matched by the firewall rule.

Refer to [How URL normalization works](https://developers.cloudflare.com/rules/normalization/how-it-works/) for more information and additional examples.

---

## Recommended procedure

It is recommended that you:

1. Update any firewall rules impacted by the URL normalization changes.
2. Enable URL normalization.

These steps will ensure a stronger security posture on your zone(s).

### 1\. Review and update firewall rules

Before enabling URL normalization, you should review the affected firewall rules on your zone(s) and take one of the following approaches:

* Edit these firewall rules to remove the parts which will no longer trigger once normalized — for example, any rules that look for `//` or `../` in URL paths. Administrators previously created these rules to perform a limited URL normalization, and these rules can now be safely disabled and then deleted.
* If you wish to identify visitors with non-normalized URI paths with these firewall rules, you should update them to use the original (or raw) non-normalized fields. These fields are the following:  
   * `raw.http.request.uri.path`  
   * `raw.http.request.full_uri`  
   * `raw.http.request.uri`

### 2\. Enable URL normalization

Once you have updated the affected firewall rules, enable URL normalization in **Rules** \> **Overview** \> **URL Normalization**.

A Cloudflare user must have the [Firewall role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) or one of the Administrator roles to access URL normalization settings in the dashboard.

---

## Related resources

* [URL normalization](https://developers.cloudflare.com/rules/normalization/)
* [Transform Rules](https://developers.cloudflare.com/rules/transform/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/troubleshooting/required-changes-to-enable-url-normalization/","name":"Required firewall rule changes to enable URL normalization"}}]}
```
