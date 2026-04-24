---
title: How exposed credentials checks work
description: How exposed credentials checks detect compromised login attempts.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/managed-rules/check-for-exposed-credentials/how-checks-work.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# How exposed credentials checks work

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

WAF rules can include a check for exposed credentials. When enabled in a given rule, exposed credentials checking happens when there is a match for the rule expression (that is, the rule expression evaluates to `true`).

At this point, the WAF looks up the username/password pair in the request against a database of publicly available stolen credentials. When both the rule expression and the exposed credentials check are true, there is a rule match, and Cloudflare performs the action configured in the rule.

## Example

For example, the following rule matches `POST` requests to the `/login.php` URI when Cloudflare identifies the submitted credentials as previously exposed:

**Rule #1**

Rule expression:  
`http.request.method == "POST" and http.request.uri == "/login.php"`

Exposed credentials check with the following configuration:

* Username expression: `http.request.body.form["user_id"]`
* Password expression: `http.request.body.form["password"]`

Action: _Interactive Challenge_

When there is a match for the rule above and Cloudflare detects exposed credentials, the WAF presents the user with a challenge.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/","name":"Check for exposed credentials"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/how-checks-work/","name":"How exposed credentials checks work"}}]}
```
