---
title: Content security rules
description: Use content security rules to define the resources (scripts) allowed on your applications.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Content security rules

Note

Only available to customers with Client-Side Security Advanced.

Content security rules (previously known as policies) define which resources your application is allowed to load. They work through Content Security Policy (CSP) directives that Cloudflare adds to your HTTP responses. There are two types of content security rules:

* **Log rules** report resources that fall outside your allowlist without blocking them.
* **Allow rules** block any resource not explicitly listed.

Create [allow rules](#rule-actions) to define an allowlist-based security model. You specify exactly which resources are permitted and everything else is rejected. This approach reduces the attack surface for unwanted third-party scripts in your application.

A content security rule can control both client-side resources monitored by Cloudflare, such as scripts and their connections, and other types of resources. Refer to [Supported CSP directives](https://developers.cloudflare.com/client-side-security/rules/csp-directives/) for details.

Note

Third-party service providers may require specific CSP directives. Refer to your provider's documentation for more information on the CSP directives you need to include in your rule.

## Rule actions

A content security rule can perform one of the following actions:

* **Log**: Cloudflare reports any resources not covered by the rule as [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/) without blocking them. Use this action to validate a new content security rule before deploying it.
* **Allow**: Cloudflare blocks any resources not explicitly allowed by the rule and logs them as [rule violations](https://developers.cloudflare.com/client-side-security/rules/violations/). Switch to this action after validating a rule with the _Log_ action to avoid blocking essential application resources.

For details on the CSP directives Cloudflare creates for each type of rule action, refer to [How client-side security works](https://developers.cloudflare.com/client-side-security/how-it-works/#headers-related-to-content-security-rules). For more information on the CSP directives supported by content security rules, refer to [Supported CSP directives](https://developers.cloudflare.com/client-side-security/rules/csp-directives/).

### Comparison

| Log rule           | Allow rule                              |                                        |
| ------------------ | --------------------------------------- | -------------------------------------- |
| **CSP header**     | content-security-policy-report-only     | content-security-policy                |
| **Browser action** | Loads all resources                     | Blocks resources not in your allowlist |
| **Violations**     | Reported to Cloudflare without blocking | Logged by Cloudflare after blocking    |
| **Use case**       | Validate a rule before enforcing it     | Enforce a positive security model      |

## Next steps

Refer to the following pages for instructions on creating a content security rule:

* [Create a content security rule in the dashboard](https://developers.cloudflare.com/client-side-security/rules/create-dashboard/)
* [Client-side security API: Create a content security rule](https://developers.cloudflare.com/client-side-security/reference/api/#create-a-content-security-rule)

Shortly after you configure content security rules, the Cloudflare dashboard will start displaying any [violations](https://developers.cloudflare.com/client-side-security/rules/violations/) of those rules.

You can filter client-side security alert notifications according to the content security rules you configured in a zone. These alerts are called [scoped alerts](https://developers.cloudflare.com/client-side-security/alerts/#scoped-alerts).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/rules/","name":"Content security rules"}}]}
```
