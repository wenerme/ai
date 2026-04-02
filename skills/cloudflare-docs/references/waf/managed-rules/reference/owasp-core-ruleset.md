---
title: Cloudflare OWASP Core Ruleset
description: The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the OWASP ModSecurity Core Rule Set (CRS) version 3.3.0.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/managed-rules/reference/owasp-core-ruleset/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare OWASP Core Ruleset

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the [OWASP ModSecurity Core Rule Set ↗](https://owasp.org/www-project-modsecurity-core-rule-set/) (CRS) version 3.3.0.

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate a [threat score](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score) and execute an action based on that score. When a rule in the ruleset matches a request, the threat score increases according to the rule score. If the final threat score is greater than the configured [score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold), Cloudflare executes the action configured in the last rule of the ruleset.

Warning

The Cloudflare OWASP Core Ruleset is prone to false positives and offers only marginal benefits when added on top of Cloudflare Managed Ruleset and WAF attack score. If you decide to deploy this managed ruleset, you will need to monitor and adjust its settings based on your traffic to prevent false positives.

## Cloudflare OWASP Core Ruleset versus OWASP Top 10

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the OWASP ModSecurity Core Rule Set version 3.3.0, which is different from the [OWASP Top 10 ↗](https://owasp.org/www-project-top-ten/).

The OWASP Top 10 is a list of the most severe security risks that can affect applications. Some of the identified security risks can be addressed by the OWASP Core Ruleset, but other risks cannot be protected by a web application firewall, such as the following:

* Insecure Design
* Identification and Authentication Failures
* Security Logging and Monitoring Failures

These risks depend more on how the application is built or how the entire monitoring pipeline is set up.

## Resources

* [ Concepts ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/)
* [ OWASP evaluation example ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/)
* [ Configure in the dashboard ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/)
* [ Configure via API ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-api/)
* [ Configure in Terraform ](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/#configure-the-owasp-paranoia-level-score-threshold-and-action)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/reference/","name":"Rulesets reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/reference/owasp-core-ruleset/","name":"Cloudflare OWASP Core Ruleset"}}]}
```
