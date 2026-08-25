---
description: Sometimes, you may have to roll back configuration changes. To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time.
title: 6 – Revert configuration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt
> Use this file to discover all available pages before exploring further.

# 6 – Revert configuration

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/terraform/tutorial/revert-configuration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sometimes, you may have to roll back configuration changes. For example, you might want to run performance tests on a new configuration or maybe you mistyped an IP address and brought your entire site down.

To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time. If you accidentally brought your site down, consider establishing a good strategy for peer reviewing pull requests rather than merging directly to `master` as done in the tutorials for brevity.

Note

Terraform code snippets below refer to the v5 SDK only.

## 1\. Review your configuration history

Before determining how far back to revert, review your Git history:

```sh
git log --oneline
```

```sh
f1a2b3c Step 5 - Add two Page Rules
d4e5f6g Step 4 - Create load balancer (LB) monitor, LB pool, and LB
a7b8c9d Step 3 - Enable TLS 1.3, automatic HTTPS rewrites, and strict SSL
e1f2g3h Step 2 - Initial Terraform v5 configuration
```

Another benefit of storing your Cloudflare configuration in Git is that you can see who made the change. You can also see who reviewed and approved the change if you peer-review pull requests.

```sh
git log
```

Check when the last change was made:

```sh
git show
```

This shows the most recent commit and what files changed.

## 2\. Scenario: Revert the Page Rules

Assume that shortly after you deployed the Page Rules when following the [Add exceptions with Page Rules](https://developers.cloudflare.com/terraform/tutorial/add-page-rules/) tutorial, you are told the URL is no longer needed, and the security setting and redirect should be dropped.

While you can always edit the config file directly and delete those entries, you can use Git to do that for you.

### Revert using Git

Use Git to create a revert commit that undoes the Page Rules changes:

```sh
git revert HEAD
```

Git will open your default editor with a commit message. Save and close to accept the default message, or customize it:

```sh
Revert "Add Page Rules for security and redirects"

This reverts commit f1a2b3c4d5e6f7a8b9c0d1e2f3g4h5i6j7k8l9m0.
```

## 3\. Preview the changes

Check what Terraform will do with the reverted configuration:

```sh
terraform plan
```

Expected output:

```sh
Plan: 0 to add, 0 to change, 2 to destroy.

Terraform will perform the following actions:

  # cloudflare_page_rule.expensive_endpoint_security will be destroyed
  # cloudflare_page_rule.legacy_redirect will be destroyed
```

As expected, Terraform will remove the two Page Rules that were added in tutorial 5.

## 4\. Apply the changes

Apply the changes to remove the Page Rules from your Cloudflare zone:

```sh
terraform apply --auto-approve
```

```sh
cloudflare_page_rule.expensive_endpoint_security: Destroying...
cloudflare_page_rule.legacy_redirect: Destroying...
cloudflare_page_rule.expensive_endpoint_security: Destruction complete after 1s
cloudflare_page_rule.legacy_redirect: Destruction complete after 1s

Apply complete! Resources: 0 added, 0 changed, 2 destroyed.
```

Two resources were destroyed, as expected, and you have rolled back to the previous version.

## 5\. Verify the revert

Test that the Page Rules are no longer active:

```bash
# This should now return 404 (no redirect)
curl -I https://www.example.com/old-location.php

# This should return normal response (no Under Attack mode)
curl -I https://www.example.com/expensive-db-call
```

Your configuration has been successfully reverted. The Page Rules are removed, and your zone settings are back to the previous state. Git's version control ensures you can always recover or revert changes safely.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/tutorial/revert-configuration/#page","headline":"Revert configuration · Cloudflare Terraform docs","description":"Sometimes, you may have to roll back configuration changes. To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time.","url":"https://developers.cloudflare.com/terraform/tutorial/revert-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
